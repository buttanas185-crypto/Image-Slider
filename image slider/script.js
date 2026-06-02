const spinner = document.getElementById('spinner');
const sliderInterface = document.getElementById('slider-interface');
const track = document.getElementById('slider-track');
const paginationContainer = document.getElementById('pagination');
const prevBtn = document.querySelector('.nav-arrow.prev');
const nextBtn = document.querySelector('.nav-arrow.next');

let slides = [];
let indicators = [];
let currentIndex = 0;

async function fetchSliderData() {
    try {
        
        const mockAPIResponse = [
            {
                img: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=1200&auto=format&fit=crop",
                title: "Cosmic Nebula",
                desc: "Dive deep into vibrant celestial light paths."
            },
            {
                img: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop",
                title: "Fluid Art",
                desc: "Dynamic digital color patterns mixing seamlessly."
            },
            {
                img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop",
                title: "Ocean Serenity",
                desc: "Relax beside beautiful, quiet coastal tides."
            }
        ];

        renderSlider(mockAPIResponse);
        
    } catch (error) {
        spinner.innerText = "Error loading dynamic content assets.";
        console.error("Slider data stream failed:", error);
    }
}

function renderSlider(data) {
    track.innerHTML = data.map(item => `
        <div class="slide">
            <img src="${item.img}" alt="${item.title}">
            <div class="slide-content">
                <h2>${item.title}</h2>
                <p>${item.desc}</p>
            </div>
        </div>
    `).join('');

    slides = document.querySelectorAll('.slide');

    createPagination();

    initializeControls();

    spinner.style.display = 'none';
    sliderInterface.style.display = 'block';
}

function createPagination() {
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        
        indicator.addEventListener('click', () => {
            currentIndex = index;
            scrollToSlide(currentIndex);
        });
        
        paginationContainer.appendChild(indicator);
    });
    
    indicators = document.querySelectorAll('.indicator');
}

function scrollToSlide(index) {
    slides[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
    });
    
    updateIndicators(index);
}

function updateIndicators(activeIndex) {
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === activeIndex);
    });
}

function initializeControls() {
    nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; 
        }
        scrollToSlide(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1; // Loop back around to end
        }
        scrollToSlide(currentIndex);
    });

    track.addEventListener('scroll', () => {
        const trackWidth = track.offsetWidth;
        if (trackWidth === 0) return; 
        
        const computedIndex = Math.round(track.scrollLeft / trackWidth);
        
        if (computedIndex !== currentIndex && computedIndex >= 0 && computedIndex < slides.length) {
            currentIndex = computedIndex;
            updateIndicators(currentIndex);
        }
    });
}

document.addEventListener('DOMContentLoaded', fetchSliderData);