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
      <p><strong>URL:</strong> < ${url}</p>
      <p><strong>Tag Name:</strong> ${tagName}</p>
  `;

  // Display the message in the "displayArea" div
  document.getElementById('displayArea').innerHTML = displayMessage;
}

// Add an event listener to the form
const form = document.getElementById('myForm');
if (form) {
  form.addEventListener('submit', handleSubmit);
}
