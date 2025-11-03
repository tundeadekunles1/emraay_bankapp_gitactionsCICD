package com.emraay.bank.service;

import com.emraay.bank.model.Customer;
import com.emraay.bank.model.Transaction;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Service class for customer-related operations
 */
public class CustomerService {
    
    /**
     * Get customer by username (demo data)
     */
    public Customer getCustomerByUsername(String username) {
        if ("william.lycee".equals(username)) {
            return createWilliamLyceeCustomer();
        }
        return null;
    }
    
    /**
     * Create demo customer data for William Lycee
     */
    private Customer createWilliamLyceeCustomer() {
        Customer customer = new Customer();
        customer.setCustomerId("CUST001");
        customer.setFirstName("William");
        customer.setLastName("Lycee");
        customer.setEmail("william.lycee@email.com");
        customer.setPhoneNumber("+1-555-0123");
        customer.setAccountNumber("ACC-2024-001");
        customer.setAccountBalance(new BigDecimal("9573.00"));
        
        // Add demo transactions
        List<Transaction> transactions = createDemoTransactions(customer.getAccountNumber());
        customer.setTransactions(transactions);
        
        return customer;
    }
    
    /**
     * Create demo transaction data
     */
    private List<Transaction> createDemoTransactions(String accountNumber) {
        List<Transaction> transactions = new ArrayList<>();
        
        // Transaction 1 - Salary Deposit
        Transaction t1 = new Transaction();
        t1.setTransactionId("TXN001");
        t1.setAccountNumber(accountNumber);
        t1.setTransactionType("CREDIT");
        t1.setAmount(new BigDecimal("2500.00"));
        t1.setDescription("Monthly Salary Deposit");
        t1.setTransactionDate(LocalDateTime.now().minusDays(5));
        t1.setStatus("COMPLETED");
        t1.setBalanceAfterTransaction(new BigDecimal("9573.00"));
        transactions.add(t1);
        
        // Transaction 2 - Grocery Purchase
        Transaction t2 = new Transaction();
        t2.setTransactionId("TXN002");
        t2.setAccountNumber(accountNumber);
        t2.setTransactionType("DEBIT");
        t2.setAmount(new BigDecimal("125.50"));
        t2.setDescription("Grocery Store Purchase");
        t2.setTransactionDate(LocalDateTime.now().minusDays(3));
        t2.setStatus("COMPLETED");
        t2.setBalanceAfterTransaction(new BigDecimal("9447.50"));
        transactions.add(t2);
        
        // Transaction 3 - Online Transfer
        Transaction t3 = new Transaction();
        t3.setTransactionId("TXN003");
        t3.setAccountNumber(accountNumber);
        t3.setTransactionType("TRANSFER");
        t3.setAmount(new BigDecimal("500.00"));
        t3.setDescription("Transfer to Savings Account");
        t3.setTransactionDate(LocalDateTime.now().minusDays(2));
        t3.setStatus("COMPLETED");
        t3.setBalanceAfterTransaction(new BigDecimal("8947.50"));
        transactions.add(t3);
        
        // Transaction 4 - ATM Withdrawal
        Transaction t4 = new Transaction();
        t4.setTransactionId("TXN004");
        t4.setAccountNumber(accountNumber);
        t4.setTransactionType("DEBIT");
        t4.setAmount(new BigDecimal("200.00"));
        t4.setDescription("ATM Withdrawal");
        t4.setTransactionDate(LocalDateTime.now().minusDays(1));
        t4.setStatus("COMPLETED");
        t4.setBalanceAfterTransaction(new BigDecimal("8747.50"));
        transactions.add(t4);
        
        // Transaction 5 - Interest Credit
        Transaction t5 = new Transaction();
        t5.setTransactionId("TXN005");
        t5.setAccountNumber(accountNumber);
        t5.setTransactionType("CREDIT");
        t5.setAmount(new BigDecimal("25.50"));
        t5.setDescription("Monthly Interest Credit");
        t5.setTransactionDate(LocalDateTime.now().minusHours(12));
        t5.setStatus("COMPLETED");
        t5.setBalanceAfterTransaction(new BigDecimal("8773.00"));
        transactions.add(t5);
        
        // Transaction 6 - Utility Bill Payment
        Transaction t6 = new Transaction();
        t6.setTransactionId("TXN006");
        t6.setAccountNumber(accountNumber);
        t6.setTransactionType("DEBIT");
        t6.setAmount(new BigDecimal("200.00"));
        t6.setDescription("Electricity Bill Payment");
        t6.setTransactionDate(LocalDateTime.now().minusHours(6));
        t6.setStatus("COMPLETED");
        t6.setBalanceAfterTransaction(new BigDecimal("8573.00"));
        transactions.add(t6);
        
        return transactions;
    }
}
