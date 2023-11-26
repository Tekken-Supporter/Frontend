const wrapper3 = document.querySelector('.wrapper_result')
const btnPopup3 = document.querySelector('.btnResult-popup');
const iconClose3 = document.querySelector('.icon-close3');

btnPopup3.addEventListener('click', () => { wrapper3.classList.add('active-popup'); });
iconClose3.addEventListener('click', () => { wrapper3.classList.remove('active-popup'); });

