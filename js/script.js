/* ============ Service Section Animation (Scroll) ============ */
const serviceCards = document.querySelectorAll(".service-card");

if (serviceCards.length && "IntersectionObserver" in window) {
  serviceCards.forEach((card, index) => {
    if (index % 4 < 2) {
      card.classList.add("from-left");
    } else {
      card.classList.add("from-right");
    }
  });

  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        serviceObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  serviceCards.forEach(card => serviceObserver.observe(card));
} else {
  serviceCards.forEach(card => card.classList.add("show"));
}

/* ============ Menu Toggle ============ */
const menuToggle = document.getElementById("menuToggle");
if (menuToggle) {
  menuToggle.addEventListener("click", function () {
    const navMenu = document.querySelector(".main-header .nav-menu");
    if (navMenu) navMenu.classList.toggle("active");
  });
}

/* ============ Mobile Dropdown ============ */
document.querySelectorAll(".main-header .dropdown > a").forEach(item => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    this.parentElement.classList.toggle("active");
  });
});

/* ============ Slide Section Animation ============ */
const slideSection = document.querySelector('.slide-left');
if (slideSection) {
  const slideObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          slideSection.classList.add('show');
        }
      });
    },
    { threshold: 0.3 }
  );
  slideObserver.observe(slideSection);
}

/* ============ Slider Image Auto Slide ============ */
document.querySelectorAll('.slider').forEach(slider => {
  const images = slider.querySelectorAll('img');
  let index = 0;
  setInterval(() => {
    images[index].classList.remove('active');
    index = (index + 1) % images.length;
    images[index].classList.add('active');
  }, 10000);
});

/* ============ Project Card Slider ============ */
document.querySelectorAll('.project-card').forEach(card => {
  const track = card.querySelector('.inner-track');
  if (!track) return;
  const images = track.querySelectorAll('img');
  let index = 0;

  setInterval(() => {
    index = (index + 1) % images.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }, 3000);
});

/* ============ Manual Slide Function ============ */
let sliderIndex = 0;

function moveSlide(step) {
  const slider = document.getElementById("slider");
  if (!slider) return;

  const cards = slider.children;
  if (!cards.length) return;

  const cardWidth = cards[0].offsetWidth + 30;
  const maxIndex = cards.length - 1;

  sliderIndex += step;

  if (sliderIndex < 0) sliderIndex = maxIndex;
  if (sliderIndex > maxIndex) sliderIndex = 0;

  slider.style.transform = `translateX(-${sliderIndex * cardWidth}px)`;
}

/* ============ Read More Toggle ============ */
function toggleReadMore(el) {
  const text = el.previousElementSibling;
  if (!text) return;

  const shortText = text.getAttribute("data-short");
  const fullText = text.getAttribute("data-full");

  if (el.innerText === "Read more") {
    text.innerText = fullText;
    el.innerText = "Read less";
  } else {
    text.innerText = shortText;
    el.innerText = "Read more";
  }
}

/* ============ Touch Swipe for Reviews ============ */
let startX = 0;
let endX = 0;
const wrapper = document.querySelector(".review-wrapper");

if (wrapper) {
  wrapper.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  wrapper.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) moveSlide(1);   // swipe left
    else if (endX - startX > 50) moveSlide(-1); // swipe right
  });
}

/* ============ Ongoing Project Animation ============ */
document.addEventListener("DOMContentLoaded", () => {
  const ongoingCards = document.querySelectorAll(".ongoing-card");
  if (ongoingCards.length && "IntersectionObserver" in window) {
    const ongoingObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    }, { threshold: 0.2 });

    ongoingCards.forEach(card => ongoingObserver.observe(card));
  } else {
    document.querySelectorAll(".ongoing-card").forEach(card => card.classList.add("show"));
  }
});


// counter animation


  const counters = document.querySelectorAll(".counter");

  const runCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const suffix = counter.getAttribute("data-suffix") || "";
    let count = 0;

    const speed = 50; // speed increase panna fast aagum

    const updateCount = () => {
      const increment = Math.ceil(target / speed);

      count += increment;

      if (count < target) {
        counter.innerText = count + suffix;
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target + suffix;
      }
    };

    updateCount();
  };

  // Scroll la section visible aana odane start aagum
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        obs.unobserve(entry.target); // one time only
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));

  // google reviews

let index = 0;

function moveSlide(step) {
  const slider = document.getElementById("slider");
  const cards = slider.children;
  const cardWidth = cards[0].offsetWidth + 30;
  const maxIndex = cards.length - 1;

  index = index + step;

  if (index < 0) {
    index = maxIndex;
  } 
  if (index > maxIndex) {
    index = 0;
  }

  slider.style.transform = `translateX(-${index * cardWidth}px)`;
}

function toggleReadMore(el) {
  const text = el.previousElementSibling;

  const shortText = text.getAttribute("data-short");
  const fullText = text.getAttribute("data-full");

  if (el.innerText === "Read more") {
    text.innerText = fullText;
    el.innerText = "Read less";
  } else {
    text.innerText = shortText;
    el.innerText = "Read more";
  }
}
  const sliders = document.querySelectorAll(".slider");

  sliders.forEach(slider => {
    const slides = slider.querySelectorAll(".slide");
    let index = 0;

    setInterval(() => {
      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("active");
    }, 3000); // 3 seconds
  });
  

  document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".know-more-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const card = this.closest(".property-card");
      if (!card) return;

      card.classList.toggle("active");

      this.textContent = card.classList.contains("active")
        ? "Show Less"
        : "Know More";
    });
  });
});
document.querySelectorAll(".property-img").forEach(slider => {
  const images = slider.querySelectorAll("img");
  let index = 0;

  images[0].classList.add("active");

  setInterval(() => {
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
  }, 3000);
});
// ===== AUTO POPUP EVERY 30 SECONDS =====
const quoteModal = document.getElementById("quoteModal");
const closeQuote = document.getElementById("closeQuote");

// Show popup
function showQuoteModal() {
  quoteModal.style.display = "flex";
}

// Close popup
closeQuote.addEventListener("click", () => {
  quoteModal.style.display = "none";
});

// Close on outside click
window.addEventListener("click", (e) => {
  if (e.target === quoteModal) {
    quoteModal.style.display = "none";
  }
});

// First popup after page load (3 sec)
setTimeout(showQuoteModal, 3000);

// Repeat every 30 seconds
setInterval(() => {
  if (quoteModal.style.display === "none") {
    showQuoteModal();
  }
}, 30000);
