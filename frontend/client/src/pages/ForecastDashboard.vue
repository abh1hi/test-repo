// File: frontend/client/src/pages/ForecastDashboard.vue
<template>
  <div>
    <Navbar />
    <div style="min-height: 90vh; background-color: #f9fafb">
        <!-- Header -->
        <div style="background-color: white; border-bottom: 1px solid #e5e7eb; padding: 1.5rem 0;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem; display: flex; align-items: center; gap: 0.75rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #0284c7">
              <path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
            </svg>
            <div>
              <h1 style="font-size: 1.5rem; font-weight: bold; color: #111827; margin: 0;">
                AI Sales Forecasting
              </h1>
              <p style="color: #6b7280; margin: 0.25rem 0 0 0; font-size: 0.875rem;">
                Upload data → Configure → Generate forecast with AI adjustment
              </p>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div style="max-width: 1200px; margin: 0 auto; padding: 2rem 1rem">
          <SimpleUploadArea 
            v-if="currentStep === 'upload'" 
            :upload-state="uploadState" 
            @update:upload-state="Object.assign(uploadState, $event)" 
            @file-processed="handleFileProcessed" 
          />

          <div v-if="currentStep === 'configure' && uploadState.preview">
            <ConfigForm 
              :preview="uploadState.preview" 
              :detected-columns="uploadState.detectedColumns"
              :is-loading="isGeneratingForecast" 
              @submit="handleConfigSubmit" 
            />

            <div v-if="forecastError" style="margin-top: 1rem; background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 0.375rem; padding: 0.75rem;">
              <div style="display: flex; align-items: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #dc2626; margin-right: 0.5rem;">
                  <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
                </svg>
                <span style="font-size: 0.875rem; color: #b91c1c;">
                  {{ forecastError }}
                </span>
              </div>
            </div>
          </div>

          <ResultsPanel 
            v-if="currentStep === 'results' && forecastResult && configData" 
            :data="forecastResult" 
            :config="configData" 
            @reset="resetApp"
          />
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Navbar from '../components/Navbar.vue';
import SimpleUploadArea from '../components/forecast/SimpleUploadArea.vue';
import ConfigForm from '../components/forecast/ConfigForm.vue';
import ResultsPanel from '../components/forecast/ResultsPanel.vue';
import { generateForecast } from '../services/forecastService';
import { formatApiError } from '../lib/forecastUtils';

const currentStep = ref('upload');

const uploadState = reactive({
  file: null,
  preview: null,
  detectedColumns: { date: null, target: null },
  isProcessing: false,
  error: null,
});

const isGeneratingForecast = ref(false);
const forecastResult = ref(null);
const forecastError = ref(null);
const configData = ref(null);

const resetApp = () => {
  currentStep.value = 'upload';
  Object.assign(uploadState, {
    file: null,
    preview: null,
    detectedColumns: { date: null, target: null },
    isProcessing: false,
    error: null,
  });
  forecastResult.value = null;
  forecastError.value = null;
  isGeneratingForecast.value = false;
  configData.value = null;
};

const handleFileProcessed = (file, preview, detectedColumns) => {
  uploadState.file = file;
  uploadState.preview = preview;
  uploadState.detectedColumns = detectedColumns;
  currentStep.value = 'configure';
};

const handleConfigSubmit = async (formData) => {
  if (!uploadState.file) return;

  configData.value = formData;
  isGeneratingForecast.value = true;
  forecastError.value = null;

  try {
    const result = await generateForecast({
      file: uploadState.file,
      ...formData
    });
    forecastResult.value = result;
    currentStep.value = 'results';
  } catch (error) {
    console.error('Forecast generation failed:', error);
    forecastError.value = formatApiError(error);
  } finally {
    isGeneratingForecast.value = false;
  }
};
</script>

<style>
/* Add any additional global styles if needed */
.card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
}
.btn-primary {
  padding: 0.75rem 1.25rem;
  background-color: #0284c7;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}
.btn-primary:hover {
  background-color: #0369a1;
}
.btn-secondary {
    padding: 0.5rem 1rem;
    background-color: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
}
.btn-secondary:hover {
    background-color: #e5e7eb;
}
.input-field {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    box-sizing: border-box;
}
.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
