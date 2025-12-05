const nightModeBtn = document.getElementById('night-mode-toggle');

nightModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Change button text
    if(document.body.classList.contains('dark-mode')){
        nightModeBtn.textContent = '☀️ light ';
    } else {
        nightModeBtn.textContent = '🌙 Dark';
    }
});

const typewriterText = "HELLO! <br> I'm Savina Vinwath";
const heroHeading = document.querySelector("#home h1");
let i = 0;
function typeWriter() {
    if(i < typewriterText.length){
        heroHeading.innerHTML = typewriterText.slice(0, i+1) + '<span class="blink">|</span>';
        i++;
        setTimeout(typeWriter, 100);
    } else { heroHeading.innerHTML = typewriterText; }
}
typeWriter();

const projects = [
    { "title":"Portfolio Website","description":"A personal portfolio website built with HTML, CSS, Bootstrap, and JS.","image":"assets/project1.jpg","technologies":["HTML","CSS","Bootstrap","JavaScript"] },
    { "title":"Task Manager App","description":"A web app to manage daily tasks with a clean UI and responsive design.","image":"assets/project2.jpg","technologies":["HTML","CSS","JavaScript","Bootstrap"] },
    { "title":"Weather Dashboard","description":"Real-time weather dashboard using AJAX and open APIs.","image":"assets/project3.jpg","technologies":["HTML","CSS","JavaScript","AJAX"] }
];

const worksGrid = document.getElementById('works-grid');
projects.forEach(project => {
    const col = document.createElement('div');
    col.classList.add('col-md-4','mb-4');
    col.innerHTML = `
        <div class="project-card h-100 p-3" data-aos="fade-up">
            <img src="${project.image}" alt="${project.title}" class="img-fluid mb-3 rounded">
            <h5>${project.title}</h5>
            <p class="text-muted">${project.description}</p>
            <div>${project.technologies.map(tech=>`<span class="tech-badge">${tech}</span>`).join('')}</div>
        </div>
    `;
    worksGrid.appendChild(col);
});

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    if(name && email && phone && message){
        
        const FORMSPREE_URL = 'https://formspree.io/f/xpwkbpzy';
        const formData = {
            name: name,
            _replyto: email,  
            phone: phone,
            message: message,
            _subject: 'New Contact Form Submission'  
        };

        fetch(FORMSPREE_URL, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            console.log('Response status:', response.status);  
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(data => {
                    throw new Error(data.errors ? data.errors[0] : 'Server error');
                });
            }
        })
        .then(data => {
            console.log('Success data:', data);  
            formMessage.textContent = "Message sent successfully!";
            formMessage.className = "success mt-3";
            contactForm.reset();
        })
        .catch(error => {
            console.error('Full error:', error);  
            formMessage.textContent = `Oops! There was a problem: ${error.message}`;
            formMessage.className = "error mt-3";
        });
    } else {
        formMessage.textContent = "Please fill all fields.";
        formMessage.className = "error mt-3";
    }
});

AOS.init({
    duration:1200,
    easing:'ease-in-out',
    once:false, 
    mirror:true 
});

