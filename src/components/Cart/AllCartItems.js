import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MdAdd, MdRemove } from 'react-icons/md'
import { Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'

import { cartActions, addProduct } from '../../store/cart-slice'
import classes from './AllCartItems.module.css'

const AllCartItems = ({ formatNumber }) => {
    const dispatch = useDispatch()
    const allProducts = useSelector(state => state.cart.products)

    console.log(allProducts)

    function handleDecreaseQty({ id }) {
        
        dispatch(cartActions.decreaseProduct(id))
    }

    function handleIncreaseQty({ id }) {
        
        dispatch(addProduct({
            product: {id}
        }))
    }

    function handleRemoveProduct({ id }) {
        
        dispatch(cartActions.removeProduct(id))
    }

    function renderProducts() {
        if(allProducts.length === 0) {
            return (
                <Text fontSize="lg" className={classes.emptyState}>
                    Sorry! you don't have any products in your cart but, you can go to
                    <Button size="lg" colorScheme="blue" variant="link">
                        <Link to="/" className="link">shop</Link> 
                    </Button>
                    if you want to add some.
                </Text>
            )
        }

        return allProducts.map(product => {
            return (
                <div key={product.id} className={classes.singleItem}>
                    <div className={classes.productImg}>
                        <img src={product.image} alt="product" />
                    </div>
                    <div className={classes.right}>
                        <div className={classes.title}>
                            <Link className='link subtle' to={`/product/${product.id}`}>
                                <Text fontSize="lg" className="bold">{product.title}</Text>
                            </Link>
                            <Button colorScheme="red" onClick={_ => handleRemoveProduct(product)} variant="link">Remove</Button>
                        </div>
                        <div className={classes.body}>
                            <Text fontSize="lg" >${formatNumber(product.price * product.quantity)}</Text>
                        </div>
                        <div className={classes.actions}>
                            <Button type="Button" onClick={() => handleDecreaseQty(product)}><MdRemove/></Button>
                            <Text fontSize="lg" >{product.quantity}</Text>
                            <Button type="Button" onClick={() => handleIncreaseQty(product)}><MdAdd/></Button>
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
