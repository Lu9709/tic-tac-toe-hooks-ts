import React from "react"
import {Square} from "./Square"

export const Board = (props: { size?: number, squares: number[], onClick: (value: number) => void}) => {
  const { size = 3, squares, onClick } = props
  const RenderSquaresRow = (start: number) => {
    return (
      <div className="board-row" key={start}>{
        Array.from({ length: size }).map((item, index)=> {
          return <Square key={start + index} value={squares[start + index]} onClick={()=> onClick(start + index)}/>
        })
      }</div>
    )
  }
  const RenderSquares = (size: number) => {
    const arr = []
    const maxSize = size * size
    for (let i = 0; i < maxSize; i+= size) {
      arr.push(RenderSquaresRow(i))
    }
    return arr
  }
  return <>
    { RenderSquares(size) }
  </>
}
