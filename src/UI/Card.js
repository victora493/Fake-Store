import React from 'react'
import classes from './Card.module.css'

export default function Card({children}) {
    return (
        <div light className={classes.cardContainer + ' ' + 'light'}>
            {children}
        </div>
    )
}
