

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
      let id = card.id
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
 
  postImage.src = imageSrc;
  postContent.innerHTML = '<h2>' + postTitle + '</h2><p>' + postText + '</p>';
  postProfilePic.src = profilePic;
 

  postProfilePic.width = 40;
  postProfilePic.height = 40;

  const postModal = new bootstrap.Modal(document.getElementById('postModal'));
  postModal.show();


  const postCommentButton = document.getElementById('comment');
  // When the user submits a comment, post it to the server, and if successful, update the comment section.
  postCommentButton.addEventListener('click', function (e) {
    modal.setAttribute('modal-id', id);
    let modalId = modal.getAttribute('modal-id');
    e.preventDefault();
    const commentTextArea = document.getElementById('commentTextArea');
    const comment = commentTextArea.value;
    const commentData = {
      comment: comment,
      content_id: parseInt(modalId, 10)
    };
  console.log(commentData)
    
     fetch(`/api/comments/${modalId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData)
      })
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
      })
    })
  }
        // Comment posted successfully; update the comment section
        /*
        updateCommentSection(modalId);
        commentTextArea.value = ''; // Clear the text area
        */
      
  
/*
  function updateCommentSection(modalId) {
    console.log('Fetching comments for modalId:', modalId);
    // Make a Fetch request to retrieve comments for the given modalId
    fetch(`/api/comments/${modalId}`)
      .then(response => response.json())
      .then(comments => {
        // Clear the existing comment section
        const commentList = document.getElementById(`commentList-${modalId}`);
        commentList.innerHTML = '';
  
        // Append the new comments
        comments.forEach(commentObj => {
          const commentText = commentObj.comment;
          console.log(commentText);
          appendComment(commentText, modalId);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  */
  
  
  






function closePost() {
  const postModal = new bootstrap.Modal(document.getElementById('postModal'));
  postModal.hide(); // Hide the Bootstrap modal
}


closeModal.addEventListener('click', closePost);
