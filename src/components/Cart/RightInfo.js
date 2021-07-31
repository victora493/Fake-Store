import React from 'react'
import classes from './RightInfo.module.css'
import { useSelector } from 'react-redux'

export default function RightInfo({formatNumber}) {
    const cart = useSelector(state => state.cart)

    console.log(cart)

    const taxesPrice = cart.totalPrice * .05

    return (
        <div className={classes.wrapper}>
            <div className={classes.row}>
                <p>Items({cart.totalProducts}):</p>
                <p>${formatNumber(cart.totalPrice)}</p>
            </div>
            <div className={classes.row}>
                <p>Shipping:</p>
                <p>Free</p>
            </div>
            <div className={classes.row}>
                <p>Tax(5%):</p>
                <p>${formatNumber(taxesPrice)}</p>
            </div>
            <div className={classes.row}>
                <span className={classes.topLine}></span>
                <p className='bold'>Subtotal:</p>
                <p>${formatNumber(taxesPrice + cart.totalPrice)}</p>
            </div>

            <div className={classes.actions}>
                <button>CheckOut</button>
            </div>
        </div>
    )
}
