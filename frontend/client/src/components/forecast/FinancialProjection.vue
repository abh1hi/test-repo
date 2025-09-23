<!-- File: frontend/client/src/components/forecast/FinancialProjection.vue -->
<template>
    <div style="background-color: white; border-radius: 0.5rem; padding: 2rem; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb;">
        <!-- Header -->
        <div style="margin-bottom: 2rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #0284c7"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                <h3 style="color: #111827; font-size: 1.5rem; margin: 0;">{{ title }}</h3>
            </div>
            <p style="color: #6b7280; margin: 0;">Calculate revenue based on forecast units</p>
        </div>

        <!-- Input Form -->
        <div style="background-color: #f9fafb; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 2rem; border: 1px solid #e5e7eb;">
             <h4 style="color: #111827; font-size: 1.125rem; margin-bottom: 1rem;">Financial Parameters</h4>
             <div class="form-grid">
                <div>
                    <label class="form-label">Avg. Selling Price per Unit ({{ currency.symbol }})</label>
                    <input type="number" v-model.number="inputs.avgSellingPrice" class="input-field" placeholder="e.g., 50.00" min="0" step="0.01">
                </div>
                <div>
                    <label class="form-label">Avg. Cost of Goods per Unit ({{ currency.symbol }})</label>
                    <input type="number" v-model.number="inputs.avgCostOfGoods" class="input-field" placeholder="e.g., 30.00" min="0" step="0.01">
                </div>
            </div>
        </div>
        
        <!-- Results -->
        <div v-if="isInputValid">
            <!-- Summary Cards -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                 <div style="background-color: #eff6ff; padding: 1rem; border-radius: 0.5rem; border: 1px solid #bfdbfe;">
                    <h4 style="font-size: 0.875rem; font-weight: 500; color: #1e40af; margin-bottom: 0.5rem;">Total Revenue</h4>
                    <p style="font-size: 1.5rem; font-weight: bold; color: #1e40af; margin: 0;">{{ currency.symbol }}{{ summaryMetrics.totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 }) }}</p>
                </div>
                <div style="background-color: #f0fdf4; padding: 1rem; border-radius: 0.5rem; border: 1px solid #bbf7d0;">
                    <h4 style="font-size: 0.875rem; font-weight: 500; color: #15803d; margin-bottom: 0.5rem;">Total Gross Profit</h4>
                    <p style="font-size: 1.5rem; font-weight: bold; color: #15803d; margin: 0;">{{ currency.symbol }}{{ summaryMetrics.totalProfit.toLocaleString(undefined, { maximumFractionDigits: 0 }) }}</p>
                </div>
                <div style="background-color: #fefce8; padding: 1rem; border-radius: 0.5rem; border: 1px solid #fde047;">
                    <h4 style="font-size: 0.875rem; font-weight: 500; color: #a16207; margin-bottom: 0.5rem;">Total Units</h4>
                    <p style="font-size: 1.5rem; font-weight: bold; color: #a16207; margin: 0;">{{ summaryMetrics.totalUnits.toLocaleString() }}</p>
                </div>
            </div>
            
            <!-- Chart -->
             <div>
              <h4 style="color: #111827; font-size: 1.125rem; margin-bottom: 1rem;">Revenue vs Profit</h4>
              <div ref="financialChart" style="width: 100%; height: 300px;"></div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue';

const props = defineProps({
  forecastData: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: 'Financial Projection'
  },
  country: {
      type: String,
      default: 'USA'
  }
});

const inputs = reactive({
  avgSellingPrice: 0,
  avgCostOfGoods: 0,
});

const financialChart = ref(null);
let chartInstance = null;

const currency = computed(() => {
    return props.country === 'India' ? { symbol: '₹', name: 'INR' } : { symbol: '$', name: 'USD' };
});

const isInputValid = computed(() => {
    return inputs.avgSellingPrice > 0 && inputs.avgCostOfGoods >= 0 && inputs.avgCostOfGoods < inputs.avgSellingPrice;
});

const financialMetrics = computed(() => {
  if (!isInputValid.value || props.forecastData.length === 0) return [];
  return props.forecastData.map(point => {
    const salesUnits = Math.round(point.yhat_final || point.yhat || 0);
    const grossRevenue = salesUnits * inputs.avgSellingPrice;
    const costOfGoods = salesUnits * inputs.avgCostOfGoods;
    const grossProfit = grossRevenue - costOfGoods;
    return { period: point.ds, salesUnits, grossRevenue, grossProfit };
  });
});

const summaryMetrics = computed(() => {
  const totalRevenue = financialMetrics.value.reduce((sum, item) => sum + item.grossRevenue, 0);
  const totalProfit = financialMetrics.value.reduce((sum, item) => sum + item.grossProfit, 0);
  const totalUnits = financialMetrics.value.reduce((sum, item) => sum + item.salesUnits, 0);
  return { totalRevenue, totalProfit, totalUnits };
});

const updateChart = () => {
    if(!chartInstance || !isInputValid.value) return;

    chartInstance.setOption({
        tooltip: { trigger: 'axis' },
        legend: { data: ['Gross Revenue', 'Gross Profit'] },
        xAxis: { type: 'category', data: financialMetrics.value.map(d => d.period) },
        yAxis: { type: 'value', axisLabel: { formatter: `${currency.value.symbol}{value}` } },
        series: [
            { name: 'Gross Revenue', type: 'bar', data: financialMetrics.value.map(d => d.grossRevenue), color: '#0284c7' },
            { name: 'Gross Profit', type: 'bar', data: financialMetrics.value.map(d => d.grossProfit), color: '#16a34a' }
        ]
    });
};

onMounted(() => {
    nextTick(() => {
        if (financialChart.value && window.echarts) {
            chartInstance = window.echarts.init(financialChart.value);
        }
    });
});

watch([inputs, () => props.forecastData], () => {
    nextTick(updateChart);
}, { deep: true });
</script>

<style scoped>
.form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
}
</style>

