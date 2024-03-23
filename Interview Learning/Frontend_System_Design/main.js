document.addEventListener('DOMContentLoaded', function() {
    let acc = document.getElementsByClassName("accordion");
    let i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            // Toggle accordion active state
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                // Set panel height to its scroll height
                panel.style.maxHeight = panel.scrollHeight + "px";
            }

            // Toggle arrow rotation
            var arrow = this.querySelector('.arrow');
            arrow.classList.toggle('rotate');
        });
    }
});
