import React from 'react'
import './Pagination.module.css'
import { Stack } from '@chakra-ui/layout'
import { Button } from "@chakra-ui/react"
import { IconButton } from '@chakra-ui/button'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

export default function Pagination({ prevPage, nextPage, curPage, totalPages, handlePageChange }) {

    console.log('cur page:', curPage)

    const renderPagesBtns = () => {
        const totalPagesArr = Array(totalPages).fill('_')
        const isSelected = (i) => (curPage ===  (i + 1))

        console.log(totalPages)
        console.log(totalPagesArr)

        return (
            totalPagesArr.map((_, i) => {
                return (
                    <Button onClick={() => handlePageChange(i + 1)} key={i} variant={isSelected(i) ? "solid" : "ghost"} colorScheme="blue" size="md">
                        {i + 1}
                    </Button>
                )
            })
        )
    }

    return (
        <Stack spacing={2} direction="row" align="center">
            <IconButton
                variant="ghost"
                colorScheme="blue"
                size="md"
                icon={<IoChevronBack />}
                onClick={prevPage}
                disabled={curPage === 1}
            />
            {renderPagesBtns()}
            <IconButton
                variant="ghost"
                colorScheme="blue"
                size="md"
                icon={<IoChevronForward />}
                onClick={nextPage}
                disabled={curPage === totalPages}
            />
        </Stack>
    )
}