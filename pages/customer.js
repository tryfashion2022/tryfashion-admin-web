import {useEffect,useState} from 'react'
import {Text,Flex,Button,Select,Input,Divider} from '@chakra-ui/react'
import axios from 'axios'
import Header from '../components/Header'
export default function Customers(){
	const [queryvalue,setqueryvalue]=useState('')
	const [data,setdata]=useState([]);

	const query ={
		queryvalue
	}
	const getCustomers=async()=>{
		try{
			await axios.post('https://try-fashion-admin-server.herokuapp.com/api/getcustomers',{
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
		getCustomers()
	},[])
	return(
			<Flex direction='column' p=''>
				<Header />
				<Text textDecoration='1px solid underline #000' fontSize='28px'>Customers </Text>
				<Flex gap='2'>
					<Select borderRadius='0' w=''  placeholder='Sort'>
							<option>A to z </option>
							<option>Z to A</option>
					</Select>
					<Input w='80%' placeholder='Search Customers by email, mobile' flex='1' bg='#e5e5e5' onChange={((e)=>{setqueryvalue(e.target.value);})}/>
					<Button onClick={getCustomers} bg='#000' color='#fff' borderRadius='0'>Search</Button>
				</Flex>
				<Divider />
				<Flex direction='column'>
					{data?.map((customer)=>{
						return (
							<Flex key={customer.id} direction='column' p='1' bg='#e5e5e5' m='5px 0' borderRadius='5'>
								<Text>{customer.name}</Text>
								<Text>{customer.mobile}</Text>
								<Text>{customer.email}</Text>
							</Flex>
						)
					})}
				</Flex>
			</Flex>
		) 
}