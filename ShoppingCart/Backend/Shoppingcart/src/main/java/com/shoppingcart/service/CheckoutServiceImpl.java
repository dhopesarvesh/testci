package com.shoppingcart.service;

import com.shoppingcart.model.Checkout;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    public final List<Checkout> checkouts = new ArrayList<>();
    @Override
    public void saveOrder(Checkout checkout) {
        checkouts.add(checkout);
    }
}
