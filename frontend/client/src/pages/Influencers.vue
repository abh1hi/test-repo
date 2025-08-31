

// File: frontend/client/src/pages/Influencers.vue
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <Navbar />
    <div class="container mx-auto mt-8 p-6 bg-white rounded-3xl shadow-lg">
      <div class="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Influencers</h1>
          <p class="text-gray-600 mt-2">Browse and connect with influencers for your marketing campaigns.</p>
        </div>
        <button class="mt-4 md:mt-0 px-6 py-3 bg-gray-100 text-gray-600 font-semibold rounded-full border border-gray-300 hover:bg-gray-200 transition-colors flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5.5 3.5a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2zM12.5 3.5a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2zM5.5 10.5a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2zM12.5 10.5a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2z" />
          </svg>
          Filter
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <InfluencerCard 
          v-for="influencer in influencers" 
          :key="influencer.id" 
          :influencer="influencer"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue';
import InfluencerCard from '../components/InfluencerCard.vue';
export default {
  name: 'Influencers',
  components: {
    Navbar,
    InfluencerCard,
  },
  data() {
    return {
      influencers: [
        { id: 1, name: 'Emma Johnsen', category: 'Influencer', followers: '325 K', engagements: '12.5 K', cost: '$250', image: 'https://placehold.co/200x200/cccccc/ffffff?text=Emma' },
        { id: 2, name: 'Michael Smith', category: 'Audience', followers: '210 K', engagements: '8.1 K', cost: '$160', image: 'https://placehold.co/200x200/cccccc/ffffff?text=Michael' },
        { id: 3, name: 'Sophia Martinez', category: 'Elestronics', followers: '450 K', engagements: '15.3 K', cost: '$300', image: 'https://placehold.co/200x200/cccccc/ffffff?text=Sophia' },
        { id: 4, name: 'James Wilson', category: 'Fotografaher', followers: '389 K', engagements: '20.3 K', cost: '$400', image: 'https://placehold.co/200x200/cccccc/ffffff?text=James' },
      ],
    };
  },
};
</script>
