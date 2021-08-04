import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { Select } from "@chakra-ui/react"
import { Text } from '@chakra-ui/layout'

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
        // todo find a way to sort by initial values even without the url params
        history.push({
            pathname: pathname,
            search: `pageSize=${perPage}&orderBy=${sortOption}`
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
