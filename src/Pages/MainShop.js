import React, {useEffect, useMemo, useState} from 'react'
import { Heading } from '@chakra-ui/layout'
import { useLocation } from 'react-router';

import AllItems from '../components/StoreItems/AllItems'
import Loader from '../components/UI/Loader'
import Sorting from '../components/Filters/Sorting'
import Pagination from '../components/Pagination/Pagination'
import Categories from '../components/Categories/Categories'

import classes from './MainShop.module.css'
import useHttp from '../hooks/use-http'
import usePagination from '../hooks/use-pagination'
import useSorting from '../hooks/use-sorting'
import { getAllProducts } from  '../lib/api'
import { perPageOptions, sortOptions } from '../util/sorting-options'

export default function MainShop() {
    const [categoriesArr, setCategoriesArr] = useState([])
    const { sendRequest, status, data: productsFetched, error } = useHttp(getAllProducts, true)
    const { paginatedData, setData: setDataToPaginate, nextPage, prevPage, curPage, totalPages, setItemsPerPage, resetPagination, handlePageChange } = usePagination()
    const { sortData, sortedData } = useSorting()

    const { search } = useLocation()

    const queryParams = useMemo(() => new URLSearchParams(search), [search]);
    
    // listen to page size change from url and set it
    useEffect(() => {
        const queryPerPage = queryParams.get('pageSize')
        queryPerPage && setItemsPerPage(+queryPerPage)
    }, [setItemsPerPage, queryParams])

    // 3.- after data was sorted, paginate it
    useEffect(() => {
        setDataToPaginate(sortedData)
    }, [ setDataToPaginate, sortedData])

    // 2.- after data was fetched, sort it with custom hook and 
    useEffect(() => {
        if(!productsFetched || productsFetched.length === 0) return

        sortData(productsFetched)
        resetPagination()

        if(categoriesArr?.length > 0) return
         
        // creates and array with all categories unrepeated
        const categories = ['all', ...new Set(productsFetched.map(product => product.category))]
        setCategoriesArr(categories)
    }, [productsFetched, sortData, resetPagination])

    // 1.- fetches the initial data and it's returned as 'productsFetched' by useHttp hook
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
                    <Categories categories={categoriesArr || []} />
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
