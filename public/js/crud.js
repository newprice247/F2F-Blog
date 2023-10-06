const postButton = document.getElementById("post-button");
const saveButton = document.getElementById("save-post");

function addPost(e) {;

e.preventDefault();

const postTitle = document.getElementById('title');
const postContent = document.getElementById('content');

const postData = {
    Title: postTitle,
    Content: postContent,

};

fetch('/api/content', { /*route doesn't work 404 bad connectoon, i tried control c, i tried locally and deployed */
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),

})
.then((res) => res.json())
.then((data) => {
    console.log('Post added:', data)  
   const newPost = document.createElement('div');
   newPost.classList.add('addedPost');

   newPost.innerHTML = `
   <div class="card" style="width: 18rem;">
      <img src="../images/pre-post1.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <div class="profile-img">
          <img src="../images/pre-profile-pic1.jpg" alt="profile-pic" width="40" height="40">
        </div>
        <div class="date-created">
          <p><i>${data.username} posted</i> 5 September, 2023</p>
          <p class="card-text">"${data.content}"</p>
          <a href="#" class="btn btn-primary">See post</a>
        </div>
      </div>
    </div>`;
    const blogPostArea = document.getElementById('blog-post-area');
    blogPostArea.appendChild(newPost);

    alert('new post added!')

})
.catch((err) => console.error('oops sorry post could not be added. Error!'));
}

function savePost(e) {
    e.preventDefault();
    fetch('api/content')
    .then(res => res.json())
    .then(data => {
        const postHistoryTable = document.getElementById('userPostTable');

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${item.createdAt}</td>
            <td>${item.title}</td>
            <td>${item.content}</td>
            <td><i class="bi bi-pencil-square edit-post"></i><i class="bi bi-trash3-fill"></i></td>
                
            `;

        postHistoryTable.appendChild(row);
                
        });
    }).catch((error) => console.error('Post could not be found:', error));
}

function deletePost(e) {
    const row = e.target.closest('tr');
    if(!row) return;

    const postId = row.getAttribute('data-post-id');
    if(!postId) return;

    fetch('/api/content/${postId}', { //api accept data-post-id to find closest row to delete post 
        method: 'DELETE',
    })
    .then((res) => {
        if(res.ok) {
        row.remove();
        console.log('Post removed.');
    } else { 
        console.error('Post could not be deleted.');
    }
})
    .catch((error) => console.error('Eroor:', error));
}
const trash = document.querySelectorAll('.delete-post');
trash.forEach((deleteButton) => {
    deleteButton.addEventListener('click', deletePost)
});
    
function editPost(e) {
const editRow = e.target.closest('.edit-post');
if(!editbutton) return;

const row = editButton.closest('tr'); //this will find the closest row that edit button was clicked
if(!row) return;

const rowToEdit = row.getAttribute('data-post-id');
if(!rowToEdit) return;

fetch('/api/content/${postId}', {
    method: 'PUT',
})
.then((res) => {
    if(res.ok) {
        row.update(); //adding more logic, this needs to edit post and post it back and save post also
        console.log('Post has been updated');
    } else {
        console.error('Error updating post.');
    }
})
    .catch((error) => console.error('Eroor:', error));
}
    const editIcon = document.querySelectorAll('.edit-post');
    editIcon.forEach((editButton) => {
        editButton.addEventListener('click', editPost);

    });
  
    


/* code has error in console
const getProfile = () => {
    fetch('/api/users/profile')
        .then((response) => response.json()) 
        .then((data) => {
            console.log('getProfile', data);
            $('.user-header').append(`<h1>Welcome ${data.username}... </h1>`);
            for (let i = 0; i < data.contents.length; i++) {
                $('#userPostTable').append(`
            <tr>
                <th scope="row">${data.contents[i].createdAt}</th>
                <td>${data.contents[i].title}</td>
                <td>${data.contents[i].content}</td>
                <td><i class="bi bi-pencil-square edit-post"></i><i class="bi bi-trash3-fill"></i></td>
              </tr>`);
            }
        })
}
getProfile()

*/

postButton.addEventListener("click", addPost);
saveButton.addEventListener("click", savePost);
