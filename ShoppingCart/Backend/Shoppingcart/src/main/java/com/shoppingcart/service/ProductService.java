package com.shoppingcart.service;

import com.shoppingcart.model.Product;

import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();
    Product getProductByID(Long productId);

}
