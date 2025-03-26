import { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();
const initialState = {
    cart: [],
    total_item: " ",
    total_amount: 0,
};

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Load cart data from MongoDB
    const fetchCartData = async () => {
        const response = await axios.get("http://localhost:5000/cart");
        dispatch({ type: "LOAD_CART", payload: response.data });
    };

    // Add item to cart in MongoDB
    const addToCart = async (item_id, amount, curElem) => {
        const cartItem = {
            id: item_id,
            name: curElem.item_name,
            amount: amount,
            price: curElem.price,
            category: curElem.category,
        };
        await axios.post("http://localhost:5000/cart", cartItem);
        dispatch({ type: "ADD_TO_CART", payload: cartItem });
    };

    // Remove item from cart in MongoDB
    const removeItem = async (id) => {
        await axios.delete(`http://localhost:5000/cart/${id}`);
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    useEffect(() => {
        dispatch({ type: "TOTAL_AMOUNT" });
    }, [state.cart]);

    return (
        <CartContext.Provider value={{ ...state, addToCart, removeItem }}>
            {children}
        </CartContext.Provider>
    );
};

const useCartContext = () => {
    return useContext(CartContext);
};

export { CartProvider, useCartContext };
