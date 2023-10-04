document.addEventListener('DOMContentLoaded', function() {

let videoSectionHTML = '';

let secondVideoSectionHTML = '';

  const fetchedVideosContainer = document.querySelector('.fetched-videos'); 
const apiUrl1 = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUxcQ_tkfXcXe3V2bgrntDGw&key=AIzaSyDzzPbwlQWOA_qRC8F2pm6xG6W91d6b-2o`;
const apiUrl2 = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUmqcVuqFT016HusUKVLTQoA&key=AIzaSyDzzPbwlQWOA_qRC8F2pm6xG6W91d6b-2o`;
const apiUrl3 = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UU0gd2JJQK1R9_lRJWkkuvqg&key=AIzaSyDzzPbwlQWOA_qRC8F2pm6xG6W91d6b-2o`;

fetch(apiUrl1)
  .then((response) => {

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  })
  .then((data) => {
    console.log(data);
   
    data.items.forEach(el => {
        videoSectionHTML += `
        <div class="video-card">
        <a target="_blank" href="https://www.youtube.com/watch?v=${el.snippet.resourceId.videoId}">
            <img src="${el.snippet.thumbnails.maxres.url}" />
            <h3>${el.snippet.title}</h3>
        </a>
    </div>`;

    
  fetchedVideosContainer.innerHTML = videoSectionHTML;
    
});
  })
  .catch((error) => {
    console.error('Problem fetching videos:', error);
  });

  

  fetch(apiUrl2)
  .then((response) => {

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  }) 
  .then((data) => {
    console.log(data); 

    data.items.forEach(el => {
        secondVideoSectionHTML += `
        <div class="video-card">
        <a target="_blank" href="https://www.youtube.com/watch?v=${el.snippet.resourceId.videoId}">
            <img src="${el.snippet.thumbnails.maxres.url}" />
            <h3>${el.snippet.title}</h3>
        </a>
    </div>`;
    
    }); 
    fetchedVideosContainer.innerHTML += secondVideoSectionHTML;
})
  .catch((error) => {
    console.error('Problem fetching videos:', error);
  });
  

  fetch(apiUrl3)
  .then((response) => {

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  }) 
  .then((data) => {
    console.log(data); 

    let thirdVideoSectionHTML = '';
    data.items.forEach(el => {
        thirdVideoSectionHTML += `
        <div class="video-card">
        <a target="_blank" href="https://www.youtube.com/watch?v=${el.snippet.resourceId.videoId}">
            <img src="${el.snippet.thumbnails.default.url}" />
            <h3>${el.snippet.title}</h3>
        </a>
    </div>`;
    fetchedVideosContainer.innerHTML = '';
    fetchedVideosContainer.innerHTML += videoSectionHTML + secondVideoSectionHTML + thirdVideoSectionHTML;
    
    })
    
  })
  .catch((error) => {
    console.error('Problem fetching videos:', error);
  });
  
});
/*
channelId = UCxcQ_tkfXcXe3V2bgrntDGw

uploadsId = UUxcQ_tkfXcXe3V2bgrntDGw

channel ID: AIzaSyDzzPbwlQWOA_qRC8F2pm6xG6W91d6b-2o
uploads ID:  AIzaSyDzzPbwlQWOA_qRC8F2pm6xG6W91d6b-2o
url: https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUxcQ_tkfXcXe3V2bgrntDGw&key=AIzaSyDzzPbwlQWOA_qRC8F2pm6xG6W91d6b-2o

https://www.youtube.com/watch?v=KGQ7tm9a6Tk&t=3s

channel2 id : UCmqcVuqFT016HusUKVLTQoA
UPLOADSID: UUmqcVuqFT016HusUKVLTQoA

youtube: https://www.youtube.com/watch?v=86DGvUC66uY
*/

/*
channel id : 4hQRanjObqo
*/