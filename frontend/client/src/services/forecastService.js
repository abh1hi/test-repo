// File: frontend/client/src/services/forecastService.js

export async function getCountries() {
    await new Promise(res => setTimeout(res, 500));
    return [{ value: 'USA', label: 'United States' }, { value: 'India', label: 'India' }];
}

export async function getSubdivisions(country) {
    await new Promise(res => setTimeout(res, 500));
    if (country === 'USA') return [{ value: 'CA', label: 'California' }, { value: 'NY', label: 'New York' }];
    if (country === 'India') return [{ value: 'MH', label: 'Maharashtra' }, { value: 'DL', label: 'Delhi' }];
    return [];
}

export async function generateForecast(params) {
    console.log("Generating forecast with:", params);
    await new Promise(res => setTimeout(res, 2000));
    if (params.industry === 'other') {
       throw new Error("Industry 'other' is not supported in this mock.");
    }
    const history = Array.from({ length: 50 }, (_, i) => ({ ds: `2023-${String(Math.floor(i/4)+1).padStart(2, '0')}-${String((i%4)*7+1).padStart(2,'0')}`, y: 1000 + i * 10 + Math.random() * 100 }));
    const forecast_base = Array.from({ length: params.horizon }, (_, i) => {
       const yhat = 1500 + i * 10 + Math.random() * 50;
       return { ds: `2024-${String(Math.floor(i/4)+1).padStart(2, '0')}-${String((i%4)*7+1).padStart(2,'0')}`, yhat, yhat_lower: yhat * 0.9, yhat_upper: yhat * 1.1 };
    });
    const forecast_final = forecast_base.map(p => ({ ds: p.ds, yhat_final: p.yhat * (params.apply_ai_adjustment ? 1.15 : 1) }));
    
    return {
      meta: { freq: params.freq, train_start: "2023-01-01", train_end: "2023-12-31", horizon: params.horizon, holidays_used: params.apply_holidays ? ['Christmas'] : [], original_rows: 250, processed_rows: 248, null_dates: 1, null_targets: 1 },
      ai_adjustment: params.apply_ai_adjustment ? { applied: true, adjustment_pct: 15.0, rationale: "Economic indicators suggest strong consumer spending.", sources: ["https://example.com/report"] } : { applied: false },
      history, forecast_base, forecast_final,
    };
}
