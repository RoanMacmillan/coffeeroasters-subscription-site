    // Plan choices
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






    // Card selection
    const accordionContainers = document.querySelectorAll('.accordion-body-container');
    accordionContainers.forEach(container => {
    const cards = container.querySelectorAll('.accordion-body-card');
    
        cards.forEach(card => {
            card.addEventListener('click', function () {
                // Toggles active classes on choice cards  
                cards.forEach(card => card.classList.remove('active-choice'));
                this.classList.add('active-choice');
                const h4 = this.querySelector('h4');
                const content = h4.innerHTML;
                // Get the target element selector from the data-target attribute
                const targetSelector = container.getAttribute('data-target');
                const target = document.querySelector(targetSelector);
                // Inserts user choices into summary inner html
                target.innerHTML = content;
            });
        });
    });


    // Updates grind plan option if capsule is selected in step one
const firstThreeCards = document.querySelectorAll('.accordion-body-container:nth-of-type(-n+3) .accordion-body-card');
const groundContainer = document.getElementById('groundContainer');
const capsuleChoice = document.getElementById('capsuleChoice');


    function updateGroundContainer() {

        if (capsuleChoice.classList.contains('active-choice')) {
            const activeGroundCards = document.querySelectorAll('.groundCard');
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
    function updatePlanBtn() {
        // Loops through each selection card
        for (let i = 0; i < accordionContainers.length; i++) {
            // If the user hasn't selected enough options on the required sections the plan button stays disabled
            if (i === 0 || i === 1 || i === 2 || i === 4) {
                if (accordionContainers[i].querySelectorAll('.accordion-body-card.active-choice').length === 0) {
                    planBtn.classList.remove('activeBtn');
                    return;
                }
            }
        }
        // If the user has successfully completed the selection the plan button becomes enabled
        planBtn.classList.add('activeBtn');
        planBtn.removeAttribute('disabled');
    }
    
    accordion.addEventListener('click', updatePlanBtn);




// Desktop navigation menu
const desktopNavMenu = document.querySelector('.desktop-nav-menu');
const navMenuItems = desktopNavMenu.querySelectorAll('p');

navMenuItems.forEach(item => {
    item.addEventListener('click', function () {
        this.classList.toggle('active-heading');

        const index = this.dataset.target;
        const accordionHeading = accordionHeadings[index];
        // Scrolls to top of corresponding section when choice is clicked on the menu
        window.scrollTo({
            top: accordionHeading.offsetTop,
            behavior: 'smooth'


        });

        // remove active class from all elements
        navMenuItems.forEach(navItem => navItem.classList.remove('activeDesktopMenu'));
        // add active class to the clicked element
        this.classList.add('activeDesktopMenu');
    });
});


// Get the first accordion heading element
const firstAccordionHeading = document.querySelector('.guide-container')

// Get the desktop nav menu element

function toggleFixedNav() {
  // Get the position of the first accordion heading
  const firstAccordionHeadingPosition = firstAccordionHeading.getBoundingClientRect().bottom;

  // Check if the user has scrolled past the first accordion heading
  if (firstAccordionHeadingPosition <= 0) {
    // If so, add the 'fixed' class
    desktopNavMenu.classList.add('fixed');
  } else {
    // If not, remove the 'fixed' class
    desktopNavMenu.classList.remove('fixed');
  }
}

// Call the function on the window's scroll event
window.onscroll = toggleFixedNav;