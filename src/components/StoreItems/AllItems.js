import React from 'react'
import classes from './AllItems.module.css'
import SingleItem from './SingleItem'

export default function AllItems({ items }) {
    return (
        <div className={classes.itemsContainer}>
            {items.map(item => {
                return <SingleItem item={item} />
            })}
        </div>
    )
}
