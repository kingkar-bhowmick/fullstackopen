  // Import Express framework
const mongoose = require('mongoose')

//Refactored to its own module Config
const {PORT, MONGODB_URI} = require('./utils/config')

const {app} = require('./app')


// Given to the Config
mongoose.connect(MONGODB_URI, { family: 4 })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


/* 
### __What is Middleware?__

Middleware functions have access to the __request__ and __response__ objects. They can:

- Execute any code
- Modify request/response objects
- End the request-response cycle
- Call the next middleware

```javascript
app.use(express.json())  // ← This is middleware!
```

__What `express.json()` does:__

- It's a built-in Express middleware
- It looks at incoming requests with `Content-Type: application/json`
- It parses the JSON body and makes it available as `request.body`
- Without this, `request.body` would be `undefined`!

__Middleware Order Matters:__

```javascript
app.use(express.json())    // Must come BEFORE routes
app.get('/api/blogs', ...) // Routes come AFTER
app.post('/api/blogs', ...)
```
*/