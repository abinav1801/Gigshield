import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// ─── BASE URL ──────────────────────────────────────────────────────────────────
// Option A: Paste your ngrok URL here when testing on a physical device
//           Run: ngrok http 5000  → copy the https://xxxx.ngrok-free.app URL
const NGROK_URL = 'https://fine-feet-smoke.loca.lt/api'; // localtunnel

// Option B: Local WiFi IP (only works if firewall allows port 5000)
const LOCAL_IP = '10.20.132.115'; // ← your machine's WiFi IP
const PORT = '5000';

export const BASE_URL =
  NGROK_URL
    ? NGROK_URL                                   // ← ngrok tunnel (best for physical device)
    : Platform.OS === 'android' && __DEV__
      ? `http://10.0.2.2:${PORT}/api`             // Android emulator
      : `http://${LOCAL_IP}:${PORT}/api`;          // Physical device via local IP

// ─── AXIOS INSTANCE ─────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request automatically
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('gigshield_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── TOKEN HELPERS ───────────────────────────────────────────────────────────────
export const saveToken = async (token) => {
  await AsyncStorage.setItem('gigshield_token', token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem('gigshield_token');
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('gigshield_token');
};

// ─── AUTH APIS ───────────────────────────────────────────────────────────────────
export const authAPI = {
  // Register new user → sends OTP
  signup: (name, phone, platform) =>
    api.post('/auth/signup', { name, phone, platform }),

  // Login existing user → sends OTP
  sendOtp: (phone) =>
    api.post('/auth/send-otp', { phone }),

  // Verify OTP → returns { token, user }
  verifyOtp: (phone, otp) =>
    api.post('/auth/verify-otp', { phone, otp }),
};

// ─── USER APIS ───────────────────────────────────────────────────────────────────
export const userAPI = {
  // Get logged-in user profile
  getMe: () => api.get('/users/me'),

  // Update name or platform
  updateMe: (data) => api.put('/users/me', data),

  // Update weekly earnings
  updateEarnings: (amount) => api.put('/users/me/earnings', { amount }),
};

// ─── PLAN APIS ───────────────────────────────────────────────────────────────────
export const planAPI = {
  // Get all plans
  getPlans: () => api.get('/plans'),

  // Get single plan
  getPlan: (planId) => api.get(`/plans/${planId}`),

  // Subscribe to a plan
  subscribe: (planId) => api.post(`/plans/subscribe/${planId}`),
};

// ─── CLAIM APIS ──────────────────────────────────────────────────────────────────
export const claimAPI = {
  // Get all claims for current user
  getClaims: () => api.get('/claims'),

  // Get single claim
  getClaim: (claimId) => api.get(`/claims/${claimId}`),

  // Trigger new claim
  triggerClaim: (triggerType, triggerValue, hoursLost, zone) =>
    api.post('/claims/trigger', { triggerType, triggerValue, hoursLost, zone }),
};

// ─── WEATHER APIS ────────────────────────────────────────────────────────────────
export const weatherAPI = {
  // Get current weather + risk data
  getWeather: () => api.get('/weather'),
};

// ─── PAYOUT APIS ─────────────────────────────────────────────────────────────────
export const payoutAPI = {
  // Get all payouts for current user
  getPayouts: () => api.get('/payouts'),
};

export default api;
