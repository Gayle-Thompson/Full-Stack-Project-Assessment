const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const database = require("./dbConfig");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// GET "/videos"
app.get("/videos", async function (request, response) {
  try {
    const order = request.query.order || "desc";
    const sqlQuery = `SELECT * FROM videos ORDER BY rating ${order};`;
    const getAllVideos = await database.query(sqlQuery);
    console.log(getAllVideos.rows);
    const allVideos = getAllVideos.rows;
    return response.status(200).json(allVideos);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.get("/videos/:id", async function (request, response) {
  try {
    const videoId = request.params.id;
    const getVideoById = await database.query(
      "SELECT * FROM videos WHERE id = $1",
      [videoId]
    );

    if (getVideoById.rows.length === 0) {
      return response
        .status(400)
        .json({ error: `The video with id ${videoId} doesn't exist` });
    }

    const videoWithIdReq = getVideoById.rows[0];
    return response.status(200).json({ videoWithIdReq });
  } catch (error) {
    return response.status(500).json({ error });
  }
});

app.delete("/videos/:id", async function (request, response) {
  try {
    const videoId = request.params.id;
    const deleteVideoQuery = "DELETE FROM videos WHERE id = $1";
    const deleteVideo = await database.query(deleteVideoQuery, [videoId]);

    if (deleteVideo.rowCount === 0) {
      return response
        .status(400)
        .json({ error: `Unable to find or delete video with id ${videoId}` });
    }

    return response.json({ message: "Video successfully deleted" });
  } catch (error) {
    return response.status(500).json({ error: "Server Error" });
  }
});


app.post("/videos/addnew", async function (request, response) {
  try {
    const { title, url } = request.body;
    if (!title || !url) {
      return response
        .status(400)
        .json({ message: "Please fill out the required fields" });
    }

    const insertNewVideoQuery =
      "INSERT INTO videos (title, url, rating) VALUES ($1, $2, 0)";
    const insertVideo = await database.query(insertNewVideoQuery, [title, url]);

    return response.json({ message: "Video successfully added" });
  } catch (error) {
    return response.status(500).json({ error: "not a valid info" });
  }
});


app.listen(port, () => console.log(`Listening on port ${port}`));
