<!-- File: frontend/client/src/pages/ClientProfileC2C.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <div class="max-w-4xl mx-auto p-6">
      <div class="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
        <img :src="client.avatar" class="w-20 h-20 rounded-full object-cover" />
        <div>
          <h2 class="text-xl font-semibold">{{ client.name }}</h2>
          <div class="text-sm text-gray-500">{{ client.location }}</div>
        </div>
        <div class="ml-auto">
          <button class="rounded-xl border px-3 py-2">Create Request</button>
        </div>
      </div>
      
      <!-- Edit/View Profile and Notifications -->
      <div class="mt-6 bg-white rounded-2xl p-6 shadow-sm">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-gray-800">My Profile</h1>
          <div class="flex items-center space-x-4">
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405C18.216 14.86 18 13.9 18 13v-3a6 6 0 10-12 0v3c0 .9-.216 1.86-.595 2.595L4 17h5m6 0a2 2 0 11-4 0m4 0h-4" />
              </svg>
              <span v-if="notificationCount > 0" class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {{ notificationCount }}
              </span>
              <span v-else class="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-1 text-xs font-bold leading-none text-gray-500 transform translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-full">
                0
              </span>
            </div>
            <button @click="isEditing = !isEditing" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              {{ isEditing ? 'Cancel' : 'Edit Profile' }}
            </button>
          </div>
        </div>

        <!-- View Profile Section -->
        <div v-if="!isEditing" class="space-y-6">
          <div>
            <h2 class="text-xl font-semibold text-gray-700">Full Name</h2>
            <p class="text-lg text-gray-900 mt-1">{{ client.name }}</p>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-700">Location</h2>
            <p class="text-lg text-gray-900 mt-1">{{ client.location }}</p>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-700">Email</h2>
            <p class="text-lg text-gray-900 mt-1">{{ client.email }}</p>
          </div>
        </div>

        <!-- Edit Profile Section -->
        <div v-else>
          <form @submit.prevent="saveProfile" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="name" v-model="editableClient.name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" id="location" v-model="editableClient.location" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" v-model="editableClient.email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div class="flex justify-end space-x-2">
              <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 space-y-4">
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h3 class="font-semibold">Collab Requests</h3>
            <p class="text-sm text-gray-600 mt-2">Requests this client posted to connect with influencers.</p>
            <div class="mt-3 space-y-3">
              <div v-for="r in client.requests" :key="r.id" class="border rounded-xl p-4 flex justify-between items-start">
                <div>
                  <div class="font-medium">{{ r.title }}</div>
                  <div class="text-xs text-gray-500">{{ r.platform }} • Budget: ₹{{ r.budget }}</div>
                  <div class="text-sm text-gray-600 mt-2">{{ r.desc }}</div>
                </div>
                <div class="text-right">
                  <div class="text-xs text-gray-500">Responses</div>
                  <div class="font-semibold">{{ r.responses }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h3 class="font-semibold">Notes</h3>
            <p class="text-sm text-gray-600 mt-2">{{ client.notes }}</p>
          </div>
        </div>
        <aside class="space-y-4">
          <div class="bg-white rounded-2xl p-4 shadow-sm">
            <div class="text-sm text-gray-500">Contact Info</div>
            <div class="mt-2 text-sm">{{ client.email }}</div>
            <div class="text-sm text-gray-500 mt-3">Preferred Hours</div>
            <div class="text-sm">{{ client.preferredHours }}</div>
          </div>
          <div class="bg-white rounded-2xl p-4 shadow-sm">
            <div class="text-sm text-gray-500">Past Small Collabs</div>
            <div class="mt-2 text-sm">
              <div v-for="p in client.past" :key="p.id" class="text-sm text-gray-700">{{ p.title }} • ₹{{ p.amount }}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import { globalState } from '../main.js';
import { ref } from 'vue';

export default {
  name: 'ClientProfileC2C',
  components: {
    Navbar,
  },
  data() {
    return {
      globalState,
      isEditing: false,
      notificationCount: 2,
      client: {
        id: 'c_c2c_01',
        name: 'Rahul Mehta',
        avatar: 'https://placehold.co/80x80/cccccc/ffffff?text=RM',
        location: 'Delhi, India',
        email: 'rahul.mehta@email.com',
        preferredHours: 'Weekdays 10am - 2pm',
        requests: [
          { id: 'r1', title: 'Local Food Fest Promo', platform: 'Instagram', budget: 5000, desc: 'Looking for micro-influencers in Delhi for event promo', responses: 6 },
          { id: 'r2', title: 'Fitness Product Demo', platform: 'TikTok', budget: 8000, desc: 'Short demo videos for workout gear', responses: 3 }
        ],
        past: [ { id: 'p1', title: 'Birthday Event Promo', amount: 3000 } ],
        notes: 'Prefers creators who can post within 72 hours.'
      },
      editableClient: {
        name: 'Rahul Mehta',
        location: 'Delhi, India',
        email: 'rahul.mehta@email.com',
      }
    };
  },
  methods: {
    saveProfile() {
      this.client.name = this.editableClient.name;
      this.client.location = this.editableClient.location;
      this.client.email = this.editableClient.email;
      this.isEditing = false;
      console.log('C2C Profile saved:', this.client);
    },
  },
};
</script>
