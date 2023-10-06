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
