import React from 'react'
import { Link } from 'react-router-dom'

import Card from '../UI/Card'
import classes from './SingleItem.module.css'

export default function SingleItem({ item }) {
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
                <button>add item to cart</button>
            </div>
        </Card>
    )
}
