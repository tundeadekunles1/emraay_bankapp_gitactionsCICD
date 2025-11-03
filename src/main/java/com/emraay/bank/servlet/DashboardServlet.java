package com.emraay.bank.servlet;

import com.emraay.bank.model.Customer;
import com.emraay.bank.model.Transaction;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

/**
 * Servlet for displaying customer dashboard
 */
public class DashboardServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        HttpSession session = request.getSession();
        Boolean isLoggedIn = (Boolean) session.getAttribute("isLoggedIn");
        
        if (isLoggedIn == null || !isLoggedIn) {
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }
        
        Customer customer = (Customer) session.getAttribute("customer");
        if (customer != null) {
            request.setAttribute("customer", customer);
            request.setAttribute("transactions", customer.getTransactions());
        }
        
        request.getRequestDispatcher("/dashboard.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        doGet(request, response);
    }
}
