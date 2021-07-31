import React from 'react'
import classes from './AllItems.module.css'
import SingleItem from './SingleItem'

export default function AllItems({ items }) {

    function renderItem() {
        return items.map(item => {
            return <SingleItem key={item.id} item={item} />
        })
    }

    return (
        <div className={`${classes.itemsContainer} clamped`}>
            {renderItem()}
        </div>
    )
}
