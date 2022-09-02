import React,{useState,useEffect} from 'react'
import { Flex,Text,Heading,Divider,Stack,Input,HStack,VStack } from '@chakra-ui/react'
import {Menu,ShoppingBagOutlined,Logout,AccountCircle,Close} from '@mui/icons-material';
import {useRouter} from 'next/router'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

export default function Header (){
	//handle side menu bar
	const [showmenubar,setshowmenubar]=useState(false);
	//handle signin state
	const [issignedin,setissignedin]=useState(false);
	//handle router
	const router = useRouter();
	const cookies = new Cookies();
	let token = cookies.get('admintoken');

	 useEffect(()=>{
	    if(token){
	      let decoded = jwt_decode(token);
	      console.log(decoded.aemail);
	    }
	    if(!token){
	    	//router.push('/')
		}
	    //console.log('signedin')
	  },[token])
	const [isloggedin,setisLoggedin]=useState(token ? true : false);
	return(
		<Flex p='1' justify='space-between' align='center' bg='#eee' cursor='pointer' >
					<Text fontSize='26px' fontFamily='Vilane Light' mb='0' onClick={(()=>{router.push('/dashboard')})}>  T R Y F A S H I O N </Text >
					<Flex gap='2' alignItems='center'>					
						{showmenubar ? 
							<Close onClick={(()=>{setshowmenubar(!showmenubar)})}/>
								:
							<Menu onClick={(()=>{setshowmenubar(!showmenubar)})}/> 
						}
						{showmenubar ? 
							<MenuSideBar setshowmenubar={setshowmenubar}/>
								:
							null 
						}
					</Flex>
				</Flex>
		)
}


const MenuSideBar=()=>{
	 const cookies = new Cookies();

	const [content,setContent]=useState("ladies")
	const router = useRouter()
	const ladies=[
		{name:"D A S H B O A R D",link:'dashboard'},
		{name:"I N V E N T O R Y",link:'inventory'},
		{name:"O R D E R S",link:'orders'},
		{name:"C U S T O M E R S",link:'customer'},
	]
	return(
			<Stack justify='space-between' p='2' w='60vw' h='90vh' bg='rgb(255,255,255)' position='absolute' top='50px' right='0px' zIndex='2' >
				<Flex direction='column' gap='2'>
								{ladies.map((category)=>{
									return(
										<>
											<Text key={category.id} fontSize='20px' borderBottom='1px solid #000' onClick={(()=>{router.push(`${category.link}`)})}>{category.name}</Text>
											
										</>
									)
								})}
							</Flex>
				<Flex direction='column'>
					<HStack onClick={(()=>{cookies.remove('admintoken'); router.replace('/'); })}>
						<Logout />
						<Text >logout</Text>
					</HStack>
				</Flex>
			</Stack>
		)
}