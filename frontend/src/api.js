// Central API base URL — set REACT_APP_API_URL at build time via .env or Docker
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default API_BASE;
