const getProfileImg = () => {
    fetch('/api/users/profile')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data !== null) {
          console.log('getProfileImg', data.id);
          $('.user-profile-img').html(`
                <div class="center-vertically">
                  <a href="../api/users/logout">Logout</a>
                  <img src="../images/tmp/${data.id}.jpg" class="profile-pic" alt="profile-pic" width="40" height="40">
                  <p class="profile-p">${data.username}</p>
                </div>
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