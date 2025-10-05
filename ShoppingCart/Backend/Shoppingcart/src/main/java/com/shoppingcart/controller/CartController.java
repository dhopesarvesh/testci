package com.shoppingcart.controller;


import com.shoppingcart.model.Cart;
import com.shoppingcart.model.Product;
import com.shoppingcart.service.CartService;
import com.shoppingcart.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:5500")
public class CartController {

    @Autowired
    CartService cartService;

    @Autowired
    ProductService productService;

    @PostMapping("/add/{productId}")
        public List<Map<String, Object>> addToCart(@PathVariable Long productId, @RequestParam(defaultValue = "1") int quantity){
        Product product = productService.getProductByID(productId);
        if(product == null){
            throw new RuntimeException("Product Not Found with ID " +productId);
    }
        Cart item = new Cart(productId, quantity);
        cartService.addItem(item);

        return getAllCartItem();




    }

    @GetMapping
    public List<Map<String, Object>> getAllCartItem() {
        List<Map<String, Object>> response = new ArrayList<>();

        for (Cart item : cartService.listAllItems()) {
            Product product = productService.getProductByID(item.getProductId());
            if (product != null) {
                Map<String, Object> map = new HashMap<>();
                map.put("productId", product.getProductId());
                map.put("ImageUrl", product.getImageUrl());
                map.put("name", product.getProductName());
                map.put("price", product.getPrice());
                map.put("quantity", item.getQuantity());
                map.put("total", product.getPrice() * item.getQuantity());
                response.add(map);
            }
        }

        return response;


    }

    @DeleteMapping("/delete/{productId}")
    public List<Map<String, Object>> deleteFromCart(@PathVariable Long productId, @RequestParam(defaultValue = "1") int quantity){
        Product product = productService.getProductByID(productId);
        if(product == null){
            throw new RuntimeException("Product Not Found with ID " +productId);
        }
        Cart item = new Cart(productId, quantity);
        cartService.deleteItem(item);

        return getAllCartItem();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart() {
        cartService.clearCart();
        return ResponseEntity.ok("Cart cleared successfully");

    }
}
