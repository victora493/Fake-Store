import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { addProduct } from '../../store/cart-slice'
import classes from './Product.module.css'

export default function Product({product}) {
    const inputRef = useRef()
    const dispatch = useDispatch()

    const addProductToCart = () => {
        dispatch(addProduct({
            product: product,
            qty: inputRef.current.value,
        }))
    }

    function onSubmit(e) {
        e.preventDefault()

        if(!inputRef.current.value) {
            return
        }
        if(inputRef.current.value > 10) {
            return
        }
        if(inputRef.current.value <= 0) {
            return
        }

        addProductToCart()
    }

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
                    <form onSubmit={onSubmit}>
                        <input
                            ref={inputRef}
                            min="1" 
                            max="10" 
                            step="1" 
                            defaultValue={1} 
                            type="number" 
                        />
                        <button type="submit">add to cart</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
