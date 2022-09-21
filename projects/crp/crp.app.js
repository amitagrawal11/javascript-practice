window.addEventListener('load', function (e) {
    const payload = {
        fcp: 0,
        lcp: 0,
        cls: 0,
        fid: 0,
        load: 0,
        DOMContentLoaded: 0,
        url: window.location.href
    };
    const fcpObserver = new PerformanceObserver(function handleFCP(entryList) {
        const entries = entryList.getEntries() || [];
        entries.forEach(function (entry) {
            if (entry.name === 'first-contentful-paint') {
                payload.fcp = entry.startTime;
                console.log('Recorded first contentful paint: ', entry.startTime);
            }
        });
    }).observe({ type: "paint", buffered: true });

    const lcpObserver = new PerformanceObserver(function handleLCP(entryList) {
        const entries = entryList.getEntries() || [];
        entries.forEach(function (entry) {
            if (entry.startTime > payload.lcp) {
                payload.lcp = entry.startTime;
                console.log('Recorded largest contentful paint', entry.startTime);
            }
        });
    }).observe({ type: "largest-contentful-paint", buffered: true });

    const clsObserver = new PerformanceObserver(function handleCLS(entryList) {
        const entries = entryList.getEntries() || [];
        entries.forEach(function (entry) {
            // checking for expanded content, or drop down events
            if (!entry.hadRecentInput) {
                payload.cls += entry.value;
                console.log('Recorded cumulative layout shift', entry.value);
            }
        });
    }).observe({ type: "layout-shift", buffered: true });

    const fidObserver = new PerformanceObserver(function handleFID(entryList) {
        const entries = entryList.getEntries() || [];
        entries.forEach(function (entry) {
            payload.fid = entry.processingStart - entry.startTime;
            console.log('Recorded first input delay', payload.fid);
        });
    }).observe({ type: "first-input", buffered: true });

    console.log(payload);
});