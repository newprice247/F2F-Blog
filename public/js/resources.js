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

  const postResource = async (comment, url, tag) => {

    const response = await fetch('/api/resources', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ comment, url, tag })
    });

    if (response.ok) {
      console.log('Resource added successfully!');
    } else {
      document.location.replace('/login');
    }
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

  // This adds NEW Resource data
  function displayResource(data) {
    const resourceDiv = document.createElement('div');
    resourceDiv.className = 'resource-item';
    resourceDiv.setAttribute('data-tag', data.tag); 
    resourceDiv.innerHTML = `
    <div class="resourceInner">
      <h2>New Resource Added:</h2>
      <h4><strong>Comment:</strong></h4> <p> ${data.comment}</p>
      <h4><strong>URL:</strong></h4> <p> <a href="${data.url}" target="_blank" id="urlLinkDisplay">${data.url}</a></p>
      <h4><strong>#Tag:</strong></h4> <p> ${data.tag}</p>
    </div></div>`;

    // displays the New card FIRST/before the other cards
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
      if (resourceTag === tagSearchText || tagSearchText === 'all' || tagSearchText === '') {
        resources[i].style.display = 'block';
      } else {
        resources[i].style.display = 'none';
      }
    }


    // clears search box after
    tagSearchInput.value = '';
    

 // Scroll to the "displayArea" element
 const displayArea = document.getElementById('displayArea');
 displayArea.scrollIntoView({ behavior: 'smooth' });
});

// Listen for the "Enter" key press in the input element
tagSearchInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const tagSearchText = tagSearchInput.value.toLowerCase();
    filterAndScroll(tagSearchText);
    tagSearchInput.value = '';
  }
});




  // search by Tag name by BUTTON which will scroll down to display-area
function filterAndScroll(tag) {
  const resources = document.querySelectorAll('.resource-item');

  for (let i = 0; i < resources.length; i++) {
    const resourceTag = resources[i].getAttribute('data-tag').toLowerCase();
    if (tag === 'all' || resourceTag === tag) {
      resources[i].style.display = 'block'; 
    } else {
      resources[i].style.display = 'none'; 
    }
  }

  // Scroll to the "displayArea" element
  const displayArea = document.getElementById('displayArea');
  displayArea.scrollIntoView({ behavior: 'smooth' });
}

// Tag buttons click event
const tagButtons = document.querySelectorAll('.tag-button');
tagButtons.forEach((button) => {
  button.addEventListener('click', function () {
    const selectedTag = button.getAttribute('data-tag');
    filterAndScroll(selectedTag);
  });
});
})





// this opens F2f menu bar
function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}



// BIG WINNER BUTTON!
document.getElementById('myButton').onclick = function() {
  window.location.href = '../stanley';
};

