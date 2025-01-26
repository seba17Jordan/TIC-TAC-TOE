export const saveGameToStorage = ({board, turn}) => {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const resetGameStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}

export const saveScoreToStorage = ({scoreX, scoreO}) => {
    window.localStorage.setItem('scoreX', JSON.stringify(scoreX))
    window.localStorage.setItem('scoreO', JSON.stringify(scoreO))
}