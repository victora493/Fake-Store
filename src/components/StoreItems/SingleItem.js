import React from 'react'
import Card from '../UI/Card'
import classes from './SingleItem.module.css'

export default function SingleItem({ item }) {
    return (
        <Card className={classes.card}>
            <div className={classes.imgContainer}>
                <img src={item.image} alt="item-img" />
            </div>
            <div className={classes.text}>
                <p className={'small' + ' ' + classes.title}>{item.title}</p>
                <p className={'small' + ' ' + classes.description}>{item.description}</p>
                <p className={'small'}>${item.price}</p>
            </div>
        </Card>
    )
}
