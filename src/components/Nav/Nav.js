import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IconButton, Text, Heading } from "@chakra-ui/react"
import { useColorMode } from '@chakra-ui/color-mode'

import classes from './Nav.module.css'
import {IoCartOutline} from 'react-icons/io5'
import {IoMdSunny, IoMdMoon} from 'react-icons/io'
import { NavLink } from 'react-router-dom'

let isFirstLoad = true

export default function Nav() {
    const { toggleColorMode, colorMode } = useColorMode()
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
                <NavLink to="/" exact activeClassName={classes.active}>
                    <Heading as="h2" size="xl">Fake Store</Heading>
                </NavLink>
            </div>
            <ul className={classes.navLinks}>
                <li>
                    <IconButton onClick={toggleColorMode} icon={colorMode === 'light' ? <IoMdMoon/> : <IoMdSunny/>} />
                </li>
                <li>
                    <NavLink to="/" exact activeClassName={classes.active}>
                        <Text fontSize="3xl">Shop</Text>
                    </NavLink>
                </li>
                <li className={classes.iconContainer}>
                    <NavLink to="/cart" activeClassName={classes.active}>
                        <IoCartOutline variant="link" className={animate ? classes.animate : ''}/>
                    </NavLink>

                    {cartQty > 0 && <div className={classes.floatingNumber}>
                        {cartQty}
                    </div>}
                </li>
            </ul>
        </nav>
    )
}
