const express = require('express')
const app = express()
const path = require('path')
const {logger} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3500

app.use(logger)

//ability to process JSON data  
app.use(express.json())

// third party middleware 
app.use(cookieParser())

// this is middleware 
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))


app.use((req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'), (err) => {
            if (err) {
                console.error('Error sending 404.html:', err);
                res.type('txt').send('404 Not Found');
            }
        });
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))