import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../store/cart-slice'
import { Heading, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'

import Card from '../UI/Card'
import classes from './SingleItem.module.css'

export default function SingleItem({ item }) {
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()

    const onAddToCartClick = async (e) => {
        e.stopPropagation()
        setIsLoading(true)

        await new Promise(r => setTimeout(r, 800));

        setIsLoading(false)

        dispatch(addProduct({
            product: item,
            qty: null,
        }))
    }

    const handleCardClick = () => {
        history.push(`/product/${item.id}`)
    }

    return (
        <Card onClick={handleCardClick} className={classes.card}>
            <div className={classes.imgContainer}>
                <img src={item.image} alt="item-img" />
            </div>
            <div className={classes.text}>
                <Heading as="h2" fontSize="xl" noOfLines={[1, 2]}>
                    {item.title}
                </Heading>
                <Text fontSize='lg' noOfLines={[1, 2]}>
                    {item.description}
                </Text>
                <Text fontSize='lg'>
                    ${item.price}
                </Text>
            </div>
            <div className={classes.actions}>
                <Button isLoading={isLoading} loadingText="adding to cart..." colorScheme="blue" onClick={onAddToCartClick}>add item to cart</Button>
            </div>
        </Card>
    )
}
