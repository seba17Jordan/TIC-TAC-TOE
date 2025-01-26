//import PropTypes from 'prop-types'

export const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`;
  
    const handleClick = () => {
      updateBoard(index)
    }
    
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  } 
  //children es lo de dentro del tablero (la X o la O)
  //updateBoard: forma de actualizar tablero
  //indice para saber cada cuadrado que indice es




  /* El import de propTypes y esto hace que no se subraye lo de arriba, es declarar básicamente los tipos
  Square.propTypes = {
    children: PropTypes.node, // Puede ser cualquier nodo de React (texto, elementos, componentes, etc.)
    isSelected: PropTypes.bool,
    updateBoard: PropTypes.func.isRequired, // Función requerida
    index: PropTypes.number.isRequired, // Número requerido
  };
  */