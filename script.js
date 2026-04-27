/* ══════════════════════════════════════════════════════════════
   Pizza Palace & Kababish Bar.B.Q - JavaScript
   Category Switching & Sticky Navigation Logic
   ══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  
  // Get all category buttons and sections
  const catBtns = document.querySelectorAll('.cat-btn');
  const catSections = document.querySelectorAll('.category-section');
  const stickyNav = document.querySelector('.sticky-nav');

  // Category switching logic
  catBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = this.getAttribute('data-cat');

      // Update button states - remove active from all, add to clicked
      catBtns.forEach(function (b) {
        b.classList.remove('active');
      });
      this.classList.add('active');

      // Show/hide sections
      catSections.forEach(function (sec) {
        if (sec.id === target) {
          sec.classList.add('active');
        } else {
          sec.classList.remove('active');
        }
      });

      // Scroll to menu area smoothly
      const menuSection = document.getElementById('menu-section');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Auto-scroll the clicked button into view within the nav
      this.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  });

  // View Menu button click handler
  const viewMenuBtn = document.getElementById('view-menu-btn');
  if (viewMenuBtn) {
    viewMenuBtn.addEventListener('click', function () {
      const menuSection = document.getElementById('menu-section');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Optional: Add shadow to sticky nav when scrolled
  window.addEventListener('scroll', function () {
    if (stickyNav) {
      if (window.scrollY > 100) {
        stickyNav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
      } else {
        stickyNav.style.boxShadow = 'none';
      }
    }
  });

  // Touch/swipe support for mobile category scroll
  const catScroll = document.querySelector('.cat-scroll');
  if (catScroll) {
    let isDown = false;
    let startX;
    let scrollLeft;

    catScroll.addEventListener('mousedown', function (e) {
      isDown = true;
      startX = e.pageX - catScroll.offsetLeft;
      scrollLeft = catScroll.scrollLeft;
    });

    catScroll.addEventListener('mouseleave', function () {
      isDown = false;
    });

    catScroll.addEventListener('mouseup', function () {
      isDown = false;
    });

    catScroll.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - catScroll.offsetLeft;
      const walk = (x - startX) * 2;
      catScroll.scrollLeft = scrollLeft - walk;
    });
  }

});
