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




