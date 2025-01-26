import { useState } from 'react';
import confetti from "canvas-confetti";
import { Square } from './components/Square.jsx';
import {TURNS} from "./constants.js"
import { checkWinnerFrom, checkEndGame } from './logic/board.js';
import { WinnerModal } from './components/WinnerModal.jsx';
import { saveGameToStorage, resetGameStorage, saveScoreToStorage } from './logic/storage/index.js';
import { ScoreBoard } from './components/ScoreCounter.jsx';

import './App.css'

function App() {
  //Estado del tablero, tengo array con el board y una forma de actualizar el board, lo de la derecha es el valor inicial
  const [board, setBoard] = useState( () => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
  
  //Estado para saber de quien es el turno
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  
  //Estado para saber si alguien ganó
  const [winner, setWinner] = useState(null); //null es que no hay ganador, false es que es un empate

  //Estados para saber puntuacion actual de cada jugador
  const [scoreX, setScoreX] = useState(() => {
    const scoreXFromStorage = window.localStorage.getItem('scoreX')
    return JSON.parse(scoreXFromStorage) ?? 0
  })

  const [scoreO, setScoreO] = useState(() => {
    const scoreOFromStorage = window.localStorage.getItem('scoreO')
    return JSON.parse(scoreOFromStorage) ?? 0
  })
  
  //Para resetear siempre vuelvo estados a como se inicializan por defecto
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    //Reseteo local storage
    resetGameStorage()
  }

  //Para resetear solo los puntajes
  const resetScore = () => {
    setScoreX(0)
    setScoreO(0)
  }

  //Para actualizar el tablero, con cada click llamo a esto
  const updateBoard = (index) => {
    //No actualizo si la posicion ya tiene algo o si ya hay ganador
    if(board[index] || winner) return

    //Actualizar el tablero 
    const newBoard = [...board]
    newBoard[index] = turn //X u O, en la posicion se guarda el que corresponda
    setBoard(newBoard)

    //Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Guardamos la partida
    saveGameToStorage({board: newBoard, turn:newTurn})

    //Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
      if(newWinner === TURNS.X){
        const newScoreX = scoreX+1
        setScoreX(newScoreX)
        saveScoreToStorage({scoreX: newScoreX, scoreO: scoreO})
      }else{
        const newScoreO = scoreO+1
        setScoreO(newScoreO)
        saveScoreToStorage({scoreX: scoreX, scoreO: newScoreO})
      }
      
    } else if (checkEndGame(newBoard)){
      setWinner(false)  //si hay empate
    }
  }

  //En el return va todo lo de la app, los componentes y la interfaz en si
  return (

    <main className='board'>
      <h1>Tic-Tac-Toe</h1>
      
      <section className='score'>
        <ScoreBoard winner={winner} scoreX={scoreX} scoreO={scoreO} />
      </section>

      <section>
        <button onClick={resetGame}> Reiniciar el juego </button>
        <button onClick={resetScore}> Reiniciar putajes </button>
      </section>
      
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
              {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
