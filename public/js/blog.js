
export const getContent = () => {
        fetch('/api/content')
            .then((response) => response.json())
            .then((data) => {
    
                console.log('getContent', data);
                for (let i = 0; i < data.length; i++) {
                    $('.blog-post-area').append(`
        <div class="card" style="width: 18rem;">
            <img src="../images/pre-post2.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${data[i].title}</h5>
              <div class="profile-img">
                <img src="../images/pre-profile-pic2.jpeg" alt="profile-pic" width="40" height="40">
                </div>
                <div class="date-created">
                <p><i>${data[i].title} posted </i>${data[i].created_at}</p>
                <p class="card-text">"${data[i].content}"</p>
                
              <a href="#" class="btn btn-primary">See post</a>
              </div>
            
            </div>
          </div>`);
                } 
                 
            });
  };
  getContent(); 


document.addEventListener('DOMContentLoaded', function () {

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


