const numbers = document.querySelectorAll('.card-number');

numbers?.forEach((number) => {
    const increment = () => {
        const target = +number.getAttribute('data-target-number');
        const current = parseInt(number.innerHTML);

        if (current < target) {
            number.innerHTML = Math.floor(current + target / 100);
            setTimeout(increment, 10);
        } else number.innerHTML = target.toLocaleString();
    };

    increment();
})