<template>
  <div class="min-h-screen font-sans bg-white text-gray-900">
    <!-- Navbar -->
    <Navbar />

    <!-- Hero -->
    <header class="pt-28 pb-16 bg-gradient-to-b from-white to-gray-50 text-center">
      <div class="max-w-3xl mx-auto px-6">
        <h1 class="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
          Get in <span class="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Touch</span>
        </h1>
        <p class="text-gray-600 max-w-xl mx-auto">
          We’d love to hear from you. Reach out with questions, feedback, or just to say hello.
        </p>
      </div>
    </header>

    <!-- Contact Section -->
    <section class="py-20">
      <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Contact Info -->
        <div class="space-y-8">
          <h2 class="text-2xl font-bold">Contact Information</h2>
          <p class="text-gray-600">
            Our team is always here to help. Drop us a message or connect through the details below.
          </p>

          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">📍</div>
              <div>
                <div class="font-semibold">Head Office</div>
                <p class="text-gray-600 text-sm">123 Innovation Street, Delhi, India</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">📞</div>
              <div>
                <div class="font-semibold">Phone</div>
                <p class="text-gray-600 text-sm">+91 98765 43210</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">✉️</div>
              <div>
                <div class="font-semibold">Email</div>
                <p class="text-gray-600 text-sm">support@souraksh.com</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 class="text-xl font-semibold mb-6">Send Us a Message</h2>
          <form class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Your full name"
                class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                class="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-indigo-700 text-white text-center">
      <div class="max-w-4xl mx-auto px-6">
        <h3 class="text-2xl font-semibold mb-3">Prefer a live conversation?</h3>
        <p class="mb-6 text-indigo-100">Schedule a demo call and we’ll walk you through Souraksh solutions tailored to your business.</p>
        <router-link
          to="/demo"
          class="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-indigo-700 font-semibold hover:bg-indigo-50 transition"
        >
          Book a Demo
        </router-link>
      </div>
    </section>

    <!-- Footer -->
  <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

.font-sans {
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
}
</style>
