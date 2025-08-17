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
// Sliding Page done


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

//Weight Chart

const ctx = document.getElementById('weightChart').getContext('2d');
const weightChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Weight (kg)',
            data: [],
            borderColor: 'blue',
            backgroundColor: 'lightblue',
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' }
        },
        scales: {
            y: { beginAtZero: false }
        }
    }
});

// Add weight data
function addWeight() {
    const weightInput = document.getElementById("weight");
    const weight = weightInput.value;
    if (weight) {
        // Add current date as label
        const today = new Date().toLocaleDateString();
        weightChart.data.labels.push(today);
        weightChart.data.datasets[0].data.push(weight);


        weightChart.update();


        weightInput.value = "";
    }
}