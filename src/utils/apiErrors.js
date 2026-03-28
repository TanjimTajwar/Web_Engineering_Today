/** Message when axios gets no HTTP response (backend down, wrong API URL, CORS, etc.) */
export function getNetworkErrorHint() {
  if (process.env.NODE_ENV === 'production') {
    return 'Cannot reach the API. In Netlify, set REACT_APP_BACKEND_URL (Railway host) or REACT_APP_API_URL (full https://…/api), then redeploy. In Railway, set CORS_ORIGIN to your Netlify URL (https, no trailing slash).';
  }
  return 'Cannot reach the server. From the project root run npm start, or run npm run start:backend in a separate terminal.';
}

export function isLikelyNetworkError(err) {
  return (
    err?.code === 'ERR_NETWORK' ||
    err?.message === 'Network Error' ||
    !err?.response
  );
}
