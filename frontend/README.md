# Running the frontend w/ Docker

## Build the image

`docker build -t robin:dev .`

## Run the container

`docker run -dp 3000:3000 robin:dev`

## View the frontend

Open [http://localhost:3000](http://localhost:3000)

# Testing

## Cypress

The cypress install command has been added to the docker file.

To open cypress run the command in the frontend folder  :  `npx cypress open`
