/**
 * Runs on prebuild. Writes public/_redirects so Netlify proxies /api/* → Railway.
 * Set REACT_APP_API_URL or RAILWAY_API_URL in Netlify (same value is fine), e.g.
 * https://your-service.up.railway.app/api
 */
const fs = require('fs');
const path = require('path');

const apiBase = (
    process.env.REACT_APP_API_URL ||
    process.env.RAILWAY_API_URL ||
    ''
)
    .trim()
    .replace(/\/$/, '');

const outPath = path.join(__dirname, '..', 'public', '_redirects');
const rules = [];

if (apiBase) {
    rules.push(`/api/*  ${apiBase}/:splat  200`);
} else {
    console.warn(
        '[netlify-redirects] REACT_APP_API_URL or RAILWAY_API_URL is not set. ' +
            'Production /api will not be proxied. Add in Netlify → Site configuration → Environment variables.'
    );
}

rules.push('/*  /index.html  200');
fs.writeFileSync(outPath, rules.join('\n') + '\n');
