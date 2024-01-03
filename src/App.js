
import { Box, Button, Text } from '@chakra-ui/react';
import './App.css';
import AddTask from './component/AddTask';
import { useContext, useRef, useState } from 'react';
import { ContextApi } from './context/ContextProvider';
import MapTask from './component/MapTask';

let abc = ''
function App() {
  const { data, setData, position, setPosition } = useContext(ContextApi)
  const draggedElementId = useRef(null);

  const handleDragStart = (e, id) => {
    draggedElementId.current = id;
    e.dataTransfer.setData('text/plain', ''); // Required for Firefox to initiate the drag
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default to allow drop
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const draggedElement = document.getElementById(draggedElementId.current);

    if (draggedElement) {
      const newPosition = {
        x: e.clientX - draggedElement.offsetWidth / 2,
        y: e.clientY - draggedElement.offsetHeight / 2,
      };
      setData(prev => {
        return prev.map((el) => {
          if (el.id == draggedElementId.current) {
            return { ...el, x: newPosition.x, y: newPosition.y }
          } else {
            return el
          }
        })
      })

    }
  };

  return (
    <Box className="App" bg={"orange"} h={'100vh'} w={'100%'} position={'relative'} onDrop={handleDrop} onDragOver={handleDragOver} boxSizing='border-box' >
      <AddTask />
      {
        data.length > 0 ?
          data.map((el) => {
            return <MapTask key={el.id} id={el.id} x={el.x} y={el.y} pin={el.pin} title={el.title} dragStart={(e) => handleDragStart(e, el.id)} />

          }) : <></>
      }
    </Box>
  );
}

export default App;
