import React from 'react'
import ImageList from './ImageList'


const Column = ({ list }) => {
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
        <ImageList key={list} text={list} />

    </div>
  )
}

export default Column