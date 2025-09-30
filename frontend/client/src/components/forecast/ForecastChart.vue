<template>
  <div>
    <div ref="chart" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';

const props = defineProps({
  history: {
    type: Array,
    required: true,
  },
  forecastBase: {
    type: Array,
    required: true,
  },
  forecastFinal: {
    type: Array,
    required: true,
  },
  aiAdjustment: {
    type: Object,
    required: true,
  }
});

const chart = ref(null);
let chartInstance = null;

const initChart = () => {
  if (chart.value && window.echarts) {
    chartInstance = window.echarts.init(chart.value);
    updateChart();
  }
};

const updateChart = () => {
  if (!chartInstance) return;

  const historyData = props.history.map(p => [p.ds, p.y]);
  const forecastBaseData = props.forecastBase.map(p => [p.ds, p.yhat]);
  
  const series = [
    {
      name: 'Historical Sales',
      type: 'line',
      data: historyData,
      itemStyle: { color: '#6b7280' },
      lineStyle: { width: 2 },
    },
    {
      name: 'Baseline Forecast',
      type: 'line',
      smooth: true,
      data: forecastBaseData,
      itemStyle: { color: '#a5b4fc' },
      lineStyle: { type: 'dashed' },
    },
  ];

  if (props.aiAdjustment.applied && props.forecastFinal.length > 0) {
    const forecastFinalData = props.forecastFinal.map(p => [p.ds, p.yhat_final]);
    series.push({
      name: 'AI-Adjusted Forecast',
      type: 'line',
      smooth: true,
      data: forecastFinalData,
      itemStyle: { color: '#3b82f6' },
      lineStyle: { width: 3 },
      areaStyle: {
        color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
          { offset: 1, color: 'rgba(59, 130, 246, 0)' }
        ])
      }
    });
  }

  chartInstance.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: series.map(s => s.name),
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}'
      }
    },
    series: series
  });
};

onMounted(() => {
  nextTick(initChart);
});

watch(() => [props.history, props.forecastBase, props.forecastFinal], () => {
  nextTick(updateChart);
}, { deep: true });

</script>