import React from 'react'
import Card from '../components/UI/Card'
import AllCartItems from '../components/Cart/AllCartItems'

const item = {
    title: 'test',
    category: "electronics",
    description: "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    id: 11,
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    price: 109,
}

export default function Cart() {

    return (
        <div className="clamped">
            <Card>
                <AllCartItems product={item} />
            </Card>
        </div>
    )
}
