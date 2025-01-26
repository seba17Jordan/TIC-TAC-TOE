import { WINNER_COMBOS } from "../constants.js";

export const checkWinnerFrom = (boardToCheck) => {
    //Rerviso todas las combinaciones ganadoras para saber si X u O ganó
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if(
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    //Si no hay ganador
    return null
  }

export const checkEndGame = (newBoard) => {
  //Revisamos si hay empate (si no hay más espacios vacios)
  return newBoard.every((Square) => Square != null)
}