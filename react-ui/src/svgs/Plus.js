import React from 'react'

export default function Plus (props) {
  const width = props.width || '30px'
  const height = props.height || '36px'
  const color = props.color || 'white'
  const className = props.className || ''

  return (
    <svg width={width} height={height} className={className} viewBox='0 0 500 600' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
      <path fill={color} d='M 241.99219,407.91016 L 241.99219,310.44922 L 144.72656,310.44922 L 144.72656,294.43359 L 241.99219,294.43359 L 241.99219,197.36328 L 257.61719,197.36328 L 257.61719,294.43359 L 355.27344,294.43359 L 355.27344,310.44922 L 257.61719,310.44922 L 257.61719,407.91016 L 241.99219,407.91016 z' />
    </svg>
  )
}
