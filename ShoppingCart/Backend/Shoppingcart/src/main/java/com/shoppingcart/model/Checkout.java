package com.shoppingcart.model;

public class Checkout {

    private String name;
    private String email;
    private String address;
    private double total;

    public Checkout(String name, String email, String address, double total) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.total = total;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    @Override
    public String toString() {
        return "Checkout{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", total=" + total +
                '}';
    }
}