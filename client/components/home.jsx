/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Branch from './branch'
import Head from './head'

const Home = () => {
  const [tree, addLeaf] = useState([])
  const [newNode, setNode] = useState('')
  useEffect(() => {
    fetch('/api/tree/')
      .then((r) => r.json())
      .then((body) => addLeaf(body))
  }, [])

  const getItem = (point, ids) => {
    const [firstKey, ...otherIds] = ids
    const item = point.find((it) => it.id === firstKey)
    return otherIds.length > 0
      ? otherIds.reduce((acc, rec) => {
          const newItem = acc.children.find((it) => it.id === rec)
          // newItem.id = nanoid()
          return newItem
        }, item)
      : item
  }

  const removeChild = (names) => {
    if (names.length === 1) {
      addLeaf(tree.filter((it) => it.id !== names[names.length - 1]))
      return
    }
    const item1 = getItem(tree, names.slice(0, names.length - 1))
    item1.children = item1.children.filter((it) => it.id !== names[names.length - 1])
    addLeaf([...tree])
  }

  const addChild = (names, objectToInsert) => {
    const item1 = getItem(tree, names)
    item1.children = [...item1.children, objectToInsert]
    addLeaf([...tree])
  }

  const addElement = () => {
    addLeaf((tree) => [
      ...tree,
      {
        name: newNode,
        id: nanoid(),
        children: []
      }
    ])
    setNode('')
  }
  return (
    <div className="container mx-auto p-8">
      <Head title="Dashboard" />
      Tree
      <div>
        {tree.map((it) => {
          return (
            <Branch
              key={it.id}
              {...it}
              parentIds={[]}
              addChild={addChild}
              removeChild={removeChild}
            />
          )
        })}
      </div>
      <div>
        <input
          type="text"
          value={newNode}
          onChange={(e) => {
            setNode(e.target.value)
          }}
          className="border-gray-400 border"
        />
        <button type="button" onClick={addElement}>
          Add
        </button>
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
