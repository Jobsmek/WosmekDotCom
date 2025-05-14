const express = require('express');
const app = express();
const PORT = 3500;

app.all('*', (req, res) => {
    res.send('Test');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));