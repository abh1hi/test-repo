<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
      
      <!-- Left Section (Form) -->
      <div class="w-full md:w-1/2 p-10 flex flex-col justify-center">
        <h2 class="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
          Welcome Back 👋
        </h2>
        <p class="text-gray-600 mb-8 text-sm">
          Sign in to access your account or
          <router-link to="/register" class="text-blue-600 hover:text-blue-500 font-medium">
            create a new one
          </router-link>
        </p>

        <!-- Login Form -->
        <form class="space-y-5" @submit.prevent="handleLogin">
          <div>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              placeholder="Email address"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="password"
              placeholder="Password"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <!-- Remember + Forgot -->
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center space-x-2">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span class="text-gray-700">Remember me</span>
            </label>
            <a href="#" class="text-blue-600 hover:text-blue-500 font-medium">Forgot password?</a>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="w-full flex items-center justify-center px-4 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <svg
              class="h-5 w-5 text-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
            Sign In
          </button>
        </form>

        <!-- Divider -->
        <div class="my-6 flex items-center">
          <div class="flex-grow border-t border-gray-300"></div>
          <span class="mx-4 text-sm font-medium text-gray-500">Or continue with</span>
          <div class="flex-grow border-t border-gray-300"></div>
        </div>

        <!-- Google Sign In -->
        <div>
          <button
            @click="handleGoogleLogin"
            class="w-full flex items-center justify-center px-4 py-3 rounded-xl font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <img class="h-6 w-6 mr-3" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google icon">
            Sign In with Google
          </button>
        </div>
      </div>

      <!-- Right Section (Image/Illustration) -->
      <div class="hidden md:block md:w-1/2 relative bg-gray-50">
        <img
          src="https://placehold.co/800x600/4a90e2/ffffff?text=Welcome+Back"
          alt="Illustration"
          class="w-full h-full object-cover"
        />
        <!-- Overlay Gradient -->
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
      </div>
    </div>
  </div>
</template>

<script>
import authService from '../services/authService';
import { globalState } from '../main.js';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const userData = { email: this.email, password: this.password };
        const response = await authService.login(userData);

        globalState.isLoggedIn = true;
        globalState.user = response;

        this.$router.push('/');
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    },
    handleGoogleLogin() {
      
      // Placeholder for Google login logic
      console.log('Attempting Google login');
    },
  },
};
</script>
