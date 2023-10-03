
var closeModal = document.querySelectorAll(".close");
document.addEventListener("DOMContentLoaded", function() {
    // Your code here
  
  
  var modal = document.getElementById("postModal");


function openPost(imageSrc, postTitle, postText) {
    var postImage = document.getElementById("postImage");
    var postContent = document.getElementById("postContent");

    postImage.src = imageSrc;
    postContent.innerHTML = "<h2>" + postTitle + "</h2><p>" + postText + "</p>"; //inner html of modal

    modal.style.display = "block"; //show when clicked "see post"
}
function closePost() {
    modal.style.display = "none";
}


var seePostButtons = document.querySelectorAll(".btn-primary");
seePostButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        var card = this.closest(".card");
        var imageSrc = card.querySelector(".card-img-top").src;
        var postTitle = card.querySelector(".card-title").textContent;
        var postText = card.querySelector(".card-text").textContent;

        openPost(imageSrc, postTitle, postText);
    });
});

});

closeModal.addEventListener("click", closePost);