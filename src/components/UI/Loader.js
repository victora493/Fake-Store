import React from 'react'
import classes from './Loader.module.css'
import {loader} from '../../Icons/Icons'

export default function Loader() {
    return (
        <div className={classes.container}>
            {loader}
        </div>
    )
}
