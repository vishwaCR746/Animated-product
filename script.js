const imgSlider = document.querySelector('.img-slider');
const items = document.querySelectorAll('.item');
const imgItems = document.querySelectorAll('.img-item');
const infoItems = document.querySelectorAll('.info-item');

const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

let colors = ['#3674be', '#d26181', '#ceb13d', '#c6414c', '#171f2b', '#50aa61'];
let indexSlider = 0;
let index = 0;
let startX = 0;
let endX = 0;

const slider = () => {
    imgSlider.style.transform = `rotate(${indexSlider * 60}deg)`;

    items.forEach(item => {
        item.style.transform = `rotate(${indexSlider * -60}deg)`;
    });

    document.querySelector('.img-item.active').classList.remove('active');
    imgItems[index].classList.add('active');

    document.querySelector('.info-item.active').classList.remove('active');
    infoItems[index].classList.add('active');

    document.body.style.background = colors[index];
};

// Handle next and previous clicks
const nextSlide = () => {
    indexSlider++;
    index = (index + 1) % imgItems.length;
    slider();
};

const prevSlide = () => {
    indexSlider--;
    index = (index - 1 + imgItems.length) % imgItems.length;
    slider();
};

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Handle touch/swipe gestures for mobile users
document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
});

document.addEventListener('touchend', () => {
    let diff = startX - endX;
    if (Math.abs(diff) > 50) {  // Minimum swipe threshold
        if (diff > 0) {
            nextSlide();  // Swipe left → Next
        } else {
            prevSlide();  // Swipe right → Previous
        }
    }
});
