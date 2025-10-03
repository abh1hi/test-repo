// File: frontend/client/src/components/forecast/SimpleUploadArea.vue
<template>
  <div class="card" style="padding: 2rem">
    <div v-if="props.uploadState.file && props.uploadState.preview" style="padding: 1.5rem">
       <!-- File Loaded State -->
    </div>
    <div v-else>
      <div
        style="border: 2px dashed; border-radius: 0.5rem; padding: 2rem; text-align: center; transition: all 0.2s ease;"
        :style="{ borderColor: dragActive ? '#0284c7' : '#d1d5db', backgroundColor: dragActive ? '#f0f9ff' : 'transparent' }"
        @dragenter.prevent="dragActive = true"
        @dragover.prevent="dragActive = true"
        @dragleave.prevent="dragActive = false"
        @drop.prevent="handleDrop"
      >
        <input type="file" id="file-upload" style="display: none" accept=".csv,.xlsx,.xls" @change="handleInputChange" :disabled="props.uploadState.isProcessing" />
        <div style="display: flex; flex-direction: column; align-items: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 1rem;" :style="{color: dragActive ? '#0284c7' : '#9ca3af'}"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
            <div v-if="props.uploadState.isProcessing" style="display: flex; align-items: center; gap: 0.5rem;">
                <div style="width: 1rem; height: 1rem; border: 2px solid #0284c7; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <span style="color: #6b7280;">Processing file...</span>
            </div>
            <div v-else>
                <h3 style="font-size: 1.125rem; font-weight: 500; color: #111827; margin-bottom: 0.5rem;">Upload your sales data</h3>
                <p style="color: #6b7280; margin-bottom: 1rem;">Drag and drop your CSV or Excel file here, or click to browse</p>
                <label for="file-upload" class="btn-primary" style="cursor: pointer; display: inline-block;">Choose File</label>
                <p style="font-size: 0.75rem; color: #6b7280; margin-top: 0.5rem;">Supports CSV, XLSX, and XLS files up to 10MB please download the sample file from here</p>
            </div>
        </div>
      </div>
      <div v-if="props.uploadState.error" style="margin-top: 1rem; background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 0.375rem; padding: 0.75rem;">
          <div style="display: flex; align-items: center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #dc2626; margin-right: 0.5rem;"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
              <span style="font-size: 0.875rem; color: #b91c1c;">{{ props.uploadState.error }}</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { fileUtils, columnDetection } from '../../lib/forecastUtils';

const props = defineProps({
  uploadState: Object,
});

const emit = defineEmits(['update:uploadState', 'file-processed']);

const dragActive = ref(false);

const handleFiles = async (files) => {
  if (!files || files.length === 0) return;
  const file = files[0];

  if (!fileUtils.validateFileName(file.name)) {
    emit('update:uploadState', { ...props.uploadState, error: 'Please upload a CSV, XLSX, or XLS file.' });
    return;
  }

  emit('update:uploadState', { ...props.uploadState, isProcessing: true, error: null, file });

  try {
    const preview = await fileUtils.parseFile(file);
    const columnInfo = columnDetection.analyzeColumns(preview.rows);
    const detectedDate = columnDetection.detectDateColumn(columnInfo);
    const detectedTarget = columnDetection.detectTargetColumn(columnInfo);
    const detectedColumns = { date: detectedDate, target: detectedTarget };

    emit('update:uploadState', { ...props.uploadState, preview, detectedColumns, isProcessing: false, file });
    emit('file-processed', file, preview, detectedColumns);
  } catch (error) {
    emit('update:uploadState', { ...props.uploadState, error: error.message || 'Failed to process file', isProcessing: false });
  }
};

const handleDrop = (e) => {
  dragActive.value = false;
  if (e.dataTransfer?.files) {
    handleFiles(e.dataTransfer.files);
  }
};

const handleInputChange = (e) => {
  const target = e.target;
  if (target.files) {
    handleFiles(target.files);
  }
};
</script>
