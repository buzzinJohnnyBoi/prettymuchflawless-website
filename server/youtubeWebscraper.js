const fs = require("fs");
const { google } = require("googleapis");
const youtube = google.youtube({
    version: "v3",
    auth: "", // get your own at console.cloud.google.com
});

async function scrapeChannel() {
    const popularParams = {
        part: "snippet",
        channelId: "UC5IeVjeaD80-CJldBCS9STg",
        maxResults: 2,
        order: "viewCount",
    };

    const recentParams = {
        part: "snippet",
        channelId: "UC5IeVjeaD80-CJldBCS9STg",
        maxResults: 2,
        order: "date",
    };
    var popularVideos = [];
    var recentVideos = [];
    try {
        const response = await youtube.search.list(popularParams);
        const videos = response.data.items;
        popularVideos = videos;
      } catch (error) {
        console.error("An error occurred:", error);
    }
    try {
        const response = await youtube.search.list(recentParams);
        const videos = response.data.items;
        recentVideos = videos;
      } catch (error) {
        console.error("An error occurred:", error);
    }
    const videoData = {
        popular: popularVideos.map((video) => ({
          videoId: video.id.videoId,
          title: video.snippet.title,
        })),
        recent: recentVideos.map((video) => ({
          videoId: video.id.videoId,
          title: video.snippet.title,
        })),
    };
    const jsonData = JSON.stringify(videoData, null, 2);
    fs.writeFileSync("videos.json", jsonData);
}

async function getYoutubeData(params) {
    try {
        const response = await youtube.search.list(params);
        const videos = response.data.items;
        return videos;
      } catch (error) {
        console.error("An error occurred:", error);
    }
}

scrapeChannel();