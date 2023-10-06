const getProfile = () => {
    fetch('/api/users/profile')
        .then((response) => response.json())
        .then((data) => {
            console.log('getProfile', data);
            $('.user-header').append(`<h1>Welcome ${data.username}... </h1>`);
            for (let i = 0; i < data.contents.length; i++) {
                $('#userPostTable').append(`
            <tr>
                <th scope="row">${data.contents[i].createdAt}</th>
                <td>${data.contents[i].title}</td>
                <td>${data.contents[i].content}</td>
                <td><i class="bi bi-pencil-square edit-post"></i><i class="bi bi-trash3-fill"></i></td>
              </tr>`);
            }
        })
}
getProfile()