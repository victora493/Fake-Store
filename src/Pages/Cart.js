import React from 'react'
import Card from '../components/UI/Card'
import AllCartItems from '../components/Cart/AllCartItems'

export default function Cart() {

    return (
        <div className="clamped">
            <Card>
                <AllCartItems />
            </Card>
        </div>
    )
}
