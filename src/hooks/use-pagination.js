import React, { useState, useEffect } from 'react'

// it works only with data loaded ahead (not optimal for big projects)
const usePagination = ({ data = [], pages = 1, itemsPerPage = 6 }) => {
    const [curPage, setCurPage] = useState(1)
    const [curPage, setCurPage] = useState(1)
    const [paginatedData, setPaginatedData] = useState([])

    useEffect(() => {

    }, [])

    const nextPage = () => {
        setCurPage(curPage => {
            return curPage++
        })
    }

    return { paginatedData, nextPage }
}


export default usePagination