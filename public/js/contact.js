const getProfileImg = () => {
    fetch('/api/users/profile')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if (data !== null) {
              console.log('getProfileImg', data.id);
                $('.user-profile-img').html(`
                <p>${data.username}</p>
                <img src="../images/tmp/${data.id}.jpg" class="profile-pic" alt="profile-pic" width="40" height="40">
                <p><a href="../api/users/logout">Logout</a></p>
                `);
            } else {
                $('.user-profile-img').html(`
                <img src="../images/Profile-pic.jpg" alt="profile-pic" width="40" height="40">
                <p><a href="../login">Login</a></p>
                `);
            }
        });
};
getProfileImg();