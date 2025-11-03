// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    // Check if user is logged in
    checkAuthentication();
    
    // Initialize dashboard components
    initializeQuickActions();
    initializeTransactionFilters();
    initializeAccountStats();
    
    // Add real-time updates simulation
    initializeRealTimeUpdates();
    
    // Add responsive behavior
    initializeResponsiveBehavior();
}

function checkAuthentication() {
    // In a real application, this would check with the server
    // For demo purposes, we'll check if we're on the dashboard page
    const currentPath = window.location.pathname;
    if (currentPath.includes('dashboard')) {
        // User is on dashboard, assume authenticated
        console.log('User authenticated, dashboard loaded');
    }
}

function initializeQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const actionText = this.querySelector('.action-text').textContent;
            handleQuickAction(actionText);
        });
    });
}

function handleQuickAction(action) {
    switch(action) {
        case 'Transfer Money':
            showToast('Transfer feature coming soon!', 'info');
            break;
        case 'Pay Bills':
            showToast('Bill payment feature coming soon!', 'info');
            break;
        case 'View Statements':
            showToast('Statement view feature coming soon!', 'info');
            break;
        case 'Account Settings':
            showToast('Account settings feature coming soon!', 'info');
            break;
        default:
            showToast('Feature not available yet', 'info');
    }
}

function initializeTransactionFilters() {
    // Add transaction filtering functionality
    const transactionsList = document.querySelector('.transactions-list');
    if (!transactionsList) return;
    
    // Create filter buttons
    const filterContainer = document.createElement('div');
    filterContainer.className = 'transaction-filters';
    filterContainer.innerHTML = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="credit">Credits</button>
            <button class="filter-btn" data-filter="debit">Debits</button>
            <button class="filter-btn" data-filter="transfer">Transfers</button>
        </div>
    `;
    
    // Insert filters before transactions list
    transactionsList.parentNode.insertBefore(filterContainer, transactionsList);
    
    // Add filter functionality
    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter transactions
            const filter = this.dataset.filter;
            filterTransactions(filter);
        });
    });
}

function filterTransactions(filter) {
    const transactionItems = document.querySelectorAll('.transaction-item');
    
    transactionItems.forEach(item => {
        const transactionType = item.querySelector('.transaction-icon').textContent.includes('📈') ? 'credit' :
                               item.querySelector('.transaction-icon').textContent.includes('📉') ? 'debit' : 'transfer';
        
        if (filter === 'all' || filter === transactionType) {
            item.style.display = 'grid';
            item.style.animation = 'fadeIn 0.3s ease';
        } else {
            item.style.display = 'none';
        }
    });
}

function initializeAccountStats() {
    // Animate stat cards on load
    const statCards = document.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    statCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

function initializeRealTimeUpdates() {
    // Simulate real-time balance updates
    setInterval(() => {
        updateBalanceDisplay();
    }, 30000); // Update every 30 seconds
    
    // Simulate new transaction notifications
    setTimeout(() => {
        showNewTransactionNotification();
    }, 10000); // Show notification after 10 seconds
}

function updateBalanceDisplay() {
    const balanceElement = document.querySelector('.balance-amount');
    if (!balanceElement) return;
    
    // Add subtle animation to indicate update
    balanceElement.style.transition = 'color 0.3s ease';
    balanceElement.style.color = '#3b82f6';
    
    setTimeout(() => {
        balanceElement.style.color = '#059669';
    }, 1000);
}

function showNewTransactionNotification() {
    const notification = document.createElement('div');
    notification.className = 'transaction-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">💳</div>
            <div class="notification-text">
                <div class="notification-title">New Transaction</div>
                <div class="notification-desc">Interest credit of $2.50</div>
            </div>
            <button class="notification-close">×</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 0.75rem;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        padding: 1rem;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        border-left: 4px solid #059669;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

function initializeResponsiveBehavior() {
    // Handle responsive behavior for mobile devices
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Add mobile-specific behaviors
        addMobileOptimizations();
    }
    
    // Listen for window resize
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== isMobile) {
            location.reload(); // Reload to apply mobile optimizations
        }
    });
}

function addMobileOptimizations() {
    // Optimize transaction list for mobile
    const transactionItems = document.querySelectorAll('.transaction-item');
    transactionItems.forEach(item => {
        item.style.gridTemplateColumns = 'auto 1fr auto';
        item.style.gap = '0.5rem';
    });
    
    // Add swipe gestures for quick actions
    const quickActions = document.querySelector('.actions-grid');
    if (quickActions) {
        quickActions.style.gridTemplateColumns = 'repeat(2, 1fr)';
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Add CSS for animations and filters
const style = document.createElement('style');
style.textContent = `
    .transaction-filters {
        margin-bottom: 1rem;
    }
    
    .filter-buttons {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    
    .filter-btn {
        padding: 0.5rem 1rem;
        border: 2px solid #e5e7eb;
        background: white;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    
    .filter-btn:hover {
        border-color: #3b82f6;
        color: #3b82f6;
    }
    
    .filter-btn.active {
        background: #3b82f6;
        border-color: #3b82f6;
        color: white;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-icon {
        font-size: 1.5rem;
    }
    
    .notification-text {
        flex: 1;
    }
    
    .notification-title {
        font-weight: 600;
        color: #374151;
        margin-bottom: 0.25rem;
    }
    
    .notification-desc {
        font-size: 0.9rem;
        color: #64748b;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #64748b;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        color: #374151;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
