// Home Page Specific Functionality

// Load Latest Events from Firebase
async function loadLatestEvents() {
    const container = document.getElementById('events-container');
    if (!container || typeof db === 'undefined') return;
    
    try {
        const snapshot = await db.collection('events')
            .where('date', '>=', new Date())
            .orderBy('date', 'asc')
            .limit(3)
            .get();
        
        if (snapshot.empty) return;
        
        container.innerHTML = '';
        
        snapshot.forEach(doc => {
            const event = doc.data();
            const eventDate = event.date.toDate();
            const day = eventDate.getDate();
            const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
            
            const eventCard = document.createElement('div');
            eventCard.className = 'card event-card scroll-reveal';
            eventCard.innerHTML = `
                <div class="event-date">
                    <span class="date-day">${day}</span>
                    <span class="date-month">${month}</span>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${event.title}</h3>
                    <p class="event-time">
                        <i class="ri-time-line"></i> ${event.time || 'TBA'}
                    </p>
                    <p class="card-text">${event.description.substring(0, 100)}...</p>
                    <a href="pages/events.html" class="btn btn-outline btn-sm">Learn More</a>
                </div>
            `;
            
            container.appendChild(eventCard);
        });
        
        // Re-initialize scroll reveal for new elements
        initScrollReveal();
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

// Load Latest Media from Firebase
async function loadLatestMedia() {
    const container = document.getElementById('latest-media');
    if (!container || typeof db === 'undefined') return;
    
    try {
        const snapshot = await db.collection('media')
            .orderBy('createdAt', 'desc')
            .limit(8)
            .get();
        
        if (snapshot.empty) {
            container.innerHTML = '<p class="text-center" style="grid-column: 1 / -1;">No media available yet.</p>';
            return;
        }
        
        container.innerHTML = '';
        
        snapshot.forEach(doc => {
            const media = doc.data();
            
            const mediaItem = document.createElement('div');
            mediaItem.className = 'media-item';
            
            if (media.type === 'video') {
                mediaItem.innerHTML = `
                    <img src="${media.thumbnail || media.url}" alt="${media.title}">
                    <div class="media-play-icon">
                        <i class="ri-play-fill"></i>
                    </div>
                    <div class="media-overlay">
                        <div class="media-info">
                            <h4>${media.title}</h4>
                            <p>${formatDate(media.createdAt.toDate())}</p>
                        </div>
                    </div>
                `;
            } else {
                mediaItem.innerHTML = `
                    <img src="${media.url}" alt="${media.title}">
                    <div class="media-overlay">
                        <div class="media-info">
                            <h4>${media.title}</h4>
                            <p>${formatDate(media.createdAt.toDate())}</p>
                        </div>
                    </div>
                `;
            }
            
            mediaItem.addEventListener('click', () => {
                openMediaModal(media);
            });
            
            container.appendChild(mediaItem);
        });
    } catch (error) {
        console.error('Error loading media:', error);
    }
}

// Open Media Modal
function openMediaModal(media) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('media-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'media-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Media Viewer</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body" id="media-modal-body">
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    const modalBody = document.getElementById('media-modal-body');
    
    if (media.type === 'video') {
        // Check if it's a YouTube or Vimeo URL
        let videoEmbed = '';
        if (media.url.includes('youtube.com') || media.url.includes('youtu.be')) {
            const videoId = media.url.includes('youtu.be') 
                ? media.url.split('/').pop() 
                : new URL(media.url).searchParams.get('v');
            videoEmbed = `<iframe src="https://www.youtube.com/embed/${videoId}" class="video-player" allowfullscreen></iframe>`;
        } else if (media.url.includes('vimeo.com')) {
            const videoId = media.url.split('/').pop();
            videoEmbed = `<iframe src="https://player.vimeo.com/video/${videoId}" class="video-player" allowfullscreen></iframe>`;
        } else {
            videoEmbed = `<video src="${media.url}" controls style="width: 100%; border-radius: var(--radius-md);"></video>`;
        }
        
        modalBody.innerHTML = `
            <div style="padding-bottom: 56.25%; position: relative; height: 0;">
                ${videoEmbed}
            </div>
            <h3 style="margin-top: var(--spacing-md);">${media.title}</h3>
            <p>${media.description || ''}</p>
        `;
    } else {
        modalBody.innerHTML = `
            <img src="${media.url}" alt="${media.title}" style="width: 100%; border-radius: var(--radius-md);">
            <h3 style="margin-top: var(--spacing-md);">${media.title}</h3>
            <p>${media.description || ''}</p>
        `;
    }
    
    const modalController = initModal('media-modal');
    modalController.open();
}

// Load Word for Today from Firebase
async function loadWordForToday() {
    if (typeof db === 'undefined') return;
    
    try {
        const snapshot = await db.collection('wordForToday')
            .orderBy('date', 'desc')
            .limit(1)
            .get();
        
        if (!snapshot.empty) {
            const word = snapshot.docs[0].data();
            const wordVerse = document.querySelector('.word-verse');
            const wordReference = document.querySelector('.word-reference');
            
            if (wordVerse && wordReference) {
                wordVerse.textContent = word.verse;
                wordReference.textContent = `- ${word.reference}`;
            }
        }
    } catch (error) {
        console.error('Error loading word for today:', error);
    }
}

// Initialize home page
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for Firebase to initialize
    setTimeout(() => {
        loadWordForToday();
        loadLatestEvents();
        loadLatestMedia();
    }, 500);
});
