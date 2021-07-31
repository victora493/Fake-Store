import { useState, useEffect, useRef } from 'react'

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
        console.log('curPage:', curPage)
        console.log('itemsPerPage:', itemsPerPage)
        console.log('data:', data)

        const dataSlice = data.slice((curPage - 1) * itemsPerPage, itemsPerPage * curPage)

        console.log('dataSlice:', dataSlice)

        setPaginatedData(dataSlice)
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

    return { paginatedData, setData, nextPage, prevPage, totalPages: totalPages.current, curPage, setItemsPerPage }
}


export default usePagination