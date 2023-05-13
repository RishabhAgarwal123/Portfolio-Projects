const signInBtn = document.getElementById('sign-in');
const signUpBtn = document.getElementById('sign-up');
const container = document.getElementById('container');

signUpBtn.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInBtn.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

const labels = document.querySelectorAll('.form-control label');

labels.forEach((label) => {
    label.innerHTML = label.innerHTML
        .split("")
        .map((letter, i) => `<span style='transition-delay: ${i * 50}ms'>${letter}</span>`)
        .join("");
});