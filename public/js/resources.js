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

    // Display the data// eventually saving the data input
    displayResource(resourceData);
  

    // Clear the form fields
    clearFormFields();
  });

  function displayResource(data) {
    const resourceDiv = document.createElement('div');
    resourceDiv.className = 'resource-item';
    resourceDiv.innerHTML = `
      <h3>New Resource Added:</h3>
      <p><strong>Comment:</strong> ${data.comment}</p>
      <p><strong>URL:</strong> <a href="${data.url}" target="_blank" id="urlLinkDisplay">${data.url}</a></p>
      <p><strong>Tag:</strong> ${data.tag}</p>
    `;

    displayArea.appendChild(resourceDiv);
  }

  // clears the form after submitting input
  function clearFormFields() {
    document.getElementById('commentBox').value = '';
    document.getElementById('urlLink').value = '';
    document.getElementById('tagID').value = 'none';
  }
});


