// const ensureAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.status(401).json({ error: 'You must be logged in to access this resource' });
// };

// app.get('/jobs', ensureAuthenticated, (req, res) => {
//     // Your code to return jobs data
// });
