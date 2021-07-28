import React from 'react'
import Classes from './AllCartItems.module.css'

export default function AllCartItems({ product }) {
    return (
        <div className={Classes.itemsWrapper}>

            <div className={Classes.singleItem}>
                <div className={Classes.productImg}>
                    <img src={product.image} alt="product-image" />
                </div>
                <div className={Classes.right}>
                    <div className={Classes.title}>
                        <p className="bold">{product.title}</p>
                    </div>
                    <div className={Classes.body}>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                    </div>
                    <div className={Classes.actions}>
                        <button>-</button>
                        <p>1</p>
                        <button>+</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
