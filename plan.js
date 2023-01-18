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

    function updateGroundContainer() {

        if (capsuleChoice.classList.contains('active-choice')) {
            const activeGroundCards = document.querySelectorAll('.groundCard');
            activeGroundCards.forEach(aCard => {
                // Removes active class from cards in grind section
                aCard.classList.remove('active-choice');
            })
            document.getElementById('cChange').innerHTML = 'using';
            const activeGroundBody = document.querySelector('.groundBody');
            // closes grind container
            activeGroundBody.classList.remove('accordion-body-open');
            // removes active classes on grind heading
            groundContainer.classList.remove('active-heading');
            // disables grind accordion option
            document.getElementById('grindP').classList.add('test');
            groundContainer.classList.add('test');
            // removes ground choice from summary if capsule choice is selected
            document.querySelector('.groundType').innerHTML = '';
            document.getElementById('removeGround').innerHTML = '';
            // removes active class on menu option 04
            document.querySelector('.grindSpan').classList.remove('active-text');
        } else {
            // adds required ground option text to summary container
            document.querySelector('.groundType').innerHTML = '...';
            document.getElementById('removeGround').innerHTML = ' ground ala ';
            document.getElementById('comma').innerHTML = ',';
            document.getElementById('cChange').innerHTML = 'as';
            // enables ground options when capsule is not selected
            groundContainer.classList.remove('test');
            document.getElementById('grindP').classList.remove('test');
            document.getElementById('grindP').classList.remove('activeDesktopMenu');


        }
    }

    firstThreeCards.forEach(card => {
      card.addEventListener('click', updateGroundContainer);
  });


// function to check whether the user has completed the required steps
function updatePlanBtn() {
  // Count active sections with index < 5
  let activeSections = [...accordionContainers].filter((container, i) => 
    i < 5 && container.querySelectorAll('.accordion-body-card.active-choice').length > 0
  ).length;
  // Minimum choices are 4 if capsule is selected, other wise 5 selections must be made
  let minimumSections = document.getElementById("capsuleChoice").classList.contains("active-choice") ? 4 : 5;
  // Check if active sections is greater than or equal to minimum sections
  if(activeSections >= minimumSections){
  // enables plan button if user has correctly filled out sections
      planBtn.classList.add('activeBtn');
      planBtn.removeAttribute('disabled');
  }else{
    // if not plan button stays/becomes disabled
      planBtn.classList.remove('activeBtn');
  }
}

accordion.addEventListener('click', updatePlanBtn);

// Desktop navigation menu
const desktopNavMenu = document.querySelector('.desktop-nav-menu');
const navMenuItems = desktopNavMenu.querySelectorAll('p');
let activeTimeout;
navMenuItems.forEach(item => {
    item.addEventListener('click', function () {
        this.classList.toggle('active-heading');
        // Updates order summary
        instructionsMsg.style.display = 'none';
        yourPlan.style.display = 'block';
        const index = this.dataset.target;
        const accordionHeading = accordionHeadings[index];
        // adds active class to corresponding accordion heading
        accordionHeading.classList.add('active-heading');
        // opens corresponding accordion option when the same menu option is clicked
        accordionHeading.nextElementSibling.classList.add('accordion-body-open');
        // Scrolls to top of corresponding section when choice is clicked on the menu
        window.scrollTo({
            top: accordionHeading.offsetTop,
            behavior: 'smooth'
        });
        // clears timeout on active class if another element is clicked
        clearTimeout(activeTimeout);
        // remove active class from all elements
        navMenuItems.forEach(navItem => navItem.classList.remove('activeDesktopMenu'));
        // add active class to the clicked element
        this.classList.add('activeDesktopMenu');
        // active class on element is removed after 1 second
        activeTimeout = setTimeout(() => {
            navMenuItems.forEach(navItem => navItem.classList.remove('activeDesktopMenu'));
        }, 800);
    });
});


// desktop nav menu becomes fixed when scrolling past guide container
const endOfContainer = document.querySelector('.guide-container')
function toggleFixedNav() {
  // Get the position of the guide container
  const containerPosition = endOfContainer.getBoundingClientRect().bottom;
  // Check if the user has scrolled past the guide container
  if (containerPosition <= 0) {
    // If so, add the 'fixed' class
    desktopNavMenu.classList.add('fixed');
  } else {
    // If not, remove the 'fixed' class
    desktopNavMenu.classList.remove('fixed');
  }
}
// Call the function on the window's scroll event
window.onscroll = toggleFixedNav;


// Updates desktop nav menu step numbers when a section card is clicked
accordion.addEventListener('click', e => {
  if (e.target.classList.contains('activeMethod')) {
    
    const target = document.querySelector('.prefSpan');
    target.classList.add('active-text');
  } else  if (e.target.classList.contains('activeType')) {
    
    const target = document.querySelector('.beanSpan');
    target.classList.add('active-text');
  } else  if (e.target.classList.contains('activeAmount')) {
    
    const target = document.querySelector('.quantitySpan');
    target.classList.add('active-text');
  }else  if (e.target.classList.contains('activeGround')) {
    
    const target = document.querySelector('.grindSpan');
    target.classList.add('active-text');
  }else  if (e.target.classList.contains('activeFrequency')) {
    
    const target = document.querySelector('.deliverySpan');
    target.classList.add('active-text');
  }
});

let selectedWeight;
let selectedFrequency;
// Object that stores prices for amounts/frequency
const prices = {
  "250g": {
    "Every Week": {
      "pricePerShipment": 7.20,
      "perMonthCost": 7.20 * 4
    },
    "Every 2 weeks": {
      "pricePerShipment": 9.60,
      "perMonthCost": 9.60 * 2
    },
    "Every month": {
      "pricePerShipment": 12.00,
      "perMonthCost": 12.00
    }
  },
  "500g": {
    "Every Week": {
      "pricePerShipment": 13.00,
      "perMonthCost": 13.00 * 4
    },
    "Every 2 weeks": {
      "pricePerShipment": 17.50,
      "perMonthCost": 17.50 * 2
    },
    "Every month": {
      "pricePerShipment": 22.00,
      "perMonthCost": 22.00
    }
  },
  "1000g": {
    "Every Week": {
      "pricePerShipment": 22.00,
      "perMonthCost": 22.00 * 4
    },
    "Every 2 weeks": {
      "pricePerShipment": 32.00,
      "perMonthCost": 32.00 * 2
    },
    "Every month": {
      "pricePerShipment": 42.00,
      "perMonthCost": 42.00
    }
  }
}

// add event listener to parent container
accordion.addEventListener('click', event => {
    
    let target = event.target.closest('.amountCard, .lastType');
    if (!target) return;
    if (target.classList.contains('amountCard')) {
      // saves user selected coffee amount to variable e.g 250G 
      selectedWeight = target.dataset.weight;
    } else if (target.classList.contains('lastType')) {
    // saves user selected delivery frequency to variable e.g every 2 weeks
      selectedFrequency = target.dataset.frequency;
    }
    //calls the function when users clicks on each of the 6 choices 
    updatePrice();
  });

// Calculates total cost depending on user choices
function updatePrice() {
  // const pricePerShipment = prices[selectedWeight][selectedFrequency].pricePerShipment;
  const perMonthCost = prices[selectedWeight][selectedFrequency].perMonthCost;

  // target element
  const priceTarget = document.querySelector('.total-cost');
  const cardTarget = document.querySelectorAll('.card-total');
  // inserts the total cost into the target element in the summary modal
  priceTarget.textContent = `$${perMonthCost}/month`;
  // inserts price per shipment to corresponding target card element
  cardTarget[0].innerHTML = `$${prices[selectedWeight]['Every Week'].pricePerShipment}`;
  cardTarget[1].innerHTML = `$${prices[selectedWeight]['Every 2 weeks'].pricePerShipment}`;
  cardTarget[2].innerHTML = `$${prices[selectedWeight]['Every month'].pricePerShipment}`;


}