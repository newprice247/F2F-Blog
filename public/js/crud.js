const postButton = document.getElementById(post-button);
const saveButton = document.getElementById(save-post);
function addPost(e) {;

e.preventDefault();

const postTitle = document.getElementById('title');
const postContent = document.getElementById('content');

const postData = {
    Title: postTitle,
    Content: postContent,
    createdAt: new Date().toISOString(),

};

fetch('/api/posts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),

})
.then(res => res.json())
.then(data => {
    console.log('Post added:', data)
    alert('New post added!');

})
.catch(err => console.error('oops sorry post could not be added. Error!'));
}

function savePost() {
    fetch('api/post')
    .then(res => res.json())
    .then(data => {
        const postHistoryTable = document.getElementById('userPostTable');

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${item.createdAt}</td>
            <td>${item.title}</td>
            <td>${item.content}</td>
            `;

        postHistoryTable.appendChild(row);
                
        });
    }).catch(error => console.error('Post could not be found:', error));
}


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



postButton.addEventListener("click", addPost);
saveButton.addEventListener("click", savePost);