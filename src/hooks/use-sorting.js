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
    const sortQuery = useMemo(() => queryParams.get('orderBy'), [queryParams])

    const sortData = useCallback((data, isNewData = false) => {
        const target = sortQuery?.split('-')[0]
        const isAsc = sortQuery?.split('-')[1] === 'asc'

        setSortedData(prevData => {
            return !isNewData  ? [...sortDataHelper(prevData, isAsc, target)] : [...sortDataHelper(data, isAsc, target)]
        })

    }, [sortDataHelper, setSortedData, sortQuery])



    return { sortData, sortedData }
}
