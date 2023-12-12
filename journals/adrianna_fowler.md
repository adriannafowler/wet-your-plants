NOV 15, 2023
    -mob coded, edited docker-compose.yaml to get containers up and running
    -explored database options as a group, and after some trial and error,
     decided to use the demonstrated method with init.sql

NOV 17, 2023
    - added acls.py and keys.py files, tested both functions that pull from perenual api in shell, both were working correctly

NOV 20, 2023
     - running into a blocker with getting my create_plant up and running. When I try a post request in swagger, I get a status code 500, and this error in my container log:
     psycopg.errors.StringDataRightTruncation: value too long for type character varying(50)
     - posted as a blocker for team to work on together tomorrow

NOV 21, 2023
    - solved the error from yesterday, the issue was that I wasn't deleting my volumes when I went to rebuild my docker containers
    - create_plant now working!
    - corrected some issues in init.sql
    - added seed data
    - started a term dictionary for group use

NOV 22, 2023
    - working plant detail GET(one), PUT, and DELETE queries and routes --> pushed to plant-detail

NOV 27, 2023
    - working on plant detail front end component, pushed updates to plant-detail branch

NOV 28, 2023
    - have functional jsx for plant detail component
    - working on pulling data from backend api

NOV 29, 2023
    - created functional delete and edit buttons(each with a modal) for plant-detail front end
    - created watering schedules router and query to use in front end for better user experience in selecting a schedule

NOV 30, 2023
    - fixed a bug with my update plant query
    - created query and routers for greenhouse, GET all plants for user, and POST plant fixed for current app functionality
    - worked with Jason to merge and push everything to main
    - working with Danny to switch some responsibilities, he is going to finish up styling plant-detail and modals, while I work on care dashboard backend
    - created a roadmap for care dashboard backend and weather data functionality for front end

DEC 1, 2023
    - created dashboard CREATE, DELETE, GET (all by user), and PUT(update todo, and update just complete bool), queries and routes
    - testes all routes and queries, all are functional

DEC 4, 2023
    - reorganized backend so that all pydantic models are found in models.py
    - refactored dashboard.py, added docstrings, endpoints working
    - refactored greenhouse.py, added docstrings, endpoints working

DEC 5, 2023
    - refactored plant_detail, used black to format api, worked on removing unused imports
    - updated linter in gitlab-ci to use black instead of flake8


DEC 6, 2023
    - adjusted seed data
    - updated inventory router
    - fixed requirements.txt to include only libraries that are being used
    - updated env files
    - started process of moving front end api call (get plant species) to the      backend using a .env file for our api keys for best practice

DEC 7, 2023
    - finished moving front end api call for plant species, working, this effects add a plant form and edit a plant form
    - added styling to greenhouse.jsx
    - formatted api with black
    - started deployment process
    - added env variables to gitlab CI/CD settings
    - edited docker-compose yaml

DEC 8, 2023
    - reformatted login and signup forms
    - updated routes
    - updated greenhouse styling

DEC 11, 2023
    - updated homepage and homepage styling
    - added a dropdown menu to choose plant in create a todo form
    - add post call to api for create a todo
    - updated README to include env instructions
    - did walk through with group of application and fixed a couple errors to create final submission 
