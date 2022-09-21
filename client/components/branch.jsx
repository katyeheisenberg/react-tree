/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { nanoid } from 'nanoid'
import React, { useState } from 'react'

const Branch = ({ id, name, children, addChild, parentIds, removeChild }) => {
  const [newNode, setNode] = useState('')
  const [expanded, setExpanded] = useState(false)

  const addElement = () => {
    addChild([...parentIds, id], {
      name: newNode,
      id: nanoid(),
      children: []
    })
    setNode('')
  }

  return (
    <div className="w-full underline">
      {children.length > 0 ? 'Dir' : 'File'}
      {name}
      <button
        type="button"
        className="w-13 h-5 ml-5 mr-6 shadow-sm text-center bg-blue-200"
        onClick={() => {
          setExpanded((t) => !t)
        }}
      >
        {expanded ? 'close' : 'expand'}
      </button>

      <button
        type="button"
        className="w-13 h-5 ml-5 mr-6 shadow-sm text-center bg-orange-500"
        onClick={() => {
          removeChild([...parentIds, id])
        }}
      >
        Delete
      </button>

      {expanded && (
        <div className="pl-2 border-l-2">
          <div>
            {children.map((it) => {
              return (
                <Branch
                  key={it.id}
                  {...it}
                  parentIds={[...parentIds, id]}
                  addChild={addChild}
                  removeChild={removeChild}
                />
              )
            })}
          </div>
          <div className="mb-5 shadow-md pr-5 mr-5">
            <input
              type="text"
              placeholder="node name"
              value={newNode}
              onChange={(e) => {
                setNode(e.target.value)
              }}
              className="border-gray-400 shadow-lg"
            />
            <button type="button" onClick={addElement}>
              +
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

Branch.propTypes = {}

export default React.memo(Branch)
