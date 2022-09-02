import React,{useState,useEffect} from 'react'
import {Flex,Text,Button,Image,Divider} from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import Header from '../components/Header.js'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import {AddItemModal} from "../components/AddItemModal.js";
import {AddCategoryModal} from "../components/AddCategoryModal.js";
import axios from 'axios'
export default function Dashboard(){
	const [isAddNewItemModalvisible,setIsAddNewItemModalModalVisible]=useState(false);
	const [isAddNewCategoryModalvisible,setIsAddNewCategoryModalModalVisible]=useState(false);

	const cookies = new Cookies();
	let token = cookies.get('admintoken');
	const [user,setuser]=useState('')
	 useEffect(()=>{
	    if(token){
	      let decoded = jwt_decode(token);
	      //console.log(decoded.aemail);
	      setuser(decoded?.aemail)
	      getOrders()
	      getProducts()
	      getSales()
	    }
	  },[token])

	const [orderdata,setorderdata]=useState([])
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
				setorderdata(res.data)
			})
		}catch(err){
			console.log(err)
		}
	}
	const [productdata,setproductdata]=useState([]);
	const getProducts=async()=>{
		try{
			await axios.post('https://try-fashion-admin-server.herokuapp.com/api/getproducts',{
				query
			}).then((res)=>{
				console.log(res.data)
				setproductdata(res.data)
			})
		}catch(err){
			setisFetching(false)
			console.log(err)
		}
	}
	const [totalsales,setTotalsales]=useState('')
	const getSales=async()=>{
		try{
			await axios.get('https://try-fashion-admin-server.herokuapp.com/api/getsales').then((res)=>{
				console.log(res.data)
				const sales = res.data.map((item)=>{
					return (item.sale)
				})
				setTotalsales(sales.reduce((a,b)=> a+b, 0))
			})
		}catch(err){
			console.log(err)
		}
	}
	
	return(
			<Flex direction='column' p=''>
			<AddItemModal isAddNewItemModalvisible={isAddNewItemModalvisible} setIsAddNewItemModalModalVisible={setIsAddNewItemModalModalVisible}/>
			<AddCategoryModal isAddNewCategoryModalvisible={isAddNewCategoryModalvisible} setIsAddNewCategoryModalModalVisible={setIsAddNewCategoryModalModalVisible}/>
			<Header />
				<Flex direction='column' p='1'>
					<Text fontSize='28px' textDecoration='1px solid underline #000'>D A S H B O A R D</Text>
					<Text fontSize='20px'>Welcome,</Text>
					<Text fontSize='20px'>{user}</Text>
				</Flex>
				<Divider />
				<Flex justify='space-between' className={styles.dashboardbody}>
					<Flex className={styles.dashboardinfo} direction='column' p='2' gap='2'>
						<Text fontSize='18px' fontFamily='Vilane Bold'>Overview</Text>
						<Flex bg='#eee' p='1' borderRadius='5' direction='column'>
							<Text >Total Sales</Text>
							<Text fontFamily='Vilane Bold'>KES {totalsales}</Text>
						</Flex>
						<Flex bg='#eee' p='1' borderRadius='5' direction='column'>
							<Text fontFamily='Vilane Bold'>Recently Added Products</Text>
							{productdata?.slice(productdata?.length-3,productdata?.length).reverse().map((product)=>{
								return(
									<Flex key={product.id} align='center' justify='space-between' p='1' mb='1'>
										<Image w='100px' h='100px' objectFit='cover' src={product?.images[0]} alt='photo'/>
										<Text >{product.name}</Text>
										<Text >{product.stock}</Text>
										<Text >KES {product.price}</Text>
									</Flex>
								)
							})}
						</Flex>
						<Flex bg='#eee' p='1' borderRadius='5' direction='column'>
							<Text fontFamily='Vilane Bold'>Orders</Text>
							{orderdata?.slice(0,3).map((order)=>{
								return(
									<Flex key={order.id} align='center' justify='space-between' p='1' mb='1'>
										<Text >{order._id}</Text>
										{order.status === 'cancelled' ? 
											<Text color={'red'}>{order.status}</Text>
												:
												<Text color={order.status === 'pending' ? '#F29339' : 'green'}>{order.status}</Text>
											}
										<Text >KES {order.total}</Text>
									</Flex>
								)
							})}
						</Flex>
					</Flex>
					<Flex className={styles.dashboardbtns} p='2' direction='column' gap='2'>
						<Button bg='#000' borderRadius='0' color='#fff' w='100%' onClick={(()=>{setIsAddNewItemModalModalVisible(true)})}>Add Item</Button>
						<Button bg='#000' borderRadius='0' color='#fff' w='100%' onClick={(()=>{setIsAddNewCategoryModalModalVisible(true)})}>Add Sub-Category</Button>
						<Button bg='#000' borderRadius='0' color='#fff' w='100%' onClick={(()=>{window.open(`https://tryfashionshop.com/`, '_blank');})}>View Site</Button>
					</Flex>
				</Flex>
			</Flex>
		)
}