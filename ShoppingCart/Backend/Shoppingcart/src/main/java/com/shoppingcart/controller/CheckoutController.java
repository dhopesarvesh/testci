package com.shoppingcart.controller;

import com.shoppingcart.model.Checkout;
import com.shoppingcart.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/checkout")
@CrossOrigin(origins = "http://localhost:5500")
public class CheckoutController {




    @Autowired
    CheckoutService checkoutService;

    private final List<Map<String, Object>> responses = new ArrayList<>();

    @PostMapping("/save")
    public Map<String, Object> checkout(@RequestBody Map<String, Object> request) {
        String name = (String) request.get("name");
        String email = (String) request.get("email");
        String address = (String) request.get("address");
        double total = Double.parseDouble(request.get("total").toString());


        Checkout order = new Checkout(name,email,address,total);
        order.setName(name);
        order.setEmail(email);
        order.setAddress(address);
        order.setTotal(total);


        checkoutService.saveOrder(order);

        Map<String, Object> response = new HashMap<>();
        response.put("name", name);
        response.put("email", email);
        response.put("address", address);
        response.put("total", total);

        responses.add(response);

        return response;
    }

    @GetMapping("/all")
    public List<Map<String, Object>> getAllOrders() {
        return responses;
    }


}
