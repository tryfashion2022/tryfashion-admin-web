import {
    Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalCloseButton,useDisclosure,
    Button,Text,Flex,Center,Input,Select,Textarea,Heading,Stack,Container,
    useToast,
    FormControl,FormLabel,FormErrorMessage,FormHelperText,
    Checkbox, CheckboxGroup
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import {PhotoCamera, Room} from '@mui/icons-material';
import axios from 'axios';
import Loading from './loading.js'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import {useRouter} from 'next/router'

export function EditItemModal({isEditItemModalvisible,setIsEditItemModalVisible,data,id}){
	//const [data,setdata]=useState('')
    const [name,setname]=useState(data.name);
    const [price,setprice]=useState(data.price);
    const [discount,setdiscount]=useState(data.discount);
    const [stock,setstock]=useState(data.stock);
    const [sizes,setsizes]=useState(data.sizes);
    const [colors,setcolors]=useState(data.colors);
    const [description,setdescription]=useState(data.description);
    const [category, setcategory] = useState(data.category);
    const [subcategory, setsubcategory] = useState(data.subcategory);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [active,setActive]=useState(false);
    const [isModalvisible,setIsModalVisible]=useState(false);

    const router = useRouter()
    const toast = useToast();
    const cookies = new Cookies();

    const HandleModalOpen=()=>{
    	//console.log(isEditItemModalvisible)
      if(isEditItemModalvisible === true){
        onOpen();
        setIsEditItemModalVisible(false)
      }
    }
    useEffect(()=>{
          HandleModalOpen();
    },[isEditItemModalvisible])
    
    //console.log(property.name)



    const [issubmitting,setissubmitting] = useState(false);

    const details = {
      id:id,
      name,
      price,
      discount,
      description,
      category,
      subcategory,
      stock,
      sizes,
      colors,
    }
    const getDetails=()=>{
    	try{
    		axios.post('https://try-fashion-admin-server.herokuapp.com/api/getproduct',{id}).then((res)=>{})
    	}catch(err){
    		console.log(err)
    	}
    }
    const HandleSubmit=async()=>{
      console.log(details)
     	try{
		 	axios.post("https://try-fashion-admin-server.herokuapp.com/api/editproduct",{
		                details
		              }).then((res)=>{
		                //check if listing req failed
		                console.log(res.data)
		          }).catch((err)=>{
		            console.log(err)
		    })
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
                  <Text>Edit Product</Text>
                </Center>
              </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormLabel>Name :{data.name}</FormLabel>
                <Input type='text' value={name} variant='filled' placeholder='e.g High neck Sweaters' required onChange={((e)=>{setname(e.target.value)})}/>
                <FormLabel>Price of the item</FormLabel>
                <Input type='number' value={price} variant='filled' placeholder='e.g 2000' required onChange={((e)=>{setprice(e.target.value)})}/>
                <FormLabel>Old price of the item</FormLabel>
                <Input type='number' value={discount} variant='filled' placeholder='e.g 2500' required onChange={((e)=>{setdiscount(e.target.value)})}/>
                <FormLabel>Stock of the item in the store</FormLabel>
                <Input type='number' value={stock} variant='filled' placeholder='e.g 10 items' required onChange={((e)=>{setstock(e.target.value)})}/>
                <FormLabel>Category</FormLabel>
                <Select variant='filled' value={category} placeholder='Category' required onChange={((e)=>{setcategory(e.target.value)})}>
                  <option value='ladies'>ladies</option>
                  <option value='men'>men</option>
                </Select>
                <FormLabel>Sub-Category</FormLabel>
                <Select variant='filled' value={subcategory} placeholder='Sub-Category' required onChange={((e)=>{setsubcategory(e.target.value)})}>
                  <option value='pants'>Pants</option>
                  <option value='t-shirts'>T-shirts</option>
                  <option value='accessories'>Accessories</option>
                  <option value='shoes'>Shoes</option>
                  <option value='tops'>Tops</option>
                  <option value='dresses'>Dresses</option>
                </Select>
                <FormLabel>Sizes</FormLabel>
                <Input type='text' value={sizes} variant='filled' placeholder='use commas after each size e.g sm,m ' required onChange={((e)=>{setsizes(e.target.value)})}/>
                <FormLabel>Colors</FormLabel>
                <Input type='text' value={colors} variant='filled' placeholder='use commas after each color e.g blue,red' required onChange={((e)=>{setcolors(e.target.value)})}/>
                <FormLabel>Description</FormLabel>
                <Textarea value={description} placeholder='Describe the product' required  onChange={((e)=>{setdescription(e.target.value)})}/>
                 <Flex gap='2' mt='2' direction={'column'}>
                      <Button bg='#000' color='#fff'  borderRadius='0' onClick={HandleSubmit}>Update Item</Button>
                      <Button bg='#eee' color='red' borderRadius='0' border='1px solid red ' onClick={(()=>{onClose(); router.reload()})}>Cancel</Button>
                  </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
      )
}
