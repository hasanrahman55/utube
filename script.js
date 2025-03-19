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

//display video
function displayVideo(videos) {
  const videoContainer = document.getElementById("videoContainer");
  videoContainer.innerHTML = "";

  videos.forEach((video) => {
    const snippet = video.items.snippet;
    const videoId = video.items?.id;
    if (!snippet || !videoId) return;

    const { title, channelTitle, thumbnails } = snippet;
    const { url: thumbnailUrl } = thumbnails.high;

    const videoCard = document.createElement("div");
    videoCard.className =
      "w-80 bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer";
    videoCard.innerHTML = `
                    <div class="relative">
                        <img class="w-full h-44 object-cover" src="${thumbnailUrl}" alt="Thumbnail">
                    </div>
                    <div class="p-3 flex space-x-3">
                        <img class="w-10 h-10 rounded-full" src="https://via.placeholder.com/40" alt="Channel Avatar">
                        <div>
                            <h3 class="text-sm font-semibold text-gray-900 leading-tight">${title}</h3>
                            <p class="text-xs text-gray-500">${channelTitle}</p>
                        </div>
                    </div>
      `;

    //open youtube when click video
    videoCard.addEventListener("click", function () {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
    });

    videoContainer.append(videoCard);
  });
}

getYoutubeVideos();
