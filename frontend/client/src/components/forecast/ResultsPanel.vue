// File: frontend/client/src/components/forecast/ResultsPanel.vue
<template>
    <div>
        <!-- Header & Tabs -->
        <div class="card" style="border-radius: 0.5rem 0.5rem 0 0; border-bottom: none; padding: 1.5rem 2rem;">
             <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div>
                    <h3 style="color: #111827; margin-bottom: 0.5rem; font-size: 1.5rem;">Results Dashboard</h3>
                    <p style="color: #6b7280; margin: 0;">{{ data.meta.freq }}-frequency forecast for {{ data.meta.horizon }} periods</p>
                </div>
                <button class="btn-secondary" @click="$emit('reset')">Start Over</button>
            </div>
            <!-- Tab Navigation -->
             <div style="display: flex; gap: 0.5rem; border-bottom: 1px solid #e5e7eb;">
                <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" class="tab-button" :class="{ 'active-tab': activeTab === tab.id }">
                     <component :is="tab.icon" style="height: 1rem; width: 1rem;"></component>
                    {{ tab.name }}
                </button>
            </div>
        </div>

        <!-- Tab Content -->
        <div class="card" style="border-radius: 0 0 0.5rem 0.5rem; border-top: none;">
             <div v-if="activeTab === 'forecast'" style="padding: 2rem;">
                 <!-- Forecast Details Content -->
             </div>
             <div v-if="activeTab === 'analysis'">
                 <AnalysisModule :data="data.history" title="Historical Data Analysis" />
             </div>
             <div v-if="activeTab === 'financial'">
                 <FinancialProjection :forecast-data="data.forecast_final.length > 0 ? data.forecast_final : data.forecast_base" :country="config.country" />
             </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import AnalysisModule from './AnalysisModule.vue';
import FinancialProjection from './FinancialProjection.vue';

const props = defineProps({
    data: Object,
    config: Object,
});

defineEmits(['reset']);

const activeTab = ref('forecast');

const tabs = [
    { id: 'forecast', name: 'Forecast Details', icon: 'LineChartIcon' },
    { id: 'analysis', name: 'Data Analysis', icon: 'TrendingUpIcon' },
    { id: 'financial', name: 'Financial Projection', icon: 'DollarSignIcon' },
];

// Dummy components for icons
const LineChartIcon = defineAsyncComponent(async () => ({ template: '<div></div>' }));
const TrendingUpIcon = defineAsyncComponent(async () => ({ template: '<div></div>' }));
const DollarSignIcon = defineAsyncComponent(async () => ({ template: '<div></div>' }));

</script>

<style scoped>
.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  background-color: transparent;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  color: #6b7280;
  border-bottom: 2px solid transparent;
}
.tab-button.active-tab {
  color: #0284c7;
  font-weight: 600;
  border-bottom-color: #0284c7;
}
</style>
