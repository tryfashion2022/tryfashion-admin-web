import {
    Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalCloseButton,useDisclosure,
    Button,Text,Flex,Center,Input,Select,Textarea,Heading,Stack,Container,
    useToast,
    FormControl,FormLabel,FormErrorMessage,FormHelperText,
    Checkbox, CheckboxGroup
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import {useRouter} from 'next/router'

export function AddCategoryModal({isAddNewCategoryModalvisible,setIsAddNewCategoryModalModalVisible}){
    const [subcategory, setsubcategory] = useState('');
    const [category, setcategory] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [active,setActive]=useState(false);
    const [isModalvisible,setIsModalVisible]=useState(false);

    const router = useRouter()
    const toast = useToast();

    const HandleModalOpen=()=>{

      if(isAddNewCategoryModalvisible === true){
        onOpen();
        setIsAddNewCategoryModalModalVisible(false)
        
      }
    }
    useEffect(()=>{
          HandleModalOpen();
    },[isAddNewCategoryModalvisible])
    
    //console.log(property.name)



    const [issubmitting,setissubmitting] = useState(false)
const details = {
  category,
  subcategory
}
    const HandleSubmit=async()=>{
      console.log(details)    
      try{
        await axios.post('https://try-fashion-admin-server.herokuapp.com/api/addcategory',{
          details
        }).then((res)=>{console.log(res.data)})
      }catch(err){
        console.log(err)
      }
    }
 return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
                <Center>
                  <Text>Add new Sub-Category</Text>
                </Center>
              </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
               <Select variant='filled' placeholder='Category'  required onChange={((e)=>{setcategory(e.target.value)})}>
                  <option value='ladies'>ladies</option>
                  <option value='men'>men</option>
                  <option value='accessories'>accessories</option>
                  <option value='exclusives'>exclusives</option>
                </Select>
                <FormLabel>Sub-category</FormLabel>
                <Input type='text' variant='filled' placeholder='e.g tops , dresses' required onChange={((e)=>{setsubcategory(e.target.value)})}/>
                <Flex gap='2' mt='2' direction={'column'}>
                      <Button bg='#000' color='#fff'  borderRadius='0' onClick={HandleSubmit}>Add Item</Button>
                      <Button bg='#eee' color='red' borderRadius='0' border='1px solid red ' onClick={(()=>{onClose(); router.reload()})}>Cancel</Button>
                  </Flex>
              </FormControl>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
      )
}
