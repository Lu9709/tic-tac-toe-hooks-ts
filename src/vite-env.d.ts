/// <reference types="vite/client" />
type squares = Record<any, any[]>

type history = squares[]

type initState = {
  history: history
  xIsNext: boolean,
  stepNumber: number,
}

interface actionType {
  type: 'changeSquares' | 'jumpTo',
  index?: number,
  step?: number
}
