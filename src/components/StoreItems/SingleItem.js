import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../store/cart-slice'

import Card from '../UI/Card'
import classes from './SingleItem.module.css'

export default function SingleItem({ item }) {
    const dispatch = useDispatch()

    const onAddToCartClick = ( ) => {
        dispatch(cartActions.addProduct({
            product: item,
            qty: null,
        }))
    } 

    return (
        <Card className={classes.card}>
            <div className={classes.imgContainer}>
                <img src={item.image} alt="item-img" />
            </div>
            <div className={classes.text}>
                <p className={'small' + ' ' + classes.title}>
                    <Link to={`/product/${item.id}`}>
                        {item.title}
                    </Link>
                </p>
                <p className={'small' + ' ' + classes.description}>{item.description}</p>
                <p className={'small'}>${item.price}</p>
            </div>
            <div className={classes.actions}>
                <button onClick={onAddToCartClick}>add item to cart</button>
            </div>
        </Card>
    )
}
