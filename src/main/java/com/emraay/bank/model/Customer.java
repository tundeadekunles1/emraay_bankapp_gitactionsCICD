package com.emraay.bank.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Customer model class representing bank customer information
 */
public class Customer {
    private String customerId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private BigDecimal accountBalance;
    private String accountNumber;
    private List<Transaction> transactions;

    public Customer() {
        this.transactions = new ArrayList<>();
    }

    public Customer(String customerId, String firstName, String lastName, String email, 
                   String phoneNumber, BigDecimal accountBalance, String accountNumber) {
        this();
        this.customerId = customerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.accountBalance = accountBalance;
        this.accountNumber = accountNumber;
    }

    // Getters and Setters
    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public BigDecimal getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(BigDecimal accountBalance) {
        this.accountBalance = accountBalance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

    public void addTransaction(Transaction transaction) {
        this.transactions.add(transaction);
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }
}
