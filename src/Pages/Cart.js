import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../components/UI/Card'
import AllCartItems from '../components/Cart/AllCartItems'
import RightInfo from '../components/Cart/RightInfo'

import classes from './Cart.module.css'

const formatNumber = (num) => {
    console.log(num)
    return num.toLocaleString('en-US')
}

export default function Cart() {
    const allProducts = useSelector(state => state.cart.products)

    return (
        <div className="clamped">
            <Card>
                <div className={classes.container}>
                    <AllCartItems formatNumber={formatNumber} />
                    {allProducts.length !== 0 && <RightInfo formatNumber={formatNumber}/>}
                </div>
            </Card>
        </div>
    )
}
