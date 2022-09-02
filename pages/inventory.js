import React,{useState,useEffect} from 'react'
import {Text,Flex,Button,Divider,Image,Select,Input,Breadcrumb,Center,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,} from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import Product from '../components/Product.js'
import Header from '../components/Header.js'
import axios from 'axios';
import Loading from '../components/loading.js'

export default function Inventory(){
	const [category,setcategory]=useState('');
	const [subcategory,setsubcategory]=useState('');
	const [name,setname]=useState('');
	const [data,setdata]=useState([]);
	const [isfetching,setisFetching]=useState(false)
	const query = {
		category,
		subcategory,
		name
	}

	console.log(query)
	const getProducts=async()=>{
		setisFetching(true)
		try{
			await axios.post('https://try-fashion-admin-server.herokuapp.com/api/getproducts',{
				query
			}).then((res)=>{
				console.log(res.data)
				setTimeout(()=>{
					setisFetching(false)
				},2000)
				setdata(res.data)
			})
		}catch(err){
			setisFetching(false)
			console.log(err)
		}
	}
	useEffect(()=>{
		getProducts()
	},[name,category,subcategory])
	return(
			<Flex direction='column' p=''>
			<Header />
				<Flex direction='column' p='2'>
					<Flex direction='column'>
						<Text fontSize='28px' textDecoration='1px solid underline #000'>Inventory</Text>
					</Flex>
					<Divider />
					<Flex gap='2' mb='2'>
						<Button borderRadius='0' bg='#000' color='#fff' p='2' onClick={(()=>{setcategory('ladies')})}>Ladies</Button>
						<Button borderRadius='0' bg='#000' color='#fff' p='2' onClick={(()=>{setcategory('men')})}>Men</Button>
						<Input placeholder='Search Items by name' flex='1' bg='#e5e5e5' onChange={((e)=>{setname(e.target.value)})}/>
					</Flex>
					<Flex>
					<Select borderRadius='0' bg='' color='#000' placeholder='Category' onChange={((e)=>{setsubcategory(e.target.value)})}>
							  <option value='pants'>Pants</option>
			                  <option value='t-shirts'>T-shirts</option>
			                  <option value='accessories'>Accessories</option>
			                  <option value='shoes'>Shoes</option>
			                  <option value='tops'>Tops</option>
			                  <option value='dresses'>Dresses</option>
						</Select>
						{/*
						<Select borderRadius='0' bg='' color='#000' placeholder='Sort'>
							<option>price low to high</option>
							<option>price high to low</option>
							<option>A to Z</option>
							<option>Z to A</option>
						</Select>
						*/}
					</Flex>
					<Breadcrumb separator='>'>
					  <BreadcrumbItem>
					    <BreadcrumbLink >{category === '' ? "All" : category}</BreadcrumbLink>
					  </BreadcrumbItem>
					  <BreadcrumbItem>
					    <BreadcrumbLink >{subcategory === '' ? "All" : subcategory}</BreadcrumbLink>
					  </BreadcrumbItem>
					</Breadcrumb>
					<Flex flexWrap='wrap' gap='2'>
						{isfetching ? 
							<Center h='50vh' w='100%'>
								<Flex justify='center' align='center'>
									<Loading />
								</Flex>
							</Center>
							:
							<>
								{data?.length === 0 ? 
									<Center h='50vh' w='100%'>
										<Text justify='center' align='center'>
											Oops!! - We have no items that fit your search,try again
										</Text>
									</Center>:
									<>
										{data.map((product)=>{
											return(
												<Product key={product.id} product={product}/>		
											)
										})}
									</>
								}
								
							</>
						}
					</Flex>
				</Flex>
			</Flex>		
		)
}

