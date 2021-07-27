import React, {useEffect} from 'react'
import AllItems from '../components/StoreItems/AllItems'
import Loader from '../components/UI/Loader'

import useHttp from '../hooks/use-http'
import { getAllProducts } from  '../lib/api'

export default function MainShop() {
    const { sendRequest, status, data, error } = useHttp(getAllProducts, true)

    useEffect(() => {
        sendRequest()
    }, [])

    let render

    // later replaced this with a loader fullscreen
    if(status === 'pending') return render = (<Loader />)

    if(error) return render = (<h1>{error}</h1>)

    if(status === 'completed' && data.length === 0) return render = (<h1>Sorry, there are no products</h1>)

    if(status === 'completed' && data.length > 0) return render = (<AllItems items={data} />)

    return (
        <section>
            {render}
        </section>
    )
}
