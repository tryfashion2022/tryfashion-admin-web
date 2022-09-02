import React,{useEffect,useState} from 'react'
import {Image,Text,Flex,Button} from '@chakra-ui/react'
import styles from '../../styles/Home.module.css'
import styled from 'styled-components'
import axios from 'axios';
import {useRouter} from 'next/router'
import Header from '../../components/Header.js'
import {EditItemModal} from "../../components/EditItemModal.js";

export default function Product(){
	const [isEditItemModalvisible,setIsEditItemModalVisible]=useState(false);
	const router = useRouter()
	const param = router.query;
	console.log(param.id)
	const id = param.id
	console.log(id)
	const [data,setdata]=useState('')

	const getProduct=async()=>{
		try{
			await axios.post("https://try-fashion-admin-server.herokuapp.com/api/getproduct",
				{id}
			).then((res)=>{
				console.log(res.data)
				setdata(res.data)
			}).catch((err)=>{
				console.log(err)
			})
		}catch(err){
			console.log(err)
		}
	}
	const images= data?.images
	useEffect(()=>{
		if(id !== undefined && data !== undefined){
			getProduct()
		}
	},[id])
	const deleteProduct=async()=>{
		console.log(id)
		try{
			await axios.post('https://try-fashion-admin-server.herokuapp.com/api/deleteproduct',{
				id
			}).then((res)=>{
				console.log(res.data)
				router.push('/inventory')
			})
		}catch(err){
			console.log(err)
		}
	}
	return(
		<Flex direction='column'>
			<Header />
			<EditItemModal isEditItemModalvisible={isEditItemModalvisible} setIsEditItemModalVisible={setIsEditItemModalVisible} data={data} id={id}/>
			<Flex direction='column'p='1'>
			<Flex align='center'>
				<Text fontSize='28px' textDecoration='1px solid underline'>Product</Text>
				<Text color='grey' ml='2'>{id}</Text>
			</Flex>
				<StyledSlider className={styles.scrollbar}>
					<Flex gap='2'>
						{images?.map((image)=>{
							return(
								<Image key={image.id} w='400px' objectFit='cover' h='400px' src={image} alt='photo' mr='1'/>		
							)
						})}
		        	</Flex>
		        </StyledSlider>
				
				<Flex mt='2' direction='column'>
					<Text fontSize='28px'>{data.name}</Text>
					<Text fontSize='16px'>Price: {data.price}</Text>
					<Text fontSize='16px' textDecoration='line-through' color='grey'>{data.discount}</Text>
					<Text fontSize='16px'>Category: {data.category}</Text>
					<Text fontSize='16px'>Sub-Category: {data.subcategory}</Text>
					<Text fontSize='16px'>Sizes: {data.sizes}</Text>
					<Text fontSize='16px'>Colors: {data.colors}</Text>
					<Text fontSize='16px'>Items in Store: {data.stock}</Text>
					<Text fontSize='16px'>Items Sold: {data.sold}</Text>
					<Text fontSize='16px'>Description: {data.description}</Text>
				</Flex>
				<Flex mt='2' direction='column' gap='2'>
					<Button bg='#000' color='#fff' borderRadius='0' onClick={(()=>{setIsEditItemModalVisible(true)})}>Edit Product</Button>
					<Button border='1px solid red' color='#000' borderRadius='0' onClick={(()=>{deleteProduct()})}>Delete Product</Button>
				</Flex>
			</Flex>
		</Flex>
		)
}

const StyledDiv = styled.div`
    box-shadow:
    2px 10.9px 10px rgba(0, 0, 0, 0.075),
    16px 87px 80px rgba(0, 0, 0, 0.15)
    ;
    border-radius: 10px;
    margin: 10px
`
const StyledSlider = styled.div`
    display: flex;
    overflow: auto;
    flex-direction: row
`      
