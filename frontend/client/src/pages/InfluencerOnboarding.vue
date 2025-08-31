<!-- File: frontend/client/src/pages/InfluencerOnboarding.vue -->
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <Navbar />
    <div class="container mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Complete Your Influencer Profile</h1>
      <p class="text-gray-600 mb-8">Please provide the following details to get your profile ready for collaborations.</p>

      <form @submit.prevent="submitProfile" class="space-y-8">
        <!-- Section 1: Basic Profile Information -->
        <div>
          <h2 class="text-xl font-semibold text-gray-700 mb-4">1. Basic Profile Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="full-name" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="full-name" v-model="profile.fullName" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
              <input type="text" id="phone" v-model="profile.phone" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" id="location" v-model="profile.location" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="profile-picture" class="block text-sm font-medium text-gray-700">Profile Picture / Brand Logo</label>
              <input type="file" id="profile-picture" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
            </div>
          </div>
          <div class="mt-4">
            <label for="short-bio" class="block text-sm font-medium text-gray-700">Short Bio</label>
            <textarea id="short-bio" rows="3" v-model="profile.bio" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"></textarea>
          </div>
        </div>

        <!-- Section 2: Social Media & Content Details -->
        <div>
          <h2 class="text-xl font-semibold text-gray-700 mb-4">2. Social Media & Content Details</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="platforms" class="block text-sm font-medium text-gray-700">Platforms Used</label>
              <select id="platforms" multiple v-model="profile.platforms" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="tiktok">TikTok</option>
                <option value="facebook">Facebook</option>
              </select>
            </div>
            <div>
              <label for="profile-links" class="block text-sm font-medium text-gray-700">Profile Links (comma-separated)</label>
              <input type="text" id="profile-links" v-model="profile.profileLinks" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="follower-count" class="block text-sm font-medium text-gray-700">Follower Count</label>
              <input type="number" id="follower-count" v-model="profile.followerCount" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="engagement-rate" class="block text-sm font-medium text-gray-700">Average Engagement Rate (%)</label>
              <input type="number" step="0.1" id="engagement-rate" v-model="profile.engagementRate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
          </div>
          <div class="mt-4">
            <label for="content-categories" class="block text-sm font-medium text-gray-700">Content Categories (e.g., fashion, travel)</label>
            <input type="text" id="content-categories" v-model="profile.contentCategories" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          </div>
        </div>
        
        <!-- Section 3: Audience Demographics -->
        <div>
          <h2 class="text-xl font-semibold text-gray-700 mb-4">3. Audience Demographics</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="audience-location" class="block text-sm font-medium text-gray-700">Primary Audience Location</label>
              <input type="text" id="audience-location" v-model="profile.audienceLocation" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="audience-age" class="block text-sm font-medium text-gray-700">Age Range</label>
              <input type="text" id="audience-age" v-model="profile.audienceAge" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="audience-gender" class="block text-sm font-medium text-gray-700">Gender Split</label>
              <input type="text" id="audience-gender" v-model="profile.audienceGender" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
          </div>
        </div>

        <!-- Section 4: Performance Metrics -->
        <div>
          <h2 class="text-xl font-semibold text-gray-700 mb-4">4. Performance Metrics</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="past-campaigns" class="block text-sm font-medium text-gray-700">Past Campaign Experience</label>
              <input type="text" id="past-campaigns" v-model="profile.pastCampaigns" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="avg-views" class="block text-sm font-medium text-gray-700">Average Views / Impressions</label>
              <input type="text" id="avg-views" v-model="profile.averageViews" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
          </div>
        </div>

        <!-- Section 5: Preferences -->
        <div>
          <h2 class="text-xl font-semibold text-gray-700 mb-4">5. Personal & Brand Preferences</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="collaboration-type" class="block text-sm font-medium text-gray-700">Collaboration Type Preferred</label>
              <input type="text" id="collaboration-type" v-model="profile.collaborationType" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="interested-in" class="block text-sm font-medium text-gray-700">Brands or Categories Interested In</label>
              <input type="text" id="interested-in" v-model="profile.interestedIn" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
          </div>
        </div>

        <!-- Section 6: Payments -->
        <div>
          <h2 class="text-xl font-semibold text-gray-700 mb-4">6. Payment & Legal Info</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="payment-details" class="block text-sm font-medium text-gray-700">Bank or Payment Details</label>
              <input type="text" id="payment-details" v-model="profile.paymentDetails" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
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
import influencerService from '../services/influencerService';
import { globalState } from '../main.js';

export default {
  name: 'InfluencerOnboarding',
  components: {
    Navbar,
  },
  data() {
    return {
      profile: {
        fullName: '',
        phone: '',
        location: '',
        bio: '',
        platforms: [],
        profileLinks: '',
        followerCount: null,
        engagementRate: null,
        contentCategories: '',
        audienceLocation: '',
        audienceAge: '',
        audienceGender: '',
        pastCampaigns: '',
        averageViews: '',
        collaborationType: '',
        interestedIn: '',
        paymentDetails: '',
        taxDetails: '',
        agreements: false,
      },
    };
  },
  methods: {
    async submitProfile() {
      try {
        const token = globalState.user.token;
        const response = await influencerService.createProfile(this.profile, token);
        console.log('Profile saved successfully:', response);
        this.$router.push('/influencer-profile');
      } catch (error) {
        console.error('Error saving profile:', error.message);
      }
    },
  },
};
</script>
