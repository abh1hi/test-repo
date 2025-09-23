<!-- File: frontend/client/src/pages/Register.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center px-6">
    <div class="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
      
      <!-- Left Section -->
      <div class="w-full md:w-1/2 p-10 flex flex-col justify-center">
        <h2 class="text-4xl font-extrabold text-gray-900 mb-3">Create an account</h2>
        <p class="text-gray-500 mb-8">Sign up today and enjoy a 30-day free trial 🎉</p>

        <form class="space-y-6" @submit.prevent="handleRegister">
          <!-- Full Name -->
          <div>
            <input
              id="full-name"
              v-model="name"
              type="text"
              placeholder="Full Name"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-sm"
              required
            />
          </div>

          <!-- Email -->
          <div>
            <input
              id="email-address"
              v-model="email"
              type="email"
              placeholder="Email Address"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-sm"
              required
            />
          </div>

          <!-- Password -->
          <div>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-sm"
              required
            />
          </div>

          <!-- Role Toggle -->
          <div>
            <p class="text-sm font-medium text-gray-700 mb-2">I am a...</p>
            <div class="flex space-x-3">
              <button
                type="button"
                @click="role = 'client'"
                :class="[
                  'px-4 py-2 rounded-full border text-sm font-medium',
                  role === 'client'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                ]"
              >
                Client
              </button>
              <button
                type="button"
                @click="role = 'influencer'"
                :class="[
                  'px-4 py-2 rounded-full border text-sm font-medium',
                  role === 'influencer'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                ]"
              >
                Influencer
              </button>
            </div>
          </div>

          <!-- Account Type Toggle (if client) -->
          <div v-if="role === 'client'">
            <p class="text-sm font-medium text-gray-700 mb-2">My account is...</p>
            <div class="flex space-x-3">
              <button
                type="button"
                @click="accountType = 'b2b'"
                :class="[
                  'px-4 py-2 rounded-full border text-sm font-medium',
                  accountType === 'b2b'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                ]"
              >
                Business
              </button>
              <button
                type="button"
                @click="accountType = 'c2c'"
                :class="[
                  'px-4 py-2 rounded-full border text-sm font-medium',
                  accountType === 'c2c'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                ]"
              >
                Personal
              </button>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="text-red-600 text-sm">
            {{ errorMessage }}
          </div>

          <!-- Submit -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 px-4 rounded-xl text-white text-sm font-semibold shadow-md transition 
                     bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-70"
            >
              <span v-if="loading">Registering...</span>
              <span v-else>Sign Up</span>
            </button>
          </div>
        </form>

        <!-- Already Have an Account -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Already have an account?
            <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </router-link>
          </p>
        </div>
      </div>

      <!-- Right Section -->
      <div class="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-100 to-purple-100 items-center justify-center p-10">
        <img
          src="https://illustrations.popsy.co/gray/businesswoman.svg"
          alt="Register Illustration"
          class="w-4/5 max-h-[400px] object-contain"
        />
      </div>
    </div>
  </div>
</template>

<script>
import authService from '../services/authService';
import { globalState } from '../main.js';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: 'client',
      accountType: 'b2b',
      loading: false,
      errorMessage: '',
    };
  },
  methods: {
    async handleRegister() {
      this.loading = true;
      this.errorMessage = '';

      try {
        const userData = {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role,
        };

        if (this.role === 'client') {
          userData.accountType = this.accountType;
        }

        const response = await authService.register(userData);

        globalState.isLoggedIn = true;
        globalState.user = response;

        if (response.role === 'influencer') {
          this.$router.push('/onboarding');
        } else if (response.accountType === 'b2b') {
          this.$router.push('/b2b-onboarding');
        } else {
          this.$router.push('/c2c-onboarding');
        }
      } catch (error) {
        this.errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
