# Asteroid - Neo Stats App

## Description

The Asteroid - Neo Stats App is a React-based web application that utilizes NASA's Near Earth Object Web Service (NeoWs) API to display information about asteroids passing near Earth within a specified date range.

## Features

- Date range selection for asteroid data retrieval
- Display of asteroid statistics including:
  - Total number of asteroids
  - Number of potentially hazardous asteroids
  - Fastest asteroid (ID and speed)
  - Closest asteroid (ID and distance)
  - Average size of asteroids
- Bar chart visualization of asteroids per day

## Technologies Used

- React
- Vite
- Chart.js
- Tailwind CSS
- NASA NeoWs API

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the project root and add your NASA API key:
   ```
   VITE_NASA_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## Usage

1. Select a start date and end date using the date pickers.
2. Click "Fetch Asteroid Data" to retrieve information for the selected date range.
3. View the asteroid statistics and chart displayed on the page.

## App Workflow of Creation

1. Project Setup:

   - Initialize a new Vite project with React
   - Install necessary dependencies (Chart.js, Tailwind CSS, etc.)
   - Set up ESLint and Prettier for code formatting

2. Component Creation:

   - Create the main App component (App.jsx)
   - Develop the DateRangeForm component for date selection
   - Implement the LoadingSpinner component for API request feedback
   - Build the AsteroidInfoStats component to display asteroid statistics
   - Create the AsteroidChart component for data visualization

3. API Integration:

   - Set up the NASA API key in the .env file
   - Implement the fetchAsteroidData function in App.jsx to retrieve data from the NASA NeoWs API

4. State Management:

   - Use React's useState hook to manage loading, error, and asteroid data states

5. Data Processing:

   - Process the API response in the AsteroidInfoStats component to calculate required statistics
   - Format data for chart visualization in the AsteroidChart component

6. UI/UX Design:
   - Apply Tailwind CSS classes for responsive design and styling
   - Implement error handling and loading states for better user experience
