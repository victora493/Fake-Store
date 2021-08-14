import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Heading, Text } from '@chakra-ui/layout'
import { Input, Button } from "@chakra-ui/react"

import { addProduct } from '../../store/cart-actions'
import classes from './Product.module.css'

export default function Product({product}) {
    const [isLoading, setIsLoading] = useState(false)
    const [isDescClamped, setIsDescClamped] = useState(true)
    const inputRef = useRef()
    const dispatch = useDispatch()

    const existingItem = useSelector(({ cart }) => cart.products.find(singleProduct => singleProduct.id === product.id))

    const addProductToCart = async () => {
        setIsLoading(true)

        await new Promise(r => setTimeout(r, 800));

        setIsLoading(false)

        dispatch(addProduct({
            product: product,
            qty: inputRef.current.value,
        }))
    }

    function onSubmit(e) {
        e.preventDefault()

        if(!inputRef.current.value) {
            return
        }
        if(inputRef.current.value > 10) {
            return
        }
        if(inputRef.current.value <= 0) {
            return
        }

        addProductToCart()
    }

    return (
        <div className={classes.productWrapper}>
            <div className={classes.productImg}>
                <img src={product.image} alt="" />
            </div>
            <div className={classes.right}>
                <div className={classes.title}>
                    <Heading as="h2" fontSize="2xl">
                        {product.title}
                    </Heading>
                    <Button size='lg' colorScheme="blue" variant="link">
                        <Link  to="/">{product.category}</Link>
                    </Button>
                </div>
                <div className={classes.body}>
                    <span className={classes.description}>
                        <Text noOfLines={isDescClamped ? [5,6] : ''} fontSize='lg'>
                            {product.description}
                        </Text>
                        <Button onClick={() => setIsDescClamped(state => !state)} colorScheme="blue" variant="link">
                            {isDescClamped ? 'see more' : 'see less'}
                        </Button>
                    </span>
                    <Text fontSize='3xl'>
                        ${product.price}
                    </Text>
                </div>
                <div className={classes.actions}>
                    <form onSubmit={onSubmit}>
                        <Input
                            colorScheme="blue"
                            ref={inputRef}
                            min="1" 
                            max="10" 
                            step="1" 
                            defaultValue={existingItem?.quantity || 1} 
                            type="number" 
                        />
                        <Button isLoading={isLoading} loadingText={existingItem ? 'replacing in cart...' : 'adding to cart...'} colorScheme="blue" type="submit">{existingItem ? 'replace in cart' : 'add to cart'}</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
