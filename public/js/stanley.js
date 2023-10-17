// Handles grabbing the user's profile picture and username for the navbar, as well as the logout button if the user is logged in
const getProfileImg = () => {
  fetch('/api/users/profile')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if (data !== null) {
        console.log('getProfileImg', data.id);
        $('.user-profile-img').html(`
                <div class="center-vertically">
                  <img src="../images/tmp/${data.id}.jpg" class="profile-pic" alt="profile-pic" width="40" height="40">
                  <p class="profile-p">${data.username}</p>
                </div>
                `);
        $('.nav-links').append(`
                <li><a href="../api/users/logout">Logout</a></li>
                `);
      } else {
        $('.nav-links').append(`
                <li><a href="../login">Login</a></li>
                `);
      }
    });
};
getProfileImg();


 //Function for NavBar

 function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}