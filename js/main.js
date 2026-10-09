
/* =====================================================
   BROMO DESTINATIONS
   JAVASCRIPT UTAMA
   Navbar, Dropdown, Galeri, Testimoni, WhatsApp, Scroll
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. KONFIGURASI WHATSAPP
    // GANTI NOMOR DI BAWAH DENGAN NOMOR ADMIN
    // Gunakan kode negara tanpa tanda + atau spasi.
    // Contoh: 6281234567890
    // ==========================================

    const whatsappNumber = "6281234567890";

    function openWhatsApp(message) {
        const url = "https://wa.me/" + whatsappNumber +
            "?text=" + encodeURIComponent(message);

        window.open(url, "_blank", "noopener,noreferrer");
    }

    // ==========================================
    // 2. MOBILE NAVBAR
    // ==========================================

    const menuToggle = document.getElementById("menuToggle");
    const bubbleNav = document.getElementById("bubbleNav");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMobileMenu() {
        if (!bubbleNav || !menuToggle) return;

        bubbleNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.body.classList.remove("menu-open");
    }

    if (menuToggle && bubbleNav) {
        menuToggle.addEventListener("click", function () {
            const isOpen = bubbleNav.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

            document.body.classList.toggle("menu-open", isOpen);
        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", closeMobileMenu);
        });

        document.addEventListener("click", function (event) {
            const clickedInsideNav = bubbleNav.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideNav && !clickedToggle) {
                closeMobileMenu();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 780) {
                closeMobileMenu();
            }
        });
    }

    // ==========================================
    // 3. DROPDOWN PAKET WISATA
    // ==========================================

    const dropdown = document.querySelector(".nav-dropdown");
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownLinks = document.querySelectorAll(".dropdown-menu a");

    if (dropdown && dropdownToggle) {
        dropdownToggle.addEventListener("click", function (event) {
            event.stopPropagation();

            const isOpen = dropdown.classList.toggle("open");
            dropdownToggle.setAttribute("aria-expanded", String(isOpen));
        });

        dropdownLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                dropdown.classList.remove("open");
                dropdownToggle.setAttribute("aria-expanded", "false");
                closeMobileMenu();
            });
        });

        document.addEventListener("click", function (event) {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove("open");
                dropdownToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // ==========================================
    // 4. NAVBAR ACTIVE LINK
    // ==========================================

    const sections = document.querySelectorAll("main section[id]");

    function updateActiveLink() {
        let currentSection = "beranda";

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(function (link) {
            const href = link.getAttribute("href");
            link.classList.toggle("active", href === "#" + currentSection);
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    // ==========================================
    // 5. TOMBOL KEMBALI KE ATAS
    // ==========================================

    const backToTop = document.getElementById("backToTop");

    function updateBackToTop() {
        if (!backToTop) return;

        backToTop.classList.toggle("show", window.scrollY > 450);
    }

    window.addEventListener("scroll", updateBackToTop);
    updateBackToTop();

    if (backToTop) {
        backToTop.addEventListener("click", function (event) {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ==========================================
    // 6. GALERI & LIGHTBOX
    // ==========================================

    const galleryItems = Array.from(
        document.querySelectorAll(".gallery-item")
    );

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");

    let currentGalleryIndex = 0;

    function showGalleryImage(index) {
        if (!galleryItems.length || !lightboxImage) return;

        currentGalleryIndex =
            (index + galleryItems.length) % galleryItems.length;

        const thumbnail = galleryItems[currentGalleryIndex].querySelector("img");

        if (!thumbnail) return;

        lightboxImage.src = thumbnail.src;
        lightboxImage.alt = thumbnail.alt || "Foto galeri";
    }

    function openGallery(index) {
        if (!lightbox) return;

        showGalleryImage(index);
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        if (lightboxClose) {
            lightboxClose.focus();
        }
    }

    function closeGallery() {
        if (!lightbox) return;

        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    galleryItems.forEach(function (item, index) {
        item.addEventListener("click", function () {
            openGallery(index);
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeGallery);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener("click", function () {
            showGalleryImage(currentGalleryIndex - 1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener("click", function () {
            showGalleryImage(currentGalleryIndex + 1);
        });
    }

    if (lightbox) {
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeGallery();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (!lightbox || !lightbox.classList.contains("open")) return;

        if (event.key === "Escape") {
            closeGallery();
        }

        if (event.key === "ArrowLeft") {
            showGalleryImage(currentGalleryIndex - 1);
        }

        if (event.key === "ArrowRight") {
            showGalleryImage(currentGalleryIndex + 1);
        }
    });

    // ==========================================
    // 7. TESTIMONI OTOMATIS
    // ==========================================

    const testimonialTrack = document.getElementById("testimonialTrack");
    const testimonialPrev = document.getElementById("testimonialPrev");
    const testimonialNext = document.getElementById("testimonialNext");
    const testimonialDots = document.getElementById("testimonialDots");

    const testimonialCards = testimonialTrack
        ? Array.from(testimonialTrack.children)
        : [];

    let testimonialIndex = 0;
    let testimonialTimer = null;

    function getVisibleTestimonials() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 780) return 2;
        return 3;
    }

    function getMaxTestimonialIndex() {
        return Math.max(
            0,
            testimonialCards.length - getVisibleTestimonials()
        );
    }

    function createTestimonialDots() {
        if (!testimonialDots) return;

        testimonialDots.innerHTML = "";

        const total = getMaxTestimonialIndex() + 1;

        for (let i = 0; i < total; i++) {
            const dot = document.createElement("button");

            dot.type = "button";
            dot.setAttribute("aria-label", "Tampilkan testimoni " + (i + 1));

            dot.addEventListener("click", function () {
                testimonialIndex = i;
                updateTestimonials();
                restartTestimonialTimer();
            });

            testimonialDots.appendChild(dot);
        }
    }

    function updateTestimonials() {
        if (!testimonialTrack || !testimonialCards.length) return;

        const maxIndex = getMaxTestimonialIndex();

        testimonialIndex = Math.max(
            0,
            Math.min(testimonialIndex, maxIndex)
        );

        const card = testimonialCards[0];
        const trackStyle = window.getComputedStyle(testimonialTrack);
        const gap = parseFloat(trackStyle.columnGap || trackStyle.gap) || 0;
        const cardWidth = card.getBoundingClientRect().width;

        const offset = testimonialIndex * (cardWidth + gap);

        testimonialTrack.style.transform =
            "translateX(-" + offset + "px)";

        if (testimonialDots) {
            Array.from(testimonialDots.children).forEach(function (dot, index) {
                dot.classList.toggle("active", index === testimonialIndex);
            });
        }
    }

    function nextTestimonial() {
        const maxIndex = getMaxTestimonialIndex();

        testimonialIndex =
            testimonialIndex >= maxIndex ? 0 : testimonialIndex + 1;

        updateTestimonials();
    }

    function previousTestimonial() {
        const maxIndex = getMaxTestimonialIndex();

        testimonialIndex =
            testimonialIndex <= 0 ? maxIndex : testimonialIndex - 1;

        updateTestimonials();
    }

    function startTestimonialTimer() {
        stopTestimonialTimer();

        testimonialTimer = setInterval(function () {
            if (!document.hidden) {
                nextTestimonial();
            }
        }, 4500);
    }

    function stopTestimonialTimer() {
        if (testimonialTimer) {
            clearInterval(testimonialTimer);
            testimonialTimer = null;
        }
    }

    function restartTestimonialTimer() {
        startTestimonialTimer();
    }

    if (testimonialCards.length) {
        createTestimonialDots();
        updateTestimonials();
        startTestimonialTimer();

        if (testimonialNext) {
            testimonialNext.addEventListener("click", function () {
                nextTestimonial();
                restartTestimonialTimer();
            });
        }

        if (testimonialPrev) {
            testimonialPrev.addEventListener("click", function () {
                previousTestimonial();
                restartTestimonialTimer();
            });
        }

        window.addEventListener("resize", function () {
            createTestimonialDots();
            updateTestimonials();
        });

        const testimonialSlider = document.querySelector(".testimonial-slider");

        if (testimonialSlider) {
            testimonialSlider.addEventListener("mouseenter", stopTestimonialTimer);
            testimonialSlider.addEventListener("mouseleave", startTestimonialTimer);
            testimonialSlider.addEventListener("focusin", stopTestimonialTimer);
            testimonialSlider.addEventListener("focusout", startTestimonialTimer);
        }
    }

    // ==========================================
    // 8. TOMBOL TANYA PAKET VIA WHATSAPP
    // ==========================================

    const packageLinks = document.querySelectorAll("[data-package]");

    packageLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const packageName = link.getAttribute("data-package");

            const message =
                "Halo Bromo Destinations, saya ingin bertanya tentang " +
                packageName +
                ". Mohon informasi harga, jadwal, dan fasilitasnya.";

            openWhatsApp(message);
        });
    });

    // ==========================================
    // 9. FORMULIR KONTAK KE WHATSAPP
    // ==========================================

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("customerName").value.trim();
            const phone = document.getElementById("customerPhone").value.trim();
            const destination = document.getElementById("destination").value;
            const date = document.getElementById("travelDate").value;
            const message = document.getElementById("customerMessage").value.trim();

            if (!name || !phone || !destination) {
                alert("Mohon lengkapi nama, nomor WhatsApp, dan paket wisata.");
                return;
            }

            const whatsappMessage =
                "Halo Bromo Destinations!\n\n" +
                "Saya ingin bertanya dan memesan paket wisata.\n\n" +
                "Nama: " + name + "\n" +
                "Nomor WhatsApp: " + phone + "\n" +
                "Paket: " + destination + "\n" +
                "Tanggal perjalanan: " + (date || "Belum ditentukan") + "\n" +
                "Pesan: " + (message || "-") + "\n\n" +
                "Mohon informasi lebih lanjut. Terima kasih.";

            openWhatsApp(whatsappMessage);
        });
    }

    // ==========================================
    // 10. TAHUN OTOMATIS DI FOOTER
    // ==========================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

});



/* NAVBAR SCROLL DESKTOP DAN MOBILE */
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".site-header");

    if (!header) return;

    function updateNavbar() {
        header.classList.toggle("scrolled", window.scrollY > 40);
    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();
});
