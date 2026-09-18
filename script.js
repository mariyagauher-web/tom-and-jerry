/* =========================================================
   TOM & JERRY — CHAOTIC BFF EXPERIENCE
   SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const opening = document.querySelector(".opening");
    const startButton = document.querySelector(".start-button");

    const decision = document.querySelector(".decision");
    const yesButton = document.querySelector("#yesButton");
    const noButton = document.querySelector("#noButton");
    const decisionMessage = document.querySelector("#decisionMessage");

    const passwordScreen = document.querySelector(".password");
    const passwordInput = document.querySelector("#passwordInput");
    const passwordButton = document.querySelector("#passwordButton");
    const passwordError = document.querySelector("#passwordError");

    const main = document.querySelector("#main");

    const restartButton = document.querySelector("#restartButton");

    const cursorDot = document.querySelector(".cursor-dot");
    const cursorCircle = document.querySelector(".cursor-circle");

    /* =====================================================
       HELPERS
    ===================================================== */

    function showElement(element) {
        if (!element) return;

        element.classList.add("active");

        element.style.visibility = "visible";
        element.style.opacity = "1";
    }

    function hideElement(element) {
        if (!element) return;

        element.classList.remove("active");

        element.style.opacity = "0";

        setTimeout(() => {
            if (!element.classList.contains("active")) {
                element.style.visibility = "hidden";
            }
        }, 500);
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    if (cursorDot && cursorCircle && window.innerWidth > 900) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let circleX = mouseX;
        let circleY = mouseY;

        document.addEventListener("mousemove", (e) => {

            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateCursor() {

            circleX += (mouseX - circleX) * 0.13;
            circleY += (mouseY - circleY) * 0.13;

            cursorCircle.style.left = `${circleX}px`;
            cursorCircle.style.top = `${circleY}px`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        const cursorTargets = document.querySelectorAll(
            "button, a, .reveal-item, .bro-card, .scratch-card, .fighter, .evidence-file"
        );

        cursorTargets.forEach(target => {

            target.addEventListener("mouseenter", () => {
                cursorCircle.classList.add("active");
            });

            target.addEventListener("mouseleave", () => {
                cursorCircle.classList.remove("active");
            });

        });
    }


    /* =====================================================
       OPENING SCREEN
    ===================================================== */

    if (startButton) {

        startButton.addEventListener("click", () => {

            startButton.style.pointerEvents = "none";

            if (opening) {

                opening.style.transition =
                    "transform 1s cubic-bezier(.76,0,.24,1), opacity .7s ease";

                opening.style.transform = "scale(1.08)";
                opening.style.opacity = "0";

                setTimeout(() => {

                    opening.style.display = "none";

                    if (decision) {
                        decision.classList.add("active");
                        decision.style.visibility = "visible";
                        decision.style.opacity = "1";
                    }

                }, 750);
            }

        });
    }


    /* =====================================================
       YES BUTTON
    ===================================================== */

    if (yesButton) {

        yesButton.addEventListener("click", () => {

            if (decision) {

                decision.style.transition =
                    "transform .7s cubic-bezier(.76,0,.24,1), opacity .5s ease";

                decision.style.transform = "scale(.96)";
                decision.style.opacity = "0";

                setTimeout(() => {

                    decision.style.visibility = "hidden";
                    decision.classList.remove("active");
                    decision.style.transform = "";

                    if (passwordScreen) {

                        passwordScreen.classList.add("active");

                        requestAnimationFrame(() => {
                            passwordScreen.style.visibility = "visible";
                            passwordScreen.style.opacity = "1";
                        });

                    }

                }, 500);
            }

        });

    }


    /* =====================================================
       NO BUTTON — CHAOTIC ESCAPE
    ===================================================== */

    if (noButton) {

        let noCount = 0;

        const noMessages = [
            "Nice try.",
            "BRO REALLY CLICKED NO 😭",
            "Tom would not approve.",
            "Jerry has escaped.",
            "That button is getting suspicious...",
            "NO IS NOT AN OPTION 💀",
            "Okay... RUN.",
            "You thought."
        ];

        function moveNoButton() {

            noCount++;

            const buttonWidth = noButton.offsetWidth || 100;
            const buttonHeight = noButton.offsetHeight || 50;

            const maxX =
                Math.max(
                    10,
                    window.innerWidth - buttonWidth - 25
                );

            const maxY =
                Math.max(
                    10,
                    window.innerHeight - buttonHeight - 25
                );

            const x = Math.random() * maxX;
            const y = Math.random() * maxY;

            noButton.style.position = "fixed";
            noButton.style.left = `${x}px`;
            noButton.style.top = `${y}px`;
            noButton.style.zIndex = "10000";

            if (decisionMessage) {
                decisionMessage.textContent =
                    noMessages[Math.min(noCount - 1, noMessages.length - 1)];
            }

            noButton.style.transform =
                `rotate(${Math.random() * 14 - 7}deg)`;

            if (noCount >= 5) {

                noButton.textContent = "OK FINE 😭";

                setTimeout(() => {

                    noButton.style.position = "";
                    noButton.style.left = "";
                    noButton.style.top = "";

                }, 900);

            }

        }

        noButton.addEventListener("mouseenter", moveNoButton);

        noButton.addEventListener("touchstart", (e) => {
            e.preventDefault();
            moveNoButton();
        });

        noButton.addEventListener("click", moveNoButton);
    }


    /* =====================================================
       PASSWORD
    ===================================================== */

    const correctPasswords = [
        "tom",
        "jerry",
        "tomandjerry",
        "bestbuddies",
        "bff",
        "brocode",
        "chaos"
    ];

    function checkPassword() {

        if (!passwordInput) return;

        const entered =
            passwordInput.value
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "");

        if (!entered) {

            if (passwordError) {
                passwordError.textContent =
                    "ACCESS DENIED — password required.";
            }

            passwordInput.focus();
            return;
        }

        if (correctPasswords.includes(entered)) {

            if (passwordError) {
                passwordError.textContent =
                    "ACCESS GRANTED ✓";
                passwordError.style.color = "#d7f5d0";
            }

            if (passwordButton) {
                passwordButton.textContent = "ACCESSING...";
                passwordButton.disabled = true;
            }

            setTimeout(() => {

                if (passwordScreen) {
                    passwordScreen.style.transition =
                        "opacity .7s ease, transform .8s ease";

                    passwordScreen.style.opacity = "0";
                    passwordScreen.style.transform = "scale(1.03)";
                }

                setTimeout(() => {

                    if (passwordScreen) {
                        passwordScreen.style.display = "none";
                    }

                    if (main) {
                        main.style.display = "block";
                        main.style.opacity = "0";

                        requestAnimationFrame(() => {

                            main.style.transition =
                                "opacity 1s ease";

                            main.style.opacity = "1";

                            scrollToTop();

                            initMainAnimations();

                        });
                    }

                }, 700);

            }, 600);

        } else {

            if (passwordError) {

                const errorMessages = [
                    "WRONG PASSWORD.",
                    "BRO... YOU DON'T KNOW THE CODE? 💀",
                    "ACCESS DENIED.",
                    "TOM WOULD BE DISAPPOINTED.",
                    "TRY AGAIN, DETECTIVE."
                ];

                passwordError.textContent =
                    errorMessages[
                        Math.floor(Math.random() * errorMessages.length)
                    ];

                passwordError.style.color = "#ff8179";
            }

            passwordInput.value = "";

            passwordInput.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(-8px)" },
                    { transform: "translateX(8px)" },
                    { transform: "translateX(-5px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 350,
                    easing: "ease-out"
                }
            );
        }
    }

    if (passwordButton) {
        passwordButton.addEventListener("click", checkPassword);
    }

    if (passwordInput) {

        passwordInput.addEventListener("keydown", (e) => {

            if (e.key === "Enter") {
                checkPassword();
            }

        });
    }


    /* =====================================================
       MAIN PAGE ANIMATIONS
    ===================================================== */

    function initMainAnimations() {

        /* -----------------------------------------------
           REVEAL ON SCROLL
        ------------------------------------------------ */

        const revealElements = document.querySelectorAll(
            ".statement-left, .statement-right, .battle-heading, " +
            ".fighter, .evidence-header, .evidence-file, " +
            ".reveals-title, .reveal-item, .scratch-card, " +
            ".bro-code-head, .bro-card, .ending-content"
        );

        if ("IntersectionObserver" in window) {

            const observer = new IntersectionObserver(
                (entries) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("in-view");

                            entry.target.style.opacity = "1";
                            entry.target.style.transform =
                                "translateY(0)";

                            observer.unobserve(entry.target);
                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -60px 0px"
                }
            );

            revealElements.forEach((element, index) => {

                element.style.opacity = "0";
                element.style.transform = "translateY(35px)";

                element.style.transition =
                    `opacity .8s ease ${Math.min(index * .035, .3)}s,
                     transform .8s cubic-bezier(.16,1,.3,1) ${Math.min(index * .035, .3)}s`;

                observer.observe(element);

            });

        }


        /* -----------------------------------------------
           PARALLAX HERO
        ------------------------------------------------ */

        const heroBg = document.querySelector(".hero-bg");
        const heroPhoto = document.querySelector(".hero-photo");

        window.addEventListener("scroll", () => {

            const scrollY = window.scrollY;

            if (heroBg && scrollY < window.innerHeight * 1.2) {

                heroBg.style.transform =
                    `scale(1.06) translateY(${scrollY * .10}px)`;
            }

            if (heroPhoto && scrollY < window.innerHeight) {

                heroPhoto.style.marginTop =
                    `${scrollY * .08}px`;
            }

        }, { passive:true });


        /* -----------------------------------------------
           MOUSE PARALLAX ON HERO
        ------------------------------------------------ */

        const hero = document.querySelector(".hero-case");

        if (hero && window.innerWidth > 900) {

            hero.addEventListener("mousemove", (e) => {

                const rect = hero.getBoundingClientRect();

                const x =
                    (e.clientX - rect.left) / rect.width - .5;

                const y =
                    (e.clientY - rect.top) / rect.height - .5;

                if (heroPhoto) {

                    heroPhoto.style.transform =
                        `translate(${x * 15}px, ${y * 15}px) rotate(${4 + x * 2}deg)`;
                }

                if (heroBg) {

                    heroBg.style.transform =
                        `scale(1.06) translate(${x * -8}px, ${y * -8}px)`;
                }

            });

        }


        /* -----------------------------------------------
           REVEAL CARDS
        ------------------------------------------------ */

        const revealItems =
            document.querySelectorAll(".reveal-item");

        revealItems.forEach(item => {

            const trigger =
                item.querySelector(".reveal-trigger");

            if (!trigger) return;

            trigger.addEventListener("click", () => {

                const wasOpen =
                    item.classList.contains("open");

                revealItems.forEach(other => {
                    other.classList.remove("open");

                    const otherButton =
                        other.querySelector(".reveal-trigger");

                    if (otherButton) {
                        otherButton.textContent = "OPEN";
                    }
                });

                if (!wasOpen) {

                    item.classList.add("open");

                    trigger.textContent = "CLOSE";

                }

            });

        });


        /* -----------------------------------------------
           BRO CODE FLIP CARDS
        ------------------------------------------------ */

        const broCards =
            document.querySelectorAll(".bro-card");

        broCards.forEach(card => {

            card.addEventListener("click", () => {

                card.classList.toggle("flipped");

            });

        });


        /* -----------------------------------------------
           FIGHTER POLL
        ------------------------------------------------ */

        const fighters =
            document.querySelectorAll(".fighter");

        const pollAnswer =
            document.querySelector(".poll-answer");

        fighters.forEach(fighter => {

            fighter.addEventListener("click", () => {

                fighters.forEach(item => {
                    item.style.outline = "none";
                    item.style.filter = "brightness(.75)";
                });

                fighter.style.outline =
                    "3px solid var(--yellow)";

                fighter.style.filter =
                    "brightness(1.1)";

                const fighterName =
                    fighter.dataset.fighter ||
                    fighter.querySelector("strong")?.textContent ||
                    "CHAOS";

                if (pollAnswer) {

                    pollAnswer.textContent =
                        `${fighterName.toUpperCase()} HAS BEEN SELECTED — NO APPEALS.`;

                }

            });

        });


        /* -----------------------------------------------
           SCRATCH CARDS
        ------------------------------------------------ */

        setupScratchCards();


        /* -----------------------------------------------
           DRAGGABLE EVIDENCE PHOTOS
        ------------------------------------------------ */

        setupDraggablePhotos();


        /* -----------------------------------------------
           RANDOM CHAOS
        ------------------------------------------------ */

        setupChaosEffects();


        /* -----------------------------------------------
           PAGE COUNTER
        ------------------------------------------------ */

        setupPageCounter();

    }


    /* =====================================================
       SCRATCH CARD SYSTEM
    ===================================================== */

    function setupScratchCards() {

        const cards =
            document.querySelectorAll(".scratch-card");

        cards.forEach(card => {

            const canvas =
                card.querySelector("canvas");

            if (!canvas) return;

            const ctx = canvas.getContext("2d");

            let isDrawing = false;
            let scratched = 0;

            function resizeCanvas() {

                const rect = card.getBoundingClientRect();

                const dpr =
                    Math.min(window.devicePixelRatio || 1, 2);

                canvas.width =
                    rect.width * dpr;

                canvas.height =
                    rect.height * dpr;

                canvas.style.width =
                    `${rect.width}px`;

                canvas.style.height =
                    `${rect.height}px`;

                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

                const gradient =
                    ctx.createLinearGradient(
                        0,
                        0,
                        rect.width,
                        rect.height
                    );

                gradient.addColorStop(0, "#343a3e");
                gradient.addColorStop(.5, "#202529");
                gradient.addColorStop(1, "#41474a");

                ctx.globalCompositeOperation =
                    "source-over";

                ctx.fillStyle = gradient;
                ctx.fillRect(
                    0,
                    0,
                    rect.width,
                    rect.height
                );

                ctx.fillStyle =
                    "rgba(255,255,255,.08)";

                for (let i = 0; i < 1000; i++) {

                    ctx.fillRect(
                        Math.random() * rect.width,
                        Math.random() * rect.height,
                        1,
                        1
                    );
                }

                ctx.font =
                    "bold 12px monospace";

                ctx.fillStyle =
                    "rgba(255,255,255,.45)";

                ctx.textAlign = "center";

                ctx.fillText(
                    "SCRATCH TO REVEAL",
                    rect.width / 2,
                    rect.height / 2
                );
            }

            resizeCanvas();

            window.addEventListener(
                "resize",
                resizeCanvas
            );

            function getPosition(e) {

                const rect =
                    canvas.getBoundingClientRect();

                let clientX;
                let clientY;

                if (e.touches && e.touches.length) {

                    clientX =
                        e.touches[0].clientX;

                    clientY =
                        e.touches[0].clientY;

                } else {

                    clientX = e.clientX;
                    clientY = e.clientY;
                }

                return {
                    x:clientX - rect.left,
                    y:clientY - rect.top
                };
            }

            function scratch(e) {

                if (!isDrawing) return;

                e.preventDefault();

                const pos =
                    getPosition(e);

                ctx.globalCompositeOperation =
                    "destination-out";

                ctx.beginPath();

                ctx.arc(
                    pos.x,
                    pos.y,
                    27,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

                scratched++;

                if (scratched % 15 === 0) {
                    checkScratchProgress();
                }
            }

            function startScratch(e) {

                isDrawing = true;

                scratch(e);
            }

            function stopScratch() {

                isDrawing = false;
            }

            canvas.addEventListener(
                "mousedown",
                startScratch
            );

            canvas.addEventListener(
                "mousemove",
                scratch
            );

            window.addEventListener(
                "mouseup",
                stopScratch
            );

            canvas.addEventListener(
                "touchstart",
                startScratch,
                { passive:false }
            );

            canvas.addEventListener(
                "touchmove",
                scratch,
                { passive:false }
            );

            window.addEventListener(
                "touchend",
                stopScratch
            );

            function checkScratchProgress() {

                try {

                    const rect =
                        canvas.getBoundingClientRect();

                    const data =
                        ctx.getImageData(
                            0,
                            0,
                            canvas.width,
                            canvas.height
                        ).data;

                    let transparent = 0;
                    let total = data.length / 4;

                    for (
                        let i = 3;
                        i < data.length;
                        i += 4
                    ) {

                        if (data[i] < 100) {
                            transparent++;
                        }

                    }

                    const percent =
                        transparent / total;

                    if (percent > .48) {

                        canvas.style.transition =
                            "opacity .5s ease";

                        canvas.style.opacity = "0";

                        setTimeout(() => {
                            canvas.style.display = "none";
                        }, 500);

                    }

                } catch (error) {
                    /* Canvas security / browser fallback */
                }
            }

        });

    }


    /* =====================================================
       DRAGGABLE PHOTO EVIDENCE
    ===================================================== */

    function setupDraggablePhotos() {

        const photos =
            document.querySelectorAll(".evidence-file");

        photos.forEach((photo, index) => {

            let dragging = false;
            let startX = 0;
            let startY = 0;
            let currentX = 0;
            let currentY = 0;

            const originalTransform =
                getComputedStyle(photo).transform;

            function pointerDown(e) {

                if (window.innerWidth <= 700) return;

                dragging = true;

                const point =
                    e.touches
                        ? e.touches[0]
                        : e;

                startX =
                    point.clientX - currentX;

                startY =
                    point.clientY - currentY;

                photo.style.zIndex =
                    100 + index;

                photo.style.transition =
                    "none";
            }

            function pointerMove(e) {

                if (!dragging) return;

                const point =
                    e.touches
                        ? e.touches[0]
                        : e;

                currentX =
                    point.clientX - startX;

                currentY =
                    point.clientY - startY;

                const rotations = [-5, 7, -4];

                photo.style.transform =
                    `translate(${currentX}px,${currentY}px)
                     rotate(${rotations[index % rotations.length]}deg)`;
            }

            function pointerUp() {

                if (!dragging) return;

                dragging = false;

                photo.style.transition =
                    "box-shadow .3s ease";

            }

            photo.addEventListener(
                "mousedown",
                pointerDown
            );

            window.addEventListener(
                "mousemove",
                pointerMove
            );

            window.addEventListener(
                "mouseup",
                pointerUp
            );

            photo.addEventListener(
                "touchstart",
                pointerDown,
                { passive:true }
            );

            window.addEventListener(
                "touchmove",
                pointerMove,
                { passive:true }
            );

            window.addEventListener(
                "touchend",
                pointerUp
            );

        });

    }


    /* =====================================================
       CHAOTIC LITTLE INTERACTIONS
    ===================================================== */

    function setupChaosEffects() {

        const buttons =
            document.querySelectorAll(
                ".primary-action, .start-button, " +
                ".reveal-trigger, #restartButton"
            );

        buttons.forEach(button => {

            button.addEventListener("mouseenter", () => {

                if (window.innerWidth <= 900) return;

                button.style.transform =
                    `translateY(-3px)
                     rotate(${Math.random() * 2 - 1}deg)`;
            });

            button.addEventListener("mouseleave", () => {

                button.style.transform = "";
            });

        });


        /* Random floating doodle effect */

        const doodles = [
            "CHAOS",
            "BRO",
            "RUN!",
            "WHY?",
            "LOL",
            "NOPE",
            "BRUH",
            "AGAIN!",
            "💥"
        ];

        document.addEventListener("dblclick", (e) => {

            if (e.target.closest("input,button")) return;

            const doodle =
                document.createElement("div");

            doodle.textContent =
                doodles[
                    Math.floor(Math.random() * doodles.length)
                ];

            doodle.style.position = "fixed";
            doodle.style.left = `${e.clientX}px`;
            doodle.style.top = `${e.clientY}px`;
            doodle.style.zIndex = "11000";
            doodle.style.pointerEvents = "none";
            doodle.style.fontFamily = "Permanent Marker, cursive";
            doodle.style.fontSize =
                `${18 + Math.random() * 25}px`;
            doodle.style.color =
                Math.random() > .5
                    ? "#c83d35"
                    : "#f4c84b";
            doodle.style.transform =
                `translate(-50%,-50%)
                 rotate(${Math.random() * 30 - 15}deg)`;

            document.body.appendChild(doodle);

            doodle.animate(
                [
                    {
                        opacity:0,
                        transform:
                            `translate(-50%,-30%)
                             rotate(-10deg)
                             scale(.5)`
                    },
                    {
                        opacity:1,
                        transform:
                            `translate(-50%,-50%)
                             rotate(4deg)
                             scale(1)`
                    },
                    {
                        opacity:0,
                        transform:
                            `translate(-50%,-100%)
                             rotate(10deg)
                             scale(1.2)`
                    }
                ],
                {
                    duration:1000,
                    easing:"cubic-bezier(.16,1,.3,1)"
                }
            );

            setTimeout(() => {
                doodle.remove();
            }, 1050);

        });

    }


    /* =====================================================
       PAGE COUNTER
    ===================================================== */

    function setupPageCounter() {

        const counter =
            document.querySelector(".page-counter");

        if (!counter) return;

        const sections =
            document.querySelectorAll(
                "#main > section, #main > .section-block"
            );

        if (!sections.length) return;

        const number =
            counter.querySelector("span");

        const total =
            counter.querySelector("b");

        if (total) {
            total.textContent =
                String(sections.length).padStart(2, "0");
        }

        function updateCounter() {

            let activeIndex = 0;

            sections.forEach((section, index) => {

                const rect =
                    section.getBoundingClientRect();

                const center =
                    window.innerHeight / 2;

                if (
                    rect.top <= center &&
                    rect.bottom >= center
                ) {
                    activeIndex = index;
                }

            });

            if (number) {

                number.textContent =
                    String(activeIndex + 1)
                        .padStart(2, "0");
            }

        }

        window.addEventListener(
            "scroll",
            updateCounter,
            { passive:true }
        );

        updateCounter();

    }


    /* =====================================================
       IMAGE FALLBACK
    ===================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach(img => {

        img.addEventListener("error", () => {

            img.style.background =
                "linear-gradient(135deg,#e8dcc4,#f4c84b)";

            img.style.minHeight = "120px";

            img.style.objectFit = "contain";

            img.alt =
                img.alt || "BFF memory";

        });

    });


    /* =====================================================
       KEYBOARD SHORTCUTS
    ===================================================== */

    document.addEventListener("keydown", (e) => {

        /* ESC closes reveal cards */

        if (e.key === "Escape") {

            document
                .querySelectorAll(".reveal-item.open")
                .forEach(item => {

                    item.classList.remove("open");

                    const button =
                        item.querySelector(".reveal-trigger");

                    if (button) {
                        button.textContent = "OPEN";
                    }

                });

        }

    });


    /* =====================================================
       RESTART EXPERIENCE
    ===================================================== */

    if (restartButton) {

        restartButton.addEventListener("click", () => {

            window.scrollTo({
                top:0,
                behavior:"instant"
            });

            location.reload();

        });

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", (e) => {

            const targetID =
                link.getAttribute("href");

            const target =
                document.querySelector(targetID);

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior:"smooth",
                block:"start"
            });

        });

    });


    /* =====================================================
       PREVENT IMAGE DRAG
    ===================================================== */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("dragstart", e => {
            e.preventDefault();
        });

    });


    /* =====================================================
       MOBILE VIEWPORT FIX
    ===================================================== */

    function setViewportHeight() {

        document.documentElement.style
            .setProperty(
                "--vh",
                `${window.innerHeight * 0.01}px`
            );

    }

    setViewportHeight();

    window.addEventListener(
        "resize",
        setViewportHeight
    );


    /* =====================================================
       CONSOLE EASTER EGG
    ===================================================== */

    console.log(
        "%c🐱 TOM & JERRY BFF SYSTEM",
        "font-size:18px;font-weight:bold;"
    );

    console.log(
        "%cBRO CODE: ACTIVE",
        "font-size:12px;"
    );

});