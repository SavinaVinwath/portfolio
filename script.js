const nightModeBtn = document.getElementById("night-mode-toggle");

nightModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    nightModeBtn.textContent = "☀️ Light";
  } else {
    nightModeBtn.textContent = "🌙 Dark";
  }
});

const typewriterText = "HELLO! <br> I'm Savina Vinwath";
const heroHeading = document.getElementById("hero-heading");
let i = 0;

function typeWriter() {
  if (i < typewriterText.length) {
    heroHeading.innerHTML =
      typewriterText.slice(0, i + 1) + '<span class="blink">|</span>';
    i++;
    setTimeout(typeWriter, 100);
  } else {
    heroHeading.innerHTML = typewriterText;
  }
}

typeWriter();

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio website built with HTML, CSS, Bootstrap, and JavaScript.",
    image: "assets/project1.jpg",
    technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"]
    liveDemo: "https://savinavinwath.social"
  },
  {
    title: "Task Manager App",
    description:
      "A web app to manage daily tasks with a clean UI and responsive design.",
    image: "assets/project2.jpg",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"]
  },
  {
    title: "Visit Sri Lanka",
    description:
      "A responsive travel and tourism website designed to promote Sri Lanka’s top destinations, cultural heritage, and natural beauty.",
    image: "assets/project3.jpg",
    technologies: ["HTML", "CSS", "JavaScript", "AJAX"],
    liveDemo: "https://lankavisit.page"
  }
];

const worksGrid = document.getElementById("works-grid");

projects.forEach((project) => {
  const col = document.createElement("div");
  col.className = "col-md-4 mb-4";

  col.innerHTML = `
    <div class="project-card h-100 p-3 d-flex flex-column" data-aos="fade-up">
      <img src="${project.image}" alt="${project.title}" class="img-fluid mb-3 rounded">
      <h5>${project.title}</h5>
      <p class="text-muted">${project.description}</p>
      <div class="mb-3">
        ${project.technologies
          .map((tech) => `<span class="tech-badge">${tech}</span>`)
          .join("")}
      </div>
      ${
        project.liveDemo
          ? `<a href="${project.liveDemo}" target="_blank" class="btn btn-primary mt-auto">🚀 Live Demo</a>`
          : ""
      }
    </div>
  `;

  worksGrid.appendChild(col);
});

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name && email && phone && message) {
    fetch("https://formspree.io/f/xpwkbpzy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name,
        _replyto: email,
        phone,
        message,
        _subject: "New Contact Form Submission"
      })
    })
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then(() => {
        formMessage.textContent = "Message sent successfully!";
        formMessage.className = "success mt-3";
        contactForm.reset();
      })
      .catch(() => {
        formMessage.textContent = "Something went wrong. Please try again.";
        formMessage.className = "error mt-3";
      });
  } else {
    formMessage.textContent = "Please fill all fields.";
    formMessage.className = "error mt-3";
  }
});

AOS.init({
  duration: 1200,
  easing: "ease-in-out",
  once: false,
  mirror: true
});
