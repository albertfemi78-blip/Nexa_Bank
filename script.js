/* =========================================
   MOBILE MENU
========================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("open");

    });


    const navLinks =
        navMenu.querySelectorAll("a");


    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

        });

    });

}


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

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


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

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


/* =========================================
   BACK TO TOP
========================================= */

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


/* =========================================
   ANIMATED COUNTERS
========================================= */

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

}


/* =========================================
   FAQ ACCORDION
========================================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");


faqQuestions.forEach((question) => {

    question.addEventListener("click", () => {

        const currentItem =
            question.parentElement;


        const isOpen =
            currentItem.classList.contains("open");


        document
            .querySelectorAll(".faq-item")
            .forEach((item) => {

                item.classList.remove("open");

                const answer =
                    item.querySelector(".faq-answer");

                answer.style.maxHeight = null;

            });


        if (!isOpen) {

            currentItem.classList.add("open");

            const answer =
                currentItem.querySelector(".faq-answer");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


/* =========================================
   LOAN CALCULATOR
========================================= */

const calculateLoan =
    document.getElementById("calculateLoan");


if (calculateLoan) {

    calculateLoan.addEventListener("click", () => {

        const amount =
            Number(
                document.getElementById("loanAmount").value
            );


        const annualRate =
            Number(
                document.getElementById("loanRate").value
            );


        const months =
            Number(
                document.getElementById("loanTerm").value
            );


        const result =
            document.getElementById("monthlyPayment");


        if (
            !amount ||
            !months ||
            amount <= 0 ||
            months <= 0
        ) {

            result.textContent =
                "Enter valid values";

            return;

        }


        const monthlyRate =
            annualRate / 100 / 12;


        let monthlyPayment;


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


/* =========================================
   ACCOUNT FORM
========================================= */

const accountForm =
    document.getElementById("accountForm");


if (accountForm) {

    const formSteps =
        accountForm.querySelectorAll(".form-step");


    const progressSteps =
        accountForm.querySelectorAll(".progress-step");


    let currentStep = 1;


    function showStep(step) {

        formSteps.forEach((formStep) => {

            formStep.classList.remove("active");

            if (
                Number(
                    formStep.dataset.step
                ) === step
            ) {

                formStep.classList.add("active");

            }

        });


        progressSteps.forEach(
            (progressStep, index) => {

                progressStep.classList.toggle(
                    "active",
                    index < step
                );

            }
        );


        currentStep = step;

    }


    const nextButtons =
        accountForm.querySelectorAll(".next-step");


    nextButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const currentFormStep =
                accountForm.querySelector(
                    `.form-step[data-step="${currentStep}"]`
                );


            const inputs =
                currentFormStep.querySelectorAll(
                    "input, select"
                );


            let valid = true;


            inputs.forEach((input) => {

                if (!input.checkValidity()) {

                    input.reportValidity();

                    valid = false;

                }

            });


            if (!valid) return;


            if (currentStep < 3) {

                showStep(currentStep + 1);

            }

        });

    });


    const prevButtons =
        accountForm.querySelectorAll(".prev-step");


    prevButtons.forEach((button) => {

        button.addEventListener("click", () => {

            if (currentStep > 1) {

                showStep(currentStep - 1);

            }

        });

    });


    accountForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            alert(
                "Demo application completed successfully. No information has been submitted."
            );

        }
    );

}


/* =========================================
   CONTACT FORM
========================================= */

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


            message.textContent =
                "Thank you! Your message has been received in this frontend demo.";


            contactForm.reset();

        }
    );

}

/* =========================================================
   LOGIN FEATURE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // GET HTML ELEMENTS
    // =========================================

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
        document.getElementById("loginPasswordError");

    const togglePassword =
        document.getElementById("toggleLoginPassword");

    const loginMessage =
        document.getElementById("loginMessage");

    const forgotPassword =
        document.getElementById("forgotPassword");


    // =========================================
    // OPEN LOGIN MODAL
    // =========================================

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


    // =========================================
    // CLOSE LOGIN MODAL
    // =========================================

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


    // =========================================
    // CLEAR ERRORS
    // =========================================

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


    // =========================================
    // OPEN LOGIN BUTTON
    // =========================================

    if (openLogin) {

        openLogin.addEventListener(
            "click",
            openLoginModal
        );
    }


    // =========================================
    // CLOSE BUTTON
    // =========================================

    if (closeLogin) {

        closeLogin.addEventListener(
            "click",
            closeLoginModal
        );
    }


    // =========================================
    // CLOSE WHEN CLICKING OVERLAY
    // =========================================

    if (loginOverlay) {

        loginOverlay.addEventListener(
            "click",
            closeLoginModal
        );
    }


    // =========================================
    // ESC KEY
    // =========================================

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


    // =========================================
    // SHOW / HIDE PASSWORD
    // =========================================

    if (togglePassword) {

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


    // =========================================
    // LOGIN FORM
    // =========================================

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                clearLoginErrors();


                // Get entered values

                const email =
                    loginEmail.value.trim();

                const password =
                    loginPassword.value;


                // =====================================
                // CHECK EMPTY EMAIL
                // =====================================

                if (email === "") {

                    emailError.textContent =
                        "Please enter your email address.";

                    return;
                }


                // =====================================
                // CHECK EMAIL FORMAT
                // =====================================

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(email)) {

                    emailError.textContent =
                        "Please enter a valid email address.";

                    return;
                }


                // =====================================
                // CHECK EMPTY PASSWORD
                // =====================================

                if (password === "") {

                    passwordError.textContent =
                        "Please enter your password.";

                    return;
                }


                // =====================================
                // LOGIN SUCCESSFUL
                // =====================================

                loginMessage.className =
                    "login-message success";

                loginMessage.textContent =
                    "Login successful! Redirecting...";


                // Save login status

                sessionStorage.setItem(
                    "isLoggedIn",
                    "true"
                );


                // =====================================
                // GO TO DASHBOARD
                // =====================================

                setTimeout(() => {

                    window.location.href =
                        "dashboard.html";

                }, 1000);

            }
        );
    }


    // =========================================
    // FORGOT PASSWORD
    // =========================================

    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                loginMessage.className =
                    "login-message info";

                loginMessage.textContent =
                    "Password recovery is not connected in this frontend demo.";
            }
        );
    }

});



/* =========================================
   HERO IMAGE SLIDER
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* ================================
           GET ELEMENTS
        ================================= */

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


        /* ================================
           SETTINGS
        ================================= */

        let currentSlide = 0;

        const slideDuration = 5000;

        let slideTimer;

        let progressTimer;



        /* ================================
           SHOW SLIDE
        ================================= */

        function showSlide(index) {


            /* Remove active class */

            slides.forEach(
                (slide) => {

                    slide.classList.remove(
                        "active"
                    );

                }
            );


            dots.forEach(
                (dot) => {

                    dot.classList.remove(
                        "active"
                    );

                }
            );


            /* Make sure index is valid */

            if (
                index >= slides.length
            ) {

                currentSlide = 0;

            }


            if (
                index < 0
            ) {

                currentSlide =
                    slides.length - 1;

            }


            /* Activate slide */

            slides[currentSlide]
                .classList
                .add("active");


            /* Activate indicator */

            dots[currentSlide]
                .classList
                .add("active");


            /* Restart progress */

            startProgress();

        }



        /* ================================
           NEXT SLIDE
        ================================= */

        function nextSlide() {

            currentSlide++;

            if (
                currentSlide >=
                slides.length
            ) {

                currentSlide = 0;

            }

            showSlide(
                currentSlide
            );

        }



        /* ================================
           PREVIOUS SLIDE
        ================================= */

        function previousSlide() {

            currentSlide--;

            if (
                currentSlide < 0
            ) {

                currentSlide =
                    slides.length - 1;

            }

            showSlide(
                currentSlide
            );

        }



        /* ================================
           AUTOMATIC SLIDER
        ================================= */

        function startSlider() {

            clearInterval(
                slideTimer
            );


            slideTimer =
                setInterval(
                    nextSlide,
                    slideDuration
                );

        }



        /* ================================
           PROGRESS BAR
        ================================= */

        function startProgress() {

            clearInterval(
                progressTimer
            );


            progressBar.style.transition =
                "none";

            progressBar.style.width =
                "0%";


            setTimeout(
                () => {

                    progressBar.style.transition =
                        `width ${slideDuration}ms linear`;

                    progressBar.style.width =
                        "100%";

                },
                50
            );

        }



        /* ================================
           NEXT BUTTON
        ================================= */

        nextButton.addEventListener(
            "click",
            () => {

                nextSlide();

                startSlider();

            }
        );



        /* ================================
           PREVIOUS BUTTON
        ================================= */

        prevButton.addEventListener(
            "click",
            () => {

                previousSlide();

                startSlider();

            }
        );



        /* ================================
           DOT NAVIGATION
        ================================= */

        dots.forEach(
            (dot) => {

                dot.addEventListener(
                    "click",
                    () => {

                        currentSlide =
                            Number(
                                dot.dataset.slide
                            );


                        showSlide(
                            currentSlide
                        );


                        startSlider();

                    }
                );

            }
        );



        /* ================================
           PAUSE ON HOVER
        ================================= */

        hero.addEventListener(
            "mouseenter",
            () => {

                clearInterval(
                    slideTimer
                );

            }
        );



        /* ================================
           RESUME AFTER HOVER
        ================================= */

        hero.addEventListener(
            "mouseleave",
            () => {

                startSlider();

            }
        );



        /* ================================
           START
        ================================= */

        showSlide(
            currentSlide
        );


        startSlider();

    }
);/* =========================================================
   GLOBAL LIGHT / DARK MODE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const themeToggle =
        document.getElementById("themeToggle");

    const themeIcon =
        document.getElementById("themeIcon");


    /* =====================================================
       LOAD SAVED THEME
    ===================================================== */

    const savedTheme =
        localStorage.getItem("nexaTheme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        if (themeIcon) {
            themeIcon.textContent = "☀️";
        }

    } else {

        document.body.classList.remove("dark-mode");

        if (themeIcon) {
            themeIcon.textContent = "🌙";
        }

    }

    


    /* =====================================================
       TOGGLE THEME
    ===================================================== */

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const isDark =
                document.body.classList.toggle("dark-mode");


            if (isDark) {

                localStorage.setItem(
                    "nexaTheme",
                    "dark"
                );

                if (themeIcon) {
                    themeIcon.textContent = "☀️";
                }

            } else {

                localStorage.setItem(
                    "nexaTheme",
                    "light"
                );

                if (themeIcon) {
                    themeIcon.textContent = "🌙";
                }

            }

        });

    }

});