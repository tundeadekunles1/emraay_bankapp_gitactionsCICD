<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.emraay.bank.model.Customer" %>
<%@ page import="com.emraay.bank.model.Transaction" %>
<%@ page import="java.util.List" %>
<%@ page import="java.text.NumberFormat" %>
<%@ page import="java.util.Locale" %>
<%
    Customer customer = (Customer) request.getAttribute("customer");
    List<Transaction> transactions = (List<Transaction>) request.getAttribute("transactions");
    NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(Locale.CANADA);
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emraay Bank - Customer Dashboard</title>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="dashboard-page">
    <div class="dashboard-container">
        <!-- Header -->
        <header class="dashboard-header">
            <div class="header-left">
                <div class="logo-section">
                    <img src="images/emraay-logo.jpeg" alt="Emraay Bank Logo" class="bank-logo">
                    <div class="logo-text">
                        <h1>Emraay Bank</h1>
                        <span class="tagline">Banking Excellence</span>
                    </div>
                </div>
            </div>
            <div class="header-right">
                <div class="user-info">
                    <span class="welcome-text">Welcome, <%= customer != null ? customer.getFirstName() : "User" %>!</span>
                    <div class="user-avatar">
                        <%= customer != null ? customer.getFirstName().charAt(0) + "" + customer.getLastName().charAt(0) : "U" %>
                    </div>
                </div>
                <a href="index.html" class="btn btn-outline btn-small">
                    <span class="btn-icon">🏠</span>
                    Home
                </a>
                <a href="login" class="logout-btn">Logout</a>
            </div>
        </header>

        <!-- Main Content -->
        <main class="dashboard-main">
            <!-- Account Summary -->
            <section class="account-summary">
                <div class="summary-card">
                    <div class="summary-header">
                        <h2>Account Summary</h2>
                        <span class="account-number">Account: <%= customer != null ? customer.getAccountNumber() : "N/A" %></span>
                    </div>
                    <div class="balance-display">
                        <div class="balance-label">Current Balance</div>
                        <div class="balance-amount">
                            <%= customer != null ? currencyFormat.format(customer.getAccountBalance()) : "$0.00" %>
                        </div>
                    </div>
                    <div class="account-details">
                        <div class="detail-item">
                            <span class="detail-label">Account Holder:</span>
                            <span class="detail-value"><%= customer != null ? customer.getFullName() : "N/A" %></span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Email:</span>
                            <span class="detail-value"><%= customer != null ? customer.getEmail() : "N/A" %></span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Phone:</span>
                            <span class="detail-value"><%= customer != null ? customer.getPhoneNumber() : "N/A" %></span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Quick Actions -->
            <section class="quick-actions">
                <h3>Quick Actions</h3>
                <div class="actions-grid">
                    <button class="action-btn">
                        <span class="action-icon">💸</span>
                        <span class="action-text">Transfer Money</span>
                    </button>
                    <button class="action-btn">
                        <span class="action-icon">📱</span>
                        <span class="action-text">Pay Bills</span>
                    </button>
                    <button class="action-btn">
                        <span class="action-icon">📊</span>
                        <span class="action-text">View Statements</span>
                    </button>
                    <button class="action-btn">
                        <span class="action-icon">⚙️</span>
                        <span class="action-text">Account Settings</span>
                    </button>
                </div>
            </section>

            <!-- Recent Transactions -->
            <section class="recent-transactions">
                <div class="transactions-header">
                    <h3>Recent Transactions</h3>
                    <a href="#" class="view-all-link">View All</a>
                </div>
                <div class="transactions-list">
                    <% if (transactions != null && !transactions.isEmpty()) { %>
                        <% for (int i = 0; i < Math.min(transactions.size(), 6); i++) { %>
                            <% Transaction transaction = transactions.get(i); %>
                            <div class="transaction-item">
                                <div class="transaction-icon">
                                    <% if ("CREDIT".equals(transaction.getTransactionType())) { %>
                                        <span class="icon-credit">📈</span>
                                    <% } else if ("DEBIT".equals(transaction.getTransactionType())) { %>
                                        <span class="icon-debit">📉</span>
                                    <% } else { %>
                                        <span class="icon-transfer">🔄</span>
                                    <% } %>
                                </div>
                                <div class="transaction-details">
                                    <div class="transaction-description"><%= transaction.getDescription() %></div>
                                    <div class="transaction-date"><%= transaction.getFormattedDate() %></div>
                                </div>
                                <div class="transaction-amount">
                                    <% if ("CREDIT".equals(transaction.getTransactionType())) { %>
                                        <span class="amount-positive">+<%= currencyFormat.format(transaction.getAmount()) %></span>
                                    <% } else { %>
                                        <span class="amount-negative">-<%= currencyFormat.format(transaction.getAmount()) %></span>
                                    <% } %>
                                </div>
                                <div class="transaction-status">
                                    <span class="status-badge status-<%= transaction.getStatus().toLowerCase() %>"><%= transaction.getStatus() %></span>
                                </div>
                            </div>
                        <% } %>
                    <% } else { %>
                        <div class="no-transactions">
                            <p>No recent transactions found.</p>
                        </div>
                    <% } %>
                </div>
            </section>

            <!-- Account Statistics -->
            <section class="account-stats">
                <h3>Account Statistics</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">💰</div>
                        <div class="stat-content">
                            <div class="stat-value">6</div>
                            <div class="stat-label">Transactions This Month</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-content">
                            <div class="stat-value">$2,525.50</div>
                            <div class="stat-label">Total Deposits</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">💳</div>
                        <div class="stat-content">
                            <div class="stat-value">$525.50</div>
                            <div class="stat-label">Total Withdrawals</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📈</div>
                        <div class="stat-content">
                            <div class="stat-value">$25.50</div>
                            <div class="stat-label">Interest Earned</div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <!-- Footer -->
        <footer class="dashboard-footer">
            <div class="footer-content">
                <p>&copy; 2024 Emraay Bank. All rights reserved.</p>
                <div class="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Contact Support</a>
                </div>
            </div>
        </footer>
    </div>

    <script src="js/dashboard.js"></script>
</body>
</html>