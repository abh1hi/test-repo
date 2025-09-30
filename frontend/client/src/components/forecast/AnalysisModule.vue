<!-- File: frontend/client/src/components/forecast/AnalysisModule.vue -->
<template>
  <div style="background-color: white; border-radius: 0.5rem; padding: 2rem; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb;">
    <div style="margin-bottom: 2rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #0284c7"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
        <h3 style="color: #111827; font-size: 1.5rem; margin: 0;">{{ title }}</h3>
      </div>
      <p style="color: #6b7280; margin: 0;">
        {{ processedData.isMultiYear ? `Analysis for ${processedData.years.length} years of data` : `Analysis for single year of data` }}
      </p>
    </div>

    <div v-if="!data || data.length === 0" style="text-align: center; color: #6b7280; padding: 2rem;">
      <p>No data available for analysis</p>
    </div>

    <div v-else>
      <!-- Multi-year charts -->
      <div v-if="processedData.isMultiYear" style="display: grid; gap: 2.5rem;">
        <div>
          <h4 style="color: #111827; font-size: 1.125rem; margin-bottom: 1rem;">Sales per Year</h4>
          <div ref="yearlyBarChart" style="width: 100%; height: 300px;"></div>
        </div>
        <div v-if="selectedYear">
          <h4 style="color: #111827; font-size: 1.125rem; margin-bottom: 1rem;">Monthly Sales for {{ selectedYear }}</h4>
          <div ref="monthlyBarChart" style="width: 100%; height: 300px;"></div>
        </div>
        <div>
          <h4 style="color: #111827; font-size: 1.125rem; margin-bottom: 1rem;">Monthly Sales Trend (All Years)</h4>
          <div ref="monthlyLineChart" style="width: 100%; height: 300px;"></div>
        </div>
      </div>

      <!-- Single-year chart -->
      <div v-else>
        <div>
          <h4 style="color: #111827; font-size: 1.125rem; margin-bottom: 1rem;">Monthly Sales</h4>
          <div ref="monthlyBarChart" style="width: 100%; height: 300px;"></div>
        </div>
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

const yearlyBarChart = ref(null);
const monthlyBarChart = ref(null);
const monthlyLineChart = ref(null);

let yearlyBarChartInstance = null;
let monthlyBarChartInstance = null;
let monthlyLineChartInstance = null;

const selectedYear = ref(null);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const processedData = computed(() => {
  if (!props.data || props.data.length === 0) {
    return { isMultiYear: false, years: [], yearlyData: [], monthlyDataByYear: new Map() };
  }

  const parsedData = props.data.map(point => ({ ...point, date: new Date(point.ds) }));
  const years = [...new Set(parsedData.map(d => d.date.getFullYear()))].sort();
  const isMultiYear = years.length > 1;

  const yearlyData = years.map(year => {
      const totalSales = parsedData
          .filter(d => d.date.getFullYear() === year)
          .reduce((sum, d) => sum + (d.y || 0), 0);
      return { year: year.toString(), sales: Math.round(totalSales) };
  });

  const monthlyDataByYear = new Map();
  years.forEach(year => {
      const yearData = parsedData.filter(d => d.date.getFullYear() === year);
      const monthlyAgg = new Array(12).fill(0);
      yearData.forEach(point => {
          const month = point.date.getMonth();
          monthlyAgg[month] += (point.y || 0);
      });
      monthlyDataByYear.set(year.toString(), monthlyAgg.map(s => Math.round(s)));
  });

  return { isMultiYear, years, yearlyData, monthlyDataByYear };
});

const reinitCharts = () => {
    nextTick(() => {
        // Dispose old instances
        if (yearlyBarChartInstance) yearlyBarChartInstance.dispose();
        if (monthlyBarChartInstance) monthlyBarChartInstance.dispose();
        if (monthlyLineChartInstance) monthlyLineChartInstance.dispose();

        // Init new instances
        if (yearlyBarChart.value) yearlyBarChartInstance = window.echarts.init(yearlyBarChart.value);
        if (monthlyBarChart.value) monthlyBarChartInstance = window.echarts.init(monthlyBarChart.value);
        if (monthlyLineChart.value) monthlyLineChartInstance = window.echarts.init(monthlyLineChart.value);
        
        if (yearlyBarChartInstance) {
            yearlyBarChartInstance.on('click', (params) => {
                if (params.name) {
                    selectedYear.value = params.name;
                }
            });
        }

        updateCharts();
    });
};

watch(() => processedData.value.isMultiYear, (isMulti) => {
    if (isMulti && processedData.value.years.length > 0) {
        selectedYear.value = processedData.value.years[0].toString();
    } else {
        selectedYear.value = null;
    }
    reinitCharts();
}, { immediate: true });

const updateCharts = () => {
    if (!processedData.value) return;

    const { isMultiYear, years, yearlyData, monthlyDataByYear } = processedData.value;

    if (isMultiYear) {
        // 1. Sales per Year (Horizontal Bar)
        if (yearlyBarChartInstance) {
            yearlyBarChartInstance.setOption({
                tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
                xAxis: { type: 'value', boundaryGap: [0, 0.01] },
                yAxis: { type: 'category', data: yearlyData.map(d => d.year) },
                series: [{
                    name: 'Sales',
                    type: 'bar',
                    data: yearlyData.map(d => d.sales),
                    itemStyle: { color: '#0ea5e9' }
                }]
            });
        }

        // 2. Sales per Month (for selected year)
        if (monthlyBarChartInstance && selectedYear.value) {
            const monthlySales = monthlyDataByYear.get(selectedYear.value) || [];
            monthlyBarChartInstance.setOption({
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: MONTHS },
                yAxis: { type: 'value' },
                series: [{
                    name: 'Sales',
                    type: 'bar',
                    data: monthlySales,
                    itemStyle: { color: '#0ea5e9' }
                }]
            });
        }

        // 3. Monthly Sales Overlay (Line)
        if (monthlyLineChartInstance) {
            const series = years.map(year => ({
                name: year.toString(),
                type: 'line',
                smooth: true,
                data: monthlyDataByYear.get(year.toString()) || []
            }));
            monthlyLineChartInstance.setOption({
                tooltip: { trigger: 'axis' },
                legend: { data: years.map(y => y.toString()) },
                xAxis: { type: 'category', data: MONTHS },
                yAxis: { type: 'value' },
                series: series
            });
        }

    } else {
        // Single Year: Sales per Month (Bar)
        if (monthlyBarChartInstance && years.length > 0) {
            const year = years[0].toString();
            const monthlySales = monthlyDataByYear.get(year) || [];
            monthlyBarChartInstance.setOption({
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: MONTHS },
                yAxis: { type: 'value' },
                series: [{
                    name: 'Sales',
                    type: 'bar',
                    data: monthlySales,
                    itemStyle: { color: '#0ea5e9' }
                }]
            });
        }
    }
};

onMounted(reinitCharts);

watch(() => props.data, reinitCharts, { deep: true });
watch(selectedYear, updateCharts);

</script>