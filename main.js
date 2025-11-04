// Menu Data with more items and details
const menuData = [
    {
        id: 1,
        name: 'Truffle Arancini',
        description: 'Crispy risotto balls filled with mozzarella and black truffle, served with marinara sauce',
        price: 12.99,
        originalPrice: 15.99,
        category: 'starters',
        image: 'images/menu/Truffle Arancini.jpg',
        tags: ['vegetarian', 'chef-recommended'],
        isPopular: true
    },
    {
        id: 2,
        name: 'Crispy Calamari',
        description: 'Lightly fried calamari rings with lemon aioli and spicy marinara',
        price: 14.99,
        category: 'starters',
          image: 'images/menu/Fresh Lemonade.jpg',
        tags: ['seafood', 'crispy']
    },
    {
        id: 3,
        name: 'Grilled Salmon',
        description: 'Fresh Atlantic salmon with lemon butter sauce, asparagus, and roasted baby potatoes',
        price: 28.99,
        originalPrice: 32.99,
        category: 'mains',
        image: 'images/menu/Grilled Salmon (2).jpg',
        tags: ['seafood', 'healthy'],
        isPopular: true
    },
    {
        id: 4,
        name: 'Filet Mignon',
        description: '8oz grass-fed beef tenderloin with red wine reduction, truffle mashed potatoes, and seasonal vegetables',
        price: 42.99,
        category: 'mains',
        image: 'images/menu/Filet Mignon.jpg',
        tags: ['premium', 'chef-special']
    },
    {
        id: 5,
        name: 'Mushroom Risotto',
        description: 'Creamy arborio rice with wild mushrooms, white wine, and parmesan cheese',
        price: 22.99,
        category: 'mains',
        image: 'images/menu/Mushroom Risotto.jpg',
        tags: ['vegetarian', 'gluten-free'],
        isPopular: true
    },
    {
        id: 6,
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten center, served with vanilla bean ice cream',
        price: 10.99,
        category: 'desserts',
        image: 'images/menu/Chocolate Lava Cake.jpg',
        tags: ['chocolate', 'vegetarian']
    },
    {
        id: 7,
        name: 'Tiramisu',
        description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
        price: 9.99,
        category: 'desserts',
        image: 'images/menu/Tiramisu.jpg',
        tags: ['vegetarian', 'coffee']
    },
    {
        id: 8,
        name: 'Signature Cocktail',
        description: 'Our house special cocktail with premium vodka, elderflower liqueur, and fresh berries',
        price: 14.99,
        category: 'drinks',
        image: 'images/menu/Signature Cocktail.jpg',
        tags: ['alcoholic', 'signature']
    },
    {
        id: 9,
        name: 'Fresh Lemonade',
        description: 'Homemade lemonade with fresh mint and a hint of lavender',
        price: 5.99,
        category: 'drinks',
        image: 'images/menu/pexels-suju-1233319.jpg',
        tags: ['non-alcoholic', 'refreshing']
    }
];

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Menu Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter menu items
                menuItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Populate time slots for reservation
    const timeSelect = document.getElementById('time');
    if (timeSelect) {
        const startTime = 11 * 60; // 11:00 AM in minutes
        const endTime = 22 * 60;   // 10:00 PM in minutes
        const interval = 30;       // 30-minute intervals

        for (let minutes = startTime; minutes <= endTime; minutes += interval) {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            const timeString = `${displayHours}:${mins.toString().padStart(2, '0')} ${ampm}`;
            
            const option = document.createElement('option');
            option.value = timeString;
            option.textContent = timeString;
            timeSelect.appendChild(option);
        }
    }

    // Form Submission
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            const specialRequests = document.getElementById('specialRequests').value;
            
            // Here you would typically send this data to a server
            console.log('Reservation Details:', {
                name,
                email,
                phone,
                date,
                time,
                guests,
                specialRequests
            });
            
            // Show success message
            alert('Thank you for your reservation! We will contact you shortly to confirm.');
            this.reset();
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            
            // Here you would typically send this data to a server
            console.log('Contact Form Details:', {
                name,
                email,
                subject,
                message
            });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send this email to a server
            console.log('Newsletter Subscription:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Initialize menu functionality
    initMenu();
    
    // Initialize AOS (Animate On Scroll) if you want to add more animations
    // AOS.init();

    // Initialize Menu Functionality
    function initMenu() {
        const menuItemsContainer = document.getElementById('menuItems');
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        // Initial render
        renderMenuItems('all');
        
        // Add event listeners to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter menu items
                const filter = button.getAttribute('data-filter');
                renderMenuItems(filter);
                
                // Smooth scroll to menu section
                document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }
    
    // Render Menu Items
    function renderMenuItems(filter = 'all') {
        const menuItemsContainer = document.getElementById('menuItems');
        if (!menuItemsContainer) return;
        
        // Clear existing items
        menuItemsContainer.innerHTML = '';
        
        // Filter items based on category
        const filteredItems = filter === 'all' 
            ? menuData 
            : menuData.filter(item => item.category === filter);
        
        // Display message if no items found
        if (filteredItems.length === 0) {
            menuItemsContainer.innerHTML = `
                <div class="no-items">
                    <i class="fas fa-utensils"></i>
                    <h3>No items found in this category</h3>
                    <p>Please check back later or try another category</p>
                </div>
            `;
            return;
        }
        
        // Create and append menu items
        filteredItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = `menu-item ${item.category}${item.isPopular ? ' popular' : ''}`;
            menuItem.setAttribute('data-category', item.category);
            
            // Generate tags HTML
            let tagsHTML = '';
            if (item.tags && item.tags.length > 0) {
                tagsHTML = item.tags.map(tag => {
                    const tagClass = tag.toLowerCase().includes('veg') ? 'vegetarian' : 
                                    tag.toLowerCase().includes('gluten') ? 'gluten-free' :
                                    tag.toLowerCase().includes('spicy') ? 'spicy' : '';
                    return `<span class="tag ${tagClass}">${tag}</span>`;
                }).join('');
            }
            
            // Generate price HTML with original price if available
            let priceHTML = '';
            if (item.originalPrice) {
                priceHTML = `
                    <span class="price">$${item.price.toFixed(2)} <span>$${item.originalPrice.toFixed(2)}</span></span>
                `;
            } else {
                priceHTML = `<span class="price">$${item.price.toFixed(2)}</span>`;
            }
            
            // Create menu item HTML
            menuItem.innerHTML = `
                ${item.isPopular ? '<span class="popular-badge"><i class="fas fa-star"></i> Popular</span>' : ''}
                <div class="menu-item-img">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
                </div>
                <div class="menu-item-content">
                    <span class="menu-category">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
                    <div class="menu-item-header">
                        <h3>${item.name}</h3>
                        ${priceHTML}
                    </div>
                    <p>${item.description}</p>
                    <div class="menu-item-footer">
                        <div class="menu-item-tags">${tagsHTML}</div>
                        <button class="add-to-cart" data-id="${item.id}" title="Add to cart">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            `;
            
            menuItemsContainer.appendChild(menuItem);
        });
        
        // Add event listeners to add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const itemId = parseInt(button.getAttribute('data-id'));
                const item = menuData.find(item => item.id === itemId);
                
                if (item) {
                    addToCart(item);
                    showNotification(`${item.name} added to cart!`);
                    
                    // Add animation to button
                    button.innerHTML = '<i class="fas fa-check"></i>';
                    button.style.backgroundColor = '#4CAF50';
                    
                    // Reset button after animation
                    setTimeout(() => {
                        button.innerHTML = '<i class="fas fa-plus"></i>';
                        button.style.backgroundColor = '';
                    }, 1000);
                }
            });
        });
    }

    // Sample Testimonials Data
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Food Critic',
            content: 'The Gourmet Haven exceeded all my expectations. The flavors were exceptional and the service was impeccable. Highly recommended!',
            rating: 5,
            image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random'
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Regular Customer',
            content: 'I keep coming back for their amazing dishes. The quality and presentation are always top-notch. A true culinary gem!',
            rating: 5,
            image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=random'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'First-time Visitor',
            content: 'The atmosphere was wonderful and the food was even better. Will definitely be telling my friends about this place!',
            rating: 4,
            image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=random'
        }
    ];

    // Populate Testimonials
    const testimonialsContainer = document.getElementById('testimonialsSlider');
    if (testimonialsContainer) {
        testimonials.forEach(testimonial => {
            const ratingStars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
            
            const testimonialElement = document.createElement('div');
            testimonialElement.className = 'testimonial';
            testimonialElement.innerHTML = `
                <div class="testimonial-avatar">
                    <img src="${testimonial.image}" alt="${testimonial.name}">
                </div>
                <div class="testimonial-rating">${ratingStars}</div>
                <p class="testimonial-text">"${testimonial.content}"</p>
                <h4 class="testimonial-author">${testimonial.name}</h4>
                <p class="testimonial-role">${testimonial.role}</p>
            `;
            
            testimonialsContainer.appendChild(testimonialElement);
        });
    }

    // Shopping Cart Functionality
    let cart = [];
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            const item = menuData.find(item => item.id === itemId);
            
            if (item) {
                addToCart(item);
                showNotification(`${item.name} added to cart!`);
            }
        }
    });
    
    function addToCart(item) {
        cart.push(item);
        updateCartCount();
        // In a real app, you would update the cart UI here
    }
    
    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }
    
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove notification after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Set minimum date for reservation to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});