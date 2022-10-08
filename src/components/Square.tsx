import React from "react";

export const Square = (props: { value: number; onClick: (event: React.MouseEvent) => void }) => {
  const { value, onClick } = props;
  return <button className='square' onClick={onClick}>
    { value }
  </button>
}
