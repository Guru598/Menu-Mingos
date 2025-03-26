const cartReducer = (state, action) => {
    if (action.type === "LOAD_CART") {
        return { ...state, cart: action.payload };
    }

    if (action.type === "ADD_TO_CART") {
        return { ...state, cart: [...state.cart, action.payload] };
    }

    if (action.type === "REMOVE_ITEM") {
        let updateCart = state.cart.filter((curElem) => curElem.id !== action.payload);
        return { ...state, cart: updateCart };
    }

    if (action.type === "TOTAL_AMOUNT") {
        let total_price = state.cart.reduce((initialVal, curElem) => {
            let { price, amount } = curElem;
            initialVal += price * amount;
            return initialVal;
        }, 0);

        return { ...state, total_price };
    }

    return state;
};

export default cartReducer;
