import React, {useEffect, useState} from 'react'
import AllItems from '../components/StoreItems/AllItems'
import axios from 'axios'

const API_URL = 'https://fakestoreapi.com/products'

export default function MainShop() {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {

        } catch(err) {
            
        }
    }

    return (
        <section>
            <div className="clamped">
                <AllItems items={DUMMY_ITEMS} />
            </div>
        </section>
    )
}
