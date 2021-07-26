import React from 'react'
import Card from '../../UI/Card'
import classes from './SingleItem.module.css'

export default function SingleItem({ item }) {
    return (
        <Card>
            <div className={classes.imgContainer}>
                <img src={item.image} alt="item-img" />
            </div>
            <div className={classes.description}>
                <div class="title">
                    <p className='small'>{item.title}</p>
                </div>
            </div>
        </Card>
    )
}
