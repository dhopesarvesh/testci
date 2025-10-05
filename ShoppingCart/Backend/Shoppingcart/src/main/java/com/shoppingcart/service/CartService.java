package com.shoppingcart.service;

import com.shoppingcart.model.Cart;

import java.util.List;

public interface CartService {

    Cart addItem(Cart item);
    List<Cart> listAllItems();
    Cart deleteItem(Cart item);
    public void clearCart();
}
