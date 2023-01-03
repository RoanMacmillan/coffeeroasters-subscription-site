const modal = document.querySelector('.modal');


function toggleMobileMenu() {

    document.getElementById('mobile-menu').classList.toggle('transition');
    document.getElementById('open').classList.toggle('close');
    document.getElementById('close').classList.toggle('open');
    modal.classList.toggle('modal-transition');

    // Prevents scrolling when mobile menu is open //
    document.body.classList.toggle('disable');
}


// Opens and closes mobile menu //
document.querySelectorAll('.hamburger').forEach((btn) => {

    btn.addEventListener('click', () => {

        toggleMobileMenu();      
})
})

// Close mobile menu when clicking outside //
modal.addEventListener('click', () => {

    toggleMobileMenu();
})