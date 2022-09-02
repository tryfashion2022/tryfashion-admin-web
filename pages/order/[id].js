import React,{useState,useEffect}from 'react'
import {Text,Flex,Button,Select,Input,Image,Divider,HStack} from '@chakra-ui/react'
import styles from '../../styles/Home.module.css'
import Header from '../../components/Header.js'
import axios from 'axios'
import {useRouter} from 'next/router'

export default function Order(){
	const [data,setdata]=useState('')
	const [customerdatainfo,setcustomerdatainfo]=useState('')
	const router = useRouter()
	const queryparam = router.query;
	console.log(queryparam.id)
	const id = queryparam.id
	console.log(id)

	const getOrder=async()=>{
		try{
			await axios.post('https://try-fashion-admin-server.herokuapp.com/api/getorder',{
				id
			}).then((res)=>{
				console.log(res.data)
				setdata(res.data)
			})
		}catch(err){
			console.log(err)
		}
	}
	let customerid = data?.customerId
	const getCustomer=async()=>{
		try{
			await axios.post('https://try-fashion-admin-server.herokuapp.com/api/getcustomerinfo',{
				customerid
			}).then((res)=>{
				console.log(res.data)
				setcustomerdatainfo(res.data)
			})
		}catch(err){
			console.log(err)
		}
	}
	const productarr = data?.products?.map(product =>{ return product})
	console.log(productarr)
	const dispatchOrder=async()=>{
		try{
			await axios.post('https://try-fashion-admin-server.herokuapp.com/api/dispatchorder',{
				id
			}).then((res)=>{
				console.log('dispatched')
			})
		}catch(err){
			console.log(err)
		}
	}
	const cancelOrder=async()=>{
		try{
			await axios.post('https://try-fashion-admin-server.herokuapp.com/api/cancelorder',{
				id
			}).then((res)=>{
				console.log('order cancelled')
			})
		}catch(err){
			console.log(err)
		}
	}
	useEffect(()=>{
		if(id !== undefined){
			getOrder()
			getCustomer()	
		}
	},[id])
	return(
			<Flex direction='column' >
			<Header />
				<Flex align='center' gap='1'>
					<Text fontSize='28px'>Order </Text>
					{data.status === 'cancelled' ? 
						<Text color={'red'}>{data.status}</Text>
							:
							<Text color={data.status === 'pending' ? '#F29339' : 'green'}>{data.status}</Text>
						}
				</Flex>
				{data?.products?.map(product =>{ return (
						<Flex direction='column' bg='#eee' key={product.id} p='2' flex='1' m='1' borderRadius='3'>
							<Text color='blue' cursor='pointer' bg='#fff' p='1' onClick={(()=>{window.open(`/product/${product.prodctId}`, '_blank');})}>productID: {product.prodctId}</Text>
							<Text>KES{product.price * product.qty}</Text>
							<Text>Quantity: {product.qty}</Text>
							<Text>Size: {product.sizes}</Text>
							<Text>Color: {product.color}</Text>
						</Flex>
					)
				})}
				<Divider />
				<Flex className={styles.orderitembody}>
					<Flex gap='2' mt='2'  p='2' direction='column' className={styles.orderiteminfo}>
						<Divider />
						<Flex direction='column' w='100%' p='1'>
							<Text fontSize='24px'>Payment Summary</Text>
							<HStack justify='space-between'>
								<Text>Method</Text>
								<Text>Mpesa</Text>
							</HStack>
							<HStack justify='space-between'>
								<Text>Total</Text>
								<Text>KES {data?.total}</Text>
							</HStack>
						</Flex>
					</Flex>
					<Divider />
					<Flex p='3' direction='column'  className={styles.orderiteminfo}>
						<Text fontSize='24px'>Customer Details</Text>
						<Text >Name : {customerdatainfo?.name}</Text>
						<Text >Phone: {customerdatainfo?.mobile}</Text>
						<Text >Email: {customerdatainfo?.email}</Text>
						<Text >Address: {customerdatainfo?.adress}</Text>
						{data.status === 'cancelled' ? 
							<Text color='red' mt='20px'>This Order was cancelled</Text>
						 : 
						 	<Flex direction='column'>
								<Button bg='#000' borderRadius='0' color='#fff' w='100%' onClick={dispatchOrder} >Dispatch Order</Button>

								<Button mt='4' bg='red' borderRadius='0' color='#fff' w='100%' onClick={cancelOrder}>Cancel Order</Button>
						 	</Flex>
						}
					</Flex>
				</Flex>
			</Flex>
		) 
}

const OrderItem=async({item})=>{
	console.log(item)
	return(
		<Flex gap='2' >
			<Image w='100px' h='100%' objectFit='cover' src='./b1.jpeg'/>
			<Flex direction='column' bg='#eee' p='1' flex='1'>
				<Text></Text>
				<Text>item.price</Text>
				<Text>item.qty</Text>
				<Text>item.sizes</Text>
				<Text>item.color</Text>
			</Flex>
		</Flex>
	)
}