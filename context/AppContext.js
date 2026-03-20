import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const HOURLY_RATE = 112.5;
export const DAILY_RATE = 900;

export const mockUser = {
  name: 'Ramkumar S',
  phone: '+91 98765 43210',
  platform: 'Swiggy Delivery Partner',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnufu2MPy_5g6NIDt8boFei__4A02fc5AbDOWGvjxRtmy91fYo53OhbLW2xEIoS6jPntYgvHvHTC6mrTVwbA77t7Lp0gGbCUHd6Ax-nG0_hLohReLY8NFi95w68aOwxqb-nHgeVOS-vTcXKDteP3FT7w26-a-u8cxO4PDoXKd9m7g4y5P3rSlL38fabbuHT-4A1NHbAJvrUjw3698WffnzlcD9WjdAJCHoWEEr2nS1DFhOo7UpuV5iE_nlvdbje5MJc5gFCjiGqPyD',
};

export const mockPlan = {
  name: 'Standard Plan',
  price: '₹25/week',
  coverage: '₹900/day',
  status: 'Active',
};

export const mockWeather = {
  rainfall: 65, // > 50 triggers claim
  aqi: 85,
  temp: 34,
  cycloneAlert: false,
  riskLevel: 'Medium Risk',
  riskScore: 62,
  location: 'Chennai (Central Zone)',
};

export const mockClaim = {
  workInterruption: '4 hours',
  estimatedLoss: '₹450',
  zone: 'Chennai Sector 4, High Risk',
  reason: 'Income loss due to Heavy Rain',
  duration: '4 hours (2 PM - 6 PM)',
  transactionId: '#GS82931',
};

export const mockEarnings = {
  thisWeek: '₹4,250',
  trend: '+12% from last week',
};

export function AppProvider({ children }) {
  const [selectedPlan, setSelectedPlan] = useState(mockPlan);
  
  const claimTriggered = mockWeather.rainfall > 50;

  return (
    <AppContext.Provider value={{ 
      selectedPlan, setSelectedPlan, 
      claimTriggered
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
