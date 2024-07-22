import React from 'react'

const ColorBox = (props) => {
  return (
    <div className={`colored-box-container`}>
        <h1>{props.title}</h1>
        <p>{props.body}</p>
    </div>
  )
}

export default ColorBox