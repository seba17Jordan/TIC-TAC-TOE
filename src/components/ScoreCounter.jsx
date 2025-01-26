export const ScoreBoard = ({ scoreX, scoreO }) => {
    //En el return va lo que voy a ver visualmente
    return (
        <div>
            <h3>Puntaje</h3>
            <p>❌: {scoreX}</p>
            <p>⚪: {scoreO}</p>
        </div>
    )
}

