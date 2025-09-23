// File: frontend/client/src/lib/forecastUtils.js

export const fileUtils = {
    parseFile: async (file) => {
        await new Promise(res => setTimeout(res, 500));
        return {
            columns: ['OrderDate', 'Region', 'Item', 'Units', 'UnitCost', 'Total'],
            rows: Array.from({length: 10}, (_, i) => ({
                OrderDate: `2023-01-${i+1}`,
                Region: 'East',
                Item: 'Pencil',
                Units: 10 + i,
                UnitCost: 1.5,
                Total: (10 + i) * 1.5
            })),
            total_rows: 150
        };
    },
    validateFileName: (name) => /\.(csv|xlsx|xls)$/i.test(name),
    formatFileSize: (bytes) => `${(bytes / 1024).toFixed(2)} KB`,
};

export const columnDetection = {
    analyzeColumns: (rows) => {
        if (rows.length === 0) return [];
        return Object.keys(rows[0]).map(name => ({ name }));
    },
    detectDateColumn: (cols) => ({ name: 'OrderDate', confidence: 0.95 }),
    detectTargetColumn: (cols) => ({ name: 'Total', confidence: 0.88 }),
};

export function formatApiError(error) {
    return error instanceof Error ? error.message : 'An unknown error occurred.';
}
