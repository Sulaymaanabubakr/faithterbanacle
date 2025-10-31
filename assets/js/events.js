// Events Page Functionality

let allEvents = [];
let currentFilter = 'all';

// Load Events from Firebase
async function loadEvents() {
    const container = document.getElementById('events-container');
    const loadingState = document.getElementById('loading-state');
    const emptyState = document.getElementById('empty-state');
    
    if (!container || typeof db === 'undefined') {
        loadingState.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    try {
        const snapshot = await db.collection('events')
            .orderBy('date', 'asc')
            .get();
        
        loadingState.style.display = 'none';
        
        if (snapshot.empty) {
            // Show sample events if no data
            displaySampleEvents();
            return;
        }
        
        allEvents = [];
        snapshot.forEach(doc => {
            allEvents.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        displayEvents(allEvents);
        container.style.display = 'grid';
    } catch (error) {
        console.error('Error loading events:', error);
        loadingState.style.display = 'none';
        displaySampleEvents(); // Fallback to sample events
    }
}

// Display Events
function displayEvents(events) {
    const container = document.getElementById('events-container');
    const emptyState = document.getElementById('empty-state');
    
    if (events.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    container.innerHTML = '';
    emptyState.style.display = 'none';
    container.style.display = 'grid';
    
    const now = new Date();
    
    events.forEach(event => {
        const eventDate = event.date.toDate ? event.date.toDate() : new Date(event.date);
        const isPast = eventDate < now;
        
        const day = eventDate.getDate();
        const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
        const fullDate = eventDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card scroll-reveal';
        eventCard.dataset.category = event.category || 'service';
        eventCard.dataset.status = isPast ? 'past' : 'upcoming';
        
        eventCard.innerHTML = `
            <div class="event-image">
                <img src="${event.image || '../assets/images/event-placeholder.jpg'}" alt="${event.title}">
                <div class="event-badge ${isPast ? 'past' : ''}">${isPast ? 'Past' : 'Upcoming'}</div>
                <div class="event-date-badge">
                    <div class="event-date-day">${day}</div>
                    <div class="event-date-month">${month}</div>
                </div>
            </div>
            <div class="event-content">
                <div class="event-category">${event.category || 'Event'}</div>
                <h3 class="event-title">${event.title}</h3>
                <div class="event-meta">
                    <div class="event-meta-item">
                        <i class="ri-calendar-line"></i>
                        <span>${fullDate}</span>
                    </div>
                    <div class="event-meta-item">
                        <i class="ri-time-line"></i>
                        <span>${event.time || 'TBA'}</span>
                    </div>
                    <div class="event-meta-item">
                        <i class="ri-map-pin-line"></i>
                        <span>${event.location || 'Faith Tabernacle'}</span>
                    </div>
                </div>
                <p class="event-description">${event.description}</p>
                <div class="event-footer">
                    <div class="event-attendees">
                        <i class="ri-group-line"></i>
                        <span>${event.attendees || 0} registered</span>
                    </div>
                    ${!isPast ? `<button class="btn btn-primary btn-sm" onclick="openRegistration('${event.id}', '${event.title}')">
                        <i class="ri-user-add-line"></i> Register
                    </button>` : ''}
                </div>
            </div>
        `;
        
        container.appendChild(eventCard);
    });
    
    // Re-initialize scroll reveal
    if (typeof initScrollReveal === 'function') {
        initScrollReveal();
    }
}

// Display Sample Events (fallback)
function displaySampleEvents() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    // Calculate upcoming dates dynamically
    const christmasYear = currentMonth >= 11 && now.getDate() > 25 ? currentYear + 1 : currentYear;
    const newYearYear = currentMonth >= 11 ? currentYear + 1 : currentYear;
    
    const sampleEvents = [
        {
            id: 'sample-1',
            title: 'Christmas Celebration',
            description: 'Join us for a special Christmas service celebrating the birth of our Lord and Savior Jesus Christ. Experience the joy of the season with worship, carols, and a powerful message.',
            date: new Date(christmasYear, 11, 25),
            time: '9:00 AM - 1:00 PM',
            location: 'Faith Tabernacle Main Auditorium',
            category: 'service',
            image: '../assets/images/christmas-event.jpg',
            attendees: 150
        },
        {
            id: 'sample-2',
            title: 'New Year Prayer Summit',
            description: 'Begin the new year with intensive prayer and fasting. Seek God\'s face for direction, breakthrough, and blessings for the year ahead.',
            date: new Date(newYearYear, 0, 7),
            time: '6:00 AM - 12:00 PM',
            location: 'Faith Tabernacle',
            category: 'conference',
            image: '../assets/images/prayer-summit.jpg',
            attendees: 85
        },
        {
            id: 'sample-3',
            title: 'Youth Conference ' + (newYearYear),
            description: 'An empowering conference for young people to discover their purpose, develop their potential, and make an impact in their generation.',
            date: new Date(newYearYear, 1, 14),
            time: '10:00 AM - 5:00 PM',
            location: 'Conference Center',
            category: 'conference',
            image: '../assets/images/youth-conference.jpg',
            attendees: 200
        },
        {
            id: 'sample-4',
            title: 'Community Outreach',
            description: 'Join us as we reach out to our community with food, clothing, and the love of Christ. Be a blessing to those in need.',
            date: new Date(currentMonth < 3 ? currentYear : currentYear + 1, 2, 10),
            time: '8:00 AM - 2:00 PM',
            location: 'Various Locations',
            category: 'outreach',
            image: '../assets/images/outreach.jpg',
            attendees: 50
        },
        {
            id: 'sample-5',
            title: 'Easter Service',
            description: 'Celebrate the resurrection of Jesus Christ with us. A powerful service of worship, praise, and thanksgiving.',
            date: new Date(currentMonth < 4 ? currentYear : currentYear + 1, 3, 20),
            time: '7:00 AM & 9:30 AM',
            location: 'Faith Tabernacle',
            category: 'service',
            image: '../assets/images/easter-service.jpg',
            attendees: 300
        },
        {
            id: 'sample-6',
            title: 'Marriage Retreat',
            description: 'A special weekend retreat for couples to strengthen their marriages, rekindle romance, and build lasting relationships.',
            date: new Date(currentMonth < 5 ? currentYear : currentYear + 1, 4, 15),
            time: 'Fri 6:00 PM - Sun 4:00 PM',
            location: 'Retreat Center',
            category: 'conference',
            image: '../assets/images/marriage-retreat.jpg',
            attendees: 40
        }
    ];
    
    displayEvents(sampleEvents);
}

// Filter Events
function filterEvents(filterType) {
    currentFilter = filterType;
    
    let filteredEvents = allEvents;
    const now = new Date();
    
    if (filterType === 'upcoming') {
        filteredEvents = allEvents.filter(event => {
            const eventDate = event.date.toDate ? event.date.toDate() : new Date(event.date);
            return eventDate >= now;
        });
    } else if (filterType === 'past') {
        filteredEvents = allEvents.filter(event => {
            const eventDate = event.date.toDate ? event.date.toDate() : new Date(event.date);
            return eventDate < now;
        });
    } else if (filterType !== 'all') {
        filteredEvents = allEvents.filter(event => event.category === filterType);
    }
    
    displayEvents(filteredEvents);
}

// Open Registration Modal
function openRegistration(eventId, eventTitle) {
    const modal = initModal('registration-modal');
    document.getElementById('reg-event-id').value = eventId;
    document.getElementById('reg-event-title').value = eventTitle;
    modal.open();
}

// Handle Registration Form
document.addEventListener('DOMContentLoaded', () => {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterEvents(button.dataset.filter);
        });
    });
    
    // Registration form
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const button = e.target.querySelector('button[type="submit"]');
            button.disabled = true;
            button.innerHTML = '<i class="ri-loader-4-line"></i> Registering...';
            
            const formData = {
                eventId: document.getElementById('reg-event-id').value,
                eventTitle: document.getElementById('reg-event-title').value,
                name: document.getElementById('reg-name').value,
                email: document.getElementById('reg-email').value,
                phone: document.getElementById('reg-phone').value,
                attendees: parseInt(document.getElementById('reg-attendees').value),
                registeredAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            try {
                if (typeof db !== 'undefined') {
                    await db.collection('eventRegistrations').add(formData);
                    showToast('Registration successful! We look forward to seeing you.', 'success');
                    registrationForm.reset();
                    const modal = initModal('registration-modal');
                    modal.close();
                } else {
                    showToast('Registration system is currently unavailable.', 'error');
                }
            } catch (error) {
                console.error('Registration error:', error);
                showToast('Failed to register. Please try again.', 'error');
            } finally {
                button.disabled = false;
                button.innerHTML = '<i class="ri-check-line"></i> Register';
            }
        });
    }
    
    // Load events
    setTimeout(() => {
        loadEvents();
    }, 500);
});
