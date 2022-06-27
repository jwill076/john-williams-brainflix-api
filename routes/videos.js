const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const uuid = require('uuid');
const VideosDetailsArray = require("../data/videos.json");

router.use(express.json());
router.use(bodyParser.json());
router.use(express.static('public'));

router
  .get("/", (request, response) => {
    response.status(200).json(VideosDetailsArray);
  })

  .get("/:id", (request, response) => {
    const videoId = request.params.id;
    const selectedVideoById = VideosDetailsArray.find((video) => videoId === video.id);

    if (selectedVideoById) {
      response.status(200).json(selectedVideoById);
    } else {
      response.status(400).json({errorMessage: `Video not found with requested ID: ${videoId}`});
    }
  })

  .post("/", (request, response) => {
    const newUploadObject = [
      {
        "id": uuid.v4(),
        "title": request.body.title,
        "channel": "BrainStation",
        "description": request.body.description,
        "image": request.body.image,
        "views": "845,415",
        "likes": "265,342",
        "duration": "3:21",
        "video": "https://project-2-api.herokuapp.com/stream",
        "timestamp": Date.now(),
        "comments": [
          {
            "id": uuid.v4(),
            "name": "John Smith",
            "comment": "They BLEW the ROOF off at their last event, once everyone started figuring out they were going. This is still simply the greatest opening of an event I have EVER witnessed.",
            "likes": 10,
            "timestamp": 1628598561000
          },
          {
            "id": uuid.v4(),
            "name": "Jack Doyle",
            "comment": "They BLEW the ROOF off at their last event, once everyone started figuring out they were going. This is still simply the greatest opening of an event I have EVER witnessed.",
            "likes": 5,
            "timestamp": 1628482661000
          },
          {
            "id": uuid.v4(),
            "name": "Willy Jackson",
            "comment": "They BLEW the ROOF off at their last event, once everyone started figuring out they were going. This is still simply the greatest opening of an event I have EVER witnessed.",
            "likes": 12,
            "timestamp": 1628753061000
          }
        ]
      }
    ];

    const newVideosDetailsArray = VideosDetailsArray.concat(newUploadObject);
    response.status(201).json(newVideosDetailsArray);
  });

module.exports = router;