

const closeModal = document.querySelector('.close-button');
export const getContent = () => {   
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
                <img src="../images/pre-profile-pic2.jpeg" class="profile-pic-match" alt="profile-pic" width="40" height="40">
                </div>
                <div class="date-created">

                <p><i>${data[i].user.username} posted </i>${data[i].createdAt}</p>

                <p class="card-text">"${data[i].content}"</p>
                
              <a href="#" class="btn btn-primary" id="seePost" data-bs-toggle="modal" data-bs-target="#postModal">See post</a>
              </div>
            
            </div>
          </div>`);
                } 
                 
            });
  };
  getContent(); 


document.addEventListener('DOMContentLoaded', function () {
  

  const blogPostArea = document.querySelector('.blog-post-area');

 

  // Use event delegation to handle click events on dynamically added elements
  blogPostArea.addEventListener('click', function (event) {
    if (event.target.matches('[data-bs-toggle="modal"]')) {
      const card = event.target.closest('.card');
      const imageSrc = card.querySelector('.card-img-top').src;
      const postTitle = card.querySelector('.card-title').textContent;
      const postText = card.querySelector('.card-text').textContent;
      const profilePic = card.querySelector('.profile-pic-match').src;

      openPost(imageSrc, postTitle, postText, profilePic);
    }
  });
});

function openPost(imageSrc, postTitle, postText, profilePic) {
  const postImage = document.getElementById('postImage');
  const postContent = document.getElementById('postContent');
  const postProfilePic = document.getElementById('modalProfilePic');

  postImage.src = imageSrc;
  postContent.innerHTML = '<h2>' + postTitle + '</h2><p>' + postText + '</p>';
  postProfilePic.src = profilePic;

  postProfilePic.width = 40;
  postProfilePic.height = 40;

  const postModal = new bootstrap.Modal(document.getElementById('postModal'));
  postModal.show();
}

function addComment(e) {
  e.preventDefault();

  const comment = document.querySelector(".textarea").value;

  const commentData = {
      comment: comment,
  };

fetch('api/comments', {    //fetch api content 
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(postData),
})
.then((res) => res.json())
.then((data) => {
    console.log(data);
    // getContent();
    document.location.replace('/crud');
    
})

.catch((err) => console.error('Oops, sorry, post could not be added. Error:', err));

};



/*
$('#comment').click(function() {  //append new comment each time user adds a comment 
 
//use as template to append comment from database 
  const newComment = `
  <div class="comment-area">
        <img src="../images/pre-profile-pic1.jpg" width="20" height="20"> 
        <p>${data.comment.comment}</p>
      </div>`;

      $('#commentList').append(newComment);

      $('.textarea').val('');       
});
*/



function closePost() {
  const postModal = new bootstrap.Modal(document.getElementById('postModal'));
  postModal.hide(); // Hide the Bootstrap modal
}

closeModal.addEventListener('click', closePost);