document.addEventListener("DOMContentLoaded", function() {
    var swiper1 = new Swiper('.swiper-herobanner', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.swiper-pagination1',
            clickable: true,
        },
        loop: true, // Enable loop mode
        autoplay: {
        delay: 7000, // Delay between transitions (in ms)
        disableOnInteraction: false, // Stop autoplay on user interaction
        },
        on: {
        init: function() {
            var firstSlide = this.slides[0];
            firstSlide.classList.add('zoomed');
        },
        slideChangeTransitionStart: function() {
            var currentSlide = this.slides[this.activeIndex];
            var zoomedSlide = this.slides[this.previousIndex];
            
            if (zoomedSlide) {
            zoomedSlide.classList.remove('zoomed');
            }
            
            currentSlide.classList.add('zoomed');
        }
        }
    });  

    const swiper2 = new Swiper('#swiper2', {
        // Optional parameters
        direction: 'horizontal',
        grid: {
          rows: 2,
        },
        spaceBetween: 30,
        loop: false,
    
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
        },
    
        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },

        // Pagination
        pagination: {
            el: '.swiper-pagination2',
            clickable: true,
        },

        // Responsive breakpoints
        breakpoints: {
            // when window width is <= 768px
            1024: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is <= 480px
            510: {
                slidesPerView: 1,
                spaceBetween: 10
            }
        }
    });
    
    const swiper3 = new Swiper('#swiper3', {
        // Optional parameters
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
    
        // Pagination
        pagination: {
            el: '.swiper-pagination3',
            clickable: true,
        },
    
        // Navigation arrows
        navigation: {
            nextEl: '.swiper2-next',
            prevEl: '.swiper2-prev',
        },
    
        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });

    const buttons = document.querySelectorAll(".wizard-buttons button");
    const steps = document.querySelectorAll(".step");

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            // Remove 'active' class from all buttons
            buttons.forEach(btn => {
                btn.classList.remove("active");
            });

            // Add 'active' class to the clicked button
            button.classList.add("active");

            // Hide all steps
            steps.forEach(step => {
                step.classList.remove("active");
            });

            // Show the corresponding step
            steps[index].classList.add("active");
        });
    });
});


var web_service = "https://serviciosgeovisor.igac.gov.co:8080/Geovisor";
$(document).ready(function () {
    $.ajax({
        url: web_service + "/imagenes2?cmd=count&t=" + (new Date()).getTime(),
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.status) {
                $("#nimagenes").html((data.recordsTotal / 1000000.0).toFixed(1));
            } else {
                $("#nimagenes").html("3.8");
            }
        },
        error: function (xhr, status, error) {

        }
    });
});

// Number animations
document.addEventListener("DOMContentLoaded", function () {
    var gotoElement = $(".goto");
    
    function numberWithCommas(x) {
        // Convert the number to a string
        var parts = x.toString().split(".");
        // Add commas to the integer part
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // If there are decimal parts, check if there are trailing zeros
        if (parts.length > 1) {
            parts[1] = parts[1].replace(/0+$/, ''); // Remove trailing zeros
            // Join the integer and decimal parts
            return parts.join(".") || parts[0]; // If decimal part is empty, return only the integer part
        } else {
            // If no decimal part, return the integer part only
            return parts[0];
        }
    }

    function animateCount(element) {
        element.prop('Counter', 0).animate({
            Counter: element.text()
        }, {
            duration: 1500,
            easing: 'swing',
            step: function (now) {
                // Round 'now' to one decimal place
                var roundedNow = Math.round(now * 10) / 10;
                // Convert 'roundedNow' to a float to handle decimals
                if (parseFloat(roundedNow) % 1 === 0) {
                    element.text(numberWithCommas(Math.ceil(roundedNow)));
                } else {
                    element.text(numberWithCommas(parseFloat(roundedNow).toFixed(1)));
                }
            }
        });
    }

    $('.count').each(function () {
        animateCount($(this));
        gotoElement.addClass("animated");
    });

    $(window).scroll(function () {
        var scrollPosition = $(window).scrollTop();
        var windowHeight = $(window).height();
        var elementOffset = $(".goto").offset().top;

        // Check if user scrolls to the top or bottom
        if (scrollPosition < (elementOffset - windowHeight)) {
            gotoElement.removeClass("animated");
            $('.count').finish();
        } else {
            if (!gotoElement.hasClass("animated")) {
                $('.count').each(function () {
                    animateCount($(this));
                });
            }
            gotoElement.addClass("animated");
        }
    });
});





