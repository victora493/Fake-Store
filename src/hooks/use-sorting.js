import { useMemo, useState, useCallback } from 'react'
import { useLocation } from 'react-router';

const sortDataHelper = (data, ascending = true, target = 'title') => {
    if(!data || data.length === 0) return []
    
    return data.sort((dataA, dataB) => {
      if (ascending) {
        return dataA[target] > dataB[target] ? 1 : -1;
      } else {
        return dataA[target] < dataB[target] ? 1 : -1;
      }
    });
};

export default function useSorting() {
    const [sortedData, setSortedData] = useState([])
    const { search } = useLocation()

    const queryParams = useMemo(() => new URLSearchParams(search), [search]);

    const sortData = useCallback((data) => {
        const queryOrderBy = queryParams.get('orderBy')
        const target = queryOrderBy?.split('-')[0]
        const isAsc = queryOrderBy?.split('-')[1] === 'asc'

        setSortedData(prevData => {
            const isPrevData = prevData && prevData.length > 1
            return isPrevData  ? [...sortDataHelper(prevData, isAsc, target)] : [...sortDataHelper(data, isAsc, target)]
        })

        // console.log(sortedData, target, isAsc)
    }, [sortDataHelper, setSortedData, queryParams])

    return { sortData, sortedData }
}
