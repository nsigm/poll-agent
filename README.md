# PollAgent SaaS Prototype 

A polling and feedback progressive web application built with React, Redux and Firebase bootstrapped by Create React App. Based on customizable key performance indicators, suitable for digital startups and small to medium sized enterprises that like to experiment with feedback and communication systems. 

- KPIs which could be useful are: `Atmosphere`, `Capacity`, `Company Culture`, `Environment`, `Personal Development`, `Responsibility`, `Work Content`. 
- Users or admins can add questions for each KPI to frequently evaluate the standing of their company, a certain team or just any employee.
- Ideally this MVP prototype can ensure happyness and well-being at work, enable room for internal feedback interactions, create insights for strategic HR management to create new incentives for employees and align personal goals with business goals.

## Overview

- [Functionalities](#functionalities)
  - [SaaS like Landing Page, Registration and Login](#saas-like-landing-page,-registration-and-login)
  - [Evaluation of KPIs through polling](#evaluation-of-kpis-through-polling)
  - [Customization of KPIs, polls and boost cycles](#customization-of-kpis,-polls-and-boost-cycles)
  - [Boosts as interactive feedback](#boosts-as-interactive-feedback)
  - [Visualization of KPIs](#boosts-as-interactive-feedback)
- [How to run](#how-to-run)
  - [Setup Firebase Project and Configure `.env`](#setup-firebase-project-and-configure-.env)
  - [Install Project Dependencies](#install-project-dependencies)
  - [Initialize Firebase Cloud Functions](#initialize-firebase-cloud-functions)
  - [Run the Code](#run-the-code)

## Functionalities
### SaaS like Landing Page, Registration and Login
![Landing Page](https://github.com/nsigm/pollAgent/blob/master/src/res/LandingPage.gif)
### Evaluation of KPIs through polling
![Evaluation](https://github.com/nsigm/pollAgent/blob/master/src/res/Evaluation.gif)
### Customization of KPIs, polls and boost cycles
![KPI Setup](https://github.com/nsigm/pollAgent/blob/master/src/res/KPISetup.gif)
### Boosts as interactive feedback
![Boosts](https://github.com/nsigm/pollAgent/blob/master/src/res/Boosts.gif)
### Visualization of KPIs
![Analysis](https://github.com/nsigm/pollAgent/blob/master/src/res/Analysis.gif)
![Output](https://github.com/nsigm/pollAgent/blob/master/src/res/Output.gif)

## How to Run

### Setup Firebase Project and Configure `.env`
- Create a new Firebase project using an account subscribed to a Blaze billing plan to be able to configure and use the cloud functions.
- For enabling access to your Firebase project open the [.env file](https://github.com/nsigm/pollAgent/blob/master/.env) and insert your project credentials into the correlating environment variables.

`Example .env`

```
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT_ID.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://YOUR_PROJECT_ID.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT_ID.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_PROJECT_NUMBER
```

### Install Project Dependencies
Run `npm install` inside the [main directory](https://github.com/nsigm/pollAgent/) and inside the [functions directory](https://github.com/nsigm/pollAgent/tree/master/functions) to install dependencies needed for running the cloud functions.

### Initialize Firebase Functions
- If you don't have [firebase-tools](https://www.npmjs.com/package/firebase-tools) installed go ahead and run `npm install -g firebase-tools`. 
- Navigate to the [functions directory](https://github.com/nsigm/pollAgent/tree/master/functions) and initialize a new Firebase project instance for the cloud functions with `firebase init functions` and follow the initialization steps. 
- Deploy the cloud functions with `firebase deploy --only functions` to initialize them in your Firebase project.

### Run the Code
For running the code execute the script `npm run start`.