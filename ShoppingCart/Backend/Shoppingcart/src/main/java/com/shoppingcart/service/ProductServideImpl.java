package com.shoppingcart.service;


import com.shoppingcart.model.Product;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServideImpl implements ProductService{

    private final List<Product> products = new ArrayList<>();
    private Long productId = 1L;

    @PostConstruct
    public void initProducts(){
        products.add(new Product(productId++, "Apple", 420,"./assets/apple1.jpg"));
        products.add(new Product(productId++, "Banana", 350,"./assets/banana.jpg"));
        products.add(new Product(productId++, "Orange", 500,"./assets/orange.jpg"));
        products.add(new Product(productId++, "Blueberry", 600,"./assets/blueberry.jpg"));
        products.add(new Product(productId++, "Strawberry", 900,"./assets/Strawberry.jpg"));
        products.add(new Product(productId++, "Pineapple", 800,"./assets/pineapple.jpg"));
    }
    @Override
    public List<Product> getAllProducts(){
        return products;

    }

    @Override
    public Product getProductByID(Long productId) {
        return products.stream()
                .filter(p -> p.getProductId().equals(productId))
                .findFirst()
                .orElse(null);
    }


}
