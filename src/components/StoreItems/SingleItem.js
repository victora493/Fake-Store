import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../store/cart-slice'

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
                <p className={'small' + ' ' + classes.title}>
                    
                        {item.title}
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
