// Modal and mobile menu

const modal = document.querySelector('.modal');
let menuOpen = false;

// Toggles menu, modal and hamburger icons
function toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const openBtn = document.getElementById('open');
    const closeBtn = document.getElementById('close');
    mobileMenu.classList.toggle('transition');
    openBtn.classList.toggle('close');
    closeBtn.classList.toggle('open');
    modal.classList.toggle('modal-transition');
}

// Disables scroll if menu is opened
function toggleMenuAndBodyScroll(enable) {
    toggleMenu();
    if (enable) {
        document.body.classList.add('disable-scroll');
    } else {
        document.body.classList.remove('disable-scroll');
    }
}

const hamburgers = document.querySelectorAll('.hamburger');

hamburgers.forEach((btn) => {
    btn.addEventListener('click', () => {
        menuOpen = !menuOpen;
        toggleMenuAndBodyScroll(menuOpen);
    });
})


// Close mobile menu when clicking outside 
if (modal) {
    modal.addEventListener('click', () => {
        menuOpen = !menuOpen;
        toggleMenuAndBodyScroll(menuOpen);
    });
}

// Close mobile menu when resizing to a minimum width of 700px
window.addEventListener('resize', () => {
    if (window.innerWidth >= 700 && menuOpen) {
        menuOpen = false;
        toggleMenuAndBodyScroll(false);
    }
});


// Accordion

const instructionsMsg = document.getElementById('instructions');
const yourPlan = document.getElementById('yourPlan');

const accordion = document.querySelector('.accordion');
const accordionHeadings = accordion.querySelectorAll('.accordion-heading');

accordionHeadings.forEach(heading => {
    heading.addEventListener('click', function () {
        // Removes guide message and displays your customized plan
        instructionsMsg.style.display = 'none';
        yourPlan.style.display = 'block';
        // Toggles active states for the accordion heading
        this.classList.toggle('active-heading');
        // Displays or hides accordion content when clicked
        const accordionBody = this.nextElementSibling;
        accordionBody.classList.toggle('accordion-body-open');
        // Scrolls to corresponding accordion section when opened
        if (accordionBody.classList.contains('accordion-body-open')) {
            window.scrollTo({
                top: this.offsetTop,
                behavior: 'smooth'
            });

        }

    });
});


const accordionContainers = document.querySelectorAll('.accordion-body-container');
accordionContainers.forEach(container => {
    const cards = container.querySelectorAll('.accordion-body-card');

    cards.forEach(card => {
        card.addEventListener('click', function () {

            cards.forEach(card => card.classList.remove('active-choice'));
            this.classList.add('active-choice');

            // Find the nearest ancestor element that matches the selector '.accordion-body-container'
            const clickedContainer = this.closest('.accordion-body-container');

            // Select the h4 element within the clicked card
            const h4 = this.querySelector('h4');

            // Get the content of the h4 element
            const content = h4.innerHTML;

            let target;
            if (clickedContainer === accordionContainers[0]) {
                target = document.querySelector('.coffeeMethod');
            } else if (clickedContainer === accordionContainers[1]) {
                target = document.querySelector('.beanType');
            } else if (clickedContainer === accordionContainers[2]) {
                target = document.querySelector('.coffeeAmount');

            } else if (clickedContainer === accordionContainers[3]) {

                target = document.querySelector('.groundType');

            } else if (clickedContainer === accordionContainers[4]) {

                target = document.querySelector('.frequency');

            }

            target.innerHTML = content;

        });
    });
});

// Updates grind plan option if capsule is selected in step one
const firstThreeCards = document.querySelectorAll('.accordion-body-container:nth-of-type(-n+3) .accordion-body-card');
const groundContainer = document.getElementById('groundContainer');
const capsuleChoice = document.getElementById('capsuleChoice');

 function updateGroundContainer () {
       
        if (capsuleChoice.classList.contains('active-choice')) {
            const activeGroundCards = document.querySelectorAll('.bonk');
            activeGroundCards.forEach(aCard => {
            // Removes active class from cards in grind section
            aCard.classList.remove('active-choice');
            })
            const activeGroundBody = document.querySelector('.groundBody');
            // closes grind container
            activeGroundBody.classList.remove('accordion-body-open');
            // removes active classes on grind heading
            groundContainer.classList.remove('active-heading');
            // disables grind accordion option
            groundContainer.classList.add('test');
            // removes ground choice from summary if capsule choice is selected
            document.querySelector('.groundType').innerHTML = '...';
        } else {
            groundContainer.classList.remove('test');
        }

    }
    firstThreeCards.forEach(card => {
        card.addEventListener('click', updateGroundContainer);
      });





// Function to determine whether the user has succesfully created a plan
const planBtn = document.getElementById('plan-button');
const accordionBodyContainers = document.querySelectorAll('.accordion-body-container');

function updatePlanBtn() {

// Loops through each selection card
  for (let i = 0; i < accordionBodyContainers.length; i++) {
// If the user hasn't selected enough options on the requried sections the plan button stays disabled
    if (i === 0 || i === 1 || i === 2 || i === 4) {
      if (accordionBodyContainers[i].querySelectorAll('.accordion-body-card.active-choice').length === 0) {
        planBtn.classList.remove('activeBtn');
        return;
      }
    }
  }
  // If the user has successfully completed the selection the plan button becomes enabled
  planBtn.classList.add('activeBtn');
}

accordion.addEventListener('click', updatePlanBtn);