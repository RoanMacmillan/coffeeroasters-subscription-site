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


