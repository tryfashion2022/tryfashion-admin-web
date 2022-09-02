import React,{useState} from 'react'
import {Text,Image,Flex,Stack,Center,Container,Tabs, TabList, TabPanels, Tab, TabPanel,useToast,InputGroup,Input,InputRightElement,Button} from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import {Visibility,VisibilityOff} from '@mui/icons-material'
import axios from 'axios'
import Cookies from 'universal-cookie';
import {useRouter} from 'next/router';

export default function Register(){
	return(
			<Flex>
				<Image src='./b1.jpeg' className={styles.registerimage} objectFit='cover'/>
				<Center className={styles.registerbody}>
					<Container className={styles.registerbodyimg}/>
					<Flex bg='rgb(255,255,255,0.6)' gap='4' p='2' borderRadius='5' zIndex='1' direction='column'>
            <Text align='center'>T R Y F A S H I O N.A D M I N</Text>
						<SignIn />
					</Flex>
				</Center>
			</Flex>
		)
}
const SignIn=()=>{
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast();
  const [email,setemail]=useState('');
  const [mobile,setmobile]=useState('');
  const [password,setpassword]=useState('');

  const auth = {
    email,
    password,
  }
  const cookies = new Cookies();
  const router = useRouter();

  const handleSubmit=async()=>{
    console.log(auth)
    try{
      await axios.post('https://try-fashion-admin-server.herokuapp.com/api/adminsignin',
          {auth}
        ).then((res)=>{
          if(res.status === 200){
            cookies.set('admintoken', res.data, { path: '/' });
            router.push('/dashboard')
            return toast({
              title: '',
              description: 'Successfully Signed in',
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
          }
          return toast({
              title: '',
              description: res.data,
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
        })
        .catch((err)=>{
          console.log(err)
        })
      }catch(err){
          console.log(err)
      }
  }

  return(
    <Flex justify='space-between' direction='column' gap='4'>
      <InputGroup>
        <Input required type='email' placeholder='Email' variant='flushed' onChange={((e)=>{setemail(e.target.value)})}/>
      </InputGroup>
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Enter password'
          variant='flushed'
          onChange={((e)=>{setpassword(e.target.value)})}
          required
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'>
            {show ? <VisibilityOff/> : <Visibility/>}
          </Button>
        </InputRightElement>
    </InputGroup>
    <Button
            mt={4}
            bg='#000'
            type='submit'
            color='#ffffff'
            borderRadius='0'
            onClick={handleSubmit}
          >
            S i g n I n
          </Button>
    </Flex>
  )
}