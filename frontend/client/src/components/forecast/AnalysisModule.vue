// File: frontend/client/src/components/forecast/AnalysisModule.vue
<template>
  <div style="background-color: white; border-radius: 0.5rem; padding: 2rem; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb;">
    <div style="margin-bottom: 2rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #0284c7"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
        <h3 style="color: #111827; font-size: 1.5rem; margin: 0;">{{ title }}</h3>
      </div>
      <p style="color: #6b7280; margin: 0;">
        {{ processedData.isMultiYear ? `Multi-year analysis` : `Single year analysis` }}
      </p>
    </div>

    <div v-if="!data || data.length === 0" style="text-align: center; color: #6b7280; padding: 2rem;">
      <p>No data available for analysis</p>
    </div>

    <div v-else style="display: grid; gap: 2rem;">
       <div>
          <h4 style="color: #111827; font-size: 1.125rem; margin-bottom: 1rem;">Sales Trend</h4>
          <div ref="trendChart" style="width: 100%; height: 300px;"></div>
        </div>
        <div>
          <h4 style="color: #111827; font-size: 1.125rem; margin-bottom: 1rem;">Monthly Sales</h4>
          <div ref="monthlyChart" style="width: 100%; height: 300px;"></div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: 'Sales Analysis'
  }
});

const trendChart = ref(null);
const monthlyChart = ref(null);
let trendChartInstance = null;
let monthlyChartInstance = null;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const processedData = computed(() => {
  if (!props.data || props.data.length === 0) {
    return { isMultiYear: false, yearlyData: [], monthlyData: [], trendData: [] };
  }
  
  const parsedData = props.data.map(point => ({ ...point, date: new Date(point.ds) }));
  const uniqueYears = [...new Set(parsedData.map(d => d.date.getFullYear()))];
  const isMultiYear = uniqueYears.length > 1;

  if (isMultiYear) {
    const yearlyAgg = parsedData.reduce((acc, point) => {
      const year = point.date.getFullYear().toString();
      acc[year] = (acc[year] || 0) + point.y;
      return acc;
    }, {});
    const yearlyData = Object.entries(yearlyAgg).map(([year, sales]) => ({ year, sales: Math.round(sales) }));
    
    return {
        isMultiYear: true,
        yearlyData,
        monthlyData: [], // Simplified for client view
        trendData: yearlyData.map(item => ({ period: item.year, sales: item.sales }))
    };
  } else {
    const monthlyAgg = parsedData.reduce((acc, point) => {
      const month = point.date.getMonth();
      acc[month] = (acc[month] || 0) + point.y;
      return acc;
    }, {});
    const monthlyData = MONTHS.map((month, idx) => ({ month, sales: Math.round(monthlyAgg[idx] || 0) }));

    return {
        isMultiYear: false,
        yearlyData: [],
        monthlyData,
        trendData: monthlyData.map(item => ({ period: item.month, sales: item.sales }))
    };
  }
});

const initCharts = () => {
    if (trendChart.value && monthlyChart.value && window.echarts) {
        trendChartInstance = window.echarts.init(trendChart.value);
        monthlyChartInstance = window.echarts.init(monthlyChart.value);
        updateCharts();
    }
};

const updateCharts = () => {
    if (!trendChartInstance || !monthlyChartInstance) return;

    trendChartInstance.setOption({
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: processedData.value.trendData.map(d => d.period) },
        yAxis: { type: 'value' },
        series: [{
            data: processedData.value.trendData.map(d => d.sales),
            type: 'line',
            smooth: true,
            color: '#0284c7'
        }]
    });
    
    if (processedData.value.monthlyData.length > 0) {
        monthlyChartInstance.setOption({
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', data: processedData.value.monthlyData.map(d => d.month) },
            yAxis: { type: 'value' },
            series: [{
                data: processedData.value.monthlyData.map(d => d.sales),
                type: 'bar',
                color: '#0ea5e9'
            }]
        });
    }
};

onMounted(() => {
    nextTick(initCharts);
});

watch(() => props.data, () => {
    nextTick(updateCharts);
}, { deep: true });
</script>

