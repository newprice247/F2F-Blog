document.addEventListener('DOMContentLoaded', function () {
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

    // Display the data (you can replace this with sending the data to your server)
    displayResource(resourceData);

    // Clear the form fields
    clearFormFields();
  });

  function displayResource(data) {
    const resourceDiv = document.createElement('div');
    resourceDiv.className = 'resource-item';
    resourceDiv.innerHTML = `
      <p><strong>Comment:</strong> ${data.comment}</p>
      <p><strong>URL:</strong> ${data.url}</p>
      <p><strong>Tag:</strong> ${data.tag}</p>
    `;

    displayArea.appendChild(resourceDiv);
  }

  function clearFormFields() {
    document.getElementById('commentBox').value = '';
    document.getElementById('urlLink').value = '';
    document.getElementById('tagID').value = 'none';
  }
});








function handleSubmit(event) {
  event.preventDefault();

  // Get the values from the form fields
  const comment = document.getElementById('commentBox').value;
  const url = document.getElementById('urlLink').value;
  const tagName = document.getElementById('tagID').value;


  // Create a display message
  const displayMessage = `
      <h3>Submitted Data:</h3>
      <p><strong>Comment:</strong> ${comment}</p>
      <p><strong>URL:</strong> <a href="${url}" target="_blank" id="urlLinkDisplay">${url}</a></p>
      <p><strong>Tag Name:</strong> ${tagName}</p>
      `;


  // Display the message in the "displayArea" div
  document.getElementById('displayArea').innerHTML = displayMessage;
}


const urlLinkDisplay = document.getElementById('urlLinkDisplay');
    if (urlLinkDisplay) {
        urlLinkDisplay.addEventListener('click', () => {
           window.open(url, '_blank');
        });
    }


// Add an event listener to the form
const form = document.getElementById('myForm');
if (form) {
  form.addEventListener('submit', handleSubmit);
}
