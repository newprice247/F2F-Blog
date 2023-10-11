
const postButton = document.getElementById("post-button");

function addPost(e) {
    const title = document.querySelector(".postTitle").value;
    const content = document.querySelector(".postContent").value;
    e.preventDefault();

    const postData = {
        title: title,
        content: content,
    };

    // Check if this is an edit or a new post
    if (postButton.getAttribute("data-edit")) {
        const postId = postButton.getAttribute("data-edit");
        // Send a PUT request to update the post with postId
        fetch(`/api/content/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // Clear the edit flag
                postButton.removeAttribute("data-edit");
                // getContent();
                document.location.replace('/crud');
            })
            
            .catch((err) => console.error('Oops, sorry, post could not be updated. Error:', err));
    } else {
        // Send a POST request to add a new post
        fetch('/api/content', {
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
    }
}

function addComment(e) {
    e.preventDefault();

    const comment = document.querySelector(".textarea").value;

    const commentData = {
        comment: comment,

    };

    fetch('api/comment', {    //fetch api content 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            document.location.replace('/crud');

        })

        .catch((err) => console.error('Oops, sorry, post could not be added. Error:', err));

};



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

const editPost = async (postId) => {
    console.log('trying to edit post');
    const response = await fetch(`/api/content/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        console.log('Post has been edited');
        //Reloads the page to show the post has been edited
        document.location.replace('/crud');
    } else {
        console.error('Post could not be edited.');
    }
}

//Onload the table needs to show the user logged post data in table already there  when they enter the crud page 
//data is not loading in table provided, if we can switch something for it to load in table 

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
            $('.edit-post').on('click', (e) => {
                e.preventDefault();
                const row = e.target.closest('tr');
                const postId = JSON.parse(row.getAttribute('id'));
                const post = data.contents.find(post => post.id === postId);

                // Populate the title and content fields with the post's data
                document.querySelector(".postTitle").value = post.title;
                document.querySelector(".postContent").value = post.content;

                // Optionally, set a flag or data attribute to identify this as an edit
                document.querySelector("#post-button").setAttribute("data-edit", postId);
            });

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


//this button will add post to blog page using the getcontent function  and send the post data to database 
postButton.addEventListener("click", addPost);
// commentButton.addEventListener("click", addComment);