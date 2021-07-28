import React from 'react'
import classes from './Product.module.css'
import { Link } from 'react-router-dom'
export default function Product({product}) {
    console.log(product)

    return (
        <div className={classes.productWrapper}>
            <div className={classes.productImg}>
                <img src={product.image} alt="" />
            </div>
            <div className={classes.right}>
                <div className={classes.title}>
                    <h3>{product.title}</h3>
                    <p>
                        <Link className='link subtle' to="/">{product.category}</Link>
                    </p>
                </div>
                <div className={classes.body}>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                </div>
                <div className={classes.actions}>
                    <input min="1" max="100" step="1" defaultValue={1} type="number" />
                    <button>add to cart</button>
                </div>
            </div>
        </div>
    )
}
