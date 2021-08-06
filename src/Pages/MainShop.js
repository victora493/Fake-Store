import React, {useEffect, useMemo, useCallback} from 'react'
import { useLocation } from 'react-router'
import { Heading } from '@chakra-ui/layout'

import AllItems from '../components/StoreItems/AllItems'
import Loader from '../components/UI/Loader'
import Sorting from '../components/Filters/Sorting'
import Pagination from '../components/Pagination/Pagination'

import classes from './MainShop.module.css'
import useHttp from '../hooks/use-http'
import usePagination from '../hooks/use-pagination'
import { getAllProducts } from  '../lib/api'
import { perPageOptions, sortOptions, sortProducts } from '../util/sorting-options'

export default function MainShop() {
    const { sendRequest, status, data: productsFetched, error } = useHttp(getAllProducts, true)
    const { paginatedData, setData: setDataToPaginate, nextPage, prevPage, curPage, totalPages, setItemsPerPage, resetPagination, handlePageChange } = usePagination()

    const { search } = useLocation()

    const queryParams = useMemo(() => new URLSearchParams(search), [search]);

    const handleSorting = useCallback((products, isAsc = true, target = 'title') => {
        if(!products && (!paginatedData || paginatedData.length === 0)) return
        
        // setDataToPaginate is linked to paginatedData
        setDataToPaginate(dataStored => {
            const productsToSort = dataStored?.length > 0 ? dataStored : products

            const sortedProducts = [...sortProducts(productsToSort, isAsc, target)]
            console.log(sortedProducts)
            return sortedProducts
        })
    }, [setDataToPaginate])
    
    // initialize the data fetched to be sorted based on the search url or default sorts
    useEffect(() => {
        const queryPerPage = queryParams.get('pageSize')
        queryPerPage && setItemsPerPage(+queryPerPage)

        const queryOrderBy = queryParams.get('orderBy')
        const target = queryOrderBy?.split('-')[0]
        const isAsc = queryOrderBy?.split('-')[1] === 'asc'
        
        handleSorting(productsFetched, isAsc, target)

        resetPagination()
    }, [ setItemsPerPage, queryParams, handleSorting, resetPagination, productsFetched])

    // fetches the initial data and it's returned as 'productsFetched' by useHttp hook
    useEffect(() => {
        sendRequest()
    }, [sendRequest])

    const renderPagination = () => {
        return (
            <div className={classes.paginationContainer}>
                <Pagination 
                    handlePageChange={handlePageChange} 
                    prevPage={prevPage} 
                    nextPage={nextPage} 
                    curPage={curPage} 
                    totalPages={totalPages} 
                />
            </div>
        )
    }

    let render

    if(status === 'pending') return render = (<Loader />)

    if(error) render = (<h1>{error}</h1>)

    if(status === 'completed' && totalPages === 0) render = (<h1>Sorry, there are no products</h1>)

    if(status === 'completed' && totalPages > 0) render = (
        <>
            <div className={classes.wrapper}>
                <div className={classes.categoryColumn}>
                    <Heading as="h3" fontSize="3xl"> categories </Heading>
                </div>
                <div className={classes.right}>
                    <Sorting 
                        perPageOptions={perPageOptions} 
                        sortOptions={sortOptions} 
                        defaultSortProp={queryParams.get('orderBy') } 
                        defaultPerPageProp={queryParams.get('pageSize')} 
                    />
                    {totalPages !== 0 && renderPagination()}
                    <AllItems items={paginatedData} />
                </div>
            </div>
            {totalPages !== 0 && renderPagination()}
        </>
    )

    return (
        <section className='clamped-wider'>
            {render}
        </section>
    )
}
