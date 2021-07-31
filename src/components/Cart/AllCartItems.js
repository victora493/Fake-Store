import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MdAdd, MdRemove } from 'react-icons/md'

import { cartActions, addProduct } from '../../store/cart-slice'
import classes from './AllCartItems.module.css'

const AllCartItems = ({ formatNumber }) => {
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
                <p className={classes.emptyState}>
                    Sorry! you don't have any products in your cart but, you can go to <Link to="/" className="link">shop</Link> if you want to add some.
                </p>
            )
        }

        return allProducts.map(product => {
            return (
                <div key={product.id} className={classes.singleItem}>
                    <div className={classes.productImg}>
                        <img src={product.image} alt="product-image" />
                    </div>
                    <div className={classes.right}>
                        <div className={classes.title}>
                            <p className="bold">{product.title}</p>
                        </div>
                        <div className={classes.body}>
                            <p>${formatNumber(product.price * product.quantity)}</p>
                        </div>
                        <div className={classes.actions}>
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
        <div className={classes.itemsWrapper}>

            {renderProducts()}

        </div>
    )
}

export default AllCartItems
