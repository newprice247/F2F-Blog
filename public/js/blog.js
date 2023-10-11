// const { get } = require("../../controllers/api/contentRoutes");

const commentButton = document.getElementById("comment");
const closeModal = document.querySelector('.close-button');

// this will get the logged-in user's profile image and display it in the navbar
const getProfileImg = () => {
    fetch('/api/users/profile')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if (data !== null) {
              console.log('getProfileImg', data.id);
                $('.user-profile-img').html(`<img src="../images/tmp/${data.id}.jpg" class="profile-pic" alt="profile-pic" width="40" height="40">`);
            } else {
                $('.user-profile-img').html(`<img src="../images/Profile-pic.jpg" alt="profile-pic" width="40" height="40">`);
            }
        });
};

getProfileImg();

export const getContent = () => {   
        fetch('/api/content')
            .then((response) => response.json())
            .then((data) => {
    
                console.log('getContent', data);
                for (let i = 0; i < data.length; i++) {
                  let getDate = new Date(data[i].createdAt).toLocaleDateString();
                  $('.blog-post-area').append(`
        <div id="${data[i].id}" class="card" style="width: 18rem;">
            <img src="../images/npmjs image.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${data[i].title}</h5>
              <div class="profile-img">
                <img src="../images/tmp/${data[i].user.id}.jpg" class="profile-pic-match" alt="profile-pic" width="40" height="40">
                </div>
                <div class="date-created newPost">
                <p><i>${data[i].user.username} posted </i>${getDate}</p>
                <p class="card-text">"${data[i].content}"</p>
                </p><a href="#" class="btn btn-primary" id="seePost" data-bs-toggle="modal" data-target="#postModal">See post</a></p>
              </div>
            
            </div>
          </div>`);
                } 
                 
            });
  };
  getContent(); 

const getContentComments = (id) => {
  fetch(`/api/content/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log('getComments', data.comments);
      
      for (let i = 0; i < data.comments.length; i++) {
        let getDate = new Date(data.comments[i].created_at).toLocaleDateString();
        
        $('#commentList').append(`
         <div class="comment-container-1" id="${data.comments[i].id}">
            <img src="../images/pre-profile-pic1.jpg" width="20" height="20">
            <p>${data.comments[i].user_id} commented ${getDate}</p>
            <p>${data.comments[i].comment}</p>
          </div>`
        );
      }
    });
};
document.addEventListener('DOMContentLoaded', function () {
  const blogPostArea = document.querySelector('.blog-post-area');

  

  // Use event delegation to handle click events on dynamically added elements
  blogPostArea.addEventListener('click', function (event) {
    if (event.target.matches('[data-bs-toggle="modal"]')) {
      
      const card = event.target.closest('.card');
      let id = card.id
      const imageSrc = card.querySelector('.card-img-top').src;
      const postTitle = card.querySelector('.card-title').textContent;
      const postText = card.querySelector('.card-text').textContent;
      const profilePic = card.querySelector('.profile-pic-match').src;
      $('#commentList').empty();
      openPost(imageSrc, postTitle, postText, profilePic, id);
      console.log(id)
     
    }
  });
});

const openPost = (imageSrc, postTitle, postText, profilePic, id) => {
  const postImage = document.getElementById('postImage');
  const postContent = document.getElementById('postContent');
  const postProfilePic = document.getElementById('modalProfilePic');
  const modal = document.getElementById('postModal');
  const modalId = document.querySelector('#postModal').setAttribute('modal-id', id);
  postImage.src = imageSrc;
  postContent.innerHTML = '<h2>' + postTitle + '</h2><p>' + postText + '</p>';
  postProfilePic.src = profilePic;
 

  postProfilePic.width = 40;
  postProfilePic.height = 40; 0
  getContentComments(id);
  const postModal = new bootstrap.Modal(document.getElementById('postModal'));
  postModal.show();
}

function addComment(e) {
  e.preventDefault();
  // console.log('addComment function called')
  const comment = document.querySelector(".textarea").value;
  const modalId = document.querySelector('#postModal').getAttribute('modal-id').valueOf();
  // const modalId = document.querySelector(`.modalId-${}`)

  const commentData = {
    comment: comment,
    content_id: modalId
  };
  // console.log(commentData)
  fetch('api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(`here is the addComment data ${data}`)
      
      // document.location.replace('/crud');
      // return data
    })

    .catch((err) => console.error('Oops, sorry, post could not be added. Error:', err));

};




// $('#comment').click(function() {  //append new comment each time user adds a comment 

// //use as template to append comment from database

//   const newComment = `
//   <div class="comment-area">
//         <img src="../images/pre-profile-pic1.jpg" width="20" height="20"> 
//         <p>${data.comment.comment}</p>
//       </div>`;

//       $('#commentList').append(newComment);

//       $('.textarea').val('');  
// });


function closePost(boolean) {
  const postModal = new bootstrap.Modal(document.getElementById('postModal'));
  if (boolean) {
    postModal.hide(); // Hide the Bootstrap modal
  } else {
    postModal.reload(); //
  }
}

commentButton.addEventListener('click', addComment, );
closeModal.addEventListener('click', closePost);

// this function will refresh the modal when a user adds a comment


