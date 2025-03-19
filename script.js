let videoData = [];

//fetch video from api
async function getYoutubeVideos() {
  const url = "https://api.freeapi.app/api/v1/public/youtube/videos";
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Failed to fetch videos");
    const data = await response.json();
    videoData = data.data.data;
    displayVideo(videoData);
  } catch (error) {
    console.error("Error fetching Videos", error);
  }
}

getYoutubeVideos();
