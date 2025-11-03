// Login page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeLoginPage();
});

function initializeLoginPage() {
    const loginForm = document.querySelector('.login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    // Add form validation
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // Add input event listeners for real-time validation
    if (usernameInput) {
        usernameInput.addEventListener('blur', validateUsername);
        usernameInput.addEventListener('input', clearFieldError);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', validatePassword);
        passwordInput.addEventListener('input', clearFieldError);
    }
    
    // Add demo credentials auto-fill
    addDemoCredentialsAutoFill();
    
    // Add keyboard shortcuts
    addKeyboardShortcuts();
}

function handleLoginSubmit(e) {
    const form = e.target;
    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');
    
    // Validate form
    if (!validateLoginForm(username, password)) {
        e.preventDefault();
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    addLoadingState(submitButton, 'Signing In...');
    
    // Let the form submit naturally to the server
    // The server will handle authentication and redirect
}

function validateLoginForm(username, password) {
    let isValid = true;
    
    // Validate username
    if (!validateUsername(username)) {
        isValid = false;
    }
    
    // Validate password
    if (!validatePassword(password)) {
        isValid = false;
    }
    
    return isValid;
}

function validateUsername(username) {
    const usernameInput = document.getElementById('username');
    
    if (!username || username.trim().length === 0) {
        showFieldError(usernameInput, 'Username is required');
        return false;
    }
    
    if (username.length < 3) {
        showFieldError(usernameInput, 'Username must be at least 3 characters');
        return false;
    }
    
    clearFieldError(usernameInput);
    return true;
}

function validatePassword(password) {
    const passwordInput = document.getElementById('password');
    
    if (!password || password.length === 0) {
        showFieldError(passwordInput, 'Password is required');
        return false;
    }
    
    if (password.length < 6) {
        showFieldError(passwordInput, 'Password must be at least 6 characters');
        return false;
    }
    
    clearFieldError(passwordInput);
    return true;
}

function showLoginError(message) {
    // Remove existing error message
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <span class="error-icon">⚠️</span>
        ${message}
    `;
    
    // Insert error message at the top of the form
    const form = document.querySelector('.login-form');
    form.insertBefore(errorDiv, form.firstChild);
    
    // Scroll to error message
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function addDemoCredentialsAutoFill() {
    const demoCard = document.querySelector('.demo-card');
    if (!demoCard) return;
    
    // Add click handlers to demo credentials
    const credentialItems = demoCard.querySelectorAll('.credential-item');
    
    credentialItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const text = this.textContent;
            
            if (text.includes('Username')) {
                const usernameInput = document.getElementById('username');
                if (usernameInput) {
                    usernameInput.value = 'william.lycee';
                    usernameInput.focus();
                }
            } else if (text.includes('Password')) {
                const passwordInput = document.getElementById('password');
                if (passwordInput) {
                    passwordInput.value = 'password123';
                    passwordInput.focus();
                }
            }
            
            showToast('Demo credentials filled!', 'success');
        });
    });
}

function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to submit form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const loginForm = document.querySelector('.login-form');
            if (loginForm) {
                loginForm.dispatchEvent(new Event('submit'));
            }
        }
        
        // Escape to clear form
        if (e.key === 'Escape') {
            clearLoginForm();
        }
    });
}

function clearLoginForm() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    if (usernameInput) {
        usernameInput.value = '';
        clearFieldError(usernameInput);
    }
    
    if (passwordInput) {
        passwordInput.value = '';
        clearFieldError(passwordInput);
    }
    
    // Remove error messages
    const errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showFieldError(input, message) {
    clearFieldError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #dc2626;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        animation: slideIn 0.3s ease;
    `;
    
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#dc2626';
    
    // Add shake animation
    input.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        input.style.animation = '';
    }, 500);
}

function clearFieldError(input) {
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    input.style.borderColor = '#e5e7eb';
}

function addLoadingState(button, text = 'Loading...') {
    const originalText = button.textContent;
    button.innerHTML = `
        <span class="btn-text">${text}</span>
        <span class="btn-icon">⏳</span>
    `;
    button.disabled = true;
    button.style.opacity = '0.7';
    
    return function removeLoadingState() {
        button.innerHTML = `
            <span class="btn-text">${originalText}</span>
            <span class="btn-icon">→</span>
        `;
        button.disabled = false;
        button.style.opacity = '1';
    };
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

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
