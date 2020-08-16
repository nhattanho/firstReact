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

