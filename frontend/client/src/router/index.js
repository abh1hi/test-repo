

// File: frontend/client/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Influencers from '../pages/Influencers.vue';
import Campaigns from '../pages/Campaigns.vue';
import InfluencerOnboarding from '../pages/InfluencerOnboarding.vue';
import ClientOnboardingB2B from '../pages/ClientOnboardingB2B.vue';
import ClientOnboardingC2C from '../pages/ClientOnboardingC2C.vue';
import ClientProfileB2B from '../pages/ClientProfileB2B.vue';
import ClientProfileC2C from '../pages/ClientProfileC2C.vue';
import InfluencerProfile from '../pages/InfluencerProfile.vue';
import Landing from '../pages/Landing.vue';
import ServicePage from '../pages/ServicePage.vue';
import ServiceLanding from '../pages/ServiceLanding.vue';
import About from '../pages/about.vue';
import Contact from '../pages/Contact.vue';
import Testimonial from '../pages/Testimonial.vue';
import Pricing from '../pages/Pricing.vue';
import Dashboard from '../pages/Dashboard.vue';
// Import the new Forecast Dashboard page
import ForecastDashboard from '../pages/ForecastDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/forecast-dashboard',
    name: 'ForecastDashboard',
    component: ForecastDashboard,
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: Pricing,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/testimonials',
    name: 'Testimonial',
    component: Testimonial,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
    { path: '/services', 
      name: 'ServicePage',
      component: ServicePage },

  { path: '/services/:id',
    name: 'ServiceLanding',
    component: ServiceLanding },

  {
    path: '/landing',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/influencers',
    name: 'Influencers',
    component: Influencers,
  },
  {
    path: '/campaigns',
    name: 'Campaigns',
    component: Campaigns,
  },
  {
    path: '/onboarding',
    name: 'InfluencerOnboarding',
    component: InfluencerOnboarding,
  },
  {
    path: '/b2b-onboarding',
    name: 'ClientOnboardingB2B',
    component: ClientOnboardingB2B,
  },
  {
    path: '/c2c-onboarding',
    name: 'ClientOnboardingC2C',
    component: ClientOnboardingC2C,
  },
  {
    path: '/b2b-profile',
    name: 'ClientProfileB2B',
    component: ClientProfileB2B,
  },
  {
    path: '/c2c-profile',
    name: 'ClientProfileC2C',
    component: ClientProfileC2C,
  },
  {
    path: '/influencer-profile',
    name: 'InfluencerProfile',
    component: InfluencerProfile,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
