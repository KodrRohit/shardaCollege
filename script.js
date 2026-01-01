const btn = document.querySelector(".secondary"); 
const wrapper = document.querySelector(".fizzy-wrapper");
const slider = document.querySelector('.slider');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const navbar = document.querySelector(".nav-bar")
const track = document.querySelector(".carousel-track")

const reveals = document.querySelectorAll(".reveal")

AOS.init();


// Toggle navigation menu on smaller screens
function toggleNav() {
    const nav = document.querySelector('.nav-elem');
    nav.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter")
  const stats = document.querySelectorAll(".num")

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function formatNumber(num) {
    return num.toLocaleString();
  }

  function animateCounter(counter, delay = 0){
    const target = Number(counter.dataset.target)
    const h1 = counter.parentElement;

    let start = 0;
    const duration = 1600
    const startTime = performance.now() + delay;

    function update(now) {
      if (now < startTime) {
        requestAnimationFrame(update);
        return;
      }

      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);

      counter.textContent = formatNumber(value);
      h1.classList.add("glow");

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = formatNumber(target);
        h1.classList.remove("glow");
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("sho");

          const counter = entry.target.querySelector(".counter");
          if (!prefersReducedMotion) {
            animateCounter(counter, index * 250); // stagger
          } else {
            counter.textContent = counter.dataset.target;
          }

          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  stats.forEach(stat => observer.observe(stat));
});


const itemss = track.innerHTML;

track.innerHTML += itemss


btn.addEventListener('mouseenter', () => { 
  for (let i = 0; i < 40; i++) {
    createBubble();
  }
});


window.addEventListener("load", () => {
  setTimeout(() => {
    navbar.classList.add("show")
  }, 500)
}) 


function moveNext() {
  slider.appendChild(slider.firstElementChild);
}

function movePrev() {
  slider.prepend(slider.lastElementChild);
}

next.addEventListener('click', moveNext);
prev.addEventListener('click', movePrev);

setInterval(() => {
  moveNext();
}, 4000);

var marquee = document.getElementById("myMarquee");

// Stop the marquee on hover
marquee.addEventListener("mouseover", function () {
  marquee.stop();
  marquee.style.cursor = 'pointer';
});

// Start the marquee again when the mouse leaves
marquee.addEventListener("mouseout", function () {
  marquee.start();
});




function createBubble() {
  const bubble = document.createElement("span");
  bubble.classList.add('bubble');

  const size = Math.random() * 12 + 6; 
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";

  const xPos = Math.random() * 120 - 60; 
  bubble.style.left = 50 + xPos + "px"; 
  bubble.style.bottom = "10px"; 

  const moveX = Math.random() * 120 - 50 + "px"; 
  const moveY = -(Math.random() * 150 + 80) + "px"; 
  bubble.style.setProperty("--x", moveX);
  bubble.style.setProperty("--y", moveY);

  wrapper.appendChild(bubble);

  setTimeout(() => {
    bubble.remove(); 
  }, 2000);
}









const lecturers = [
    {
        name: "Dr. Amit Sharma",
        role: "Industry Expert – Management",
        tag: "Management",
        photo: "https://plus.unsplash.com/premium_photo-1705267936187-aceda1a6c1a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3Vlc3QlMjBsZWN0dXJlfGVufDB8fDB8fHww",
        desc: "Conducted a guest lecture on modern business strategies and leadership skills for BBA students.",
        // expertise: "Strategic Management, Leadership Development",
        // engagement: "Keynote speaker at Global Business Summit"
    },
    {
        name: "Ms. Neha Patil",
        role: "Finance Consultant",
        tag: "Finance",
        photo: "https://plus.unsplash.com/premium_photo-1705883063492-8790cc64f34b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGd1ZXN0JTIwbGVjdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
        desc: "Delivered an interactive session on financial planning and investment strategies.",
        // expertise: "Corporate Finance, Investment Planning",
        // engagement: "Financial Advisor at Top Firms"
    },
    {
        name: "Mr. Rahul Deshmukh",
        role: "Tech Entrepreneur",
        tag: "Technology",
        photo: "https://images.unsplash.com/photo-1691034545710-036170315565?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGd1ZXN0JTIwbGVjdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
        desc: "Spoke on startups, innovation and technology-driven businesses.",
        // expertise: "Startups, Product Development",
        // engagement: "Founder of multiple tech startups"
    }
];

let currentIndex = 0;
let sliderInterval;
const card = document.getElementById("card");

function showLecturer(index) {
    currentIndex = index;

    // fade out
    card.classList.remove("fade-in");
    card.classList.add("fade-out");

    setTimeout(() => {
        // update content
        document.querySelectorAll(".directory li").forEach(li =>
            li.classList.remove("active")
        );
        document.querySelectorAll(".directory li")[index].classList.add("active");

        document.getElementById("name").innerText = lecturers[index].name;
        document.getElementById("role").innerText = lecturers[index].role;
        document.getElementById("tag").innerText = lecturers[index].tag;
        document.getElementById("photo").src = lecturers[index].photo;
        document.getElementById("desc").innerText = lecturers[index].desc;
        document.getElementById("expertise").innerText = lecturers[index].expertise;
        document.getElementById("engagement").innerText = lecturers[index].engagement;

        // fade in
        card.classList.remove("fade-out");
        card.classList.add("fade-in");

    }, 400);

    resetSlider();
}

function startSlider() {
    sliderInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % lecturers.length;
        showLecturer(currentIndex);
    }, 4000);
}

function resetSlider() {
    clearInterval(sliderInterval);
    startSlider();
}

showLecturer(0);
startSlider();




const slider = document.querySelector(".slider");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let cards = document.querySelectorAll(".card");
let cardWidth = cards[0].offsetWidth + 20;
let index = 0;


cards.forEach(card => {
  slider.appendChild(card.cloneNode(true));
});

function nextSlide() {
  index++;
  slider.style.transition = "transform 0.4s ease";
  slider.style.transform = `translateX(-${index * cardWidth}px)`;

  if (index === cards.length) {
    setTimeout(() => {
      slider.style.transition = "none";
      index = 0;
      slider.style.transform = `translateX(0px)`;
    }, 400);
  }
}


function prevSlide() {
  if (index === 0) {
    slider.style.transition = "none";
    index = cards.length;
    slider.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  setTimeout(() => {
    index--;
    slider.style.transition = "transform 0.4s ease";
    slider.style.transform = `translateX(-${index * cardWidth}px)`;
  }, 10);
}


nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);


let autoSlide = setInterval(nextSlide, 2500);


slider.addEventListener("mouseenter", () => {
  clearInterval(autoSlide);
});

slider.addEventListener("mouseleave", () => {
  autoSlide = setInterval(nextSlide, 2500);
});


const items = document.querySelectorAll(".event-item");
const spotlightImg = document.getElementById("spotlightImg");
const spotlightDate = document.getElementById("spotlightDate");
// const spotlightTitle = document.getElementById("spotlightTitle");
// const spotlightDesc = document.getElementById("spotlightDesc");

let currentIndexs = 0;

function showEvent(index) {
    // remove active
    items.forEach(item => item.classList.remove("active"));

    const item = items[index];
    item.classList.add("active");

    // fade effect
    spotlightImg.style.opacity = 0;
    setTimeout(() => {
        spotlightImg.src = item.dataset.img;
        spotlightDate.innerText = item.dataset.date;
        spotlightTitle.innerText = item.dataset.title;
        spotlightDesc.innerText = item.dataset.desc;
        spotlightImg.style.opacity = 1;
    }, 300);
}

function startAutoSlider() {
    showEvent(currentIndexs);

    setInterval(() => {
        currentIndexs = (currentIndexs + 1) % items.length;
        showEvent(currentIndexs);
    }, 4000);
}

startAutoSlider();



document.addEventListener("DOMContentLoaded", () => {

    const card   = document.getElementById("carde");
    const photo  = document.getElementById("photo");
    const rank   = document.getElementById("rank");
    const nameEl = document.getElementById("names");
    const sid    = document.getElementById("sid");
    const course = document.getElementById("course");
    const year   = document.getElementById("year");
    const cgpa   = document.getElementById("cgpa");

    console.log(photo)
  
    const toppers = [
      {
        name:"Badhe Kunal Kailas",
        id:"2024-8892",
        course:"BBA (CA)",
        year:"TYBCA",
        cgpa:"9.10 / 10",
        rank:"Rank 1",
        img:"https://plus.unsplash.com/premium_photo-1677231559666-53bed9be43ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym95c3xlbnwwfHwwfHx8MA%3D%3D"
      },
      {
        name:"Kukkar Shruti Rajendra",
        id:"2024-8893",
        course:"BBA (CA)",
        year:"TYBCA",
        cgpa:"8.92 / 10",
        rank:"Rank 2",
        img:"https://images.unsplash.com/photo-1648218943004-5ec604ef627a?w=500"
      },
      {
        name:"Ghule Shubham Valmik",
        id:"2024-8894",
        course:"BBA (CA)",
        year:"SYBCA",
        cgpa:"8.27 / 10",
        rank:"Rank 3",
        img:"https://images.unsplash.com/photo-1623685463160-f3f501540a91?w=500"
      }
    ];
  
    let index = 0;
  
    function renderTopper(i){
  
      // PHASE 1: fade out
      card.classList.add("hidden");
  
      setTimeout(() => {
  
        // update content AFTER fade-out
        photo.src = toppers[i].img;
        nameEl.textContent = toppers[i].name;
        // sid.textContent    = "STUDENT ID: " + toppers[i].id;
        course.textContent = toppers[i].course;
        year.textContent   = toppers[i].year;
        cgpa.textContent   = toppers[i].cgpa;
        rank.textContent   = toppers[i].rank;
  
        // PHASE 2: next frame fade in
        requestAnimationFrame(() => {
          card.classList.remove("hidden");
        });
  
      }, 600); // must match CSS duration
    }
  
    // initial render
    renderTopper(index);
  
    // AUTO CHANGE
    setInterval(() => {
      index = (index + 1) % toppers.length;
      renderTopper(index);
    }, 4000); // smooth timing
  
  });




  
