<template>
  <div id="app" :style="cssVars" class="leading-relaxed">
    <!-- Custom Cursor -->
    <div id="custom-cursor" :class="{ 'expanded': cursorExpanded }" :style="{ left: cursor.x + 'px', top: cursor.y + 'px' }"></div>

    <!-- Navigation Bar -->
    <nav class="container mx-auto px-4 py-6 flex justify-between items-center z-10 relative">
      <a id="logo" href="#hero" class="text-2xl font-bold playfair" @click.prevent="cyclePalette" @mouseenter="expandCursor" @mouseleave="contractCursor">MetaBerry</a>
      <ul class="flex space-x-8 text-sm uppercase tracking-wide">
        <li><a href="#about" class="hover:text-[var(--hover-color)] transition-colors" @click.prevent="scrollToSection('about')" @mouseenter="expandCursor" @mouseleave="contractCursor">About</a></li>
        <li><a href="#solutions" class="hover:text-[var(--hover-color)] transition-colors" @click.prevent="scrollToSection('solutions')" @mouseenter="expandCursor" @mouseleave="contractCursor">Solutions</a></li>
        <li><a href="#contact" class="hover:text-[var(--hover-color)] transition-colors" @click.prevent="scrollToSection('contact')" @mouseenter="expandCursor" @mouseleave="contractCursor">Contact</a></li>
      </ul>
    </nav>

    <!-- Main Hero Section -->
    <section id="hero" class="relative overflow-hidden min-h-[90vh] flex flex-col justify-center items-center text-center p-8" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
      <div class="grainy-background"></div>
      <div id="polymorph-shape" class="polymorph-shape" :style="polymorphStyle"></div>
      <div id="hero-text-container" class="relative z-10 max-w-4xl mx-auto" :style="heroTextTransform">
        <h1 id="main-heading" class="playfair text-6xl md:text-8xl font-black mb-6 leading-tight">
          Solutions for a Future with History.
        </h1>
        <p class="text-xl md:text-2xl mb-10 tracking-wide font-light">
          We are MetaBerry. We don't just build for tomorrow, we innovate with the wisdom of the past.
        </p>
        <a href="#contact" class="retro-button bg-[var(--button-bg-color)] text-[var(--button-text-color)] py-4 px-10 rounded-full font-semibold uppercase tracking-widest text-sm shadow-lg hover:bg-[var(--hover-color)] transition-colors" @mouseenter="expandCursor" @mouseleave="contractCursor">
          <span class="scramble-text">Connect with Us</span>
        </a>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="container mx-auto px-4 py-20 relative">
      <div class="grainy-background"></div>
      <div class="relative z-10 flex flex-col lg:flex-row items-center space-y-10 lg:space-y-0 lg:space-x-16">
        <div class="lg:w-1/2">
          <h2 class="playfair text-4xl md:text-5xl font-bold mb-6 animate-on-scroll" data-delay="0">
            Rooted in Values, Growing Towards Innovation.
          </h2>
          <p class="text-lg mb-6 animate-on-scroll" data-delay="100">
            At MetaBerry, we believe that the most powerful innovations are those built on a foundation of timeless principles: integrity, collaboration, and craftsmanship. We blend deep expertise with forward-thinking technology to solve complex challenges across every industry.
          </p>
          <p class="text-lg animate-on-scroll" data-delay="200">
            Our approach is simple: listen intently, design thoughtfully, and build with purpose. We are not just a solutions provider; we are your partner in navigating the ever-evolving landscape of business.
          </p>
        </div>
        <div class="lg:w-1/2 animate-on-scroll" data-delay="300">
          <img src="https://placehold.co/800x600/e0e0d8/333333?text=Handcrafted+Solution" alt="An artistic, abstract representation of a handcrafted solution" class="rounded-lg shadow-xl" onerror="this.src='https://placehold.co/800x600/e0e0d8/333333?text=Handcrafted+Solution';">
        </div>
      </div>
    </section>

    <!-- Solutions Section -->
    <section id="solutions" class="container mx-auto px-4 py-20 relative">
      <div class="grainy-background"></div>
      <div class="relative z-10 text-center">
        <h2 class="playfair text-4xl md:text-5xl font-bold mb-16 animate-on-scroll" data-delay="0">Our Solutions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div class="bg-[var(--card-bg-color)] p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-on-scroll" data-delay="100">
            <h3 class="playfair text-3xl font-bold mb-4">Strategic Consulting</h3>
            <p class="text-md">
              Transforming ideas into actionable plans with a focus on sustainable growth and future-proof strategy.
            </p>
          </div>
          <div class="bg-[var(--card-bg-color)] p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-on-scroll" data-delay="200">
            <h3 class="playfair text-3xl font-bold mb-4">Digital Transformation</h3>
            <p class="text-md">
              Integrating cutting-edge technology to streamline operations and enhance your digital presence.
            </p>
          </div>
          <div class="bg-[var(--card-bg-color)] p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-on-scroll" data-delay="300">
            <h3 class="playfair text-3xl font-bold mb-4">Creative Direction</h3>
            <p class="text-md">
              Crafting unique brand narratives and visual identities that resonate deeply with your audience.
            </p>
          </div>
          <div class="bg-[var(--card-bg-color)] p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-on-scroll" data-delay="400">
            <h3 class="playfair text-3xl font-bold mb-4">Data Analytics</h3>
            <p class="text-md">
              Unlocking insights from complex data to inform smarter decisions and drive business forward.
            </p>
          </div>
          <div class="bg-[var(--card-bg-color)] p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-on-scroll" data-delay="500">
            <h3 class="playfair text-3xl font-bold mb-4">Emerging Tech</h3>
            <p class="text-md">
              Staying ahead of the curve with solutions in AI, IoT, and blockchain for a truly innovative future.
            </p>
          </div>
          <div class="bg-[var(--card-bg-color)] p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-on-scroll" data-delay="600">
            <h3 class="playfair text-3xl font-bold mb-4">Product Development</h3>
            <p class="text-md">
              From concept to launch, we build products that are beautiful, functional, and user-centric.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section id="contact" class="container mx-auto px-4 py-20 text-center relative">
      <div class="grainy-background"></div>
      <div class="relative z-10">
        <h2 class="playfair text-4xl md:text-5xl font-bold mb-6 animate-on-scroll" data-delay="0">
          Ready to Blend the Old with the New?
        </h2>
        <p class="text-xl mb-8 font-light animate-on-scroll" data-delay="100">
          Let's discuss how our timeless approach can bring your vision to life.
        </p>
        <a href="mailto:hello@metaberry.com" class="retro-button bg-[var(--button-bg-color)] text-[var(--button-text-color)] py-4 px-10 rounded-full font-semibold uppercase tracking-widest text-sm shadow-lg hover:bg-[var(--hover-color)] transition-colors" @mouseenter="expandCursor" @mouseleave="contractCursor">
          <span class="scramble-text">Connect with Us</span>
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[var(--footer-bg-color)] text-[var(--footer-text-color)] py-12">
      <div class="container mx-auto px-4 flex flex-col items-center text-center">
        <div class="flex space-x-6 mb-6">
          <a href="#" class="hover:text-[var(--hover-color)] transition-colors text-sm" @mouseenter="expandCursor" @mouseleave="contractCursor">Privacy Policy</a>
          <a href="#" class="hover:text-[var(--hover-color)] transition-colors text-sm" @mouseenter="expandCursor" @mouseleave="contractCursor">Terms of Service</a>
          <a href="#" class="hover:text-[var(--hover-color)] transition-colors text-sm" @mouseenter="expandCursor" @mouseleave="contractCursor">Careers</a>
        </div>
        <p class="text-xs tracking-wide">&copy; 2024 MetaBerry. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue';

// Custom Cursor
const cursor = reactive({ x: 0, y: 0 });
const cursorExpanded = ref(false);

const expandCursor = () => {
  cursorExpanded.value = true;
};
const contractCursor = () => {
  cursorExpanded.value = false;
};

// Color Palettes
const palettes = [
  { // 1. MetaBerry Brand (Inspired by logo)
    bg: '#1a202c',
    text: '#e2e8f0',
    buttonBg: '#48bb78',
    buttonText: '#1a202c',
    hover: '#68d391',
    cardBg: '#2d3748',
    footerBg: '#121a24',
    footerText: '#cbd5e0',
    glow: '#48bb78',
    isNeon: true,
  },
  { // 2. Original
    bg: '#f0f0e8',
    text: '#333333',
    buttonBg: '#333333',
    buttonText: '#f0f0e8',
    hover: '#888888',
    cardBg: '#ffffff',
    footerBg: '#222222',
    footerText: '#e0e0e0',
    glow: 'transparent',
    isNeon: false,
  },
  { // 3. Dark Mode
    bg: '#121212',
    text: '#e0e0e0',
    buttonBg: '#e0e0e0',
    buttonText: '#121212',
    hover: '#999999',
    cardBg: '#222222',
    footerBg: '#000000',
    footerText: '#999999',
    glow: 'transparent',
    isNeon: false,
  },
  { // 4. Vibrant
    bg: '#e8f0f0',
    text: '#222831',
    buttonBg: '#F39C12',
    buttonText: '#222831',
    hover: '#E67E22',
    cardBg: '#ffffff',
    footerBg: '#2C3E50',
    footerText: '#EAEAEA',
    glow: 'transparent',
    isNeon: false,
  },
  { // 5. Oceanic
    bg: '#e6f2ff',
    text: '#0a3d62',
    buttonBg: '#0a3d62',
    buttonText: '#e6f2ff',
    hover: '#3c6382',
    cardBg: '#ffffff',
    footerBg: '#001a33',
    footerText: '#e6f2ff',
    glow: 'transparent',
    isNeon: false,
  },
  { // 6. Earthy
    bg: '#fbf7f0',
    text: '#442c2e',
    buttonBg: '#6a5a41',
    buttonText: '#fbf7f0',
    hover: '#9b8e76',
    cardBg: '#ffffff',
    footerBg: '#2f201e',
    footerText: '#fbf7f0',
    glow: 'transparent',
    isNeon: false,
  },
  { // 7. Monochromatic
    bg: '#e5e5e5',
    text: '#333333',
    buttonBg: '#333333',
    buttonText: '#e5e5e5',
    hover: '#666666',
    cardBg: '#ffffff',
    footerBg: '#111111',
    footerText: '#999999',
    glow: 'transparent',
    isNeon: false,
  },
  { // 8. Retro
    bg: '#ffdd77',
    text: '#6b4d3a',
    buttonBg: '#6b4d3a',
    buttonText: '#ffdd77',
    hover: '#9e7e6f',
    cardBg: '#fff2c6',
    footerBg: '#513d2f',
    footerText: '#ffdd77',
    glow: 'transparent',
    isNeon: false,
  },
  { // 9. Cyberpunk
    bg: '#0a0a1a',
    text: '#00ffff',
    buttonBg: '#ff00ff',
    buttonText: '#0a0a1a',
    hover: '#990099',
    cardBg: '#1a1a33',
    footerBg: '#000000',
    footerText: '#00ffff',
    glow: '#ff00ff',
    isNeon: true,
  },
  { // 10. Forest
    bg: '#f5f5dc',
    text: '#2e8b57',
    buttonBg: '#2e8b57',
    buttonText: '#f5f5dc',
    hover: '#3cb371',
    cardBg: '#ffffff',
    footerBg: '#1a4f32',
    footerText: '#f5f5dc',
    glow: 'transparent',
    isNeon: false,
  },
  { // 11. Minimalist
    bg: '#ffffff',
    text: '#111111',
    buttonBg: '#111111',
    buttonText: '#ffffff',
    hover: '#555555',
    cardBg: '#f8f8f8',
    footerBg: '#000000',
    footerText: '#dddddd',
    glow: 'transparent',
    isNeon: false,
  },
  { // 12. Soft Pastel
    bg: '#fcf8f3',
    text: '#5c5c8a',
    buttonBg: '#5c5c8a',
    buttonText: '#fcf8f3',
    hover: '#8a8ac9',
    cardBg: '#ffffff',
    footerBg: '#444466',
    footerText: '#fcf8f3',
    glow: 'transparent',
    isNeon: false,
  },
  { // 13. High Contrast
    bg: '#f8f9fa',
    text: '#000000',
    buttonBg: '#000000',
    buttonText: '#ffffff',
    hover: '#444444',
    cardBg: '#ffffff',
    footerBg: '#000000',
    footerText: '#f8f9fa',
    glow: 'transparent',
    isNeon: false,
  },
  { // 14. Neon Future
    bg: '#0d0d1a',
    text: '#ff00ff',
    buttonBg: '#00ffff',
    buttonText: '#0d0d1a',
    hover: '#009999',
    cardBg: '#1a1a2b',
    footerBg: '#00000a',
    footerText: '#ff00ff',
    glow: '#00ffff',
    isNeon: true,
  },
];

const currentPaletteIndex = ref(0);

const cyclePalette = () => {
  currentPaletteIndex.value = (currentPaletteIndex.value + 1) % palettes.length;
};

const cssVars = computed(() => {
  const palette = palettes[currentPaletteIndex.value];
  return {
    '--bg-color': palette.bg,
    '--text-color': palette.text,
    '--button-bg-color': palette.buttonBg,
    '--button-text-color': palette.buttonText,
    '--hover-color': palette.hover,
    '--card-bg-color': palette.cardBg,
    '--footer-bg-color': palette.footerBg,
    '--footer-text-color': palette.footerText,
    '--glow-color': palette.glow,
  };
});

// Parallax Effect
const heroTextTransform = reactive({
  transform: '',
});

const polymorphStyle = reactive({
  transform: '',
  background: '',
  boxShadow: '',
});

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rotateY = ((x / rect.width) - 0.5) * 20; // -10 to 10
  const rotateX = ((y / rect.height) - 0.5) * -20; // -10 to 10

  heroTextTransform.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const handleMouseLeave = () => {
  heroTextTransform.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
};

// Text Scramble Effect
const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:"<>?';
let scrambleIntervals = [];

const applyScramble = (element) => {
  let originalText = element.textContent;
  
  const handleMouseEnter = () => {
    let count = 0;
    let interval = setInterval(() => {
      element.textContent = originalText.split('').map((char, index) => {
        if (index < count) {
          return originalText[index];
        }
        return characters[Math.floor(Math.random() * characters.length)];
      }).join('');
      count += 1;
      if (count > originalText.length) {
        clearInterval(interval);
        element.textContent = originalText;
      }
    }, 50);
    scrambleIntervals.push(interval);
  };

  const handleMouseLeave = () => {
    scrambleIntervals.forEach(clearInterval);
    element.textContent = originalText;
  };

  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);
};

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay');
      if (delay) {
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);
      } else {
        entry.target.classList.add('is-visible');
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  // Custom Cursor
  document.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
  });

  document.querySelectorAll('.scramble-text').forEach(applyScramble);
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
});
</script>

<style scoped>
:root {
  --bg-color: #1a202c;
  --text-color: #e2e8f0;
  --button-bg-color: #48bb78;
  --button-text-color: #1a202c;
  --hover-color: #68d391;
  --card-bg-color: #2d3748;
  --footer-bg-color: #121a24;
  --footer-text-color: #cbd5e0;
  --glow-color: #48bb78;
}

body {
  font-family: 'Inter', sans-serif;
  color: var(--text-color);
  overflow-x: hidden;
  cursor: none;
  background-color: var(--bg-color);
  transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
}
.playfair {
  font-family: 'Playfair Display', serif;
}
.grainy-background {
  background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-size: cover;
  opacity: 0.07;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* Animation for scroll-triggered elements */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Custom Cursor */
#custom-cursor {
  position: fixed;
  z-index: 9999;
  width: 1rem;
  height: 1rem;
  background-color: var(--button-bg-color);
  border-radius: 50%;
  pointer-events: none;
  transition: width 0.3s ease, height 0.3s ease, transform 0.3s ease, background-color 0.5s ease;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px var(--glow-color); /* Added glow effect */
}
#custom-cursor.expanded {
  width: 3rem;
  height: 3rem;
  opacity: 0.3;
}

/* Neon glow animation for buttons */
.retro-button.neon-glow {
  box-shadow: 0 0 15px var(--glow-color);
  transition: box-shadow 0.3s ease-in-out;
}

/* Polymorphic shape animation */
.polymorph-shape {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 400px;
  background: rgba(0, 0, 0, 0.1);
  transform: translate(-50%, -50%);
  animation: morph 8s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
  backdrop-filter: blur(10px);
}

@keyframes morph {
  0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(-50%, -50%) rotate(0deg); opacity: 0.3; }
  25% { border-radius: 40% 60% 70% 30% / 50% 70% 30% 50%; transform: translate(-50%, -50%) rotate(45deg); opacity: 0.4; }
  50% { border-radius: 70% 30% 50% 50% / 30% 50% 50% 70%; transform: translate(-50%, -50%) rotate(90deg); opacity: 0.5; }
  75% { border-radius: 30% 70% 60% 40% / 70% 40% 60% 30%; transform: translate(-50%, -50%) rotate(135deg); opacity: 0.4; }
  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(-50%, -50%) rotate(180deg); opacity: 0.3; }
}
</style>
