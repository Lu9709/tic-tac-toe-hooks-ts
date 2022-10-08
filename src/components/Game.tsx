import {Board} from "./Board";
import {useState} from "react";
import {calculateWinner} from "../util/calculateWinner";

export const Game = () => {
  const defaultSquares: history = [{ squares: Array(9).fill(null)}]
  const [history, setHistory] = useState(defaultSquares)
  const [xIsNext, setXIsNext] = useState(true)
  const [stepNumber, setStepNumber] = useState(0)
  const current: squares = history[stepNumber]
  const winner = calculateWinner(current.squares)
  const status = winner ? 'Winner is ' + winner :'Next player: ' + (xIsNext ? 'X' : 'O')
  const jumpTo = (step: number) => {
    setStepNumber(step)
    setXIsNext((step % 2) === 0)
  }
  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={()=> jumpTo(move)}>{desc}</button>
      </li>
    )
  })
  const handleClick = (i: number) => {
    const historyList = history.slice(0, stepNumber + 1)
    const current = historyList[historyList.length - 1]
    const squares = current.squares.slice()
    if(winner || squares[i]) return
    squares[i] = xIsNext ? 'X' : 'O'
    setHistory(historyList.concat({ squares }))
    setXIsNext(!xIsNext)
    setStepNumber(historyList.length)
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i)=> handleClick(i)} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
