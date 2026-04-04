// @desc    Get simulated real-time weather/risk data for Chennai
// @route   GET /api/weather
// @access  Private

const getWeather = async (req, res, next) => {
  try {
    // Simulate realistic Chennai weather with slight random variation
    const baseRainfall = 65;
    const rainfall = Math.round(baseRainfall + (Math.random() - 0.5) * 20);
    const temp = Math.round(34 + (Math.random() - 0.5) * 6);
    const aqi = Math.round(85 + (Math.random() - 0.5) * 30);
    const humidity = Math.round(75 + (Math.random() - 0.5) * 20);

    // Risk scoring logic
    let riskScore = 0;
    let riskLevel = 'Low Risk';
    const alerts = [];

    if (rainfall > 50) {
      riskScore += 40;
      alerts.push({
        type: 'rain',
        icon: 'water-drop',
        title: 'Heavy Rain Alert',
        description: `Rainfall at ${rainfall}mm exceeds 50mm threshold`,
        severity: rainfall > 80 ? 'HIGH' : 'MEDIUM',
        triggerValue: rainfall,
      });
    }

    if (temp > 42) {
      riskScore += 30;
      alerts.push({
        type: 'heat',
        icon: 'thermostat',
        title: 'Extreme Heat Alert',
        description: `Temperature at ${temp}°C exceeds 42°C threshold`,
        severity: temp > 46 ? 'HIGH' : 'MEDIUM',
        triggerValue: temp,
      });
    }

    if (aqi > 200) {
      riskScore += 25;
      alerts.push({
        type: 'aqi',
        icon: 'air',
        title: 'Air Pollution Alert',
        description: `AQI at ${aqi} is in the 'Very Unhealthy' range`,
        severity: aqi > 300 ? 'HIGH' : 'MEDIUM',
        triggerValue: aqi,
      });
    }

    const cycloneAlert = Math.random() < 0.05; // 5% chance
    if (cycloneAlert) {
      riskScore += 50;
      alerts.push({
        type: 'cyclone',
        icon: 'storm',
        title: 'Cyclone Warning',
        description: 'Cyclone warning issued for coastal zones',
        severity: 'HIGH',
        triggerValue: 1,
      });
    }

    riskScore = Math.min(riskScore, 100);
    if (riskScore >= 70) riskLevel = 'High Risk';
    else if (riskScore >= 40) riskLevel = 'Medium Risk';
    else riskLevel = 'Low Risk';

    res.json({
      success: true,
      weather: {
        rainfall,
        temp,
        aqi,
        humidity,
        cycloneAlert,
        riskScore,
        riskLevel,
        location: 'Chennai (Central Zone)',
        alerts,
        canClaim: rainfall > 50 || temp > 42 || aqi > 200 || cycloneAlert,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getWeather };
