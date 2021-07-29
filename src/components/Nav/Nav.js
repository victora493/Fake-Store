import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import classes from './Nav.module.css'
import {IoCartOutline, IoCartSharp} from 'react-icons/io5'
import { NavLink } from 'react-router-dom'

let isFirstLoad = true

export default function Nav() {
    const [animate, setAnimate] = useState(false)
    const cartQty = useSelector(state => state.cart.totalProducts)

    useEffect(() => {
        if(isFirstLoad) {
            isFirstLoad = false
            return
        }

        setAnimate(true)
        setTimeout(() => setAnimate(false), 200)
    }, [cartQty])

    return (
        <nav className={classes.nav}>
            <div className={classes.logo}>
                <h2>Logo</h2>
            </div>
            <ul className={classes.navLinks}>
                <li>
                    <NavLink to="/" exact activeClassName={classes.active}>
                        Shop
                    </NavLink>
                </li>
                <li className={classes.iconContainer}>
                    <NavLink to="/cart" activeClassName={classes.active}>
                        <IoCartOutline className={animate ? classes.animate : ''}/>
                    </NavLink>

                    {cartQty > 0 && <div className={classes.floatingNumber}>
                        {cartQty}
                    </div>}
                </li>
            </ul>
        </nav>
    )
}
