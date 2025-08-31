<!-- File: frontend/client/src/pages/InfluencerProfile.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <div class="max-w-6xl mx-auto p-6">
      <!-- Top -->
      <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6">
        <div class="flex items-center gap-6">
          <img :src="influencer.avatar" alt="avatar" class="w-28 h-28 rounded-full object-cover border" />
          <div>
            <h1 class="text-2xl font-bold">{{ influencer.name }}</h1>
            <div class="text-sm text-gray-500">{{ influencer.handle }} · {{ influencer.location }}</div>
            <div class="mt-2 flex gap-2">
              <span class="text-xs px-3 py-1 rounded-full bg-green-50 text-green-700">{{ influencer.niche }}</span>
              <span class="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700">{{ influencer.primaryPlatform }}</span>
            </div>
          </div>
        </div>

        <div class="ml-auto flex flex-wrap gap-4 items-center">
          <div class="text-center">
            <div class="text-xs text-gray-500">Followers</div>
            <div class="text-lg font-semibold">{{ formatNum(influencer.followers) }}</div>
          </div>
          <div class="text-center">
            <div class="text-xs text-gray-500">Engagement</div>
            <div class="text-lg font-semibold">{{ influencer.engagementRate }}%</div>
          </div>
          <div class="text-center">
            <div class="text-xs text-gray-500">Avg Reach</div>
            <div class="text-lg font-semibold">{{ formatNum(influencer.avgReach) }}</div>
          </div>
          <button class="bg-black text-white px-4 py-2 rounded-xl">Contact / Book</button>
        </div>
      </div>

      <!-- Middle: Bio + Stats + CTA -->
      <div class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-4">
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h2 class="font-semibold">About</h2>
            <p class="mt-3 text-gray-700">{{ influencer.bio }}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <a v-for="link in influencer.socialLinks" :key="link.platform" :href="link.url" class="text-sm text-blue-600 underline">
                {{ link.platform }}
              </a>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h3 class="font-semibold mb-3">Active & Past Campaigns</h3>
            <div class="space-y-3">
              <div v-for="c in influencer.campaigns" :key="c.id" class="flex items-start gap-4 border rounded-xl p-4">
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium">{{ c.title }}</div>
                      <div class="text-xs text-gray-500">{{ c.brand }} • {{ c.platform }}</div>
                    </div>
                    <div class="text-sm text-gray-600">{{ c.status }}</div>
                  </div>
                  <p class="text-sm text-gray-600 mt-2">{{ c.description }}</p>
                  <div class="mt-3 text-xs text-gray-500">Delivered: {{ c.deliveredPosts }} / {{ c.expectedPosts }}</div>
                </div>
                <div class="w-36 text-right">
                  <div class="text-sm text-gray-500">Paid</div>
                  <div class="font-semibold">₹{{ c.paid }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside class="space-y-4">
          <div class="bg-white rounded-2xl p-4 shadow-sm">
            <div class="text-sm text-gray-500">Rates</div>
            <div class="mt-2">
              <div class="flex items-center justify-between">
                <div class="text-sm">Post</div><div class="font-semibold">₹{{ influencer.rates.post }}</div>
              </div>
              <div class="flex items-center justify-between mt-2">
                <div class="text-sm">Story</div><div class="font-semibold">₹{{ influencer.rates.story }}</div>
              </div>
              <div class="flex items-center justify-between mt-2">
                <div class="text-sm">Video</div><div class="font-semibold">₹{{ influencer.rates.video }}</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-4 shadow-sm">
            <div class="text-sm text-gray-500">Media Kit</div>
            <button class="mt-3 w-full rounded-xl border px-3 py-2 text-sm">Download Media Kit</button>
          </div>

          <div class="bg-white rounded-2xl p-4 shadow-sm">
            <div class="text-sm text-gray-500">Audience</div>
            <div class="mt-3 text-sm">
              <div>Top Locations: {{ influencer.audience.topLocations.join(', ') }}</div>
              <div>Top Age Group: {{ influencer.audience.topAge }}</div>
            </div>
          </div>
        </aside>
      </div>

      <!-- Portfolio grid -->
      <div class="mt-6">
        <h3 class="text-lg font-semibold mb-3">Portfolio / Top Content</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="p in influencer.portfolio" :key="p.id" class="bg-white rounded-xl overflow-hidden shadow-sm">
            <img :src="p.image" class="w-full h-40 object-cover" />
            <div class="p-3">
              <div class="font-medium">{{ p.title }}</div>
              <div class="text-xs text-gray-500 mt-1">{{ p.metrics.likes }} likes • {{ p.metrics.views }} views</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import { ref } from 'vue';

const influencer = ref({
  id: 'inf_01',
  name: 'Aayushi Mehra',
  handle: '@aayushi',
  avatar: 'https://placehold.co/120x120/cccccc/ffffff?text=AM',
  location: 'Mumbai, IN',
  niche: 'Fashion & Lifestyle',
  primaryPlatform: 'Instagram',
  followers: 248000,
  engagementRate: 3.8,
  avgReach: 120000,
  bio: 'Fashion creator focusing on sustainable apparel and daily styling tips.',
  socialLinks: [
    { platform: 'Instagram', url: '#' },
    { platform: 'YouTube', url: '#' },
  ],
  audience: {
    topLocations: ['India', 'UAE', 'UK'],
    topAge: '18-34'
  },
  rates: { post: 18000, story: 6000, video: 35000 },
  campaigns: [
    { id: 'c1', title: 'Summer Capsule', brand: 'BrandX', platform: 'Instagram', status: 'Completed', description: '3-post campaign for summer collection', deliveredPosts: 3, expectedPosts: 3, paid: 54000 },
    { id: 'c2', title: 'Skincare Launch', brand: 'GlowCo', platform: 'YouTube', status: 'Live', description: 'Sponsored review & long form video', deliveredPosts: 1, expectedPosts: 1, paid: 35000 }
  ],
  portfolio: [
    { id: 'p1', title: 'Sustainable Outfit Reels', image: 'https://placehold.co/300x200/cccccc/ffffff?text=Portfolio+1', metrics: { likes: '25k', views: '140k' } },
    { id: 'p2', title: 'Festival Lookbook', image: 'https://placehold.co/300x200/cccccc/ffffff?text=Portfolio+2', metrics: { likes: '12k', views: '80k' } },
  ]
})

function formatNum(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n/1000).toFixed(1) + 'k'
  return n
}
</script>

<style scoped>
/* small custom tweaks if needed */
</style>
