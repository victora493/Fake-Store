import React, {useEffect} from 'react'

import AllItems from '../components/StoreItems/AllItems'
import Loader from '../components/UI/Loader'
import Sorting from '../components/Filters/Sorting'

import classes from './MainShop.module.css'
import useHttp from '../hooks/use-http'
import usePagination from '../hooks/use-pagination'
import { getAllProducts } from  '../lib/api'
import { perPageOptions, sortOptions } from '../util/sorting-options'

export default function MainShop() {
    const { sendRequest, status, data, error } = useHttp(getAllProducts, true)
    const { paginatedData, setData, nextPage, prevPage, curPage, totalPages, setItemsPerPage } = usePagination()

    useEffect(() => {
        sendRequest()
    }, [sendRequest])

    useEffect(() => {
        if(!data) return

        setData(data)
    }, [data, setData])

    const renderActions = () => {
        if(totalPages === 0) return ''

        return (
            <div className={classes.actions}>
                <button onClick={prevPage}>prev page</button>
                    {curPage} / {totalPages}
                <button onClick={nextPage}>next page</button>
            </div>
        )
    }

    let render

    if(status === 'pending') render = (<Loader />)

    if(error) render = (<h1>{error}</h1>)

    if(status === 'completed' && totalPages === 0) render = (<h1>Sorry, there are no products</h1>)

    if(status === 'completed' && totalPages > 0) render = (
        <>
            <div className={classes.wrapper}>
                <div className={classes.categoryColumn}>
                    categories
                </div>
                <div className={classes.right}>
                    <Sorting perPageOptions={perPageOptions} sortOptions={sortOptions} />
                    <AllItems items={paginatedData} />
                </div>
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
