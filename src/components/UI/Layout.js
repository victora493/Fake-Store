import React from 'react'
import Nav from '../Nav/Nav'

export default function Layout({ children }) {
    return (
        <>
        <header>
            <Nav />
        </header>
        <main>{children}</main>
        </>
    )
}
