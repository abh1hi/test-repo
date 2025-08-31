

// File: frontend/client/src/pages/ClientOnboardingC2C.vue
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <Navbar />
    <div class="container mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
      <div class="flex justify-end mb-4">
        <button @click="skipOnboarding" class="text-blue-600 hover:underline">Skip</button>
      </div>
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Personal Client Onboarding</h1>
      <p class="text-gray-600 mb-8">Please provide your details to get started.</p>

      <form @submit.prevent="submitProfile" class="space-y-8">
        <!-- Personal Info -->
        <div>
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Personal Info</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="full-name" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="full-name" v-model="profile.fullName" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" v-model="profile.email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" id="phone" v-model="profile.phone" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="social-media" class="block text-sm font-medium text-gray-700">Social Media (e.g., Instagram Handle)</label>
              <input type="text" id="social-media" v-model="profile.socialMedia" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
          </div>
        </div>

        <!-- Collaboration Details -->
        <div>
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Collaboration Details</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="campaign-objective" class="block text-sm font-medium text-gray-700">Campaign Objective</label>
              <input type="text" id="campaign-objective" v-model="profile.campaignObjective" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="budget-range" class="block text-sm font-medium text-gray-700">Budget Range</label>
              <input type="text" id="budget-range" v-model="profile.budgetRange" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
          </div>
        </div>
        
        <div class="flex justify-end">
          <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: 'ClientOnboardingC2C',
  components: {
    Navbar,
  },
  data() {
    return {
      profile: {
        fullName: '',
        email: '',
        phone: '',
        socialMedia: '',
        campaignObjective: '',
        budgetRange: '',
      },
    };
  },
  methods: {
    submitProfile() {
      console.log('Submitting C2C profile:', this.profile);
      this.$router.push('/');
    },
    skipOnboarding() {
      this.$router.push('/');
    }
  },
};
</script>