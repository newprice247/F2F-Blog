let modalId;

let commentList;

const closeModal = document.querySelector('.close-button');
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
                <img src="../images/pre-profile-pic2.jpeg" class="profile-pic-match" alt="profile-pic" width="40" height="40">
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
      
      openPost(imageSrc, postTitle, postText, profilePic, id);
      console.log(id)
     
    }
  });
});

function openPost(imageSrc, postTitle, postText, profilePic, id) {
  const postImage = document.getElementById('postImage');
  const postContent = document.getElementById('postContent');
  const postProfilePic = document.getElementById('modalProfilePic');
  const modal = document.getElementById('postModal');
  modal.setAttribute('modal-id', id);
  postImage.src = imageSrc;
  postContent.innerHTML = '<h2>' + postTitle + '</h2><p>' + postText + '</p>';
  postProfilePic.src = profilePic;

  const modalId = modal.getAttribute('modal-id');
  postProfilePic.width = 40;
  postProfilePic.height = 40;

  const postModal = new bootstrap.Modal(document.getElementById('postModal'));
  const commentList = document.getElementById(`commentList-${modalId}`);
  postModal.show();


 

  const postCommentButton = document.getElementById('comment');
  postCommentButton.addEventListener('click', function (e) {
  e.preventDefault();
  const commentTextArea = document.getElementById('commentTextArea');
  const comment = commentTextArea.value;
  
 
  const commentData = {
    comment: comment,
    content_id: modalId
  };

 
  
  fetch(`/api/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentData)
  })
  .then(response => {
    if (response.ok) {
      // Comment posted successfully; update the comment list
      appendComment(comment); // A function to append the comment to the comment list
      commentTextArea.value = ''; // Clear the text area
    } else {
      console.log('comment not added.')
    }
  })
})

//still playing around with this fetch to append comments
fetch(`/api/comments/${modalId}`)
      .then(response => response.json())
      .then(comments => {
        // Append comments to the comment list
        comments.forEach(commentObj => {
          const commentText = commentObj.comment;

      // Call the appendComment function with the comment text
      appendComment({ text: commentText });
    })
  })
}

function appendComment(comment) {
// Append the comment to the comment list
const commentList = document.getElementById(`commentList-${modalId}`);
const commentDiv = document.createElement('div');
commentDiv.classList.add('comment-area');
commentDiv.innerHTML = `
  <img src="../images/about-abigail.jpg" width="20" height="20">
  <p>${comment}</p>
`;
commentList.appendChild(commentDiv);
}

  
  



function closePost() {
  const postModal = new bootstrap.Modal(document.getElementById('postModal'));
  postModal.hide(); // Hide the Bootstrap modal
}


closeModal.addEventListener('click', closePost);
