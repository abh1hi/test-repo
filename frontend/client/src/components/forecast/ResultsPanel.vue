<template>
    <div>
        <!-- Header & Tabs -->
        <div class="card" style="border-radius: 0.5rem 0.5rem 0 0; border-bottom: none; padding: 1.5rem 2rem;">
             <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div>
                    <h3 style="color: #111827; margin-bottom: 0.5rem; font-size: 1.5rem;">Results Dashboard</h3>
                    <p style="color: #6b7280; margin: 0;">{{ data.meta.freq }}-frequency forecast for {{ data.meta.horizon }} periods</p>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn-secondary" @click="downloadCsv">Download CSV</button>
                    <button class="btn-secondary" @click="$emit('reset')">Start Over</button>
                </div>
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
                <ForecastChart 
                    :history="data.history"
                    :forecast-base="data.forecast_base"
                    :forecast-final="data.forecast_final"
                    :ai-adjustment="data.ai_adjustment"
                />

                <!-- Metadata -->
                <div style="margin-top: 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                  <div class="card" style="padding: 1rem;">
                    <h3 style="font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.75rem;">Forecast Details</h3>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                      <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem;">
                        <!-- Placeholder for Calendar icon -->
                        <span style="height: 0.75rem; width: 0.75rem; color: #9ca3af;"></span>
                        <span>Frequency: {{ config.freq === 'D' ? 'Daily' : config.freq === 'W' ? 'Weekly' : 'Monthly' }}</span>
                      </div>
                      <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem;">
                        <!-- Placeholder for MapPin icon -->
                        <span style="height: 0.75rem; width: 0.75rem; color: #9ca3af;"></span>
                        <span>
                          {{ config.industry }} &bull; {{ config.city ? `${config.city}, ` : '' }}{{ config.state ? `${config.state}, ` : '' }}{{ config.country }}
                        </span>
                      </div>
                      <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem;">
                        <!-- Placeholder for TrendingUp icon -->
                        <span style="height: 0.75rem; width: 0.75rem; color: #9ca3af;"></span>
                        <span>Horizon: {{ data.meta.horizon }} periods</span>
                      </div>
                    </div>
                  </div>

                  <div class="card" style="padding: 1rem;">
                    <h3 style="font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.75rem;">Data Quality</h3>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                      <div style="display: flex; justify-content: space-between; font-size: 0.75rem;">
                        <span style="color: #4b5563;">Training Period:</span>
                        <span style="font-weight: 500;">{{ new Date(data.meta.train_start).toLocaleDateString() }} to {{ new Date(data.meta.train_end).toLocaleDateString() }}</span>
                      </div>
                      <div style="display: flex; justify-content: space-between; font-size: 0.75rem;">
                        <span style="color: #4b5563;">Data Points:</span>
                        <span style="font-weight: 500;">{{ data.meta.processed_rows }} processed / {{ data.meta.original_rows }} original</span>
                      </div>
                      <div v-if="data.meta.holidays_used && data.meta.holidays_used.length > 0" style="display: flex; justify-content: space-between; font-size: 0.75rem;">
                        <span style="color: #4b5563;">Holidays:</span>
                        <span style="font-weight: 500;">{{ data.meta.holidays_used.length }} included</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="margin-top: 2rem;">
                    <h4 style="font-size: 1.125rem; color: #111827; margin-bottom: 1rem;">Forecast Summary</h4>
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
                        <thead>
                            <tr style="background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                                <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151;">Period</th>
                                <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151;">Base Forecast</th>
                                <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151;">Lower Bound</th>
                                <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151;">Upper Bound</th>
                                <th style="padding: 0.75rem; text-align: left; font-weight: 600; color: #374151;">AI Adjusted</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in data.forecast_final" :key="item.ds" style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 0.75rem;">{{ new Date(item.ds).toLocaleDateString() }}</td>
                                <td style="padding: 0.75rem;">{{ Math.round(item.yhat_lower).toLocaleString() }}</td>
                                <td style="padding: 0.75rem;">{{ Math.round(item.yhat_lower).toLocaleString() }}</td>
                                <td style="padding: 0.75rem;">{{ Math.round(item.yhat_upper).toLocaleString() }}</td>
                                <td style="padding: 0.75rem; font-weight: 600; color: #111827;">{{ Math.round(item.yhat_final).toLocaleString() }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style="margin-top: 2rem;" v-if="data.ai_adjustment.applied">
                    <h4 style="font-size: 1.125rem; color: #111827; margin-bottom: 1rem;">AI Macro Adjustment Applied</h4>
                    <div style="background-color: #f0f9ff; border-radius: 0.375rem; padding: 1rem; font-size: 0.875rem;">
                        <p style="color: #0369a1; margin: 0 0 0.5rem 0;"><strong>Adjustment:</strong> {{ data.ai_adjustment.adjustment_pct > 0 ? '+' : '' }}{{ data.ai_adjustment.adjustment_pct.toFixed(1) }}%</p>
                                                <p style="color: #0369a1; margin: 0 0 1rem 0;"><strong>Business Insights:</strong><br>{{ data.ai_adjustment.rationale }}</p>
                        <div v-if="data.ai_adjustment.sources && data.ai_adjustment.sources.length > 0">
                            <p style="color: #0369a1; margin: 0 0 0.5rem 0;"><strong>Sources:</strong></p>
                            <ul style="margin: 0; padding-left: 1.5rem;">
                                <li v-for="(source, index) in data.ai_adjustment.sources" :key="index" style="margin-bottom: 0.25rem;">
                                    <a :href="source" target="_blank" rel="noopener noreferrer" style="color: #0284c7; text-decoration: underline;">
                                        {{ source }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
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
import ForecastChart from './ForecastChart.vue';

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

const downloadCsv = () => {
    const { history, forecast_base, forecast_final, ai_adjustment } = props.data;

    // Combine all data into a single map using date as the key
    const dataMap = new Map();

    history.forEach(p => {
        dataMap.set(p.ds, { ds: p.ds, historical_sales: p.y });
    });

    forecast_base.forEach(p => {
        const entry = dataMap.get(p.ds) || { ds: p.ds };
        entry.baseline_forecast = p.yhat;
        dataMap.set(p.ds, entry);
    });

    if (ai_adjustment.applied) {
        forecast_final.forEach(p => {
            const entry = dataMap.get(p.ds) || { ds: p.ds };
            entry.ai_adjusted_forecast = p.yhat_final;
            dataMap.set(p.ds, entry);
        });
    }

    const sortedData = Array.from(dataMap.values()).sort((a, b) => new Date(a.ds) - new Date(b.ds));

    const headers = ['ds', 'historical_sales', 'baseline_forecast'];
    if (ai_adjustment.applied) {
        headers.push('ai_adjusted_forecast');
    }

    const csvRows = [headers.join(',')];

    sortedData.forEach(row => {
        const values = headers.map(header => row[header] || '');
        csvRows.push(values.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'forecast_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

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