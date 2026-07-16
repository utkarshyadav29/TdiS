document.addEventListener('DOMContentLoaded', () => {
  
  // Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
      navbar.style.height = '70px';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.height = '80px';
    }
  });

  // Mobile Menu Logic
  const ham = document.getElementById('ham');
  const mob = document.getElementById('mobMenu');
  if (ham && mob) {
    ham.addEventListener('click', () => {
      mob.classList.toggle('open');
      const s = ham.querySelectorAll('span');
      const open = mob.classList.contains('open');
      s[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
      s[1].style.opacity = open ? '0' : '1';
      s[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });
  }

  // Accordion Logic
  const accItems = document.querySelectorAll('.acc-item');
  accItems.forEach(item => {
    const header = item.querySelector('.acc-header');
    header.addEventListener('click', () => {
      // Close other items
      accItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      // Toggle current item
      item.classList.toggle('active');
    });
  });

  // Stats Counter Logic
  const stats = document.querySelectorAll('.stat-num');
  let hasCounted = false;

  const countUp = () => {
    stats.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const count = +stat.innerText;
      const inc = target / 50; // adjust speed here

      if (count < target) {
        stat.innerText = Math.ceil(count + inc);
        setTimeout(countUp, 30);
      } else {
        stat.innerText = target + (target === 100 ? '%' : '+');
      }
    });
  };

  // Intersection Observer for Stats
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasCounted) {
        countUp();
        hasCounted = true;
      }
    });
  }, observerOptions);

  const statsSection = document.querySelector('.stats-sec');
  if (statsSection) {
    observer.observe(statsSection);
  }

});
