const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "movieData.db");
let db = null;
app.use(express.json());

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000);
  } catch (e) {
    console.log(`DB ERROR ${e.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();

const convertDbObjToResponseObjMovieTable = (dbObj) => {
  return {
    movieId: dbObj.movie_id,
    directorId: dbObj.director_id,
    movieName: dbObj.movie_name,
    leadActor: dbObj.lead_actor,
  };
};

const convertDbObjToResponseObjDirectorTable = (dbObj) => {
  return {
    directorId: dbObj.director_id,
    directorName: dbObj.director_name,
  };
};

//API to get all movie names from movie_table
app.get("/movies/", async (request, response) => {
  const getMoviesQuery = `SELECT movie_name FROM movie`;
  const movieArray = await db.get(getMoviesQuery);
  response.send(movieArray);
});
