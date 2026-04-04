import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI, userAPI, planAPI, weatherAPI, saveToken, removeToken } from '../services/api';

const AppContext = createContext(null);

// Keep these for reference in case API is down (fallback)
export const HOURLY_RATE = 112.5;
export const DAILY_RATE = 900;

export function AppProvider({ children }) {
  // ─── Auth State ───────────────────────────────────────────────────────────────
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // ─── Plans State ─────────────────────────────────────────────────────────────
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(false);

  // ─── Weather/Risk State ──────────────────────────────────────────────────────
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  // ─── Claims State ────────────────────────────────────────────────────────────
  const [claims, setClaims] = useState([]);
  const [claimsLoading, setClaimsLoading] = useState(false);

  // ─── Payouts State ───────────────────────────────────────────────────────────
  const [payouts, setPayouts] = useState([]);
  const [payoutsLoading, setPayoutsLoading] = useState(false);

  // ─── AUTH FUNCTIONS ───────────────────────────────────────────────────────────

  // Called after OTP verified — saves token and loads user
  const loginWithToken = async (jwtToken, userData) => {
    await saveToken(jwtToken);
    setToken(jwtToken);
    setUser(userData);
    setIsLoggedIn(true);
  };

  // Logout — clear everything
  const logout = async () => {
    await removeToken();
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    setWeather(null);
    setClaims([]);
    setPayouts([]);
  };

  // Refresh user profile from backend
  const refreshUser = async () => {
    try {
      const res = await userAPI.getMe();
      setUser(res.data.user);
      return res.data.user;
    } catch (err) {
      console.log('refreshUser error:', err.message);
    }
  };

  // ─── DATA FETCH FUNCTIONS ─────────────────────────────────────────────────────

  const fetchPlans = useCallback(async () => {
    setPlansLoading(true);
    try {
      const res = await planAPI.getPlans();
      setPlans(res.data.plans);
    } catch (err) {
      console.log('fetchPlans error:', err.message);
    } finally {
      setPlansLoading(false);
    }
  }, []);

  const fetchWeather = useCallback(async () => {
    setWeatherLoading(true);
    try {
      const res = await weatherAPI.getWeather();
      setWeather(res.data.weather);
    } catch (err) {
      console.log('fetchWeather error:', err.message);
    } finally {
      setWeatherLoading(false);
    }
  }, []);

  // Load plans on mount (they're public)
  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  // Load weather when user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchWeather();
    }
  }, [isLoggedIn, fetchWeather]);

  // ─── COMPUTED VALUES ──────────────────────────────────────────────────────────
  const activePlan = user?.activePlan || null;
  const claimTriggered = weather ? weather.canClaim : false;

  return (
    <AppContext.Provider
      value={{
        // Auth
        token,
        user,
        isLoggedIn,
        authLoading, setAuthLoading,
        authError, setAuthError,
        loginWithToken,
        logout,
        refreshUser,

        // Plans
        plans,
        plansLoading,
        fetchPlans,
        activePlan,

        // Weather
        weather,
        weatherLoading,
        fetchWeather,
        claimTriggered,

        // Claims
        claims, setClaims,
        claimsLoading, setClaimsLoading,

        // Payouts
        payouts, setPayouts,
        payoutsLoading, setPayoutsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
