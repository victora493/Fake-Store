import React from 'react'
import classes from './Card.module.css'

export default function Card({children, className}) {
    return (
        <div light="true" className={classes.cardContainer + ' ' + 'light' + ' ' + className}>
            {children}
        </div>
    )
}
