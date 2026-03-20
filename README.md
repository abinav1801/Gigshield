# 🚀 GigShield

### AI-Powered Parametric Insurance for Delivery Workers

GigShield is an AI-powered parametric insurance platform designed to protect gig economy delivery partners from **income loss caused by environmental disruptions** such as heavy rain, extreme heat, cyclones, and air pollution.

The platform automatically detects such events and **instantly compensates workers for lost earnings**, ensuring financial stability.

---

## 📌 Problem Statement

Gig economy workers such as Swiggy delivery partners depend heavily on **daily deliveries for income**.

External conditions like:

* Heavy rain
* Cyclones
* Air pollution
* Extreme heat

can reduce working hours or completely stop deliveries.

In cities like **Chennai**, these disruptions can lead to **significant income loss**, and currently, there is **no financial protection** available.

👉 GigShield solves this by providing **parametric insurance** that automatically compensates workers when disruptions occur.

---

## 👤 Delivery Worker Persona

**Name:** Ramkumar S
**Platform:** Swiggy
**City:** Chennai
**Vehicle:** Bike
**Experience:** 1 year

### 📊 Working Details

| Attribute       | Value   |
| --------------- | ------- |
| Daily Earnings  | ₹900    |
| Working Hours   | 8 hours |
| Hourly Earnings | ₹112.5  |

---

### 💡 Example Scenario

Heavy rain stops deliveries for **4 hours**.

```
Hourly earning = 900 / 8 = ₹112.5  
Loss for 4 hours = 4 × 112.5 = ₹450  
```

✅ GigShield automatically triggers a payout of ₹450.

---

## 🌩️ Disruptions Covered

| Disruption     | Trigger Condition      | Data Source  |
| -------------- | ---------------------- | ------------ |
| Heavy Rain     | Rainfall > 50mm        | Weather API  |
| Air Pollution  | AQI > 300              | AQI API      |
| Cyclone Alerts | Official cyclone alert | Disaster API |
| Extreme Heat   | Temperature > 40°C     | Weather API  |

### ⚙️ Example Trigger Logic

```
IF rainfall > 50mm  
AND worker location = Chennai  
THEN claim is automatically triggered  
```

---

## 💰 Weekly Insurance Model

Gig workers operate on weekly income cycles, so GigShield uses a **weekly subscription model**.

| Plan     | Weekly Premium | Coverage (Income Protection) |
| -------- | -------------- | ---------------------------- |
| Basic    | ₹15            | Up to ₹400                   |
| Standard | ₹25            | Up to ₹700                   |
| Pro      | ₹40            | Up to ₹1000                  |

### 📌 Example

```
Disruption: Cyclone alert  
Work stopped: 6 hours  
Income loss: ₹675  
Insurance payout: ₹675  
```

---

## 🤖 AI Integration

GigShield uses AI to improve accuracy, pricing, and fraud prevention.

### 1️⃣ Risk Prediction Model

Predicts disruption risk based on:

* Weather history
* Pollution levels
* Cyclone probability
* Location

**Output:**

```
Risk Score = 0.72  
Recommended Premium = ₹25/week  
```

---

### 2️⃣ Dynamic Premium Calculation

Premium adjusts based on risk:

| Risk Level | Premium |
| ---------- | ------- |
| Low        | ₹20     |
| Medium     | ₹25     |
| High       | ₹30     |

---

### 3️⃣ Fraud Detection System

Prevents fake claims using:

| Fraud Type         | Detection Method       |
| ------------------ | ---------------------- |
| Fake weather claim | Weather API validation |
| GPS spoofing       | Location verification  |
| Duplicate claims   | Worker ID validation   |

---

## 🔄 Application Workflow

```
User registers on GigShield app  
        ↓  
Selects weekly insurance plan  
        ↓  
System monitors environmental data  
        ↓  
AI detects disruption  
        ↓  
Claim automatically triggered  
        ↓  
Instant payout sent to worker  
```

---

## 🏗️ System Architecture

```
Flutter Mobile App  
        ↓  
Firebase Backend (Auth + Firestore)  
        ↓  
Python AI Services  
        ↓  
External APIs (Weather, AQI, Disaster)  
        ↓  
Payment Gateway (UPI / Razorpay sandbox)  
```

---

## 🛠️ Technology Stack

### 📱 Frontend

* Flutter

### 🔧 Backend

* Firebase Authentication
* Firestore Database
* Cloud Functions

### 🤖 AI / ML

* Python
* Scikit-learn
* Pandas

### 🌐 APIs

* Weather API
* Air Quality API
* Disaster Alert API

---

## 📱 Prototype Screens (Phase-1)

* Worker Registration
* Insurance Plan Selection
* Dashboard
* Risk Monitoring
* Claim Trigger Simulation
* Payout Confirmation

---

## 🗺️ Development Roadmap

### 🔹 Phase 1

* Research & Ideation
* UI Prototype

### 🔹 Phase 2

* Registration System
* Policy Management
* Dynamic Premium
* Automated Claims

### 🔹 Phase 3

* Advanced Fraud Detection
* Instant Payout System
* Analytics Dashboard

---

## 📂 Repository Structure

```
gigshield/
│
├── README.md  
├── prototype/  
│   ├── login_screen  
│   ├── dashboard  
│   ├── insurance_plan  
│   └── claim_simulation  
```

---

## 🎯 Key Highlights

* ✅ AI-based risk prediction
* ✅ Automatic claim triggering
* ✅ Weekly affordable pricing
* ✅ Zero paperwork insurance
* ✅ Instant payout simulation

---

## 📌 Conclusion

GigShield provides a **smart, automated safety net** for delivery workers by protecting their income against unpredictable disruptions.

It combines **AI, real-time data, and parametric insurance** to create a seamless, fast, and reliable insurance experience.
