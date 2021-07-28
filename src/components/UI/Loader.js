import React from 'react'
import classes from './Loader.module.css'
import {loader} from '../../Icons/Icons'

export default function Loader({ section }) {
    return (
        <div data-section={section} className={classes.container}>
            {loader}
        </div>
    )
}
