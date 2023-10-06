const getProfile = () => {
    fetch('/api/users/profile')
        .then((response) => response.json())
        .then((data) => {
            console.log('getProfile', data);
        });
}
getProfile();