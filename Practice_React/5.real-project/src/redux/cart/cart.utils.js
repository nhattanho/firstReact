export const addItemsToCart = (cartItems, newItem) => {
    const existing = cartItems.find( cartItem => cartItem.id === newItem.id);
    if (existing) {
        return cartItems.map( cartItem => 
            cartItem.id === newItem.id ? {...cartItem, quantity: cartItem.quantity+1} : cartItem   
        )
    }
    //cartItems is an array of items, and each item is an object 
    return [...cartItems, {...newItem, quantity: 1}] // create the quantity property for object in the first time
}

/*Note: {...cartItem, quantity: cartItem.quantity+1} means:
return an object having all the same properties as the cartItem but add one more quantity property*/

export const clearItemsToCart = (cartItems, newItem) => {
    return cartItems.filter( item => item.id !== newItem.id );
}

export const removeItem = (cartItems, itemRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === itemRemove.id);
    if (existingCartItem.quantity === 1){
        return cartItems.filter(item => item.id !== itemRemove.id)
    }
    return cartItems.map(item => (item.id === itemRemove.id) ? {...item, quantity: item.quantity - 1} : item);
}