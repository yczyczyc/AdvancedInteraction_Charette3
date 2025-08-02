const totalSketches = 20;
const nav = document.createElement('nav');
const ul = document.createElement('ul');
ul.className = 'nav-bar';

// Detect if we are in a sketch page (inside /sketches/sketchX/)
const isInSketchPage = window.location.pathname.includes('/sketches/');

for (let i = 1; i <= totalSketches; i++) {
  const li = document.createElement('li');
  const link = document.createElement('a');

  // Use different paths depending on current page location
  link.href = isInSketchPage
    ? `../sketch${i}/index.html`       // from inside sketches/sketchX/
    : `sketches/sketch${i}/index.html` // from root index.html

  link.textContent = `Sketch ${i}`;

  // Highlight current page
  if (window.location.href.includes(`sketch${i}`)) {
    link.classList.add('active');
  }

  li.appendChild(link);
  ul.appendChild(li);
}

nav.appendChild(ul);
document.body.prepend(nav);
