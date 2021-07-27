import React from 'react'
import { useParams } from 'react-router'

import Card from '../components/UI/Card'

export default function ProductDetails() {
    const { productId } = useParams()

    console.log(productId)

    return (
        <div className="clamped">
            <Card>
            {productId}

            </Card>
        </div>
    )
}
