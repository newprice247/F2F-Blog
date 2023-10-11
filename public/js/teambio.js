const getProfileImg = () => {
    fetch('/api/users/profile')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if (data !== null) {
              console.log('getProfileImg', data.id);
                $('.user-profile-img').html(`<img src="../images/tmp/${data.id}.jpg" class="profile-pic" alt="profile-pic" width="40" height="40">`);
            } else {
                $('.user-profile-img').html(`<img src="../images/Profile-pic.jpg" alt="profile-pic" width="40" height="40">`);
            }
        });
};

getProfileImg();