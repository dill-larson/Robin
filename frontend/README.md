# Frontend

The frontend was built using React, Bootstrap, and SASS

## Table of Contents

- [Routes](#routes)
- [Running the Frontend](#running-the-frontend)
    <!-- - [Docker](#run-with-docker) -->
    <!-- - [Locally](#run-locally) -->
- [Running Cypress Tests](#running-cypress-tests)

## Routes

| Route                           | Component                 |
|---------------------------------|---------------------------|
| `/`                             | Home                      |
| `/signup`                       | SignUp                    |
| `/login`                        | Login                     |
| `/verify-email`                 | Verify                    |
| `/onboarding`                   | OnboardingPage            |
| `/onboarding/general`           | GeneralOnboarding         |
| `/onboarding/education`         | EducationOnboarding       |
| `/onboarding/education/create`  | EducationOnboardingInput  |
| `/onboarding/experience`        | ExperienceOnboarding      |
| `/onboarding/experience/create` | ExperienceOnboardingInput |
| `/onboarding/skills`            | SkillsOnboarding          |
| `/onboarding/projects`          | ProjectsOnboarding        |
| `/onboarding/projects/create`   | ProjectsOnboardingInput   |
| `/search`                       | Search                    |
| `/results/:link`                | Results                   |
## Running the frontend

1. Open a terminal
2. Change terminal directory to frontend directory `cd frontend`
3. Install all npm packages `npm install`
4. Start an instance `npm start`
5. View the frontend [http://localhost:3000](http://localhost:3000)

<!-- ### Run with Docker

3. Build the docker image `docker build -t robin:dev .`
4. Run the container `docker run -dp 3000:3000 robin:dev`
5. View the frontend [http://localhost:3000](http://localhost:3000)

### Run Locally -->

## Running Cypress Tests

1. Open Cypress `npx cypress open`
2. Navigate to `./Testing`
3. Click on a test to run
