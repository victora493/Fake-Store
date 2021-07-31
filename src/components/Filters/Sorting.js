import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'

import classes from './Sorting.module.css'

let hasLoaded = false

export default function Sorting({ perPageOptions = [], sortOptions = [] }) {
    // selected sorting values
    const [perPage, setPerPage] = useState(perPageOptions[1].value)
    const [sortOption, setSortOption] = useState(sortOptions[0].value)

    const history = useHistory()
    const { pathname } = useLocation()

    useEffect(() => {
        if(!hasLoaded) {
            hasLoaded = true
            return
        }

        history.push({
            pathname: pathname,
            search: `pageSize=${perPage}&orderBy=${sortOption}`
        });
    }, [perPage, sortOption, history, pathname])

    return (
        <div className={classes.wrapper}>
            <div className={classes.singleSelector}>
                <label htmlFor="perPageSelector">Display per page</label>
                <select value={perPage} onChange={e => setPerPage(e.target.value)} name="select" id="perPageSelector">
                    {perPageOptions.map(option => {
                        return <option key={option.value} value={option.value}>{option.displayName}</option>
                    })}
                </select>
            </div>

            <div className={classes.singleSelector}>
                <label htmlFor="sortSelector">sort by</label>
                <select value={sortOption} onChange={e => setSortOption(e.target.value)} name="select" id="sortSelector">
                    {sortOptions.map(option => {
                        return <option key={option.value} value={option.value}>{option.displayName}</option>
                    })}
                </select>
            </div>
        </div>
    )
}
