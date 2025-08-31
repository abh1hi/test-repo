<!-- File: frontend/client/src/pages/ClientProfileB2B.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <div class="max-w-6xl mx-auto p-6">
      <!-- header -->
      <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start gap-6">
        <img :src="client.logo" alt="logo" class="w-20 h-20 object-cover rounded-lg border" />
        <div class="flex-1">
          <h1 class="text-2xl font-bold">{{ client.name }}</h1>
          <div class="text-sm text-gray-500">{{ client.industry }} · {{ client.size }}</div>
          <div class="mt-2 text-sm text-gray-700">{{ client.tagline }}</div>
        </div>
        <div class="ml-auto flex gap-3">
          <button class="px-4 py-2 rounded-xl border">Request Intro</button>
          <button class="px-4 py-2 rounded-xl bg-black text-white">Post Campaign</button>
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
            <h2 class="text-xl font-semibold text-gray-700">Company Name</h2>
            <p class="text-lg text-gray-900 mt-1">{{ client.name }}</p>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-700">Industry</h2>
            <p class="text-lg text-gray-900 mt-1">{{ client.industry }}</p>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-700">Website</h2>
            <a :href="client.website" class="text-lg text-blue-600 underline mt-1">{{ client.website }}</a>
          </div>
        </div>

        <!-- Edit Profile Section -->
        <div v-else>
          <form @submit.prevent="saveProfile" class="space-y-6">
            <div>
              <label for="company-name" class="block text-sm font-medium text-gray-700">Company Name</label>
              <input type="text" id="company-name" v-model="editableClient.name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="industry" class="block text-sm font-medium text-gray-700">Industry</label>
              <input type="text" id="industry" v-model="editableClient.industry" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="website" class="block text-sm font-medium text-gray-700">Website</label>
              <input type="url" id="website" v-model="editableClient.website" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div class="flex justify-end space-x-2">
              <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Client Details -->
      <div class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-4">
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h3 class="font-semibold">About the Company</h3>
            <p class="mt-3 text-gray-700">{{ client.about }}</p>
            <div class="mt-4 flex gap-3 flex-wrap">
              <div class="text-sm text-gray-600">Website: <a :href="client.website" class="text-blue-600 underline">{{ client.website }}</a></div>
              <div class="text-sm text-gray-600">Contact: {{ client.contactEmail }}</div>
            </div>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h3 class="font-semibold mb-3">Campaigns (Last 12 months)</h3>
            <div class="space-y-3">
              <div v-for="camp in client.campaigns" :key="camp.id" class="flex items-center justify-between border rounded-xl p-4">
                <div>
                  <div class="font-medium">{{ camp.title }}</div>
                  <div class="text-xs text-gray-500">{{ camp.platform }} • {{ camp.role }}</div>
                  <div class="text-sm text-gray-600 mt-2">{{ camp.summary }}</div>
                </div>
                <div class="text-right">
                  <div class="text-sm text-gray-500">Spend</div>
                  <div class="font-semibold">₹{{ camp.spend.toLocaleString() }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside class="space-y-4">
          <div class="bg-white rounded-2xl p-4 shadow-sm">
            <div class="text-sm text-gray-500">Account Manager</div>
            <div class="mt-2 font-medium">{{ client.accountManager.name }}</div>
            <div class="text-xs text-gray-500">{{ client.accountManager.email }}</div>
            <button class="mt-3 w-full rounded-xl border px-3 py-2">Message</button>
          </div>
          <div class="bg-white rounded-2xl p-4 shadow-sm">
            <div class="text-sm text-gray-500">Preferences</div>
            <div class="mt-2 text-sm">
              <div>Preferred influencers: {{ client.preferences.influencerTypes.join(', ') }}</div>
              <div>Avg Budget per campaign: ₹{{ client.preferences.avgBudget }}</div>
            </div>
          </div>
          <div class="bg-white rounded-2xl p-4 shadow-sm">
            <div class="text-sm text-gray-500">Verified</div>
            <div class="mt-2 flex items-center gap-2">
              <span class="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">Business Verified</span>
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
  name: 'ClientProfileB2B',
  components: {
    Navbar,
  },
  data() {
    return {
      globalState,
      isEditing: false,
      notificationCount: 5,
      client: {
        id: 'c_b2b_01',
        name: 'GreenLeaf Foods Pvt Ltd',
        logo: 'https://placehold.co/100x100/cccccc/ffffff?text=Logo',
        industry: 'FMCG • Food & Beverage',
        size: '200-500 employees',
        tagline: 'Healthy snacks that taste great.',
        about: 'GreenLeaf is a fast-growing health snack brand focusing on natural ingredients and sustainable packaging.',
        website: 'https://greenleaf.co',
        contactEmail: 'marketing@greenleaf.co',
        accountManager: { name: 'Ritika Sharma', email: 'ritika@greenleaf.co' },
        preferences: { influencerTypes: ['Macro', 'Micro'], avgBudget: '150000' },
        campaigns: [
          { id: 'g1', title: 'New Range Launch', platform: 'Instagram', role: 'Brand Awareness', summary: '1-month multi-influencer campaign', spend: 420000 },
          { id: 'g2', title: 'Recipe Collab Series', platform: 'YouTube', role: 'Content Creation', summary: '3 videos with chefs', spend: 260000 }
        ]
      },
      editableClient: {
        name: 'GreenLeaf Foods Pvt Ltd',
        industry: 'FMCG • Food & Beverage',
        website: 'https://greenleaf.co',
      }
    };
  },
  methods: {
    saveProfile() {
      this.client.name = this.editableClient.name;
      this.client.industry = this.editableClient.industry;
      this.client.website = this.editableClient.website;
      this.isEditing = false;
      console.log('B2B Profile saved:', this.client);
    },
  },
};
</script>
