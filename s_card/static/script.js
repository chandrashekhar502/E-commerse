// Mobile menu functionality
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
const overlay = document.getElementById('mobile-nav-overlay');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
        if (overlay) overlay.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    });
}

if (overlay) {
    overlay.addEventListener('click', () => {
        nav.classList.remove('active');
        overlay.classList.remove('active');
    });
}

// Close menu when clicking on links
const navLinks = document.querySelectorAll('#navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    });
});

// ====== SHOPPING CART FUNCTIONALITY ======

// Sample product data
const products = [
    { id: 1, name: 'Cartoon Astronaut T-Shirts', price: 118.19, image: '/static/img/products/f1.jpg' },
    { id: 2, name: 'Cartoon Astronaut T-Shirts', price: 118.19, image: '/static/img/products/f2.jpg' },
    { id: 3, name: 'Cartoon Astronaut T-Shirts', price: 118.19, image: '/static/img/products/f3.jpg' },
];

// Cart object to store cart items
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartDisplay();
    alert(product.name + ' added to cart!');
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
}

// Update item quantity
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            updateCartDisplay();
        }
    }
}

// Calculate cart totals
function calculateTotals() {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    const shipping = subtotal > 0 ? 0 : 0;
    const total = subtotal + shipping;
    
    return { subtotal, shipping, total };
}

// Update cart display on page
function updateCartDisplay() {
    const cartBody = document.querySelector('#cart tbody');
    const subtotalDiv = document.querySelector('#subtotal');
    
    if (!cartBody) return;
    
    // Clear existing rows
    cartBody.innerHTML = '';
    
    if (cart.length === 0) {
        cartBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">Your cart is empty</td></tr>';
    } else {
        cart.forEach(item => {
            const subtotal = (item.price * item.quantity).toFixed(2);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="javascript:removeFromCart(${item.id})"><i class="fa fa-times-circle" aria-hidden="true"></i></a></td>
                <td><img src="${item.image}" alt="${item.name}" style="max-width: 50px;"></td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><input type="number" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)" min="1"></td>
                <td>$${subtotal}</td>
            `;
            cartBody.appendChild(row);
        });
    }
    
    // Update totals
    if (subtotalDiv) {
        const { subtotal, shipping, total } = calculateTotals();
        subtotalDiv.innerHTML = `
            <h3>Cart Totals</h3>
            <table>
                <tr>
                    <td>Cart Subtotal</td>
                    <td>$${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Shipping</td>
                    <td>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</td>
                </tr>
                <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>$${total.toFixed(2)}</strong></td>
                </tr>
            </table>
            <button class="normal" onclick="checkout()">Proceed to Checkout</button>
        `;
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Proceeding to checkout with ' + cart.length + ' item(s)');
}

// Initialize cart display when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    
    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = parseInt(button.getAttribute('data-product-id'));
            addToCart(productId);
        });
    });
});
