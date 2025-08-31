<template>
  <div class="font-sans bg-gray-50 text-gray-800">
    <!-- Navbar -->
    <Navbar />

    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 opacity-90"></div>
      <div class="relative container mx-auto px-6 sm:px-12 lg:px-20 py-24 flex flex-col lg:flex-row items-center justify-between text-white">
        <!-- Hero Text -->
        <div class="flex-1 space-y-6 text-center lg:text-left">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            The Future of <span class="text-yellow-300">Influencer Marketing</span>
          </h1>
          <p class="text-lg max-w-xl mx-auto lg:mx-0 text-gray-200">
            Streamline campaigns, discover influencers, and analyze performance — all in one powerful platform.
          </p>
          <div class="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            <button class="bg-yellow-400 text-gray-900 px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-yellow-300 transition">
              Start Free Trial
            </button>
            <button class="bg-white/20 border border-white/40 text-white px-6 py-3 rounded-full hover:bg-white/30 transition">
              Watch Demo →
            </button>
          </div>
        </div>

        <!-- Hero Image -->
        <div class="flex-1 mt-12 lg:mt-0 flex justify-center">
          <img
            src="https://placehold.co/550x400/eeeeee/cccccc?text=Dashboard+Preview"
            class="w-full max-w-lg rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>

    <!-- Social Proof -->
    <section class="py-12 bg-white border-b border-gray-200 text-center">
      <h3 class="text-gray-500 uppercase tracking-wider text-sm mb-6">Trusted by leading brands</h3>
      <div class="flex flex-wrap justify-center gap-8 opacity-70">
        <img src="https://placehold.co/100x40?text=Dentsu" class="h-10 hover:opacity-100 transition" />
        <img src="https://placehold.co/100x40?text=Samsung" class="h-10 hover:opacity-100 transition" />
        <img src="https://placehold.co/100x40?text=WPP" class="h-10 hover:opacity-100 transition" />
        <img src="https://placehold.co/100x40?text=Kellogg's" class="h-10 hover:opacity-100 transition" />
        <img src="https://placehold.co/100x40?text=OMG" class="h-10 hover:opacity-100 transition" />
      </div>
    </section>

    <!-- Features Section -->
    <section class="container mx-auto px-6 sm:px-12 lg:px-20 py-20">
      <h2 class="text-3xl sm:text-4xl font-extrabold text-center mb-12">
        Everything you need for powerful campaigns
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
          <h4 class="text-xl font-semibold mb-2">AI-Powered Discovery</h4>
          <p class="text-gray-600 text-sm">Find top influencers with AI-driven recommendations tailored to your niche.</p>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
          <h4 class="text-xl font-semibold mb-2">Automated Workflows</h4>
          <p class="text-gray-600 text-sm">Save hours with smart campaign automation and built-in tools.</p>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
          <h4 class="text-xl font-semibold mb-2">Analytics Dashboard</h4>
          <p class="text-gray-600 text-sm">Track ROI, engagement, and reach with easy-to-read dashboards.</p>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
          <h4 class="text-xl font-semibold mb-2">Collaboration Tools</h4>
          <p class="text-gray-600 text-sm">Bring brands, creators, and teams together seamlessly.</p>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
          <h4 class="text-xl font-semibold mb-2">Real-Time Insights</h4>
          <p class="text-gray-600 text-sm">Make data-backed decisions with live campaign performance metrics.</p>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
          <h4 class="text-xl font-semibold mb-2">Secure & Scalable</h4>
          <p class="text-gray-600 text-sm">Enterprise-grade security with scalable infrastructure for any size campaign.</p>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="bg-purple-50 py-20">
      <h3 class="text-2xl font-bold text-center mb-12">What Our Clients Say</h3>
      <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
          <p class="italic text-gray-700 mb-4">"Buzzify transformed our influencer campaigns — our ROI doubled in 3 months!"</p>
          <img src="https://placehold.co/80x80?text=Avatar" class="w-16 h-16 rounded-full mb-2" />
          <p class="font-semibold">Alfredo de Paz</p>
          <p class="text-sm text-gray-500">Head of Social Media, IPG</p>
        </div>
        <div class="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
          <p class="italic text-gray-700 mb-4">"Their automation tools saved us hours every week and improved collaboration."</p>
          <img src="https://placehold.co/80x80?text=Avatar" class="w-16 h-16 rounded-full mb-2" />
          <p class="font-semibold">Sarah Kim</p>
          <p class="text-sm text-gray-500">Marketing Lead, Dentsu</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="container mx-auto px-6 sm:px-12 lg:px-20 py-20">
      <div class="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-3xl shadow-xl p-12 text-center">
        <h3 class="text-3xl font-bold mb-4">Start Your Free Trial Today</h3>
        <p class="max-w-2xl mx-auto text-white/80 mb-6">
          Join 10,000+ marketers using Buzzify to launch successful influencer campaigns.
        </p>
        <button class="bg-white text-purple-700 px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition">
          Get Started →
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 text-center text-sm text-gray-500 border-t border-gray-200">
      &copy; 2024 MetaBerry. All rights reserved.
    </footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: "Home",
  components: { Navbar },
};
</script>
