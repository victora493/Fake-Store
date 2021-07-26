import React from 'react'
import classes from './Nav.module.css'

export default function Nav() {
    return (
        <nav className={classes.nav}>
            <div className={classes.logo}>
                <h2>Logo</h2>
            </div>
            <ul className={classes.navLinks}>
                <li>Shop</li>
                <li>Cart</li>
            </ul>
        </nav>
    )
}
