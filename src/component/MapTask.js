import React, { useContext, useState } from 'react'
import { ContextApi } from '../context/ContextProvider'
import { Box, Text, Textarea } from '@chakra-ui/react'

const MapTask = ({ id, x, y, pin, title, dragStart }) => {
    const { data, setData, setPosition } = useContext(ContextApi)
    const [isEdit, setIsEdit] = useState(false)
    const [text, setText] = useState('')

    const deleteTask = (ids) => {
        setData(prev => {
            return prev?.filter((el) => el.id != ids)
        })
    }

    const editData = (ids) => {
        setData(prev => {
            return prev.map((el) => {
                if (el?.id == ids) {
                    return { ...el, title: text };
                } else {
                    return el;
                }
            });
        });
        setIsEdit(false)
    };

    const makePin = (ids) => {
        console.log(ids)
        setData(prev => {
            console.log(ids)
            return prev?.map(el => {
                if (el.id == ids) {
                    console.log('hii')
                    return { ...el, pin: !el.pin }
                } else {
                    return el
                }
            })
        })
    }

    console.log(data)
    return (
        <Box id={`${id}`} padding={'15px'} bg={'white'} borderRadius={'10px'} w='200px' position="absolute" top={`${y}px`} left={`${x}px`} cursor={'pointer'} key={id} draggable={!pin} onDragStart={dragStart} >
            <Textarea  cursor={'pointer'} maxH={'100px'} readOnly={!isEdit}  pb={'15px'} mb={'10px'} onChange={(e) => setText(e.target.value)} _focus={{outline:'none'}} >{title}</Textarea>
            {
                isEdit ? <Text p={'0px'} color={'blue'} position={'absolute'} right={'3'} bottom={'3px'} onClick={() => editData(id)} >save</Text> : <Text p={'0px'} color={'green'} position={'absolute'} right={'3'} bottom={'3px'} onClick={() => setIsEdit(true)} >edit</Text>
            }
            <Text onClick={() => deleteTask(id)} position={'absolute'} bottom={'3px'} right={'60px'} p="0px" fontSize={'15px'} display={"flex"} justifyContent={'center'} alignItems={'center'} borderRadius={'50px'} color={'red'} >X</Text>

            <Text  p={'0px'} color={'blue'} position={'absolute'} right={'80px'} bottom={'3px'} onClick={() => makePin(id)} >{!pin?'pin':'unpin'}</Text>
        </Box>
    )
}

export default MapTask