<!-- File: frontend/client/src/components/Navbar.vue -->
<template>
  <nav class="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
    <!-- Brand -->
    <div class="flex items-center">
      <router-link to="/" class="text-2xl font-extrabold text-[#2563eb] tracking-tight">
        Souraksh
      </router-link>
    </div>

    <!-- Desktop Nav -->
    <div class="hidden md:flex items-center space-x-8">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/services" class="nav-link">Services</router-link>
      <router-link to="/pricing" class="nav-link">Pricing</router-link>
      <router-link to="/testimonials" class="nav-link">Testimonials</router-link>
      <router-link to="/forecast-dashboard" class="nav-link">Forecast</router-link>

      <!-- Auth Buttons -->
      <template v-if="globalState.isLoggedIn">
        <div class="flex items-center space-x-4">
          <!-- Logout -->
          <button @click="logout" class="btn-outline">
            Log Out
          </button>
        </div>
      </template>
      <template v-else>
        <router-link to="/login" class="btn-outline">Log In</router-link>
        <router-link to="/register" class="btn-primary">Register</router-link>
      </template>
    </div>

    <!-- Mobile Menu Button -->
    <div class="md:hidden">
      <button @click="toggleMobileMenu" class="text-gray-600 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="fade">
      <div v-if="mobileMenuOpen" class="absolute top-16 left-0 w-full bg-white border-t border-gray-200 shadow-md md:hidden">
        <div class="flex flex-col space-y-4 px-6 py-4">
          <router-link to="/" class="nav-link" @click="toggleMobileMenu">Home</router-link>
          <router-link to="/about" class="nav-link" @click="toggleMobileMenu">About</router-link>
          <router-link to="/services" class="nav-link" @click="toggleMobileMenu">Services</router-link>
          <router-link to="/pricing" class="nav-link" @click="toggleMobileMenu">Pricing</router-link>
          <router-link to="/testimonials" class="nav-link" @click="toggleMobileMenu">Testimonials</router-link>
          <router-link to="/forecast-dashboard" class="nav-link" @click="toggleMobileMenu">Forecast</router-link>

          <template v-if="globalState.isLoggedIn">
            <button @click="logout" class="btn-outline text-left">Log Out</button>
          </template>
          <template v-else>
            <router-link to="/login" class="btn-outline" @click="toggleMobileMenu">Log In</router-link>
            <router-link to="/register" class="btn-primary" @click="toggleMobileMenu">Register</router-link>
          </template>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
import { globalState } from '../main.js';
import { useRouter } from 'vue-router';

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter();
    const logout = () => {
      localStorage.removeItem('user');
      globalState.isLoggedIn = false;
      globalState.user = null;
      router.push('/login');
    };
    return {
      globalState,
      logout,
    };
  },
  data() {
    return {
      mobileMenuOpen: false,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
  },
};
</script>

<style scoped>
.nav-link {
  @apply text-gray-600 hover:text-gray-900 transition-colors;
}
.btn-outline {
  @apply px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition;
}
.btn-primary {
  @apply px-4 py-2 rounded-full bg-[#2563eb] text-white font-semibold hover:bg-blue-700 transition;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
