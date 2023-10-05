const API = {
    getResources() {
        fetch('/api/resources')
          .then((response) => response.json())
          .then((data) => {
            console.log('getResources', data);
            for (let i = 0; i < data.length; i++) {
              $('#displayArea').append(`
                <div class="resource-item">
                  <h3>Resource:</h3>
                  <p><strong>ID:</strong> ${data[i].user.username}</p>
                  <p><strong>Comment:</strong> ${data[i].comment}</p>
                  <p><strong>URL:</strong> <a href="${data[i].url}" target="_blank" id="urlLinkDisplay">${data[i].url}</a></p>
                  <p><strong>Tag:</strong> ${data[i].tag}</p>
                </div>`);
            }
          });
      },
      getContent() {
        fetch('/api/content')
            .then((response) => response.json())
            .then((data) => {
                console.log('getContent', data);
                for (let i = 0; i < data.length; i++) {
                    $('.blog-post-area').append(`
        <div class="card" style="width: 18rem;">
            <img src="../images/pre-post2.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${data[i].title}</h5>
              <div class="profile-img">
                <img src="../images/pre-profile-pic2.jpeg" alt="profile-pic" width="40" height="40">
                </div>
                <div class="date-created">
                <p><i>${data[i].user.username} posted</i>${data[i].created_at}</p>
                <p class="card-text">"${data[i].content}"</p>
                
              <a href="#" class="btn btn-primary">See post</a>
              </div>
            
            </div>
          </div>`);
                }
            });
    },
    };


module.exports = API;