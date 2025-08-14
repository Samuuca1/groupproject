const dietHeader = document.querySelector('#diet-header');
const workoutHeader = document.querySelector('#workout-header');
const quoteHeader = document.querySelector('#quote-header');

const tooltipDiet = document.querySelector('#tooltip-diet');
const tooltipWorkout = document.querySelector('#tooltip-workout');
const tooltipQuote = document.querySelector('#tooltip-quote');

//Sliding Page
let currentSlide = 0;
const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

document.getElementById('next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
});

document.getElementById('prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
});

function updateSlide() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}
//Sliding Page done


function setupTooltip(trigger, tooltip) {
    tooltip.style.display = 'none';
    let popperInstance = null;

    function show() {
        tooltip.style.display = 'block';
        popperInstance = Popper.createPopper(trigger, tooltip, {
            placement: 'top',
            modifiers: [
                { name: 'offset', options: { offset: [0, 8] } }
            ]
        });
    }

    function hide() {
        tooltip.style.display = 'none';
        if (popperInstance) {
            popperInstance.destroy();
            popperInstance = null;
        }
    }

    trigger.addEventListener('mouseenter', show);
    trigger.addEventListener('mouseleave', hide);
}

// Apply tooltips
setupTooltip(dietHeader, tooltipDiet);
setupTooltip(workoutHeader, tooltipWorkout);
setupTooltip(quoteHeader, tooltipQuote);