import React, {useEffect} from 'react'
import AllItems from '../components/StoreItems/AllItems'
import Loader from '../components/UI/Loader'

import classes from './MainShop.module.css'
import useHttp from '../hooks/use-http'
import usePagination from '../hooks/use-pagination'
import { getAllProducts } from  '../lib/api'

export default function MainShop() {
    const { sendRequest, status, data, error } = useHttp(getAllProducts, true)
    const { paginatedData, setData, nextPage, prevPage, curPage, totalPages } = usePagination()

    useEffect(() => {
        sendRequest()
    }, [])

    useEffect(() => {
        if(!data) return

        setData(data)
    }, [data])

    const renderActions = () => {
        return (
            <div className={classes.actions}>
                <button onClick={prevPage}>prev page</button>
                    {curPage} / {totalPages}
                <button onClick={nextPage}>next page</button>
            </div>
        )
    }

    let render

    // later replaced this with a loader fullscreen
    if(status === 'pending') render = (<Loader />)

    if(error) render = (<h1>{error}</h1>)

    if(status === 'completed' && data.length === 0) render = (<h1>Sorry, there are no products</h1>)

    if(status === 'completed' && data.length > 0) render = (
        <>
            <div className={classes.wrapper}>
                <div className={classes.categoryColumn}>
                    categories
                </div>
                <AllItems items={paginatedData} />
            </div>
            {renderActions()}
        </>
    )

    return (
        <section className='clamped'>
            {render}
        </section>
    )
}
