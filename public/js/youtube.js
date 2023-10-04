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
    videoSection.innerHTML = data.items[0].snippet.title

    
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
*/