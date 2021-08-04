import React from 'react'
import classes from './Card.module.css'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box } from '@chakra-ui/layout'

export default function Card({children, className, ...props}) {
    const cardBackground = useColorModeValue("gray.100", "gray.700")

    return (
        <Box background={cardBackground} {...props} light="true" className={`${classes.cardContainer} light ${className}`}>
            {children}
        </Box>
    )
}
