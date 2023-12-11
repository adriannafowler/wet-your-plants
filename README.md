# Wet Your Plants
- Adrianna Fowler
- Danny Gomez
- Jason Seet
- Deon Nguyen

Tech Stack
- Backend: FastAPI
- Frontend: Vite + JavaScript
- Database: PostgreSQL
- UI Framework: Material-UI

## Design

- [API design](docs/apis.md)
- [Data model](docs/data-model.md)
- [GHI](docs/ghi.md)
- [Integrations](docs/integrations.md)

## Intended market

Wet Your Plants - Plant Care Assistant
Welcome to Wet Your Plants, your dedicated application for stress-free and consistent house plant care. This application is tailored for the less experienced or busy house plant enthusiasts, providing a robust solution to cultivate healthy and thriving plants. Whether you're new to plant care or navigating a busy schedule, Wet Your Plants is your partner in cultivating a green and vibrant indoor oasis.

## Functionality

Features
1. Home Page
Explore the app's functionalities with a user-friendly interface that guides you through the features and benefits of Wet Your Plants.

2. Sign Up and Login
Securely authenticate users with our streamlined sign-up and login process, ensuring a personalized experience for every user.

3. Greenhouse Page
Utilize the Greenhouse page as your central hub for managing plant inventory. Track each plant's health, maintenance needs, and care history effortlessly.

4. Plant Detail Page
Harness the power of the PlantID API to access detailed care instructions and descriptions for each house plant. Empower yourself with the knowledge needed for optimal plant growth.

5. Plant Care Dashboard
Daily To-Do List: Generate a personalized to-do list based on watering needs and other care requirements, with the ability to add manual tasks.

6. Plant Care History
Review your plant care journey with the Plant Care History feature. Store completed tasks and monitor your progress in nurturing your plants.

## Stretch Goals
- Local Weather Integration: Real-time weather updates from the OpenWeatherMap API to tailor your plant care routine based on local conditions.
- Weather Warning Bar: Receive alerts when weather conditions pose a potential threat to your outdoor plants.

## Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. code . to open your IDE
4. Create a file in "api" named .env (insert the code below)
5. Create a file in "wet-your-plants" named .env (insert the code below)
6. This code can go in both .env files
    PERENUAL_API_KEY = "Replace with key from plantID API"
    OPEN_WEATHER_API_KEY = "Replace with key from openweathermap API"
    VITE_APP_API_HOST= "http://localhost:8000"
    DEFAULT_EMAIL = "email address of your choice here"
    PG_PASSWORD = "password"
    SIGNING_KEY = "can be anything"
    DATABASE_URL = "your database url here"
    *OPEN_WEATHER_API_KEY = "your key here"
    *PERENUAL_API_KEY = "your key here"
6. Run `docker compose build`
7. Run `docker compose up`

* to obtain an Open Weather API key https://openweathermap.org/current
* to obtain a Perenual API key https://perenual.com/docs/api
