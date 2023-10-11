const commentButton = document.getElementById("comment");
const closeModal = document.querySelector('.close-button');
const getContent = () => {
  fetch('/api/content')
    .then((response) => response.json())
    .then((data) => {

      console.log('getContent', data);
      for (let i = 0; i < data.length; i++) {
        ;
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
                <p><i>${data[i].user.username} posted </i> ${getDate}</p>
                <p class="card-text">"${data[i].content}"</p>
                </p><a href="#" class="btn btn-primary" id="seePost" data-bs-toggle="modal" data-bs-target="#postModal">See post</a></p>
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
      const id = card.id
      const imageSrc = card.querySelector('.card-img-top').src;
      const postTitle = card.querySelector('.card-title').textContent;
      const postText = card.querySelector('.card-text').textContent;
      const profilePic = card.querySelector('.profile-pic-match').src;
      // var divId = $(this).closest('div').attr('id');
      //       // Set the modal's id to match the div's id
      //       $("#modal").attr("id", divId);
      openPost(imageSrc, postTitle, postText, profilePic, id);


    }
  });
});

const openPost = async (imageSrc, postTitle, postText, profilePic, id) => {
  const postImage = document.getElementById('postImage');
  const postContent = document.getElementById('postContent');
  const postProfilePic = document.getElementById('modalProfilePic');
  const modal = document.getElementById('postModal');
  modal.setAttribute('modal-id', id);
  postImage.src = imageSrc;
  postContent.innerHTML = '<h2>' + postTitle + '</h2><p>' + postText + '</p>';
  postProfilePic.src = profilePic;

  postProfilePic.width = 40;
  postProfilePic.height = 40; 0
  await fetch(`/api/content/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

  })
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        $('.commentList').append(`
  <div class="comment-area" id="comment-id-1">
    <img src="../images/pre-profile-pic1.jpg" width="20" height="20">
    <p>${data[i].comment.user_id}</p>
  <p>${data[i].comments.comment}</p>
  </div>
  `)
      }
    })
    .then(() => {
      const postModal = new bootstrap.Modal(document.getElementById('postModal'));
      postModal.show();
    })
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

const getComments = () => {
  fetch('/api/comments')
    .then((response) => response.json())
    .then((data) => {
      console.log('getComment', data);
      $('.commentList')

    });
};

getComments();


function closePost() {
  const postModal = new bootstrap.Modal(document.getElementById('postModal'));
  postModal.hide(); // Hide the Bootstrap modal
}

commentButton.addEventListener("click", addComment);
closeModal.addEventListener('click', closePost);