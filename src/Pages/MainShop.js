import React, {useEffect, useMemo} from 'react'
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
import { requiredChakraThemeKeys } from '@chakra-ui/react'

export default function MainShop() {
    const { sendRequest, status, data: dataFetched, error } = useHttp(getAllProducts, true)
    const { paginatedData, setData, nextPage, prevPage, curPage, totalPages, setItemsPerPage, resetPagination, handlePageChange } = usePagination()

    const { search } = useLocation()

    const queryParams = useMemo(() => new URLSearchParams(search), [search]);

    const handleSorting = (productsFetched, isAsc = true, target = 'title') => {
        // data is linked to paginatedData
        setData(products => {
            const sortedProducts = [...sortProducts(
                productsFetched?.length > 0 ? productsFetched : products, isAsc, target
            )]
            console.log(sortedProducts)
            return sortedProducts
        })
    }
    
    // sorting and limits per page logic
    useEffect(() => {
        const queryPerPage = queryParams.get('pageSize')
        queryPerPage && setItemsPerPage(+queryPerPage)

        const queryOrderBy = queryParams.get('orderBy')
        const target = queryOrderBy?.split('-')[0]
        const isAsc = queryOrderBy?.split('-')[1] === 'asc'
        
        target && handleSorting(null, isAsc, target)

        resetPagination()
    }, [setData, setItemsPerPage, queryParams])

    // fetches the initial data and it's returned as 'dataFetched' by useHttp hook
    useEffect(() => {
        sendRequest()
    }, [sendRequest])

    // called when data finished fetching, sets the data fetched to another state to manipulate it(sorting, pagination, filtering)
    useEffect(() => {
        if(!dataFetched) return

        handleSorting(dataFetched)
    }, [dataFetched, setData])

    const renderPagination = () => {
        return (
            <Pagination handlePageChange={handlePageChange} prevPage={prevPage} nextPage={nextPage} curPage={curPage} totalPages={totalPages} />
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
                    <Sorting perPageOptions={perPageOptions} sortOptions={sortOptions} />
                    <AllItems items={paginatedData} />
                </div>
            </div>
            {totalPages !== 0 && renderPagination()}
        </>
    )

    return (
        <section className='clamped'>
            {render}
        </section>
    )
}
