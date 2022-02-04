## Functional:
1. Add a movie
2. Remove movie
3. Show movie information
4. Show a list of movies sorted by title in alphabetical order
5. Find a movie by title.
6. Find a movie by the actor's name.
7. Import movies from a text file (an example file is attached “sample_movies.txt”). The file must be uploaded via the web interface.

## Available Scripts

In the project directory, you can run:

- `npm install`

- `npm start`
  Runs the app in the development mode.\
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- `docker-compose up --build -d`
  Builds and runs a docker image of the application.

## RUNNING DOKER IMAGE

Run the following commands to run the docker image:

- `docker pull webbylabhub/movies`
- `docker run --name movies -p 8000:8000 webbylabhub/movies`
- Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

## Technologies:
ReactJS using ES6, Webpack, Redux.
