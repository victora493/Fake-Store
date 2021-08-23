import React, { useEffect, useState, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router'
import { Select } from "@chakra-ui/react"
import { Text } from '@chakra-ui/layout'

import classes from './Sorting.module.css'

let hasLoaded = false

export default function Sorting({ perPageOptions = [], sortOptions = [], defaultSortProp, defaultPerPageProp}) {
    const defaultSort = defaultSortProp || sortOptions[0].value
    const defaultPerPage = defaultPerPageProp || perPageOptions[1].value
    // selected sorting values
    const [perPage, setPerPage] = useState(defaultPerPage)
    const [sortOption, setSortOption] = useState(defaultSort)

    const history = useHistory()
    const { pathname, search } = useLocation()

    const queryParams = useMemo(() => new URLSearchParams(search), [search]);

    useEffect(() => {
        if(!hasLoaded) {
            hasLoaded = true
            return
        }

        if(!sortOption && !perPage) return

        queryParams.set('pageSize', perPage)
        queryParams.set('orderBy', sortOption)

        history.push({
            pathname: pathname,
            search: queryParams.toString()
        });
    }, [perPage, sortOption, history, pathname])

    return (
        <div className={classes.wrapper}>
            <div className={classes.singleSelector}>
                <label htmlFor="perPageSelector">
                    <Text fontSize='lg'>
                        Display per page
                    </Text> 
                </label>
                <Select value={perPage} onChange={e => setPerPage(e.target.value)} name="select" id="perPageSelector">
                    {perPageOptions.map(option => {
                        return <option key={option.value} value={option.value}>{option.displayName}</option>
                    })}
                </Select>
            </div>

            <div className={classes.singleSelector}>
                <label htmlFor="sortSelector">
                    <Text fontSize='lg'>
                        Sort by
                    </Text> 
                </label>
                <Select value={sortOption} onChange={e => setSortOption(e.target.value)} name="select" id="sortSelector">
                    {sortOptions.map(option => {
                        return <option key={option.value} value={option.value}>{option.displayName}</option>
                    })}
                </Select>
            </div>
        </div>
    )
}
