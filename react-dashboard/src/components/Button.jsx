import React from 'react'

const Button = ({color, bgColor, borderRadius, text, size}) => {
  return (
    <button type='button'
      style={{backgroundColor: bgColor, color: color, borderRadius: borderRadius}}
      className={`text-${size} p-3 hover:drop-shadow-lg`}
    >{text}</button>
  )
}

export default Button