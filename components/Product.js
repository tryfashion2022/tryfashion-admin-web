import React from 'react';
import {Flex,Text,Image} from'@chakra-ui/react';

export default function Product({product}){
	//console.log(product?.images[0])
	const handleView=()=>{
		window.open(`/product/${product._id}`, '_blank');
	}
	return(
			<Flex direction='column' cursor='pointer' w='175px'  onClick={handleView}>
				<Image w='100%' h='225px' objectFit='cover'  src={product?.images[0]} alt='photo'/>
				<Text>{product?.name}</Text>
				<Flex justify='space-between' >
				<Text>KES {product?.price}</Text>
				<Text>{product?.sold}/{product?.stock}</Text>
				</Flex>
			</Flex>
		)
}