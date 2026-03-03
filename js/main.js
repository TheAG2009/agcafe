// ========== GLOBAL VARIABLES ==========
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let loggedInUser = localStorage.getItem('loggedInUser') || null;

// ========== UPDATE CART COUNT ==========
function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (countEl) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        countEl.textContent = totalItems;
    }
}

// ========== MENU ITEMS DATA (WITH ICON EMOJIS) ==========
const menuItems = [
    // Dosa Varieties
    { id: 1, name: 'Masala Dosa', description: 'Crispy dosa with potato filling', price: 70, icon: '🥞' },
    { id: 2, name: 'Mysore Masala Dosa', description: 'Dosa with red chutney', price: 80, icon: '🥞' },
    { id: 3, name: 'Cheese Dosa', description: 'Dosa loaded with cheese', price: 90, icon: '🥞' },
    { id: 4, name: 'Onion Dosa', description: 'Dosa with caramelized onions', price: 75, icon: '🥞' },
    { id: 5, name: 'Rava Dosa', description: 'Crispy semolina dosa', price: 80, icon: '🥞' },
    { id: 6, name: 'Set Dosa', description: 'Soft spongy dosa (2 pcs)', price: 70, icon: '🥞' },
    
    // Idli & Vada
    { id: 7, name: 'Idli', description: 'Soft rice cakes (2 pcs)', price: 40, icon: '🍚' },
    { id: 8, name: 'Rava Idli', description: 'Semolina idlis', price: 50, icon: '🍚' },
    { id: 9, name: 'Medu Vada', description: 'Crispy lentil donuts (2 pcs)', price: 50, icon: '🍩' },
    { id: 10, name: 'Sambar Vada', description: 'Vada dipped in sambar', price: 60, icon: '🍩' },
    
    // Chaat
    { id: 11, name: 'Pani Puri', description: '6 pcs with spicy water', price: 40, icon: '🥘' },
    { id: 12, name: 'Bhel Puri', description: 'Puffed rice snack', price: 45, icon: '🥘' },
    { id: 13, name: 'Sev Puri', description: 'Crispy puris with chutney', price: 50, icon: '🥘' },
    { id: 14, name: 'Dahi Puri', description: 'Puri with curd and chutney', price: 55, icon: '🥘' },
    { id: 15, name: 'Samosa', description: 'Crispy potato samosa (2 pcs)', price: 30, icon: '🥟' },
    { id: 16, name: 'Vada Pav', description: 'Mumbai style burger', price: 25, icon: '🍔' },
    
    // South Indian Rice
    { id: 17, name: 'Puliyogare', description: 'Tamarind rice', price: 60, icon: '🍛' },
    { id: 18, name: 'Tomato Rice', description: 'Rice with tomato masala', price: 65, icon: '🍛' },
    { id: 19, name: 'Coconut Rice', description: 'Rice with fresh coconut', price: 60, icon: '🍛' },
    { id: 20, name: 'Lemon Rice', description: 'Tangy lemon rice', price: 55, icon: '🍛' },
    { id: 21, name: 'Curd Rice', description: 'South Indian comfort food', price: 50, icon: '🍛' },
    
    // Chinese
    { id: 22, name: 'Veg Noodles', description: 'Hakka noodles with veggies', price: 80, icon: '🍜' },
    { id: 23, name: 'Schezwan Noodles', description: 'Spicy noodles', price: 90, icon: '🍜' },
    { id: 24, name: 'Veg Fried Rice', description: 'Classic fried rice', price: 80, icon: '🍚' },
    { id: 25, name: 'Schezwan Rice', description: 'Spicy fried rice', price: 90, icon: '🍚' },
    { id: 26, name: 'Gobi Manchurian', description: 'Cauliflower in manchurian sauce', price: 85, icon: '🥦' },
    { id: 27, name: 'Chilli Paneer', description: 'Crispy paneer in chilli sauce', price: 95, icon: '🧀' },
    
    // Punjabi
    { id: 28, name: 'Chole Bhature', description: 'Spicy chickpeas with fried bread', price: 100, icon: '🍛' },
    { id: 29, name: 'Paneer Tikka', description: 'Grilled paneer with spices', price: 110, icon: '🍢' },
    { id: 30, name: 'Dal Makhani', description: 'Creamy black lentils', price: 90, icon: '🍲' },
    { id: 31, name: 'Butter Naan', description: 'Soft naan with butter', price: 35, icon: '🫓' },
    
    // Gujarati
    { id: 32, name: 'Khaman Dhokla', description: 'Soft steamed snack', price: 50, icon: '🍰' },
    { id: 33, name: 'Khandvi', description: 'Rolled gram flour snack', price: 55, icon: '🥨' },
    { id: 34, name: 'Thepla', description: 'Spiced fenugreek flatbread', price: 40, icon: '🫓' },
    
    // Maharashtrian
    { id: 35, name: 'Misal Pav', description: 'Sprouted curry with pav', price: 70, icon: '🍛' },
    { id: 36, name: 'Pav Bhaji', description: 'Buttered pav with mixed veg', price: 80, icon: '🍔' },
    { id: 37, name: 'Sabudana Khichdi', description: 'Tapioca pearls with peanuts', price: 60, icon: '🍚' },
    
    // Desserts
    { id: 38, name: 'Gulab Jamun', description: 'Soft milk solids in syrup (2 pcs)', price: 35, icon: '🍡' },
    { id: 39, name: 'Jalebi', description: 'Crispy spiral sweet (4 pcs)', price: 40, icon: '🥨' },
    { id: 40, name: 'Rava Kesari', description: 'Semolina dessert', price: 45, icon: '🍮' },
    { id: 41, name: 'Ice Cream', description: 'Vanilla/Strawberry/Chocolate', price: 50, icon: '🍦' },
    
    // Shakes
    { id: 42, name: 'KitKat Shake', description: 'Chocolate shake with KitKat', price: 90, icon: '🥤' },
    { id: 43, name: 'Oreo Shake', description: 'Oreo cookie milkshake', price: 95, icon: '🥤' },
    { id: 44, name: 'Mango Shake', description: 'Fresh mango milkshake', price: 80, icon: '🥭' },
    { id: 45, name: 'Strawberry Shake', description: 'Strawberry milkshake', price: 80, icon: '🍓' },
    
    // Coffee & Tea
    { id: 46, name: 'Filter Coffee', description: 'South Indian style coffee', price: 25, icon: '☕' },
    { id: 47, name: 'Masala Chai', description: 'Spiced tea with ginger', price: 20, icon: '🫖' },
    { id: 48, name: 'Cold Coffee', description: 'Chilled coffee with ice cream', price: 60, icon: '🥤' },
    { id: 49, name: 'Green Tea', description: 'Healthy green tea', price: 25, icon: '🍵' },
    { id: 50, name: 'Badam Milk', description: 'Rich almond milk', price: 40, icon: '🥛' }
];

// ========== LOAD MENU ITEMS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Load menu on menu.html
    if (document.querySelector('.menu-page')) {
        const menuContainer = document.getElementById('menu-items');
        if (menuContainer) {
            menuContainer.innerHTML = '';
            menuItems.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'menu-item';
                itemDiv.innerHTML = `
                    <div class="item-icon">${item.icon}</div>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p class="price">₹${item.price}</p>
                    <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                `;
                menuContainer.appendChild(itemDiv);
            });

            document.querySelectorAll('.add-to-cart').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    const id = parseInt(e.target.dataset.id);
                    const item = menuItems.find(i => i.id === id);
                    
                    const user = localStorage.getItem('loggedInUser');
                    
                    if (!user) {
                        showLoginPopup(item);
                    } else {
                        addToCart(item);
                        e.target.textContent = '✓ Added';
                        setTimeout(() => e.target.textContent = 'Add to Cart', 1000);
                    }
                });
            });
        }
    }

    updateUIForLogin();
    updateCartCount();
    
    if (document.querySelector('.cart-page')) {
        displayCartItems();
    }
});

// ========== LOGIN POPUP FUNCTION ==========
function showLoginPopup(item) {
    let popup = document.getElementById('login-popup');
    
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'login-popup';
        popup.className = 'login-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <div class="popup-header">
                    <h3>Login Required</h3>
                    <button class="close-popup">&times;</button>
                </div>
                <div class="popup-body">
                    <p>Please login to add items to cart and order.</p>
                    <div class="popup-buttons">
                        <button class="btn popup-login">Login Now</button>
                        <button class="btn popup-cancel">Cancel</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(popup);
        
        const closeBtn = popup.querySelector('.close-popup');
        const cancelBtn = popup.querySelector('.popup-cancel');
        const loginBtn = popup.querySelector('.popup-login');
        
        closeBtn.addEventListener('click', () => {
            popup.remove();
        });
        
        cancelBtn.addEventListener('click', () => {
            popup.remove();
        });
        
        loginBtn.addEventListener('click', () => {
            sessionStorage.setItem('pendingItem', JSON.stringify(item));
            window.location.href = 'login.html';
        });
    }
    
    popup.style.display = 'flex';
}

// ========== CHECK FOR PENDING ITEM AFTER LOGIN ==========
function checkPendingItem() {
    const pendingItem = sessionStorage.getItem('pendingItem');
    if (pendingItem) {
        const item = JSON.parse(pendingItem);
        addToCart(item);
        sessionStorage.removeItem('pendingItem');
        alert(`${item.name} added to cart!`);
    }
}

// ========== CART FUNCTIONS ==========
function addToCart(item) {
    const existing = cart.find(cartItem => cartItem.id === item.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCartItems();
        }
    }
}

// ========== DISPLAY CART ITEMS ==========
function displayCartItems() {
    const cartContainer = document.getElementById('cart-items');
    const totalSpan = document.getElementById('cart-total');
    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="text-align:center;">Your cart is empty.</p>';
        if (totalSpan) totalSpan.textContent = '0';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="cart-item-icon">${item.icon || '🍽️'}</div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>₹${item.price} each</p>
            </div>
            <div class="cart-item-actions">
                <button class="decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase" data-id="${item.id}">+</button>
                <button class="remove" data-id="${item.id}">Remove</button>
            </div>
        `;
        cartContainer.appendChild(itemDiv);
    });

    if (totalSpan) totalSpan.textContent = total;

    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(parseInt(btn.dataset.id), -1));
    });
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(parseInt(btn.dataset.id), 1));
    });
    document.querySelectorAll('.remove').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id)));
    });
}

// ========== CHECKOUT & PAYMENT ==========
if (document.getElementById('checkout-btn')) {
    const checkoutBtn = document.getElementById('checkout-btn');
    const paymentSection = document.getElementById('payment-section');
    const qrSection = document.getElementById('qr-section');
    const cashMessage = document.getElementById('cash-message');
    const thankyouMsg = document.getElementById('thankyou-message');
    const paymentBtns = document.querySelectorAll('.payment-btn');

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        const user = localStorage.getItem('loggedInUser');
        if (!user) {
            alert('Please login to checkout!');
            window.location.href = 'login.html';
            return;
        }
        
        paymentSection.style.display = 'block';
        checkoutBtn.style.display = 'none';
    });

    paymentBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const method = e.target.dataset.method;
            qrSection.style.display = 'none';
            cashMessage.style.display = 'none';

            if (method === 'cash') {
                cashMessage.style.display = 'block';
                setTimeout(() => {
                    cart = [];
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartCount();
                    displayCartItems();
                    paymentSection.style.display = 'none';
                    checkoutBtn.style.display = 'block';
                    cashMessage.style.display = 'none';
                    alert('Thank you! Please pay at the counter.');
                }, 2000);
            } else {
                qrSection.style.display = 'block';
                const total = document.getElementById('cart-total').textContent;
                const qrImg = qrSection.querySelector('img');
                qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=agscafe@okhdfcbank&pn=AG%27s%20Cafe&am=${total}&cu=INR`;
                thankyouMsg.textContent = 'Thank you! After payment, your order will be prepared.';
                setTimeout(() => {
                    cart = [];
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartCount();
                    displayCartItems();
                    paymentSection.style.display = 'none';
                    checkoutBtn.style.display = 'block';
                    qrSection.style.display = 'none';
                    alert('Payment successful! Thank you.');
                }, 5000);
            }
        });
    });
}

// ========== LOGIN SIMULATION ==========
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            const name = email.split('@')[0];
            localStorage.setItem('loggedInUser', name);
            document.getElementById('login-message').textContent = 'Login successful! Redirecting...';
            
            setTimeout(() => {
                const pendingItem = sessionStorage.getItem('pendingItem');
                if (pendingItem) {
                    window.location.href = 'menu.html';
                } else {
                    window.location.href = 'index.html';
                }
            }, 1000);
        } else {
            alert('Please enter email and password.');
        }
    });
}

// ========== UPDATE UI BASED ON LOGIN STATE ==========
function updateUIForLogin() {
    const user = localStorage.getItem('loggedInUser');
    const loginLink = document.getElementById('login-link');
    const userGreeting = document.getElementById('user-greeting');
    const heroLogin = document.getElementById('hero-login');
    const heroOrder = document.getElementById('hero-order');

    if (user) {
        if (loginLink) loginLink.style.display = 'none';
        if (userGreeting) {
            userGreeting.style.display = 'block';
            userGreeting.textContent = `Welcome, ${user}!`;
        }
        if (heroLogin) heroLogin.style.display = 'none';
        if (heroOrder) heroOrder.style.display = 'inline-block';
    } else {
        if (loginLink) loginLink.style.display = 'inline';
        if (userGreeting) userGreeting.style.display = 'none';
        if (heroLogin) heroLogin.style.display = 'inline-block';
        if (heroOrder) heroOrder.style.display = 'none';
    }
}

// ========== CHECK FOR PENDING ITEM ON MENU PAGE LOAD ==========
if (document.querySelector('.menu-page')) {
    checkPendingItem();
}

// ========== INITIALISE ==========
updateCartCount();
updateUIForLogin();
