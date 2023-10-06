
const postButton = document.getElementById("post-button");
const saveButton = document.getElementById("save-post");
import { getContent } from './blog.js';

function addPost(e) {
    const title = document.querySelector(".postTitle").value;
    const content = document.querySelector(".postContent").value;
e.preventDefault();

const postData = {
    title: title,
    content: content,

};

fetch('http://localhost:3001/api/content', { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),

})
.then((res) => res.json())
.then((data) => {
   console.log(data);
   getContent();
})

.catch((err) => console.error('Oops, sorry, post could not be added. Error:', err));

};
/*
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
  
    


code has error in console
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

document.addEventListener('DOMContentLoaded', function () {
    //Function to post a new post to the api, using the user id saved in the session
    const postUserContent = (title, content) => {
        fetch('/api/content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content, title }),

        })
            .then((response) => response.json())
            .then((data) => {
                console.log('postResource', data);
            });
    };
    //Function that uses the information in the form to post a new post to the api
    $('#post-form').submit(function (event) {
        event.preventDefault();
        const postTitle = document.getElementById('title').value;
        const postContent = document.getElementById('content').value;
        // const postData = {
        //     Title: postTitle,
        //     Content: postContent,
        // };
        postUserContent(postTitle, postContent);
        // displayPost(postData);   //refer to the comment below
        document.location.replace('/crud');
    });




postButton.addEventListener("click", addPost);
saveButton.addEventListener("click", savePost);
*/
postButton.addEventListener("click", addPost);



    // the displayPost function should be called after the postUserContent function is called, and it should include functionality to immediately load the user's Post History table with the new post included, at the moment i un-hid the table so that we can see the requests are going through


    // function displayPost(data) {
    //     const newPost = document.createElement('div');
    //     newPost.classList.add('addedPost');

    //     newPost.innerHTML = `
    //    <div class="card" style="width: 18rem;">
    //       <img src="../images/pre-post1.jpg" class="card-img-top" alt="...">
    //       <div class="card-body">
    //         <h5 class="card-title">${data.title}</h5>
    //         <div class="profile-img">
    //           <img src="../images/pre-profile-pic1.jpg" alt="profile-pic" width="40" height="40">
    //         </div>
    //         <div class="date-created">
    //           <p><i>${data.username} posted</i> 5 September, 2023</p>
    //           <p class="card-text">"${data.content}"</p>
    //           <a href="#" class="btn btn-primary">See post</a>
    //         </div>
    //       </div>
    //     </div>`;
    //     const blogPostArea = document.getElementById('blog-post-area');
    //     blogPostArea.appendChild(newPost);

    //     alert('new post added!');
    // }




    // function savePost(e) {
    //     e.preventDefault();
    //     fetch('api/content')
    //         .then(res => res.json())
    //         .then(data => {
    //             const postHistoryTable = document.getElementById('userPostTable');

    //             data.forEach(item => {
    //                 const row = document.createElement('tr');
    //                 row.innerHTML = `
    //             <td>${item.createdAt}</td>
    //             <td>${item.title}</td>
    //             <td>${item.content}</td>
    //             <td><i class="bi bi-pencil-square edit-post"></i><i class="bi bi-trash3-fill"></i></td>

    //             `;

    //                 postHistoryTable.appendChild(row);

    //             });
    //         }).catch((error) => console.error('Post could not be found:', error));
    // }
    //Function to send a delete request to the api
    const deletePost = async (postId) => {
        console.log('trying to delete post');
        const response = await fetch(`/api/content/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            console.log('Post has been deleted');
            //Reloads the page to show the post has been deleted
            document.location.replace('/crud');
        } else {
            console.error('Post could not be deleted.');
        }
    }
    //Function to get the user's profile information, including their posts
    const getProfile = () => {
        fetch('/api/users/profile')
            .then((response) => response.json())
            .then((data) => {
                console.log('getProfile', data);
                $('.user-header').append(`<h1>Welcome ${data.username}... </h1>`);

                //once the user is logged in, the user's posts will be displayed in the table by default

                for (let i = 0; i < data.contents.length; i++) {
                    $('#userPostTable').append(`
                        <tr id="${data.contents[i].id}">
                            <th scope="row">${data.contents[i].createdAt}</th>
                            <td>${data.contents[i].title}</td>
                            <td>${data.contents[i].content}</td>
                            <td>
                                <button class="edit-post btn"><i class="bi bi-pencil-square"></i></button>
                                <button class="delete-post btn"><i class="bi bi-trash3-fill"></i></button>
                            </td>
                        </tr>`);
                }
                //Event listener for delete button
                $('.delete-post').on('click', (e) => {
                    console.log('delete button clicked')
                    e.preventDefault();
                    //Targets the closest row to the delete button and gets the id of the post, which is saved as the logged in user's id
                    const row = e.target.closest('tr');
                    //Parses the id from the row, which is how the api will find the post to delete
                    const postId = JSON.parse(row.getAttribute('id'))
                    //Calls the deletePost function, passing in the postId
                    deletePost(postId)
                });
            })
    }
    getProfile()

    // function editPost(e) {
    //     const editRow = e.target.closest('.edit-post');
    //     if (!editbutton) return;

    //     const row = editButton.closest('tr'); //this will find the closest row that edit button was clicked
    //     if (!row) return;

    //     const rowToEdit = row.getAttribute('data-post-id');
    //     if (!rowToEdit) return;

    //     fetch('/api/content/${postId}', {
    //         method: 'PUT',
    //     })
    //         .then((res) => {
    //             if (res.ok) {
    //                 row.update(); //adding more logic, this needs to edit post and post it back and save post also
    //                 console.log('Post has been updated');
    //             } else {
    //                 console.error('Error updating post.');
    //             }
    //         })
    //         .catch((error) => console.error('Eroor:', error));
    // }
    // const editIcon = document.querySelectorAll('.edit-post');
    // editIcon.forEach((editButton) => {
    //     editButton.addEventListener('click', editPost);

    // });

});

