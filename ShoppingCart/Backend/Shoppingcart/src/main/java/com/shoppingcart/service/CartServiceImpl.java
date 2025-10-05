package com.shoppingcart.service;

import com.shoppingcart.model.Cart;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class CartServiceImpl  implements  CartService{


    private final List<Cart> cartItems = new ArrayList<>();

    @Override
    public Cart addItem(Cart item) {
        for(Cart ci : cartItems){
            if(Objects.equals(ci.getProductId(), item.getProductId())){
                ci.setQuantity(ci.getQuantity() + item.getQuantity());
                return ci;
            }
        }
        cartItems.add(item);
        return item;
    }

    @Override
    public List<Cart> listAllItems() {
        return cartItems;
    }

    @Override
    public Cart deleteItem(Cart item) {
        cartItems.removeIf(ci -> {
            if(ci.getProductId().equals(item.getProductId())){
                int newQty = ci.getQuantity() - item.getQuantity();
                if(newQty <= 0){
                    return true;
                } else {
                    ci.setQuantity(newQty);
                }
            }
            return false;
        });
        return item;
    }

    public void clearCart() {
        cartItems.clear();
    }


}
