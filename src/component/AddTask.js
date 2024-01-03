import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Input,
    useToast,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { ContextApi } from '../context/ContextProvider'



function AddTask() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [text, setText] = useState('')
    const { data, setData } = useContext(ContextApi)
    const toast = useToast()
    const addNote = () => {
        if (!text) {
            return toast({
                title: 'title required',
                status: 'warning',
                duration: 2000,
                isClosable: true,
            })
        }
        let num1 = Math.floor(Math.random() * 800)
        let num2 = Math.floor(Math.random() * 500)
        let num3 = Math.floor(Math.random() * 800)
        let num4 = Math.floor(Math.random() * 1000)
        let config = {
            title: text,
            x: num1,
            y: num2,
            index: num3,
            id:num4,
            pinned:false
        }
        setData(prev => [...prev, config])
        setText('')
        onClose()
    }
    return (
        <>
            <Button onClick={onOpen} position={'absolute'} right={'20px'} top={"20px"} padding={"0"} fontSize={'25px'} display={"flex"} justifyContent={'center'} alignItems={'center'} borderRadius={'50px'} bg={'white'}>+</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new note</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder='write here....' onChange={(e) => setText(e.target.value)} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={addNote}>
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddTask