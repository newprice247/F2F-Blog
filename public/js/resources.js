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


document.addEventListener('DOMContentLoaded', function () {
  const getResources = () => {
    fetch('/api/resources')
      .then((response) => response.json())
      .then((data) => {
        console.log('getResources', data);
        for (let i = 0; i < data.length; i++) {
          $('#displayArea').append(`
            <div class="resource-item" data-tag="${data[i].tag}"> <!-- Add data-tag attribute -->
              <div class="resourceInner">
             <h3>Resource:</h3>
              <h4><strong>Username:</strong></h4> <p> ${data[i].user.username}</p>        
              <h4><strong>Comment:</strong></h4> <p> ${data[i].comment}</p>
              <h4><strong>URL:</strong></h4> <p> <a href="${data[i].url}" target="_blank" id="urlLinkDisplay">${data[i].url}</a></p>
              <h4><strong>#Tag:</strong></h4> <p> ${data[i].tag}</p>
            </div>
            </div>`);
            console.log(data)
        }
      });
  };
  getResources();

  const postResource = (comment, url, tag) => {
    fetch('/api/resources', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment, url, tag }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('postResource', data);
      });
  };



  // Grabs input from Form and displays after submitting
  const form = document.getElementById('myForm');
  const displayArea = document.getElementById('displayArea');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const commentBox = document.getElementById('commentBox').value;
    const urlLink = document.getElementById('urlLink').value;
    const tagID = document.getElementById('tagID').value;

    // Create an object to hold the data
    const resourceData = {
      comment: commentBox,
      url: urlLink,
      tag: tagID,
    };

    // Display the data
    displayResource(resourceData);
    postResource(commentBox, urlLink, tagID);

    // Clear the form fields
    clearFormFields();
  });

  // This adds new data
  function displayResource(data) {
    const resourceDiv = document.createElement('div');
    resourceDiv.className = 'resource-item';
    resourceDiv.setAttribute('data-tag', data.tag); // Add data-tag attribute
    resourceDiv.innerHTML = `
    <div class="resourceInner">
      <h2>New Resource Added:</h2>
      <h4><strong>Comment:</strong></h4> <p> ${data.comment}</p>
      <h4><strong>URL:</strong></h4> <p> <a href="${data.url}" target="_blank" id="urlLinkDisplay">${data.url}</a></p>
      <h4><strong>#Tag:</strong></h4> <p> ${data.tag}</p>
    </div></div>`;

    displayArea.insertBefore(resourceDiv, displayArea.firstChild);
  }

  // clears the form after submitting input
  function clearFormFields() {
    document.getElementById('commentBox').value = '';
    document.getElementById('urlLink').value = '';
    document.getElementById('tagID').value = 'none';
  }


 // Search by tagName in SEARCH BOX
  const tagSearchButton = document.getElementById('tagSearchButton');

  tagSearchButton.addEventListener('click', function () {
    const tagSearchText = document.getElementById('tagSearchInput').value.toLowerCase();
    const resources = document.querySelectorAll('.resource-item');

    for (let i = 0; i < resources.length; i++) {
      const resourceTag = resources[i].getAttribute('data-tag').toLowerCase();
      if (resourceTag.includes(tagSearchText) || tagSearchText === 'all') {
        resources[i].style.display = 'block';
      } else {
        resources[i].style.display = 'none';
      }
    }
    // clears search box after
    tagSearchInput.value = '';
  
  });


// search by Tag name by BUTTON
  const tagButtons = document.querySelectorAll('.tag-button');
  tagButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const selectedTag = button.getAttribute('data-tag');
      const resources = document.querySelectorAll('.resource-item');

      for (let i = 0; i < resources.length; i++) {
        const resourceTag = resources[i].getAttribute('data-tag').toLowerCase();
        if (selectedTag === 'all' || resourceTag === selectedTag) {
          resources[i].style.display = 'block'; // Show the button
        } else {
          resources[i].style.display = 'none'; // Hide the button
        }
      }
    });
  });
})

function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}




