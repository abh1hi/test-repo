<!-- File: frontend/client/src/components/forecast/FinancialProjection.vue -->
<template>
  <div v-if="!forecastData || forecastData.length === 0" style="background-color: white; border-radius: 0.5rem; padding: 2rem; text-align: center; color: #6b7280;">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 1rem auto;"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
    <p>No forecast data available for financial projection</p>
  </div>

  <div v-else style="background-color: white; border-radius: 0.5rem; padding: 2rem; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb;">
    <!-- Header -->
    <div style="margin-bottom: 2rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #0284c7"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
        <h3 style="color: #111827; font-size: 1.5rem; margin: 0;">{{ title }}</h3>
      </div>
      <p style="color: #6b7280; margin: 0;">Calculate revenue and profitability based on forecast units</p>
    </div>

    <!-- Input Form -->
    <div style="background-color: #f9fafb; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 2rem; border: 1px solid #e5e7eb;">
      <h4 style="color: #111827; font-size: 1.125rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="18" /><line x1="8" x2="8" y1="10" y2="18" /><line x1="8" x2="16" y1="10" y2="10" /></svg>
        Financial Parameters
      </h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div>
          <label class="form-label">Average Selling Price per Unit ({{ currency.symbol }})</label>
          <input
            type="number"
            :value="inputs.avgSellingPrice"
            @input="handleInputChange('avgSellingPrice', $event.target.value)"
            placeholder="e.g., 50.00"
            min="0"
            step="0.01"
            class="input-field"
            :style="{ borderColor: errors.avgSellingPrice !== undefined ? '#dc2626' : '#d1d5db' }"
          />
          <p v-if="errors.avgSellingPrice !== undefined" class="error-text">Please enter a valid selling price greater than {{ currency.symbol }}0</p>
        </div>
        <div>
          <label class="form-label">Average Cost of Goods per Unit ({{ currency.symbol }})</label>
          <input
            type="number"
            :value="inputs.avgCostOfGoods"
            @input="handleInputChange('avgCostOfGoods', $event.target.value)"
            placeholder="e.g., 30.00"
            min="0"
            step="0.01"
            class="input-field"
            :style="{ borderColor: errors.avgCostOfGoods !== undefined ? '#dc2626' : '#d1d5db' }"
          />
          <p v-if="errors.avgCostOfGoods !== undefined" class="error-text">Cost must be less than selling price and ≥ {{ currency.symbol }}0</p>
        </div>
      </div>
      <div v-if="isInputValid" style="margin-top: 1rem; padding: 0.75rem; background-color: #dcfce7; border-radius: 0.375rem; border: 1px solid #bbf7d0;">
        <p style="font-size: 0.875rem; color: #16a34a; margin: 0;">
          <strong>Gross Margin:</strong> {{ ((inputs.avgSellingPrice - inputs.avgCostOfGoods) / inputs.avgSellingPrice * 100).toFixed(2) }}%
          ({{ currency.symbol }}{{ (inputs.avgSellingPrice - inputs.avgCostOfGoods).toFixed(2) }} profit per unit)
        </p>
      </div>
    </div>

    <!-- Results -->
    <div v-if="financialMetrics.length > 0">
      <!-- Summary Cards -->
      <div v-if="isInputValid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        <div class="summary-card" style="background-color: #eff6ff; border-color: #bfdbfe;">
          <h4 class="summary-title" style="color: #1e40af;">Total Revenue</h4>
          <p class="summary-value" style="color: #1e40af;">{{ currency.symbol }}{{ summaryMetrics.totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 }) }}</p>
        </div>
        <div class="summary-card" style="background-color: #f0fdf4; border-color: #bbf7d0;">
          <h4 class="summary-title" style="color: #15803d;">Total Gross Profit</h4>
          <p class="summary-value" style="color: #15803d;">{{ currency.symbol }}{{ summaryMetrics.totalProfit.toLocaleString(undefined, { maximumFractionDigits: 0 }) }}</p>
        </div>
        <div class="summary-card" style="background-color: #fefce8; border-color: #fde047;">
          <h4 class="summary-title" style="color: #a16207;">Total Units</h4>
          <p class="summary-value" style="color: #a16207;">{{ summaryMetrics.totalUnits.toLocaleString() }}</p>
        </div>
        <div class="summary-card" style="background-color: #f5f3ff; border-color: #c4b5fd;">
          <h4 class="summary-title" style="color: #7c3aed;">Average Margin</h4>
          <p class="summary-value" style="color: #7c3aed;">{{ summaryMetrics.avgMargin.toFixed(1) }}%</p>
        </div>
      </div>

      <!-- Charts -->
      <div style="display: grid; gap: 2rem; margin-bottom: 2rem;">
        <div>
          <h4 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
            Revenue vs Profit by Period
          </h4>
          <div ref="financialChart" style="width: 100%; height: 400px;"></div>
        </div>

        <!-- Data Table Preview -->
        <div v-if="isInputValid">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h4 class="section-title" style="margin: 0;">Projection Preview</h4>
            <button @click="downloadFinancialProjection" class="download-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
              Export CSV
            </button>
          </div>
          <div style="background-color: #f9fafb; border-radius: 0.5rem; padding: 1rem; max-height: 250px; overflow-y: auto;">
            <table style="width: 100%; font-size: 0.75rem;">
              <thead>
                <tr style="background-color: #f3f4f6;">
                  <th class="table-header">Period</th>
                  <th class="table-header" style="text-align: right;">Units</th>
                  <th class="table-header" style="text-align: right;">Revenue</th>
                  <th class="table-header" style="text-align: right;">Profit</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in financialMetrics.slice(0, 8)" :key="idx" :style="{ backgroundColor: idx % 2 === 0 ? 'white' : '#f9fafb' }">
                  <td class="table-cell">{{ item.period }}</td>
                  <td class="table-cell" style="text-align: right;">{{ item.salesUnits.toLocaleString() }}</td>
                  <td class="table-cell" style="text-align: right;">{{ currency.symbol }}{{ item.grossRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 }) }}</td>
                  <td class="table-cell" style="text-align: right; color: #16a34a; font-weight: 500;">{{ currency.symbol }}{{ item.grossProfit.toLocaleString(undefined, { maximumFractionDigits: 0 }) }}</td>
                </tr>
              </tbody>
            </table>
            <p v-if="financialMetrics.length > 8" style="font-size: 0.75rem; color: #6b7280; text-align: center; margin: 0.5rem 0 0 0;">
              Showing first 8 of {{ financialMetrics.length }} periods
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue';

const props = defineProps({
  forecastData: { type: Array, default: () => [] },
  title: { type: String, default: 'Financial Projection' },
  country: { type: String, default: 'USA' }
});

const inputs = reactive({
  avgSellingPrice: null,
  avgCostOfGoods: null
});

const errors = reactive({
  avgSellingPrice: undefined,
  avgCostOfGoods: undefined
});

const financialChart = ref(null);
let chartInstance = null;

const currency = computed(() => {
  const currencySymbol = props.country === 'India' ? '₹' : '$';
  const currencyName = props.country === 'India' ? 'INR' : 'USD';
  return { symbol: currencySymbol, name: currencyName };
});

const validateInputs = (newInputs) => {
  const newErrors = {};
  if (!newInputs.avgSellingPrice || newInputs.avgSellingPrice <= 0) {
    newErrors.avgSellingPrice = true;
  } else {
    newErrors.avgSellingPrice = undefined;
  }

  if (newInputs.avgCostOfGoods < 0) {
    newErrors.avgCostOfGoods = true;
  } else if (newInputs.avgCostOfGoods >= newInputs.avgSellingPrice) {
    newErrors.avgCostOfGoods = true;
  } else {
     newErrors.avgCostOfGoods = undefined;
  }
  
  Object.assign(errors, newErrors);
};

const handleInputChange = (field, value) => {
  const numValue = parseFloat(value);
  inputs[field] = isNaN(numValue) ? null : numValue;
  validateInputs(inputs);
};

const isInputValid = computed(() => {
  return inputs.avgSellingPrice > 0 && inputs.avgCostOfGoods >= 0 && inputs.avgCostOfGoods < inputs.avgSellingPrice;
});

const financialMetrics = computed(() => {
  if (!isInputValid.value || !props.forecastData || props.forecastData.length === 0) {
    return [];
  }
  return props.forecastData.map(point => {
    const salesUnits = Math.round(point.yhat_final || point.yhat || 0);
    const grossRevenue = salesUnits * inputs.avgSellingPrice;
    const costOfGoods = salesUnits * inputs.avgCostOfGoods;
    const grossProfit = grossRevenue - costOfGoods;
    const grossMargin = grossRevenue > 0 ? (grossProfit / grossRevenue) * 100 : 0;
    return {
      period: new Date(point.ds).toLocaleDateString(),
      salesUnits,
      grossRevenue,
      costOfGoods,
      grossProfit,
      grossMargin
    };
  });
});

const summaryMetrics = computed(() => {
  if (financialMetrics.value.length === 0) {
    return { totalRevenue: 0, totalProfit: 0, totalUnits: 0, avgMargin: 0 };
  }
  const totalRevenue = financialMetrics.value.reduce((sum, item) => sum + item.grossRevenue, 0);
  const totalProfit = financialMetrics.value.reduce((sum, item) => sum + item.grossProfit, 0);
  const totalUnits = financialMetrics.value.reduce((sum, item) => sum + item.salesUnits, 0);
  const avgMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  return { totalRevenue, totalProfit, totalUnits, avgMargin };
});

const downloadFinancialProjection = () => {
  if (financialMetrics.value.length === 0) return;

  const exportData = financialMetrics.value.map(item => ({
    'Period': item.period,
    'Sales Units': item.salesUnits,
    'Gross Revenue': item.grossRevenue.toFixed(2),
    'Cost of Goods Sold': item.costOfGoods.toFixed(2),
    'Gross Profit': item.grossProfit.toFixed(2),
    'Gross Margin %': item.grossMargin.toFixed(2)
  }));

  exportData.push({
    'Period': 'TOTAL',
    'Sales Units': summaryMetrics.value.totalUnits,
    'Gross Revenue': summaryMetrics.value.totalRevenue.toFixed(2),
    'Cost of Goods Sold': (summaryMetrics.value.totalRevenue - summaryMetrics.value.totalProfit).toFixed(2),
    'Gross Profit': summaryMetrics.value.totalProfit.toFixed(2),
    'Gross Margin %': summaryMetrics.value.avgMargin.toFixed(2)
  });

  const headers = Object.keys(exportData[0]);
  const csvContent = [
    headers.join(','),
    ...exportData.map(row => Object.values(row).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `financial_projection_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const updateChart = () => {
  if (!chartInstance) return;

  const metrics = financialMetrics.value;
  const showData = isInputValid.value && metrics.length > 0;

  chartInstance.setOption({
    tooltip: { 
      trigger: 'axis',
      formatter: (params) => {
        if (!params || params.length === 0) return '';
        let tooltip = `${params[0].axisValue}<br/>`;
        params.forEach(param => {
          tooltip += `${param.marker} ${param.seriesName}: ${currency.value.symbol}${(param.value || 0).toLocaleString(undefined, {maximumFractionDigits: 0})}<br/>`;
        });
        return tooltip;
      }
    },
    legend: { data: ['Gross Revenue', 'Gross Profit'], bottom: 0 },
    grid: { top: '10%', left: '3%', right: '4%', bottom: '10%', containLabel: true },
    xAxis: { 
      type: 'category', 
      data: showData ? metrics.map(d => d.period) : [] 
    },
    yAxis: { 
      type: 'value', 
      axisLabel: { 
        formatter: (value) => `${currency.value.symbol}${(value / 1000).toFixed(0)}K`
      } 
    },
    series: [
      { 
        name: 'Gross Revenue', 
        type: 'bar', 
        data: showData ? metrics.map(d => d.grossRevenue) : [], 
        itemStyle: { color: '#0284c7', borderRadius: [4, 4, 0, 0] } 
      },
      { 
        name: 'Gross Profit', 
        type: 'bar', 
        data: showData ? metrics.map(d => d.grossProfit) : [], 
        itemStyle: { color: '#16a34a', borderRadius: [4, 4, 0, 0] } 
      }
    ]
  }, true);
};

onMounted(() => {
  nextTick(() => {
    if (financialChart.value && window.echarts) {
      chartInstance = window.echarts.init(financialChart.value);
      updateChart();
    }
  });
});

watch(inputs, () => {
  nextTick(updateChart);
});

watch(financialMetrics, () => {
  nextTick(updateChart);
});

watch(() => props.forecastData, () => {
  nextTick(updateChart);
});
</script>

<style scoped>
.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}
.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}
.error-text {
  font-size: 0.75rem;
  color: #dc2626;
  margin: 0.25rem 0 0 0;
}
.summary-card {
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid;
}
.summary-title {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
.summary-value {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}
.section-title {
  color: #111827;
  font-size: 1.125rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.download-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #0284c7;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
}
.table-header {
  padding: 0.5rem;
  text-align: left;
  font-weight: 500;
  color: #374151;
}
.table-cell {
  padding: 0.5rem;
  color: #6b7280;
}
</style>