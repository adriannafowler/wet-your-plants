# Wet Your Plants - Plant Care Assistant

- Adrianna Fowler
- Danny Gomez
- Deon Nguyen
- Jason Seet

Welcome to Wet Your Plants, your dedicated application for stress-free and consistent house plant care. This application is tailored for the less experienced or busy house plant enthusiasts, providing a robust solution to cultivate healthy and thriving plants. Whether you're new to plant care or navigating a busy schedule, Wet Your Plants is your partner in cultivating a green and vibrant indoor oasis.

# Features

1) **Home Page**
Explore the app's functionalities with a user-friendly interface that guides you through the features and benefits of Wet Your Plants.

2) **Sign Up and Login**
Securely authenticate users with our streamlined sign-up and login process, ensuring a personalized experience for every user.

3) **Greenhouse Page**
Utilize the Greenhouse page as your central hub for managing plant inventory. Track each plant's health, maintenance needs, and care history effortlessly.

4) **Plant Detail Page**
Harness the power of the PlantID API to access detailed care instructions and descriptions for each house plant. Empower yourself with the knowledge needed for optimal plant growth.

5) **Plant Care Dashboard**
- Local Weather Integration: Real-time weather updates from the OpenWeatherMap API to tailor your plant care routine based on local conditions
- Weather Warning Bar: Receive alerts when weather conditions pose a potential threat to your outdoor plants.
- Daily To-Do List: Generate a personalized to-do list based on watering needs and other care requirements, with the ability to add manual tasks.

6) **Plant Care History**
Review your plant care journey with the Plant Care History feature. Store completed tasks and monitor your progress in nurturing your plants.

# Design

- [Wireframe](docs/Wireframe.svg)
- [API design](docs/apis.md)
- [Data model](docs/data-model.md)
- [Integrations](docs/integrations.md)

### Tech Stack
 - Backend: FastAPI
 - Frontend: Vite + JavaScript
 - Database: PostgreSQL
 - UI Framework: Material-UI

## Getting Started

To fully enjoy this application on your local machine, please be sure to follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies using appropriate package managers for both backend and frontend.
3. Set up PostgreSQL and configure the database.
4. Obtain API keys for [PerenualAPI](https://perenual.com/docs/api) and [OpenWeatherMapAPI](https://openweathermap.org/api).
5. Create .env files in these directories:  
    - api
    - wet-your-plants

    insert this information for both files:
    ```
    VITE_APP_API_HOST= "http://localhost:8000"
        DEFAULT_EMAIL = "default email here"
        PG_PASSWORD = "password here"
        SIGNING_KEY = "signing key here"
        DATABASE_URL = "database url here"
        OPEN_WEATHER_API_KEY = "api key here"
        PERENUAL_API_KEY = "api key here"
        POSTGRES_DB = "database name here"
        POSTGRES_USER = "database user here"
        POSTGRES_PASSWORD = "password here"
    ```

5. Run the application and start managing your plants with ease.
