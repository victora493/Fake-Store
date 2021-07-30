import { classes } from 'istanbul-lib-coverage'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MdAdd, MdRemove } from 'react-icons/md'

import { cartActions, addProduct } from '../../store/cart-slice'
import Classes from './AllCartItems.module.css'

export default function AllCartItems() {
    const dispatch = useDispatch()
    const allProducts = useSelector(state => state.cart.products)

    console.log(allProducts)

    function handleDecreaseQty({ id, quantity }) {
        
        dispatch(cartActions.decreaseProduct(id))
    }
    function handleIncreaseQty({ id }) {
        
        dispatch(addProduct({
            product: {id}
        }))
    }

    function renderProducts() {
        if(allProducts.length === 0) {
            return (
                <p className={Classes.emptyState}>
                    Sorry! you don't have any products in your cart but, you can go to <Link to="/" className="link">shop</Link> if you want to add some.
                </p>
            )
        }

        return allProducts.map(product => {
            return (
                <div key={product.id} className={Classes.singleItem}>
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
                            <button type="button" onClick={() => handleDecreaseQty(product)}><MdRemove/></button>
                            <p>{product.quantity}</p>
                            <button type="button" onClick={() => handleIncreaseQty(product)}><MdAdd/></button>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className={Classes.itemsWrapper}>

            {renderProducts()}

        </div>
    )
}
