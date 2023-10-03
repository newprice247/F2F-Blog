var modal = document.getElementById("postModal");
var closeModal = document.getElementById("close")[0];

function openPost(imageSrc, postTitle, postText) {
    var postImage = document.getElementById("postImage");
    var postContent = document.getElementById("postContent");

    postImage.src = imageSrc;
    postContent.innerHTML = "<h2>" + postTitle + "</h2><p>" + postText + "</p>";

    modal.style.display = "block";
}

function closePost() {
    modal.style.display = "none";
}