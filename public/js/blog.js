// const { get } = require("../../controllers/api/contentRoutes");


const closeModal = document.querySelector('.close-button');

// this will get the content from the database and display it on the page as cards
const getContent = () => {
  fetch('/api/content')
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let getDate = new Date(data[i].createdAt).toLocaleString();

        let contentImageSrc = imageExists(`../images/contentImages/${data[i].id}.jpg`) ?
          `../images/contentImages/${data[i].id}.jpg` :
          '../images/default-content-image.jpg';

        $('.blog-post-area').prepend(`
        <div id="${data[i].id}" data-content-id="${data[i].id}" class="card" style="width: 18rem;">
            <img src="${contentImageSrc}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${data[i].title}</h5>
              <div class="profile-img">
                <img src="../images/tmp/${data[i].user.id}.jpg" class="profile-pic profile-pic-match" alt="profile-pic" width="40" height="40">
                </div>
                <div class="date-created newPost">
                <p><i class="usernameI" data-username="${data[i].user.username}">${data[i].user.username} posted </i>${getDate}</p>
                <p class="card-text">"${data[i].content}"</p>
                <div class=" content-card-buttons" data-user-posted-id="${data[i].user.id}">
                <a href="#" class="w-100 align-bottom btn btn-primary" id="seePost" data-bs-toggle="modal" data-target="#postModal">See post</a>
                </div>
            
              </div>
              
            </div>
            
          </div>`);
      }
      return fetch('/api/users/loggedInUser')
    })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        // this will target only the posts that the logged-in user has posted
        $('.content-card-buttons').each(function () {
          if ($(this).attr('data-user-posted-id') === data.id.toString()) {
            $(this).html(`
            
            <a href="../crud" class="w-100 btn btn-primary" id="editPost">Edit or Delete</a>
            <a href="#myNav" class="btn w-100 btn-primary" id="uploadContentImage">Upload Image</a>
            <a href="#" class="btn w-100 btn-primary" id="seePost" data-bs-toggle="modal" data-target="#postModal">See post</a>
            `);
            $('#uploadContentImage').on('click', (e) => {
              e.preventDefault();
              document.body.scrollTop = 0; // For Safari
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
              const content = e.target.closest('.card');
              const postId = content.getAttribute('data-content-id').valueOf();
              $('#uploadImage').html(`
              <div class="container">
                  <div class="row w-100">
                    <div class="col-sm-8 mt-3">
                      <h4>Upload New Blog Image</h4>
                      <form
                        class="mt-4"
                        action="/images/uploadContentImage"
                        method="POST"
                        enctype="multipart/form-data"
                      >
                        <div class="form-group">
                          <input
                            type="file"
                            name="file"
                            id="input-files"
                            class="form-control-file border"
                          />
                        </div>
                        <input type="hidden" name="content_id" id="content_id" value="${postId}">
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </form>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="preview-images"></div>
                    </div>
                  </div>
                </div>
              `);
            });
          }
        });
      } else {
        console.log('user not logged in')
      }
    })
};
getContent();

// this will check if an image exists for the content
function imageExists(imageUrl) {
  var http = new XMLHttpRequest();
  http.open('HEAD', imageUrl, false);
  http.send();
  return http.status !== 404;
}


// this will get the logged-in user's profile image and display it in the navbar
const getProfileImg = () => {
  fetch('/api/users/profile')
    .then((response) => response.json())
    .then((data) => {
      // if the user is logged in, display their profile image in the navbar as well as a logout button
      if (data !== null) {
        $('.user-profile-img').html(`
                <div class="center-vertically">
                  <img src="../images/tmp/${data.id}.jpg" class="profile-pic" alt="profile-pic" width="40" height="40">
                  <p class="profile-p">${data.username}</p>
                </div>
                `);
        $('.nav-links').append(`
                  <li><a href="../api/users/logout">Logout</a></li>
                  `);
      // Otherwise, display a login button in the navbar
      } else {
        $('.nav-links').append(`
                  <li><a href="../login">Login</a></li>
                  `);
      }
    });
};
getProfileImg();

// this will get the logged-in user's profile image and display it in the modal
const getContentComments = (id) => {
  fetch(`/api/content/${id}`)
    .then((response) => response.json())
    .then((data) => {
      // empty the comment list
      $('#commentList').empty();
      // if there are comments, display them in the modal
      if (data.comments.length !== 0) {
        for (let i = 0; i < data.comments.length; i++) {
          let getDate = new Date(data.comments[i].createdAt).toLocaleString();
          $('#commentList').append(`
         <div class="comment-container-1" id="${data.comments[i].id}">
            <img src="../images/tmp/${data.comments[i].user_id}.jpg" class="profile-pic"width="40" height="40">
            <p>${data.comments[i].user.username} commented ${getDate}</p>
            <p>${data.comments[i].comment}</p>
          </div>`
          );
        }
      // otherwise, display a message saying there are no comments yet
      } else {
        $('#commentList').empty();
        $('#commentList').html(`
      <div class="comment-container-1">
         <p>Be the first to comment!</p>
       </div>`
        );
      }
      // chain another fetch to check if the user is logged in
      return fetch('/api/users/loggedInUser')
    })
    .then((response) => response.json())
    .then((data) => {
      // if the user is logged in, display a comment box and a post comment button
      if (data) {
        $('#modal-button').html(`
          <button class="modal-comment-button" id="comment" >Post comment</button>
          <button class="modal-close-button close-button" id="close" data-dismiss="modal"
          aria-label="Close">Cancel</button>`
        );
      // otherwise, display a message saying the user must be logged in to post a comment
      } else {
        $('#modal-button').html(`
        <p><a href="../login">Login to post a comment</a></p>
        <button class="modal-close-button close-button" id="close" data-dismiss="modal"
          aria-label="Close">Cancel</button>`
        );
      }
      const commentButton = document.getElementById("comment");
      commentButton.addEventListener('click', addComment);
    })
};

// this will add a comment to the database
function addComment(e) {
  e.preventDefault();
  //grabs the comment from the textarea
  const comment = document.querySelector(".textarea").value;
  const modalId = document.querySelector('#postModal').getAttribute('modal-id').valueOf();
  // this will post the comment to the database
  const commentData = {
    comment: comment,
    content_id: modalId
  };
  fetch('api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
  })
    .then((res) => res.json())
    .then((data) => {
      // chain another fetch to check if the user is logged in
      return fetch('/api/users/loggedInUser')
    })
    .then((response) => response.json())
    .then((data) => {
      // this will add the comment to the modal
      const date = new Date().toLocaleString();
      $('#commentList').append(`
      <div class="comment-container-1" id="${data.id}">
         <img src="../images/tmp/${data.id}.jpg" class="profile-pic"width="40" height="40">
         <p>${data.username} commented ${date}</p>
         <p>${comment}</p>
       </div>`
      );
    })
    .catch((err) => console.error('Oops, sorry, post could not be added. Error:', err));
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
      const username = card.querySelector('.usernameI').getAttribute('data-username').valueOf();

      openPost(imageSrc, postTitle, postText, profilePic, id, username);
    }
  });
});

// this will open the modal and display the post
const openPost = (imageSrc, postTitle, postText, profilePic, id, username) => {
  const postImage = document.getElementById('postImage');
  const postContent = document.getElementById('postContent');
  const postProfilePic = document.getElementById('modalProfilePic');
  const modal = document.getElementById('postModal');
  const modalId = document.querySelector('#postModal').setAttribute('modal-id', id);
  const modalUsername = document.getElementById('modalUsername');
  postImage.src = imageSrc;
  postContent.innerHTML = '<h2>' + postTitle + '</h2><p>' + postText + '</p>';
  postProfilePic.src = profilePic;
  postProfilePic.width = 40;
  postProfilePic.height = 40; 0
  getContentComments(id);
  const postModal = new bootstrap.Modal(document.getElementById('postModal'));
  postModal.show();
}

// this will close the modal
function closePost() {
  const postModal = new bootstrap.Modal(document.getElementById('postModal'));
  postModal.hide(); // Hide the Bootstrap modal
}

closeModal.addEventListener('click', closePost);

// this function will refresh the modal when a user adds a comment


