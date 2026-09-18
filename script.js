
/* =====================================================
   INITIAL SETUP
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);


    /* =================================================
       LENIS SMOOTH SCROLL
    ================================================= */

    if (typeof Lenis !== "undefined") {

        const lenis = new Lenis({
            duration: 1.15,
            smoothWheel: true,
            touchMultiplier: 1.2
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }


    /* =================================================
       LOADER
    ================================================= */

    const loader = document.getElementById("loader");
    const loaderLine = document.querySelector(".loader-line span");

    gsap.to(loaderLine, {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut"
    });

    setTimeout(() => {

        gsap.to(loader, {
            opacity: 0,
            duration: .7,
            onComplete: () => {
                loader.style.display = "none";
            }
        });

    }, 1700);


    /* =================================================
       CUSTOM CURSOR
    ================================================= */

    const cursor = document.querySelector(".cursor");
    const ring = document.querySelector(".cursor-ring");

    window.addEventListener("mousemove", (e) => {

        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: .08
        });

        gsap.to(ring, {
            x: e.clientX,
            y: e.clientY,
            duration: .25
        });

    });


    document.querySelectorAll("button, a, .promise-card, .scratch-card").forEach(el => {

        el.addEventListener("mouseenter", () => {
            document.body.classList.add("cursor-hover");
        });

        el.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-hover");
        });

    });


    /* =================================================
       INTRO
    ================================================= */

    const intro = document.getElementById("intro");
    const gate = document.getElementById("gate");
    const enterBtn = document.getElementById("enterBtn");

    enterBtn.addEventListener("click", () => {

        gsap.to(intro, {
            opacity: 0,
            scale: 1.1,
            duration: 1,
            ease: "power3.inOut",
            onComplete: () => {

                intro.classList.add("hidden-section");
                gate.classList.remove("hidden-section");

                gsap.fromTo(
                    gate.querySelector(".gate-card"),
                    {
                        opacity: 0,
                        y: 80,
                        rotate: -4
                    },
                    {
                        opacity: 1,
                        y: 0,
                        rotate: 0,
                        duration: 1,
                        ease: "back.out(1.4)"
                    }
                );

            }
        });

    });


    /* =================================================
       YES / NO
    ================================================= */

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const runningText = document.getElementById("runningText");

    let noCount = 0;

    noBtn.addEventListener("mouseenter", () => {

        if (window.innerWidth <= 600) return;

        const x = (Math.random() - .5) * 250;
        const y = (Math.random() - .5) * 150;

        gsap.to(noBtn, {
            x,
            y,
            duration: .4,
            ease: "back.out"
        });

    });


    noBtn.addEventListener("click", () => {

        noCount++;

        const messages = [
            "bro really clicked NO 💀",
            "wrong answer detected.",
            "Tom is disappointed.",
            "Jerry has filed a complaint.",
            "YOU CANNOT ESCAPE.",
            "okay enough. click YES."
        ];

        runningText.textContent =
            messages[Math.min(noCount - 1, messages.length - 1)];

        gsap.fromTo(
            gate.querySelector(".gate-card"),
            { x: -8 },
            {
                x: 8,
                duration: .08,
                repeat: 7,
                yoyo: true,
                clearProps: "x"
            }
        );

    });


    yesBtn.addEventListener("click", () => {

        gsap.to(gate, {
            opacity: 0,
            duration: .6,
            onComplete: () => {

                gate.classList.add("hidden-section");

                const password =
                    document.getElementById("passwordScreen");

                password.classList.remove("hidden-section");

                gsap.fromTo(
                    password.querySelector(".password-card"),
                    {
                        opacity: 0,
                        scale: .7,
                        rotate: 5
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        duration: .9,
                        ease: "back.out(1.5)"
                    }
                );

            }
        });

    });


    /* =================================================
       PASSWORD
    ================================================= */

    const passwordInput =
        document.getElementById("passwordInput");

    const unlockBtn =
        document.getElementById("unlockBtn");

    const passwordMessage =
        document.getElementById("passwordMessage");

    const passwordScreen =
        document.getElementById("passwordScreen");

    const mainExperience =
        document.getElementById("mainExperience");


    function unlock() {

        const value =
            passwordInput.value.trim().toLowerCase();

        /*
            CHANGE PASSWORD HERE
        */

        const correctPassword = "tomjerry";


        if (value === correctPassword) {

            passwordMessage.style.color = "#7cff8b";
            passwordMessage.textContent =
                "ACCESS GRANTED. CHAOS UNLOCKED.";

            gsap.to(passwordScreen, {

                opacity: 0,
                scale: 1.1,

                duration: .8,

                onComplete: () => {

                    passwordScreen.classList.add("hidden-section");

                    mainExperience.classList.remove("hidden-section");

                    window.scrollTo(0, 0);

                    initMainAnimations();

                }

            });

        } else {

            passwordMessage.textContent =
                "ACCESS DENIED. Try again bro.";

            gsap.fromTo(
                passwordInput,
                { x: -10 },
                {
                    x: 10,
                    duration: .07,
                    repeat: 5,
                    yoyo: true,
                    clearProps: "x"
                }
            );

        }

    }


    unlockBtn.addEventListener("click", unlock);

    passwordInput.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {
            unlock();
        }

    });


    /* =================================================
       MAIN ANIMATIONS
    ================================================= */

    function initMainAnimations() {

        /* HERO */

        gsap.from(".hero-content > *", {
            opacity: 0,
            y: 60,
            duration: 1,
            stagger: .1,
            ease: "power3.out"
        });


        gsap.from(".hero-character", {
            opacity: 0,
            x: 200,
            rotate: 15,
            duration: 1.5,
            ease: "power4.out"
        });


        /* HERO PARALLAX */

        gsap.to(".hero-bg", {

            yPercent: 12,

            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }

        });


        /* CHAOS HEADING */

        gsap.from(".chaos-heading h2", {

            y: 100,
            opacity: 0,

            scrollTrigger: {
                trigger: ".chaos-intro",
                start: "top 75%"
            },

            duration: 1.2,
            ease: "power4.out"

        });


        /* REVEAL CARDS */

        gsap.from(".reveal-card", {

            y: 100,
            opacity: 0,
            rotate: 5,

            stagger: .12,

            scrollTrigger: {
                trigger: ".reveal-grid",
                start: "top 80%"
            },

            duration: 1,
            ease: "back.out(1.3)"

        });


        /* POLL */

        gsap.from(".poll-box", {

            x: 100,
            opacity: 0,

            scrollTrigger: {
                trigger: ".poll-section",
                start: "top 70%"
            },

            duration: 1,
            ease: "power3.out"

        });


        /* MEMORY */

        gsap.from(".scratch-card", {

            y: 100,
            opacity: 0,
            rotate: (i) => i % 2 ? 3 : -3,

            stagger: .15,

            scrollTrigger: {
                trigger: ".scratch-grid",
                start: "top 80%"
            },

            duration: 1,
            ease: "back.out(1.2)"

        });


        /* EMOTIONAL CARDS */

        gsap.from(".emotion-card", {

            y: 100,
            opacity: 0,

            stagger: .15,

            scrollTrigger: {
                trigger: ".emotion-cards",
                start: "top 75%"
            },

            duration: 1,
            ease: "power3.out"

        });


        /* PROMISE */

        gsap.from(".promise-card", {

            y: 80,
            opacity: 0,
            rotateY: 30,

            stagger: .12,

            scrollTrigger: {
                trigger: ".promise-grid",
                start: "top 80%"
            },

            duration: 1,
            ease: "back.out(1.2)"

        });


        /* PHOTO WALL */

        gsap.from(".photo-item", {

            scale: .8,
            opacity: 0,

            stagger: .1,

            scrollTrigger: {
                trigger: ".photo-wall",
                start: "top 80%"
            },

            duration: 1,
            ease: "power3.out"

        });


        /* FINAL */

        gsap.from(".final-content > *", {

            y: 70,
            opacity: 0,

            stagger: .12,

            scrollTrigger: {
                trigger: ".final-section",
                start: "top 75%"
            },

            duration: 1,
            ease: "power3.out"

        });

    }


    /* =================================================
       REVEAL CARDS
    ================================================= */

    document.querySelectorAll(".reveal-btn").forEach(button => {

        button.addEventListener("click", () => {

            const card =
                button.closest(".reveal-card");

            card.classList.toggle("revealed");

            button.textContent =
                card.classList.contains("revealed")
                    ? "HIDE EVIDENCE"
                    : "EXPOSE";

        });

    });


    /* =================================================
       POLL
    ================================================= */

    const pollOptions =
        document.querySelectorAll(".poll-option");

    const pollResult =
        document.getElementById("pollResult");

    pollOptions.forEach(option => {

        option.addEventListener("click", () => {

            const selected =
                option.dataset.option;

            let message = "";

            if (selected === "me") {

                message =
                    "Interesting choice. Confidence level: DELUSIONAL.";

            }

            if (selected === "friend") {

                message =
                    "Finally, some honesty. Respect.";

            }

            if (selected === "both") {

                message =
                    "CORRECT. Two idiots = one legendary friendship.";

            }

            pollResult.textContent = message;

            pollOptions.forEach(btn => {

                btn.style.borderColor =
                    btn === option
                        ? "#ffd447"
                        : "transparent";

            });

        });

    });


    /* =================================================
       SCRATCH CARDS
    ================================================= */

    document.querySelectorAll(".scratch-card").forEach(card => {

        const canvas =
            card.querySelector(".scratch-canvas");

        const ctx =
            canvas.getContext("2d");

        let isDrawing = false;
        let scratchedPixels = 0;

        function resizeCanvas() {

            const rect = card.getBoundingClientRect();

            canvas.width = rect.width;
            canvas.height = rect.height;

            ctx.fillStyle = "#747474";
            ctx.fillRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            ctx.fillStyle = "#8c8c8c";

            for (let i = 0; i < 200; i++) {

                ctx.beginPath();

                ctx.arc(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                    Math.random() * 2,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

            }

            ctx.fillStyle = "#fff";
            ctx.font = "bold 14px DM Sans";
            ctx.textAlign = "center";

            ctx.fillText(
                "SCRATCH FOR EVIDENCE",
                canvas.width / 2,
                canvas.height / 2
            );

        }

        resizeCanvas();

        window.addEventListener("resize", resizeCanvas);


        function scratch(e) {

            if (!isDrawing) return;

            const rect =
                canvas.getBoundingClientRect();

            const x =
                (e.clientX || e.touches?.[0]?.clientX) -
                rect.left;

            const y =
                (e.clientY || e.touches?.[0]?.clientY) -
                rect.top;

            ctx.globalCompositeOperation =
                "destination-out";

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                25,
                0,
                Math.PI * 2
            );

            ctx.fill();

            scratchedPixels++;

            if (scratchedPixels > 30) {

                card.classList.add("scratched");

            }

        }


        canvas.addEventListener("mousedown", () => {
            isDrawing = true;
        });

        canvas.addEventListener("mouseup", () => {
            isDrawing = false;
        });

        canvas.addEventListener("mouseleave", () => {
            isDrawing = false;
        });

        canvas.addEventListener("mousemove", scratch);


        canvas.addEventListener(
            "touchstart",
            () => {
                isDrawing = true;
            },
            { passive: true }
        );

        canvas.addEventListener(
            "touchend",
            () => {
                isDrawing = false;
            },
            { passive: true }
        );

        canvas.addEventListener(
            "touchmove",
            scratch,
            { passive: true }
        );

    });


    /* =================================================
       PROMISE CARD FLIP
    ================================================= */

    document.querySelectorAll(".promise-card").forEach(card => {

        card.addEventListener("click", () => {

            card.classList.toggle("flipped");

        });

    });


    /* =================================================
       CHAOS POPUP
    ================================================= */

    const chaosBtn =
        document.getElementById("chaosBtn");

    const chaosPopup =
        document.getElementById("chaosPopup");

    const popupClose =
        document.getElementById("popupClose");

    const anotherRoast =
        document.getElementById("anotherRoast");

    const roastText =
        document.getElementById("roastText");


    const roasts = [

        "Bro, your decision making needs a software update.",

        "Tom has better plans than you.",

        "Jerry would steal your snacks and still be your best friend.",

        "You have officially been diagnosed with being annoying.",

        "Friendship status: unfortunately permanent.",

        "System warning: too much bro energy detected.",

        "Scientists are still trying to understand your behaviour.",

        "You're not getting rid of me. Nice try."

    ];


    function showRoast() {

        roastText.textContent =
            roasts[Math.floor(Math.random() * roasts.length)];

    }


    chaosBtn.addEventListener("click", () => {

        showRoast();

        chaosPopup.classList.add("active");

    });


    anotherRoast.addEventListener("click", () => {

        showRoast();

        gsap.fromTo(
            roastText,
            { scale: .8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: .4
            }
        );

    });


    popupClose.addEventListener("click", () => {

        chaosPopup.classList.remove("active");

    });


    chaosPopup.addEventListener("click", (e) => {

        if (e.target === chaosPopup) {

            chaosPopup.classList.remove("active");

        }

    });


    /* =================================================
       SOUND BUTTON
    ================================================= */

    const soundBtn =
        document.getElementById("soundBtn");

    soundBtn.addEventListener("click", () => {

        /*
            Add your own audio file here if you want.

            Example:

            const audio = new Audio("chaos.mp3");
            audio.play();
        */

        soundBtn.textContent = "🔊 CHAOS ACTIVATED";

        setTimeout(() => {

            soundBtn.textContent = "🔊 CHAOS SOUND";

        }, 2000);

    });


    /* =================================================
       RESTART
    ================================================= */

    document.getElementById("restartBtn")
        .addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });


    /* =================================================
       RANDOM FLOATING CHAOS
    ================================================= */

    function createChaosParticle() {

        const particle =
            document.createElement("div");

        particle.textContent =
            Math.random() > .5 ? "✦" : "•";

        particle.style.position = "fixed";
        particle.style.left =
            Math.random() * 100 + "vw";
        particle.style.bottom = "-20px";
        particle.style.zIndex = "5000";
        particle.style.pointerEvents = "none";

        particle.style.color =
            Math.random() > .5
                ? "#ffd447"
                : "#4b8cff";

        document.body.appendChild(particle);

        gsap.to(particle, {

            y: -(window.innerHeight + 100),
            x: (Math.random() - .5) * 200,
            rotation: Math.random() * 360,

            duration: 4 + Math.random() * 4,

            ease: "none",

            onComplete: () => {
                particle.remove();
            }

        });

    }


    setInterval(createChaosParticle, 1800);


});