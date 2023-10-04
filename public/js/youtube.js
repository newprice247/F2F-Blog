const videoSection =document.querySelector('.fetched-videos')
const apiUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUxcQ_tkfXcXe3V2bgrntDGw&key=AIzaSyDzzPbwlQWOA_qRC8F2pm6xG6W91d6b-2o`;

fetch(apiUrl)
  .then((response) => {

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  })
  .then((data) => {
    console.log(data);
    data.items.forEach(el => {
        videoSection.innerHTML = `
        <a href="https://www.youtube.com/watch?v=${el.snippet.resourceId.videoId}" class="youtube-video">
        <img src="${el.snippet.thumbnails.maxres.url}" />
         <h3>${el.snippet.title}</h3>
         </a>`
    
    })
   
    
  })
  .catch((error) => {
    console.error('Problem fetching videos:', error);
  });

/*
channelId = UCxcQ_tkfXcXe3V2bgrntDGw

uploadsId = UUxcQ_tkfXcXe3V2bgrntDGw

channel ID: AIzaSyDzzPbwlQWOA_qRC8F2pm6xG6W91d6b-2o
uploads ID:  AIzaSyDzzPbwlQWOA_qRC8F2pm6xG6W91d6b-2o
url: https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUxcQ_tkfXcXe3V2bgrntDGw&key=AIzaSyDzzPbwlQWOA_qRC8F2pm6xG6W91d6b-2o

https://www.youtube.com/watch?v=KGQ7tm9a6Tk&t=3s
*/