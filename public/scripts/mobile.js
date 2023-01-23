const mobileMenuBtnElement = document.getElementById('app__mobile-menu-btn');
const mobileMenu = document.getElementById('app__mobile-menu');
let mobileFlag = false;

function toggle() {
  if (mobileFlag) {
    mobileMenu.classList.remove('show-menu');
    mobileFlag = false;
  } else {
    mobileMenu.classList.add('show-menu');
    mobileFlag = true;
  }
}

mobileMenuBtnElement.addEventListener('click', toggle);
