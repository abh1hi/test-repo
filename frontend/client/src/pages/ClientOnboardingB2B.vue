

// File: frontend/client/src/pages/ClientOnboardingB2B.vue
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <Navbar />
    <div class="container mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
      <div class="flex justify-end mb-4">
        <button @click="skipOnboarding" class="text-blue-600 hover:underline">Skip</button>
      </div>
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Business Client Onboarding</h1>
      <p class="text-gray-600 mb-8">Please provide your business details to get started.</p>

      <form @submit.prevent="submitProfile" class="space-y-8">
        <!-- Business Details -->
        <div>
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Business Details</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="company-name" class="block text-sm font-medium text-gray-700">Company Name</label>
              <input type="text" id="company-name" v-model="profile.companyName" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="industry" class="block text-sm font-medium text-gray-700">Industry/Niche</label>
              <input type="text" id="industry" v-model="profile.industry" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="website" class="block text-sm font-medium text-gray-700">Website URL</label>
              <input type="url" id="website" v-model="profile.website" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="business-email" class="block text-sm font-medium text-gray-700">Business Email</label>
              <input type="email" id="business-email" v-model="profile.businessEmail" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="contact-number" class="block text-sm font-medium text-gray-700">Contact Number</label>
              <input type="tel" id="contact-number" v-model="profile.contactNumber" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="business-address" class="block text-sm font-medium text-gray-700">Business Address</label>
              <input type="text" id="business-address" v-model="profile.businessAddress" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="company-logo" class="block text-sm font-medium text-gray-700">Company Logo</label>
              <input type="file" id="company-logo" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
            </div>
          </div>
        </div>

        <!-- Campaign Details -->
        <div>
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Campaign Details</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="influencer-type" class="block text-sm font-medium text-gray-700">Preferred Influencer Type</label>
              <select id="influencer-type" v-model="profile.influencerType" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option>Celebrity</option>
                <option>Macro</option>
                <option>Micro</option>
                <option>Nano</option>
              </select>
            </div>
            <div>
              <label for="campaign-goals" class="block text-sm font-medium text-gray-700">Campaign Goals</label>
              <input type="text" id="campaign-goals" v-model="profile.campaignGoals" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="budget-range" class="block text-sm font-medium text-gray-700">Budget Range</label>
              <input type="text" id="budget-range" v-model="profile.budgetRange" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
          </div>
        </div>

        <!-- Verification & Billing -->
        <div>
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Verification & Billing</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="gst-vat" class="block text-sm font-medium text-gray-700">GST/VAT (if applicable)</label>
              <input type="text" id="gst-vat" v-model="profile.gstVat" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            </div>
            <div>
              <label for="payment-preferences" class="block text-sm font-medium text-gray-700">Payment Preferences</label>
              <input type="text" id="payment-preferences" v-model="profile.paymentPreferences" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
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
  name: 'ClientOnboardingB2B',
  components: {
    Navbar,
  },
  data() {
    return {
      profile: {
        companyName: '',
        industry: '',
        website: '',
        businessEmail: '',
        contactNumber: '',
        businessAddress: '',
        influencerType: 'Micro',
        campaignGoals: '',
        budgetRange: '',
        gstVat: '',
        paymentPreferences: '',
      },
    };
  },
  methods: {
    submitProfile() {
      console.log('Submitting B2B profile:', this.profile);
      this.$router.push('/');
    },
    skipOnboarding() {
      this.$router.push('/');
    }
  },
};
</script>