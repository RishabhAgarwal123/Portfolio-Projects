// Lazy loading images is a technique used to defer the loading of images until they are needed, typically when they are about to 
// come into the viewport of the browser. This can significantly improve the initial loading time and overall performance of a web 
// page. Here's how you can implement lazy loading of images:

// 1. Using the loading attribute (HTML):
// In modern browsers, you can use the loading attribute with the value lazy to lazy load images. When the browser encounters this 
// attribute, it defers the loading of the image until it's about to be scrolled into view.
{/* <img src="placeholder.jpg" data-src="image-to-lazy-load.jpg" loading="lazy" alt="Description"> */ }

// 2. Using JavaScript:
// If you need to support older browsers or want more control over the lazy loading process, you can use JavaScript.
{/* <img src="placeholder.jpg" data-src="image-to-lazy-load.jpg" alt="Description" class="lazyload"> */ }

document.addEventListener("DOMContentLoaded", function () {
    var lazyloadImages = document.querySelectorAll(".lazyload");
    var lazyloadThrottleTimeout;

    function lazyload() {
        if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function () {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function (img) {
                if (img.offsetTop < (window.innerHeight + scrollTop)) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazyload');
                }
            });
            if (lazyloadImages.length == 0) {
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
});

// This script will load the images with the class lazyload when they are about to enter the viewport. Replace placeholder.jpg 
// with your placeholder image and image-to-lazy-load.jpg with the actual image you want to lazy load.

// 3. Using Intersection Observer API (JavaScript):
// Intersection Observer is a modern API that allows you to asynchronously observe changes in the intersection of a target element 
// with an ancestor element or with a top-level document's viewport.

document.addEventListener("DOMContentLoaded", function () {
    var lazyloadImages = document.querySelectorAll(".lazyload");
    var lazyloadObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazyload");
                lazyloadObserver.unobserve(img);
            }
        });
    });

    lazyloadImages.forEach(function (img) {
        lazyloadObserver.observe(img);
    });
});
// In this script, images with the class lazyload will be observed, and when they intersect with the viewport, they will start loading.