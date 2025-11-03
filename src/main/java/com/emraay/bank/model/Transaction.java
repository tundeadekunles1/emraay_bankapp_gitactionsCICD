package com.emraay.bank.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Transaction model class representing bank transaction information
 */
public class Transaction {
    private String transactionId;
    private String accountNumber;
    private String transactionType; // DEBIT, CREDIT, TRANSFER
    private BigDecimal amount;
    private String description;
    private LocalDateTime transactionDate;
    private String status; // PENDING, COMPLETED, FAILED
    private BigDecimal balanceAfterTransaction;

    public Transaction() {
    }

    public Transaction(String transactionId, String accountNumber, String transactionType, 
                      BigDecimal amount, String description, LocalDateTime transactionDate, 
                      String status, BigDecimal balanceAfterTransaction) {
        this.transactionId = transactionId;
        this.accountNumber = accountNumber;
        this.transactionType = transactionType;
        this.amount = amount;
        this.description = description;
        this.transactionDate = transactionDate;
        this.status = status;
        this.balanceAfterTransaction = balanceAfterTransaction;
    }

    // Getters and Setters
    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getBalanceAfterTransaction() {
        return balanceAfterTransaction;
    }

    public void setBalanceAfterTransaction(BigDecimal balanceAfterTransaction) {
        this.balanceAfterTransaction = balanceAfterTransaction;
    }

    public String getFormattedAmount() {
        return String.format("$%.2f", amount);
    }

    public String getFormattedDate() {
        return transactionDate.toString().replace("T", " ");
    }
}
