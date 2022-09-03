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

export function AddItemModal({isAddNewItemModalvisible,setIsAddNewItemModalModalVisible}){
    const [name,setname]=useState('');
    const [price,setprice]=useState('');
    const [discount,setdiscount]=useState('');
    const [stock,setstock]=useState('');
    const [sizes,setsizes]=useState('');
    const [colors,setcolors]=useState('');
    const [description,setdescription]=useState('');
    const [image1,setimage1]=useState('');
    const [category, setcategory] = useState('');
    const [subcategory, setsubcategory] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [active,setActive]=useState(false);
    const [isModalvisible,setIsModalVisible]=useState(false);

    const router = useRouter()
    const toast = useToast();
    const cookies = new Cookies();

    const HandleModalOpen=()=>{

      if(isAddNewItemModalvisible === true){
        onOpen();
        setIsAddNewItemModalModalVisible(false)
        
      }
    }
    const [subcategorydata,setsubcategorydata] = useState([])
    const getSubcategories=async()=>{
      try{
        await axios.get('https://try-fashion-admin-server.herokuapp.com/api/getcategory').then((res)=>{
          setsubcategorydata(res.data)
        })
      }catch(err){
        console.log(err)
      }
    }
    useEffect(()=>{
          HandleModalOpen();
          getSubcategories()
    },[isAddNewItemModalvisible])
    const images = [...image1];
    //console.log(images)
    let newimagearray = []

    const handleImageUpload = async () =>{
      //console.log('start')
        images.forEach(function(image){
          try{
            //console.log(image)
              const data = new FormData()
                data.append("file", image);
                data.append("upload_preset", "tryfashionsshop");
                data.append("cloud_name", "tryfashionshop");
                 axios.post("https://api.cloudinary.com/v1_1/tryfashionshop/image/upload",
                  data).then((res)=>{
                    //console.log(res.data.url)
                    //console.log(res.data)
                    newimagearray.push(res.data.url)
                    //console.log(newimagearray)
                    
                  }).catch((err)=>{
                    console.log(err)
                    return toast({
                      title: 'We could not upload you images, please try again',
                      status: 'error',
                      isClosable: true,
                    })
                  })
                }catch(error){
                  console.error(error)
                }    
              })  
      }
    const product = {
      name,
      price,
      discount,
      description,
      category,
      subcategory,
      stock,
      sizes,
      colors,
      newimagearray,
    }
    //console.log(property.name)



    const [issubmitting,setissubmitting] = useState(false)

    const HandleSubmit=async()=>{
      console.log(product)
      if(images.length === 0 ){
        return toast({
            title: '',
            description: "No image files were found try again",
            status: 'error',
            duration: 2000,
            isClosable: true,
          })
      }
      toast({
            title: '',
            description: "Wait as we verify and upload your item, it could take a 30secs to 1-min",
            status: 'info',
            duration: 1000,
            isClosable: true,
          })
      setissubmitting(true)
      //check if all fields have been filled
      if(name === ''){
        toast({
              title: '',
              description: "Make sure all the fields have been filled",
              status: 'error',
              duration: 2000,
              isClosable: true,
            })
        setTimeout(()=>{
          router.reload()  
        },3000)
        
      }
      //upload images
      
      handleImageUpload()
      onClose()
      //console.log(newimagearray)
      setTimeout(()=>{
        if(product.newimagearray.length !== 0 ){ 
          //initiate listing func.
          
          //make request to server to start listinghttps://keja--app.herokuapp.com
             axios.post("https://try-fashion-admin-server.herokuapp.com/api/addproduct",{
                product
              }).then((res)=>{
                //check if listing req failed
                onClose()
                if(res.status === 201 ){
                  setissubmitting(false)
                  //console.log('233')
                    return toast({
                        title: res.data,
                        status: 'error',
                        isClosable: true,
                      })
                }
                //success listing
                if(res.status === 200){
                  
                  return toast({
                    title: '',
                    description: "Your item has been uploaded successfully",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
              }
          }).catch((err)=>{
            console.log(err)
          })
        }
        setissubmitting(false)
      },10000)
      //exit out of listing
      
    }
 return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
                <Center>
                  <Text>Add new Item</Text>
                </Center>
              </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Name of the Item</FormLabel>
                <Input type='text' variant='filled' placeholder='e.g High neck Sweaters' required onChange={((e)=>{setname(e.target.value)})}/>
                <FormLabel>Price of the item</FormLabel>
                <Input type='number' variant='filled' placeholder='e.g 2000' required onChange={((e)=>{setprice(e.target.value)})}/>
                <FormLabel>Old price of the item</FormLabel>
                <Input type='number' variant='filled' placeholder='e.g 2500' required onChange={((e)=>{setdiscount(e.target.value)})}/>
                <FormLabel>Stock of the item in the store</FormLabel>
                <Input type='number' variant='filled' placeholder='e.g 10 items' required onChange={((e)=>{setstock(e.target.value)})}/>
                <FormLabel>Category</FormLabel>
                <Select variant='filled' placeholder='Category'  required onChange={((e)=>{setcategory(e.target.value)})}>
                  <option value='ladies'>ladies</option>
                  <option value='men'>men</option>
                  <option value='accessories'>accessories</option>
                  
                </Select>
                <FormLabel>Sub-Category</FormLabel>
                <Select variant='filled' placeholder='Sub-Category'  required onChange={((e)=>{setsubcategory(e.target.value)})}>
                  <option value='exclusives'>exclusives</option>
                  <option value='pants'>Pants</option>
                  <option value='t-shirts'>T-shirts</option>
                  <option value='accessories'>Accessories</option>
                  <option value='shoes'>Shoes</option>
                  <option value='tops'>Tops</option>
                  <option value='dresses'>Dresses</option>
                </Select>
                <FormLabel>Sizes</FormLabel>
                <Input type='text' variant='filled' placeholder='use commas after each size e.g sm,m ' required onChange={((e)=>{setsizes(e.target.value)})}/>
                <FormLabel>Colors</FormLabel>
                <Input type='text' variant='filled' placeholder='use commas after each color e.g blue,red' required onChange={((e)=>{setcolors(e.target.value)})}/>
                <FormLabel>Description</FormLabel>
                <Textarea placeholder='Describe the product' required  onChange={((e)=>{setdescription(e.target.value)})}/>
                <FormLabel>Images upload</FormLabel>
                <Text fontSize='14px' m='10px 0'>You can Select Multiple Images for this Item.</Text>
                <Input placeholder="You can Select Multiple Images for this Item" type='file' accept='.jpg,.jpeg,.png' variant='filled' required onChange={((e)=>{setimage1(e.target.files)})} multiple/>
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
