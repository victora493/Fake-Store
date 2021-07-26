import React from 'react'
import Nav from '../components/Nav/Nav'

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
