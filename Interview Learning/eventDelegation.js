// Get the parent element (ul)
const itemList = document.getElementById('item-list');

// Add event listener to the parent element
function delegate(event) {
    // Check if the clicked element is an <li> element
    if (event.target.tagName === 'LI') {
        // Output the text content of the clicked <li> element
        alert('Clicked on: ' + event.target.textContent);
    }
}

itemList.addEventListener('click', (e) => delegate(e));

