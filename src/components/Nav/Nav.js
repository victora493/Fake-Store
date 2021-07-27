import React from 'react'
import classes from './Nav.module.css'
import {IoCartOutline, IoCartSharp} from 'react-icons/io5'
import { NavLink } from 'react-router-dom'

export default function Nav() {
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
                        <IoCartOutline/>
                    </NavLink>

                    {/* <div class={classes.floatingNumber}>
                        2
                    </div> */}
                </li>
            </ul>
        </nav>
    )
}
