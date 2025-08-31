
// File: frontend/client/src/pages/ClientProfile.vue
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <Navbar />
    <div class="container mx-auto mt-8 p-6 bg-white rounded-3xl shadow-lg">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">My Profile</h1>
        <button @click="isEditing = !isEditing" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          {{ isEditing ? 'Cancel' : 'Edit Profile' }}
        </button>
      </div>

      <!-- View Profile Section -->
      <div v-if="!isEditing" class="space-y-6">
        <div>
          <h2 class="text-xl font-semibold text-gray-700">Name</h2>
          <p class="text-lg text-gray-900 mt-1">{{ userProfile.name }}</p>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-700">Email</h2>
          <p class="text-lg text-gray-900 mt-1">{{ userProfile.email }}</p>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-700">Account Type</h2>
          <p class="text-lg text-gray-900 mt-1">{{ userProfile.accountType === 'b2b' ? 'Business' : 'Personal' }}</p>
        </div>
      </div>

      <!-- Edit Profile Section -->
      <div v-else>
        <form @submit.prevent="saveProfile" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" v-model="editableProfile.name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" v-model="editableProfile.email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          </div>
          <div class="flex justify-end space-x-2">
            <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue';
import { globalState } from '../main.js';

export default {
  name: 'ClientProfile',
  components: {
    Navbar,
  },
  data() {
    return {
      globalState,
      isEditing: false,
      userProfile: { ...globalState.user },
      editableProfile: { ...globalState.user },
    };
  },
  methods: {
    saveProfile() {
      // Simulate saving to the backend
      this.userProfile = { ...this.editableProfile };
      globalState.user = this.userProfile;
      localStorage.setItem('user', JSON.stringify(this.userProfile));
      this.isEditing = false;
      console.log('Profile saved:', this.userProfile);
    },
  },
};
</script>
