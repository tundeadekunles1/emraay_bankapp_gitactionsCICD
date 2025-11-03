<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emraay Bank - Customer Login</title>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="login-page">
    <div class="login-container">
        <div class="login-header">
            <div class="logo-section">
                <img src="images/emraay-logo.jpeg" alt="Emraay Bank Logo" class="bank-logo">
                <div class="logo-text">
                    <h1>Emraay Bank</h1>
                    <span class="tagline">Banking Excellence</span>
                </div>
            </div>
            <h2>Customer Portal Login</h2>
            <p>Secure access to your banking information</p>
            <div class="home-link">
                <a href="index.html" class="btn btn-outline btn-small">
                    <span class="btn-icon">🏠</span>
                    Return to Home
                </a>
            </div>
        </div>

        <div class="login-form-container">
            <form action="login" method="post" class="login-form">
                <% if (request.getAttribute("error") != null) { %>
                    <div class="error-message">
                        <span class="error-icon">⚠️</span>
                        <%= request.getAttribute("error") %>
                    </div>
                <% } %>

                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required 
                           placeholder="Enter your username" value="william.lycee">
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required 
                           placeholder="Enter your password" value="password123">
                </div>

                <div class="form-options">
                    <label class="checkbox-label">
                        <input type="checkbox" name="remember">
                        <span class="checkmark"></span>
                        Remember me
                    </label>
                    <a href="#" class="forgot-password">Forgot Password?</a>
                </div>

                <button type="submit" class="btn btn-primary btn-full">
                    <span class="btn-text">Sign In</span>
                    <span class="btn-icon">→</span>
                </button>
            </form>

            <div class="login-footer">
                <p>Don't have an account? <a href="#" class="signup-link">Sign up here</a></p>
                <div class="security-info">
                    <span class="security-icon">🔒</span>
                    <span>Your connection is secure and encrypted</span>
                </div>
            </div>
        </div>

        <div class="demo-info">
            <div class="demo-card">
                <h3>Demo Credentials</h3>
                <div class="demo-credentials">
                    <div class="credential-item">
                        <strong>Username:</strong> william.lycee
                    </div>
                    <div class="credential-item">
                        <strong>Password:</strong> password123
                    </div>
                </div>
                <p class="demo-note">This is a demonstration application for training purposes.</p>
            </div>
        </div>
    </div>

    <script src="js/login.js"></script>
</body>
</html>
