const cloudinary = require('cloudinary');
const express = require('express');
const app = express();

cloudinary.v2.config({
    cloud_name: 'de7ydiqpy',
    api_key: '838891588721587',
    api_secret: 'UI_ZM8K3I-tVxiy5lzozIqn1EgQ',
    secure: true,
});

// Starting server
app.listen(4000, () => {
    console.log(`Server running at 4000`);
});