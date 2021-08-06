import { useState, useEffect, useRef, useCallback } from 'react'

// it works only with data loaded ahead (not optimal for big projects)
const usePagination = (iPerPage = 6 ) => {
    const totalPages = useRef()
    const [itemsPerPage, setItemsPerPage] = useState(1)
    const [curPage, setCurPage] = useState(1)
    const [data, setData] = useState([])
    const [paginatedData, setPaginatedData] = useState([])

    useEffect(() => {
        setItemsPerPage(iPerPage)
    }, [setItemsPerPage, iPerPage])

    useEffect(() => {
        totalPages.current = Math.ceil(data.length / itemsPerPage)

    }, [data, totalPages, itemsPerPage])

    useEffect(() => {
        const dataSlice = data.slice((curPage - 1) * itemsPerPage, itemsPerPage * curPage)
        
        
        setPaginatedData(dataSlice)

        console.log('data has been paginated')
    }, [curPage, data, setPaginatedData, itemsPerPage])

    const nextPage = () => {
        console.log('next page')
        console.log('totalPages', totalPages.current)

        setCurPage(curPage => {
            console.log(curPage)
            if(curPage < totalPages.current) {
                return curPage + 1
            }

            return curPage
        })
    }

    const prevPage = () => {
        console.log('prev page')

        setCurPage(curPage => {
            if(curPage > 1) {
                return curPage - 1
            }

            return curPage
        })
    }

    const setDataToPaginate = useCallback((dataArr) => {
        setData(dataArr)
    }, [setData])

    const resetPagination = useCallback(() => {
        setCurPage(1)
    }, [setCurPage])

    const handlePageChange = (page) => {
        setCurPage(page)
    }

    return { paginatedData,  setDataToPaginate, nextPage, prevPage, totalPages: totalPages.current, curPage, setItemsPerPage, resetPagination, handlePageChange }
}


export default usePagination