const hamburgerBtn = document.querySelectorAll('.hamburger');
const navMenu = document.getElementById('mobile-menu');
const modal = document.querySelector('.modal');

const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');

const navBar = document.getElementById('mobile-nav-menu');


hamburgerBtn.forEach((btn) => {

    btn.addEventListener('click', () => {

        navMenu.classList.toggle('transition');
        openBtn.classList.toggle('close');
        closeBtn.classList.toggle('open');
        modal.classList.toggle('modal-transition');


        // modal.classList.toggle('open');
        
})


})




modal.addEventListener('click', () => {

    // modal.classList.remove('modal-transition');

        navMenu.classList.toggle('transition');
        openBtn.classList.toggle('close');
        closeBtn.classList.toggle('open');
        modal.classList.toggle('modal-transition');

})