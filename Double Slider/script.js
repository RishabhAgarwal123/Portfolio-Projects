const slider = document.querySelector('.container');
const leftSlider = document.querySelector('.slider-left');
const rightSlider = document.querySelector('.slider-right');
const upBtn = document.querySelector('.button-up');
const downBtn = document.querySelector('.button-down');
const slidesLength = rightSlider.querySelectorAll('div').length;

let activeSlide = 0;

leftSlider.style.top = `-${(slidesLength - 1) * 100}vh`;
upBtn.addEventListener('click', () => changeSlide('up'));
downBtn.addEventListener('click', () => changeSlide('down'));

const changeSlide = (direction) => {
    const sliderHeight = slider.clientHeight;

    if (direction === 'up') {
        activeSlide++;
        if (activeSlide > slidesLength - 1) activeSlide = 0;
    } else if (direction === 'down') {
        activeSlide--;
        if (activeSlide < 0) activeSlide = slidesLength - 1;
    }

    rightSlider.style.transform = `translateY(-${activeSlide * sliderHeight}px)`;
    leftSlider.style.transform = `translateY(${activeSlide * sliderHeight}px)`;
}