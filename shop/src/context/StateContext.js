import React, { useState, useEffect, useContext, createContext, useRef } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCard, setShowCard] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    
    let foundProduct;

    const isInitialMount = useRef(true);
    useEffect(() => {
        if(isInitialMount.current) {

        const localData = localStorage.getItem('products');
        console.log('init products', localData)
        if (localData) {
            try {
                const { cartItems, totalPrice, totalQuantities } = JSON.parse(localData);
                console.log('loading products')

                setCartItems(cartItems || []);
                setTotalPrice(totalPrice || 0);
                setTotalQuantities(totalQuantities || 0);
            } catch (err) {
                console.log('Err of loading products')
            }
        };
        isInitialMount.current = false
    } else {
        console.log('saving products to localStorage');
        const doc = {
            cartItems, totalPrice, totalQuantities
        };
    
        localStorage.setItem('products', JSON.stringify(doc));
    }

     }, [cartItems, totalPrice, totalQuantities]);


    const incQty = () => {
        setQuantity((prevQty) => prevQty+1)
    }
    const decQty = () => {
        setQuantity((prevQty) => {
            if(prevQty - 1 < 1) {
                return 1
            }
            return prevQty - 1
        })
    }
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + (product?.price * quantity));
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((item) => {
                if(item._id === product._id) {
                    return {...item, quantity: item.quantity + quantity}
                }
            })
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems,{...product}])
        }
        toast.success(`${quantity} ${product.name} added to cart`);
    }
    const toggleCartItemQuantity = (id, value) => {
        const foundProduct = cartItems.find((item) => item._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);

        if(value === 'inc') {
            setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevQty) => prevQty + 1);
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevQty) => prevQty - 1);
            }
        } else { return }
    }
    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id!==product._id);
        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - (foundProduct?.price * foundProduct?.quantity));
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct?.quantity);
    }

    return (
        <Context.Provider value={{ showCard, setShowCard, quantity, setQuantity, incQty, decQty, onAdd, cartItems, totalPrice, totalQuantities, toggleCartItemQuantity, onRemove }}>
            { children }
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)