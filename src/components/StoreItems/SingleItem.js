import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../store/cart-slice'
import { Heading, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'

import Card from '../UI/Card'
import classes from './SingleItem.module.css'

export default function SingleItem({ item }) {
    const history = useHistory()
    const dispatch = useDispatch()

    const onAddToCartClick = (e) => {
        e.stopPropagation()

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
                <Button colorScheme="blue" onClick={onAddToCartClick}>add item to cart</Button>
            </div>
        </Card>
    )
}
