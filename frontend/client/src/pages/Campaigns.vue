

// File: frontend/client/src/pages/Campaigns.vue
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <Navbar />
    <div class="container mx-auto mt-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Your Campaigns</h1>
      <div class="space-y-4">
        <div v-for="campaign in campaigns" :key="campaign.id"
             class="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <h2 class="text-xl font-semibold text-gray-800">{{ campaign.title }}</h2>
            <p class="text-gray-500 text-sm">Status: {{ campaign.status }}</p>
          </div>
          <span :class="getStatusColor(campaign.status)"
                class="px-3 py-1 rounded-full text-sm font-medium">
            {{ campaign.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue';
export default {
  name: 'Campaigns',
  components: {
    Navbar,
  },
  data() {
    return {
      campaigns: [
        { id: 1, title: 'Summer Collection Launch', status: 'completed' },
        { id: 2, title: 'New Product Teaser', status: 'in-progress' },
        { id: 3, title: 'Winter Sale Event', status: 'pending' },
      ],
    };
  },
  methods: {
    getStatusColor(status) {
      switch (status) {
        case 'completed':
          return 'bg-green-100 text-green-800';
        case 'in-progress':
          return 'bg-blue-100 text-blue-800';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    },
  },
};
</script>
