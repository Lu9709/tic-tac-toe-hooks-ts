import { Board } from "./Board";
import { useReducer } from "react";
import { calculateWinner } from "../util/calculateWinner";

const initState: initState = {
  history: [{ squares: Array(9).fill(null)}],
  xIsNext: true,
  stepNumber: 0,
}
const reducer = (state: initState, action: actionType): initState => {
  const { history, stepNumber, xIsNext } = state
  const { type, index = 0, step = 0 } = action
  switch (type) {
    case 'changeSquares':
      const historyList = history.slice(0, stepNumber + 1)
      const current = historyList[historyList.length - 1]
      const squares = current.squares.slice()
      if (calculateWinner(squares) || squares[index]) return { ...state }
      squares[index] = xIsNext ? 'X' : 'O'
      return {
        ...state,
        history: [...historyList, { squares }],
        xIsNext: !xIsNext,
        stepNumber: historyList.length
      }
    case 'jumpTo':
      return {
        ...state,
        xIsNext: (step % 2) === 0,
        stepNumber: step
      }
    default: return state
  }
}

export const Game = () => {
  const [state, dispatch] = useReducer(reducer, initState)
  const { history, stepNumber, xIsNext } = state
  const { squares } = history[stepNumber]
  const winner = calculateWinner(squares)
  const status = winner ? 'Winner is ' + winner :'Next player: ' + (xIsNext ? 'X' : 'O')
  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={()=> dispatch({ type: 'jumpTo', step: move })}>{desc}</button>
      </li>
    )
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={(i)=> dispatch({ type:'changeSquares', index: i})} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
