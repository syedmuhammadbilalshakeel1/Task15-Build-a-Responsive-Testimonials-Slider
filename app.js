    const testimonials = [
      {
        name: "Alice Johnson",
        role: "Web Development Intern",
        feedback: "The remote internship program was incredibly well-structured. I gained hands-on experience with modern web technologies and felt fully supported by my mentor.",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/26c4978a-a6cd-409d-a840-f0c64c690925.png"
      },
      {
        name: "Bob Williams",
        role: "Data Science Intern",
        feedback: "This internship exceeded my expectations. The projects were challenging and relevant, and the team collaboration tools made remote work seamless.",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2fcdf573-16cc-4755-8292-0cca99e21335.png"
      },
      {
        name: "Charlie Brown",
        role: "UI/UX Design Intern",
        feedback: "I loved the flexibility of this remote internship. It allowed me to balance my studies while working on real-world design problems.",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ee4f4cd4-e463-47d4-9dac-372b66d27d44.png"
      },
      {
        name: "Diana Miller",
        role: "Mobile App Development Intern",
        feedback: "Building a mobile app from scratch was an amazing experience, and the daily stand-ups kept everyone connected and motivated.",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1cb1cecd-8eed-4cf4-bebf-1688090a89ea.png"
      },
      {
        name: "Eve Davis",
        role: "Marketing Intern",
        feedback: "Even remotely, the marketing team fostered a great environment. I learned so much about digital campaigns and content strategy.",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b3da0bdd-56f2-4d2a-ac78-eb06007c5561.png"
      }
    ];

    let currentIndex = 0;
    const slidesContainer = document.getElementById('slides');
    const paginationContainer = document.getElementById('pagination');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function getVisibleSlidesCount() {
      const width = window.innerWidth;
      if (width >= 1024) return 3;
      if (width >= 768) return 2;
      return 1;
    }

    function renderSlides() {
      if (!testimonials || testimonials.length === 0) {
        slidesContainer.innerHTML = '<div class="slide">No testimonials available at the moment.</div>';
        paginationContainer.innerHTML = '';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        return;
      }

      slidesContainer.innerHTML = testimonials.map(t => `
        <div class="slide">
          <img src="${t.image}" alt="${t.name}" />
          <h3>${t.name}</h3>
          <p class="role">${t.role}</p>
          <p class="feedback">"${t.feedback}"</p>
        </div>
      `).join('');

      updateSlider();
      renderPagination();
    }

    function renderPagination() {
      const visibleCount = getVisibleSlidesCount();
      const pageCount = Math.ceil(testimonials.length / visibleCount);
      paginationContainer.innerHTML = '';

      for (let i = 0; i < pageCount; i++) {
        const btn = document.createElement('button');
        btn.className = i === Math.floor(currentIndex / visibleCount) ? 'active' : '';
        btn.onclick = () => goToSlide(i * visibleCount);
        paginationContainer.appendChild(btn);
      }
    }

    function updateSlider() {
      const slideWidth = slidesContainer.querySelector('.slide').offsetWidth;
      slidesContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
      renderPagination();
    }

    function goToSlide(index) {
      currentIndex = index;
      updateSlider();
    }

    prevBtn.onclick = () => {
      const visibleCount = getVisibleSlidesCount();
      currentIndex -= visibleCount;
      if (currentIndex < 0) currentIndex = Math.max(0, testimonials.length - visibleCount);
      updateSlider();
    };

    nextBtn.onclick = () => {
      const visibleCount = getVisibleSlidesCount();
      currentIndex += visibleCount;
      if (currentIndex >= testimonials.length) currentIndex = 0;
      updateSlider();
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextBtn.click();
      if (e.key === 'ArrowLeft') prevBtn.click();
    });

    let autoplay = setInterval(() => nextBtn.click(), 5000);
    const sliderEl = document.getElementById('slider');
    sliderEl.addEventListener('mouseover', () => clearInterval(autoplay));
    sliderEl.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => nextBtn.click(), 5000);
    });

    window.addEventListener('resize', () => {
      const visibleCount = getVisibleSlidesCount();
      const maxIndex = Math.max(0, testimonials.length - visibleCount);
      if (currentIndex > maxIndex) currentIndex = 0;
      updateSlider();
    });

    window.addEventListener('load', renderSlides);
