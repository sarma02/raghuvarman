// DOM Elements
const loader = document.getElementById("loader");
const mobileBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const navbar = document.getElementById("navbar");
const dateEl = document.querySelector(".datenew");

// Loader
window.addEventListener("load", () => {
    loader.style.opacity = "0";
    setTimeout(() => {
        loader.style.display = "none";
    }, 500);
});

// Mobile Menu Toggle
mobileBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
});

// Close mobile menu when clicking a link
document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
    });
});

// Update Year
dateEl.innerText = new Date().getFullYear();

// Scroll Effect for Navbar
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("shadow-lg");
        navbar.classList.replace("bg-black/80", "bg-black/95");
    } else {
        navbar.classList.remove("shadow-lg");
        navbar.classList.replace("bg-black/95", "bg-black/80");
    }
});

// Reveal Animations on Scroll
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            
            // Trigger skill bars if inside this reveal
            const skillBars = entry.target.querySelectorAll(".skill-progress");
            skillBars.forEach(bar => {
                bar.style.width = bar.getAttribute("data-width");
            });

            // Trigger counters if inside this reveal
            const counters = entry.target.querySelectorAll(".counter");
            counters.forEach(counter => startCounter(counter));

            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));


// Counter Animation Logic
function startCounter(counter) {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = target / 50; // controls speed

    const updateCount = () => {
        if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 40);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
}
