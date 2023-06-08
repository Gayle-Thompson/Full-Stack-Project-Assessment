// import React, { useState, useEffect } from "react";
// import AddVideoForm from "./AddVideoForm";
// import "./App.css";

// function App() {
//   const [videos, setVideos] = useState([]);
//   const [order, setOrder] = useState("desc");

//   const fetchVideos = () => {
//     fetch(`http://localhost:5000/videos?order=${order}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setVideos(data);
//       })
//       .catch((error) => {
//         console.log("Your requested information is not currently available!");
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     fetchVideos();
//     // eslint-disable-next-line
//   }, []);

//   function addNewVideo(video) {
//     const newVideosAdded = videos.concat(video);
//     setVideos(newVideosAdded);
//   }

//   function voteUp(videoId) {
//     const updatedVideos = videos.map((video) => {
//       if (video.id === videoId) {
//         return {
//           ...video,
//           rating: video.rating + 1,
//         };
//       }
//       return video;
//     });
//     setVideos(updatedVideos);
//   }

//   function voteDown(videoId) {
//     const updatedVideos = videos.map((video) => {
//       if (video.id === videoId) {
//         return {
//           ...video,
//           rating: video.rating - 1,
//         };
//       }
//       return video;
//     });
//     setVideos(updatedVideos);
//   }

//   function deleteVideo(videoId) {
//     const updatedVideos = videos.filter((video) => video.id !== videoId);
//     setVideos(updatedVideos);
//   }

//   const sortedVideos = videos.concat().sort((a, b) => {
//     if (order === "asc") {
//       return a.rating - b.rating;
//     } else {
//       return b.rating - a.rating;
//     }
//   });

//   const toggleOrder = () => {
//     setOrder(order === "desc" ? "asc" : "desc");
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>The Pretty Coder</h1>
//       </header>
//       <div className="upNdownBtn">
//         <p>
//           Click here to view videos in ascending or descending order by
//           ratings..
//         </p>

//         <h3>
//           <button id="AscDescBtn" onClick={toggleOrder}>
//             {order === "desc" ? "View Ascending" : "View Descending"}
//           </button>
//         </h3>
//       </div>
//       <div className="video-grid">
//         {sortedVideos.map((video) => (
//           <div className="newvideos" key={video.id}>
//             <h4> {video.title}</h4>
//             <iframe
//               width="400"
//               height="250"
//               src={`https://www.youtube.com/embed/${video.url.slice(32)}`}
//               title={video.title}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//             <h4>Rating: {video.rating}</h4>
//             <div className="vote-btns">
//               <button id="vote-btn" onClick={() => voteUp(video.id)}>
//                 Up Vote
//               </button>
//               <button id="vote-btn" onClick={() => voteDown(video.id)}>
//                 Down Vote
//               </button>
//             </div>
//             <div className="delete">
//               <button id="delete-btn" onClick={() => deleteVideo(video.id)}>
//                 DELETE VIDEO
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <AddVideoForm
//         fetchVideos={fetchVideos}
//         onAddVideo={addNewVideo}
//         videos={videos}
//         setVideos={setVideos}
//       />
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import AddVideoForm from "./AddVideoForm";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [order, setOrder] = useState("desc");

  const fetchVideos = () => {
    fetch(`http://localhost:5000/videos?order=${order}`)
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        console.log("Your requested information is not currently available!");
        console.log(error);
      });
  };

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line
  }, []);

  function addNewVideo(video) {
    const newVideosAdded = videos.concat(video);
    setVideos(newVideosAdded);
  }

  function voteUp(videoId) {
    const updatedVideos = videos.map((video) => {
      if (video.id === videoId) {
        return {
          ...video,
          rating: video.rating + 1,
        };
      }
      return video;
    });
    setVideos(updatedVideos);
  }

  function voteDown(videoId) {
    const updatedVideos = videos.map((video) => {
      if (video.id === videoId) {
        return {
          ...video,
          rating: video.rating - 1,
        };
      }
      return video;
    });
    setVideos(updatedVideos);
  }

  function deleteVideo(videoId) {
    const updatedVideos = videos.filter((video) => video.id !== videoId);
    setVideos(updatedVideos);
  }

  const sortedVideos = videos.concat().sort((a, b) => {
    if (order === "asc") {
      return a.rating - b.rating;
    } else {
      return b.rating - a.rating;
    }
  });

  const toggleOrder = () => {
    setOrder(order === "desc" ? "asc" : "desc");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>The Pretty Coder</h1>
      </header>
      <div className="upNdownBtn">
        <p>
          Click button to view videos in ascending or descending order by
          ratings..
        </p>

        <h3>
          <button id="AscDescBtn" onClick={toggleOrder}>
            {order === "desc" ? "View Ascending" : "View Descending"}
          </button>
        </h3>
      </div>
      <div className="video-grid">
        {sortedVideos.map((video) => (
          <div className="newvideos" key={video.id}>
            <h4> {video.title}</h4>
            <iframe
              width="400"
              height="250"
              src={`https://www.youtube.com/embed/${video.url.slice(32)}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h4>Rating: {video.rating}</h4>
            <div className="vote-btns">
              <button id="vote-btn" onClick={() => voteUp(video.id)}>
              Vote Up
              </button>
              <button id="vote-btn" onClick={() => voteDown(video.id)}>
              Vote Down
              </button>
            </div>
            <div className="delete">
              <button id="delete-btn" onClick={() => deleteVideo(video.id)}>
                DELETE VIDEO
              </button>
            </div>
          </div>
        ))}
      </div>
      <AddVideoForm fetchVideos={fetchVideos} onAddVideo={addNewVideo} />
    </div>
  );
}

export default App;
