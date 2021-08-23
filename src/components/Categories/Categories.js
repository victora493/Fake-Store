import React, { useMemo } from 'react'
import { Text, Link } from '@chakra-ui/layout'
import { VStack, StackDivider } from '@chakra-ui/layout'
import { useLocation, useHistory } from 'react-router-dom'
import classes from './Categories.module.css'

export default function Categories({ categories = [] }) {
    const { pathname, search } = useLocation()
    const history = useHistory()

    const queryParams = useMemo(() => new URLSearchParams(search), [search]);

    const addCategory = (category = 'all') => {
        queryParams.set('category', category)

        history.push({
            pathname: pathname,
            search: queryParams.toString()
        });
    }

    return (
        <div className={classes.wrapper}>
            <VStack 
                as="ul" 
                divider={<StackDivider borderColor="gray.200" />}
                spacing={2}
                align="stretch"
            >
                
            {categories.map((category, i) => {
                const isSelected = search.includes(category) || (search.length === 0 && i === 0)

                return (
                    <Link
                        key={category}
                        className={`link ${isSelected ? 'selected' : ''}`}
                        textTransform="capitalize" 
                        as="a" 
                        onClick={() => addCategory(category)}
                    >
                        <Text fontSize="md">{category}</Text>
                    </Link>
                )
            })}

            </VStack>
        </div>
    )
}
