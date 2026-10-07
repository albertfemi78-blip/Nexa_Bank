/* =========================================================
   NEXABANK - MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");

        const expanded =
            navMenu.classList.contains("open");

        menuToggle.setAttribute(
            "aria-expanded",
            expanded
        );
    });

    const navLinks =
        navMenu.querySelectorAll("a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {
            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        });

    });

}


/* =========================================================
   NAVBAR SCROLL EFFECT
   ========================================================= */

const navbar =
    document.getElementById("navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

} else {

    // Fallback for older browsers
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

const backTop =
    document.getElementById("backTop");

if (backTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }

    });

    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   ANIMATED COUNTERS
   ========================================================= */

const counters =
    document.querySelectorAll("[data-count]");

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    counterStarted = true;

    counters.forEach((counter) => {

        const target =
            Number(counter.dataset.count);

        let current = 0;

        const duration = 1500;

        const increment =
            target / (duration / 20);

        const timer =
            setInterval(() => {

                current += increment;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);
                }

                counter.textContent =
                    Math.floor(current);

            }, 20);

    });

}


const statsSection =
    document.querySelector(".stats-section");

if (statsSection) {

    if ("IntersectionObserver" in window) {

        const statsObserver =
            new IntersectionObserver(
                (entries) => {

                    if (entries[0].isIntersecting) {

                        startCounters();

                        statsObserver.disconnect();
                    }

                },
                {
                    threshold: 0.3
                }
            );

        statsObserver.observe(statsSection);

    } else {

        startCounters();

    }

}


/* =========================================================
   FAQ ACCORDION
   ========================================================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {

    question.addEventListener("click", () => {

        const currentItem =
            question.closest(".faq-item");

        if (!currentItem) return;

        const isOpen =
            currentItem.classList.contains("open");


        // Close all FAQ items
        document
            .querySelectorAll(".faq-item")
            .forEach((item) => {

                item.classList.remove("open");

                const answer =
                    item.querySelector(".faq-answer");

                if (answer) {
                    answer.style.maxHeight = null;
                }

            });


        // Open selected FAQ item
        if (!isOpen) {

            currentItem.classList.add("open");

            const answer =
                currentItem.querySelector(".faq-answer");

            if (answer) {

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        }

    });

});


/* =========================================================
   LOAN CALCULATOR
   ========================================================= */

const calculateLoan =
    document.getElementById("calculateLoan");

if (calculateLoan) {

    calculateLoan.addEventListener("click", () => {

        const amountInput =
            document.getElementById("loanAmount");

        const rateInput =
            document.getElementById("loanRate");

        const termInput =
            document.getElementById("loanTerm");

        const result =
            document.getElementById("monthlyPayment");


        if (
            !amountInput ||
            !rateInput ||
            !termInput ||
            !result
        ) {
            return;
        }


        const amount =
            Number(amountInput.value);

        const annualRate =
            Number(rateInput.value);

        const months =
            Number(termInput.value);


        // Validate loan amount
        if (
            !Number.isFinite(amount) ||
            amount <= 0
        ) {

            result.textContent =
                "Enter a valid loan amount.";

            return;
        }


        // Validate interest rate
        if (
            !Number.isFinite(annualRate) ||
            annualRate < 0
        ) {

            result.textContent =
                "Enter a valid interest rate.";

            return;
        }


        // Validate loan term
        if (
            !Number.isFinite(months) ||
            months <= 0
        ) {

            result.textContent =
                "Enter a valid loan term.";

            return;
        }


        const monthlyRate =
            annualRate / 100 / 12;

        let monthlyPayment;


        // Zero interest loan
        if (monthlyRate === 0) {

            monthlyPayment =
                amount / months;

        } else {

            monthlyPayment =
                amount *
                monthlyRate *
                Math.pow(
                    1 + monthlyRate,
                    months
                ) /
                (
                    Math.pow(
                        1 + monthlyRate,
                        months
                    ) - 1
                );

        }


        result.textContent =
            monthlyPayment.toLocaleString(
                "en-NG",
                {
                    style: "currency",
                    currency: "NGN"
                }
            );

    });

}


/* =========================================================
   NOTE:
   ACCOUNT CREATION SYSTEM REMOVED
   =========================================================

   There is intentionally NO:

   - accountForm
   - Create Account JavaScript
   - registeredUser
   - password storage
   - account password validation
   - automatic account creation

   Login is now a frontend demo login.
*/


/* =========================================================
   CONTACT FORM
   ========================================================= */

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const message =
                document.getElementById(
                    "contactMessage"
                );

            if (message) {

                message.textContent =
                    "Thank you! Your message has been received in this frontend demo.";

            }

            contactForm.reset();

        }
    );

}


/* =========================================================
   LOGIN FEATURE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* =========================================
           GET LOGIN ELEMENTS
           ========================================= */

        const loginModal =
            document.getElementById("loginModal");

        const openLogin =
            document.getElementById("openLogin");

        const closeLogin =
            document.getElementById("closeLogin");

        const loginOverlay =
            document.getElementById("loginOverlay");

        const loginForm =
            document.getElementById("loginForm");

        const loginEmail =
            document.getElementById("loginEmail");

        const loginPassword =
            document.getElementById("loginPassword");

        const emailError =
            document.getElementById("loginEmailError");

        const passwordError =
            document.getElementById(
                "loginPasswordError"
            );

        const togglePassword =
            document.getElementById(
                "toggleLoginPassword"
            );

        const loginMessage =
            document.getElementById("loginMessage");


        /* =========================================
           OPEN LOGIN MODAL
           ========================================= */

        function openLoginModal(event) {

            if (event) {
                event.preventDefault();
            }

            if (!loginModal) return;

            loginModal.classList.add("show");

            loginModal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "login-open"
            );


            setTimeout(() => {

                if (loginEmail) {
                    loginEmail.focus();
                }

            }, 100);

        }


        /* =========================================
           CLOSE LOGIN MODAL
           ========================================= */

        function closeLoginModal() {

            if (!loginModal) return;

            loginModal.classList.remove("show");

            loginModal.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "login-open"
            );

        }


        /* =========================================
           CLEAR LOGIN ERRORS
           ========================================= */

        function clearLoginErrors() {

            if (emailError) {
                emailError.textContent = "";
            }

            if (passwordError) {
                passwordError.textContent = "";
            }

            if (loginMessage) {

                loginMessage.className =
                    "login-message";

                loginMessage.textContent = "";

            }

        }


        /* =========================================
           OPEN LOGIN BUTTON
           ========================================= */

        if (openLogin) {

            openLogin.addEventListener(
                "click",
                openLoginModal
            );

        }


        /* =========================================
           CLOSE LOGIN BUTTON
           ========================================= */

        if (closeLogin) {

            closeLogin.addEventListener(
                "click",
                closeLoginModal
            );

        }


        /* =========================================
           CLOSE LOGIN USING OVERLAY
           ========================================= */

        if (loginOverlay) {

            loginOverlay.addEventListener(
                "click",
                closeLoginModal
            );

        }


        /* =========================================
           CLOSE LOGIN WITH ESC KEY
           ========================================= */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    loginModal &&
                    loginModal.classList.contains("show")
                ) {

                    closeLoginModal();

                }

            }
        );


        /* =========================================
           SHOW / HIDE PASSWORD
           ========================================= */

        if (
            togglePassword &&
            loginPassword
        ) {

            togglePassword.addEventListener(
                "click",
                () => {

                    const isPassword =
                        loginPassword.type === "password";


                    if (isPassword) {

                        loginPassword.type = "text";

                        togglePassword.textContent =
                            "Hide";

                    } else {

                        loginPassword.type =
                            "password";

                        togglePassword.textContent =
                            "Show";

                    }

                }
            );

        }


        /* =========================================
           LOGIN FORM
           ========================================= */

        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                (event) => {

                    event.preventDefault();

                    clearLoginErrors();


                    /* =====================================
                       GET LOGIN VALUES
                       ===================================== */

                    const email =
                        loginEmail
                            ? loginEmail.value.trim()
                            : "";

                    const password =
                        loginPassword
                            ? loginPassword.value
                            : "";


                    /* =====================================
                       BASIC INPUT CHECK
                       ===================================== */

                    if (email === "") {

                        if (emailError) {

                            emailError.textContent =
                                "Please enter your email.";

                        }

                        return;

                    }


                    if (password === "") {

                        if (passwordError) {

                            passwordError.textContent =
                                "Please enter your password.";

                        }

                        return;

                    }


                    /* =====================================
                       FRONTEND DEMO LOGIN
                       =====================================

                       IMPORTANT:

                       - ANY email can log in.
                       - ANY password can log in.
                       - Password is NOT checked.
                       - Password is NOT stored.
                       - No registeredUser is required.
                       - No Create Account is required.
                       ===================================== */


                    const demoUser = {

                        email: email,

                        fullName:
                            "NexaBank User",

                        accountType:
                            "Personal Account",

                        balance: 0

                    };


                    /* =====================================
                       SAVE ONLY SAFE DEMO USER INFORMATION
                       ===================================== */

                    localStorage.setItem(
                        "currentUser",
                        JSON.stringify(demoUser)
                    );


                    /* =====================================
                       CREATE LOGIN SESSION
                       ===================================== */

                    sessionStorage.setItem(
                        "isLoggedIn",
                        "true"
                    );


                    /* =====================================
                       SUCCESS MESSAGE
                       ===================================== */

                    if (loginMessage) {

                        loginMessage.className =
                            "login-message success";

                        loginMessage.textContent =
                            "Login successful! Redirecting...";

                    }


                    /* =====================================
                       GO TO DASHBOARD
                       ===================================== */

                    setTimeout(() => {

                        window.location.href =
                            "dashboard.html";

                    }, 500);

                }
            );

        }

    }
);


/* =========================================================
   HERO IMAGE SLIDER
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* =========================================
           GET SLIDER ELEMENTS
           ========================================= */

        const slides =
            document.querySelectorAll(
                ".hero-slide"
            );

        const dots =
            document.querySelectorAll(
                ".hero-dot"
            );

        const nextButton =
            document.getElementById(
                "heroNext"
            );

        const prevButton =
            document.getElementById(
                "heroPrev"
            );

        const progressBar =
            document.getElementById(
                "heroProgressBar"
            );

        const hero =
            document.getElementById(
                "heroSlider"
            );


        /* =========================================
           STOP IF SLIDER DOES NOT EXIST
           ========================================= */

        if (!hero || slides.length === 0) {
            return;
        }


        /* =========================================
           SETTINGS
           ========================================= */

        let currentSlide = 0;

        const slideDuration = 5000;

        let slideTimer = null;

        let progressTimer = null;


        /* =========================================
           SHOW SLIDE
           ========================================= */

        function showSlide(index) {

            if (slides.length === 0) {
                return;
            }


            /* Remove active class */
            slides.forEach((slide) => {

                slide.classList.remove(
                    "active"
                );

            });


            /* Remove active dot */
            dots.forEach((dot) => {

                dot.classList.remove(
                    "active"
                );

            });


            /* Make sure index is valid */

            if (index >= slides.length) {
                currentSlide = 0;
            }

            if (index < 0) {
                currentSlide =
                    slides.length - 1;
            }


            /* Activate slide */

            slides[currentSlide]
                .classList.add("active");


            /* Activate dot */

            if (dots[currentSlide]) {

                dots[currentSlide]
                    .classList.add("active");

            }


            /* Restart progress */

            startProgress();

        }


        /* =========================================
           NEXT SLIDE
           ========================================= */

        function nextSlide() {

            currentSlide++;

            if (
                currentSlide >=
                slides.length
            ) {

                currentSlide = 0;

            }

            showSlide(currentSlide);

        }


        /* =========================================
           PREVIOUS SLIDE
           ========================================= */

        function previousSlide() {

            currentSlide--;

            if (currentSlide < 0) {

                currentSlide =
                    slides.length - 1;

            }

            showSlide(currentSlide);

        }


        /* =========================================
           AUTOMATIC SLIDER
           ========================================= */

        function startSlider() {

            clearInterval(slideTimer);

            slideTimer =
                setInterval(
                    nextSlide,
                    slideDuration
                );

        }


        /* =========================================
           PROGRESS BAR
           ========================================= */

        function startProgress() {

            if (!progressBar) {
                return;
            }

            clearTimeout(progressTimer);

            progressBar.style.transition =
                "none";

            progressBar.style.width =
                "0%";


            progressTimer =
                setTimeout(() => {

                    progressBar.style.transition =
                        `width ${slideDuration}ms linear`;

                    progressBar.style.width =
                        "100%";

                }, 50);

        }


        /* =========================================
           NEXT BUTTON
           ========================================= */

        if (nextButton) {

            nextButton.addEventListener(
                "click",
                () => {

                    nextSlide();

                    startSlider();

                }
            );

        }


        /* =========================================
           PREVIOUS BUTTON
           ========================================= */

        if (prevButton) {

            prevButton.addEventListener(
                "click",
                () => {

                    previousSlide();

                    startSlider();

                }
            );

        }


        /* =========================================
           DOT NAVIGATION
           ========================================= */

        dots.forEach((dot) => {

            dot.addEventListener(
                "click",
                () => {

                    const selectedSlide =
                        Number(
                            dot.dataset.slide
                        );


                    if (
                        Number.isNaN(
                            selectedSlide
                        )
                    ) {
                        return;
                    }


                    currentSlide =
                        selectedSlide;


                    showSlide(
                        currentSlide
                    );


                    startSlider();

                }
            );

        });


        /* =========================================
           PAUSE ON HOVER
           ========================================= */

        hero.addEventListener(
            "mouseenter",
            () => {

                clearInterval(
                    slideTimer
                );

            }
        );


        /* =========================================
           RESUME AFTER HOVER
           ========================================= */

        hero.addEventListener(
            "mouseleave",
            () => {

                startSlider();

            }
        );


        /* =========================================
           START SLIDER
           ========================================= */

        showSlide(currentSlide);

        startSlider();

    }
);


/* =========================================================
   GLOBAL LIGHT / DARK MODE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const themeToggle =
            document.getElementById(
                "themeToggle"
            );

        const themeIcon =
            document.getElementById(
                "themeIcon"
            );


        /* =========================================
           LOAD SAVED THEME
           ========================================= */

        const savedTheme =
            localStorage.getItem(
                "nexaTheme"
            );


        if (savedTheme === "dark") {

            document.body.classList.add(
                "dark-mode"
            );

            if (themeIcon) {

                themeIcon.textContent =
                    "☀️";

            }

        } else {

            document.body.classList.remove(
                "dark-mode"
            );

            if (themeIcon) {

                themeIcon.textContent =
                    "🌙";

            }

        }


        /* =========================================
           TOGGLE THEME
           ========================================= */

        if (themeToggle) {

            themeToggle.addEventListener(
                "click",
                () => {

                    const isDark =
                        document.body.classList.toggle(
                            "dark-mode"
                        );


                    if (isDark) {

                        localStorage.setItem(
                            "nexaTheme",
                            "dark"
                        );

                        if (themeIcon) {

                            themeIcon.textContent =
                                "☀️";

                        }

                    } else {

                        localStorage.setItem(
                            "nexaTheme",
                            "light"
                        );

                        if (themeIcon) {

                            themeIcon.textContent =
                                "🌙";

                        }

                    }

                }
            );

        }

    }
);