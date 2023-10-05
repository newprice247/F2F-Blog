document.addEventListener('DOMContentLoaded', function() {


var closeModal = document.getElementById("close");

    // Your code here
  
   
  var modal = document.getElementById("postModal");

  function closePost() {
    modal.style.display = "none";
}

function openPost(imageSrc, postTitle, postText, profilePicSrc) {
    var postImage = document.getElementById("postImage");
    var postContent = document.getElementById("postContent");
    var postProfilePic = document.getElementById("modalProfilePic");
    var profilePicSrc = "../images/Profile-pic.jpg"; // Profile pic for the modal post's author


    postImage.src = imageSrc;    
    postContent.innerHTML = "<h2>" + postTitle + "</h2><p>" + postText + "</p>";
    postProfilePic.src = profilePicSrc;

    postProfilePic.width = 40;
    postProfilePic.height = 40;

    modal.style.display = "block"; //show when clicked "see post"
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

closeModal.addEventListener("click", closePost);
});