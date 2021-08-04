import React from 'react'
import classes from './RightInfo.module.css'
import { useSelector } from 'react-redux'
import { Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'

export default function RightInfo({formatNumber}) {
    const cart = useSelector(state => state.cart)

    console.log(cart)

    const taxesPrice = cart.totalPrice * .05

    return (
        <div className={classes.wrapper}>
            <div className={classes.row}>
                <Text fontSize="lg">Items({cart.totalProducts}):</Text>
                <Text fontSize="lg">${formatNumber(cart.totalPrice)}</Text>
            </div>
            <div className={classes.row}>
                <Text fontSize="lg">Shipping:</Text>
                <Text fontSize="lg">Free</Text>
            </div>
            <div className={classes.row}>
                <Text fontSize="lg">Tax(5%):</Text>
                <Text fontSize="lg">${formatNumber(taxesPrice)}</Text>
            </div>
            <div className={classes.row}>
                <span className={classes.topLine}></span>
                <Text fontSize="lg" className='bold'>Subtotal:</Text>
                <Text fontSize="lg">${formatNumber(taxesPrice + cart.totalPrice)}</Text>
            </div>

            <div className={classes.actions}>
                <Button colorScheme="blue">CheckOut</Button>
            </div>
        </div>
    )
}
