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
