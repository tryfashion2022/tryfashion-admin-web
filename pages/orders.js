import React,{useState,useEffect} from 'react'
import {Text,Flex,Button,Select,Input} from '@chakra-ui/react'
import axios from 'axios'
import Header from '../components/Header.js'
export default function Order(){
	const [data,setdata]=useState([])
	const [queryvalue,setqueryvalue]=useState('')

	const query ={
		queryvalue
	}
	const getOrders=async()=>{
		console.log(query)
		try{
			await axios.post('https://try-fashion-admin-server.herokuapp.com/api/getorders',{
				query
			}).then((res)=>{
				console.log(res.data)
				setdata(res.data)
			})
		}catch(err){
			console.log(err)
		}
	}
	useEffect(()=>{
		getOrders()
	},[queryvalue])
	return(
			<Flex direction='column' >
				<Header />
				<Text textDecoration='1px solid underline #000' fontSize='28px'>Orders </Text>
				<Flex gap='2'>
					<Select borderRadius='0' w='' bg='' color='#' placeholder='Sort' onChange={((e)=>{setqueryvalue(e.target.value)})}>
							<option value='pending'>pending</option>
							<option value='dispatched'>dispatched</option>
							<option value='cancelled'>cancelled</option>
							<option value=''>All</option>
					</Select>
					<Input w='80%' placeholder='Search Orders by customer id ' flex='1' bg='#e5e5e5' onChange={((e)=>{setqueryvalue(e.target.value)})}/>
					<Button onClick={getOrders}>Search</Button>
				</Flex>
				{data?.map((item)=>{
					return(

						<OrderItem item={item} key={item._id}/>
					)
				})}
			</Flex>
		) 
}

const OrderItem=({item})=>{
	return(
		<Flex direction='column' p='1' bg='#e5e5e5' m='10px 0' borderRadius='5' opacity={item.status === 'cancelled' ? 0.5 : 1}>
			<Text> Order ID: {item._id}</Text>
			<Text color='blue'>customer ID : {item.customerId}</Text>
			<Text>Price: KES {item.total}</Text>
			<Text>Date of Order: {item.createdAt}</Text>
			{item.status === 'cancelled' ? 
			<Text color={'red'}>Status: {item.status}</Text>
				:
				<Text color={item.status === 'pending' ? '#F29339' : 'green'}>Status: {item.status}</Text>
			}
			
			<Button bg='#000' borderRadius='0' color='#fff' mt='1' onClick={(()=>{window.open(`/order/${item._id}`, '_blank');})}>View Order</Button>
		</Flex>
	)
}