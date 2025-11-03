package com.emraay.bank.servlet;

import com.emraay.bank.model.Customer;
import com.emraay.bank.model.Transaction;
import com.emraay.bank.service.CustomerService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Servlet for handling customer login
 */
public class LoginServlet extends HttpServlet {
    
    private CustomerService customerService;

    @Override
    public void init() throws ServletException {
        super.init();
        customerService = new CustomerService();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        // Forward to login page
        request.getRequestDispatcher("/login.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        // Simple authentication - in real application, this would be more secure
        if ("william.lycee".equals(username) && "password123".equals(password)) {
            // Get customer data
            Customer customer = customerService.getCustomerByUsername(username);
            
            // Create session
            HttpSession session = request.getSession();
            session.setAttribute("customer", customer);
            session.setAttribute("isLoggedIn", true);
            
            // Redirect to dashboard
            response.sendRedirect(request.getContextPath() + "/dashboard");
        } else {
            // Invalid credentials
            request.setAttribute("error", "Invalid username or password");
            request.getRequestDispatcher("/login.jsp").forward(request, response);
        }
    }
}
