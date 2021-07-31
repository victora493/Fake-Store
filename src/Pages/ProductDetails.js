import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import useHttp from '../hooks/use-http'
import { getSingleProduct } from  '../lib/api'

import Card from '../components/UI/Card'
import Loader from '../components/UI/Loader'
import Product from '../components/ProductDetails/Product'

export default function ProductDetails() {
    const { sendRequest, status, data, error } = useHttp(getSingleProduct, true)
    const { productId } = useParams()

    useEffect(() => {
        sendRequest(productId)
    }, [sendRequest, productId])

    let render

    // later replaced this with a loader fullscreen
    if(status === 'pending') render = (<Loader section={true} />)

    if(error) render = (<p>{error}</p>)

    if(status === 'completed' && !data) render = (<p>Product not found!</p>)

    if(status === 'completed' && data) render = (<Product product={data} />)

    return (
        <div className="clamped">
            <Card>
                {render}
            </Card>
        </div>
    )
}
