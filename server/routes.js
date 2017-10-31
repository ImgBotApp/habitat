const routes = require('express').Router();
const handleSignup = require('./controllers/signupHandler.js');
const handleLogin = require('./controllers/loginHandler.js');
const handlenNewTask = require('./controllers/newTaskHandler.js');
const {handleCategories, handleNewCategories} = require('./controllers/categoriesHandler');
const handleMarkers = require('./controllers/markerHandler.js');
const handleNewLocation = require('./controllers/newLocationHandler.js')
const getMapMarkers = require('./controllers/getMapMarkers');
const handleTasks = require('./controllers/taskHandler');
const handleDeleteTasks = require('./controllers/deleteTaskHandler');
const handlePicture = require('./controllers/pictureHandler.js');
const handleGetPicture = require('./controllers/getPictureHandler.js');
const { handleToken, handleAuth } = require('./controllers/handleToken');
const handleEditTasks = require('./controllers/editTaskHandler.js');
const getColors = require('./controllers/getColors');
const handleYayTask = require('./controllers/yayTaskHandler.js');
const handleNayTask = require('./controllers/nayTaskHandler.js');
const handleProfileTasks = require('./controllers/profileTasksHandler.js');
const countTasks = require('./controllers/countTasks.js');
const saveFriends = require('./controllers/saveFriends.js');
const getFriends = require('./controllers/getFriends.js');
const categoryPercentage = require('./controllers/categoryPercentage');
const updateLocation = require('./controllers/updateLocation');
const getTimer = require('./controllers/timerGetHandler');
const putPosTimerPoints = require('./controllers/timerPosPointsHandler');
const putNegTimerPoints = require('./controllers/timerNegPointsHandler');
<<<<<<< HEAD
const syncCalendar = require('./controllers/syncCalendar');
const calendarHandler = require('./controllers/calendarHandler');
const handleGetUserInfo = require('./controllers/getUserInfo');
const handleGoogle = require('./controllers/checkGoogle');
const friendLocations = require('./controllers/friendLocations');
=======
const handleGiveGift = require('./controllers/giveGiftHandler.js')
>>>>>>> interactfeature

routes.post('/signup', handleSignup);
routes.get('/login', handleLogin);
routes.post('/newTask', handlenNewTask);
routes.get('/categories', handleCategories);
routes.post('/categories', handleNewCategories);
routes.get('/markers', handleMarkers);
routes.post('/newLocation', handleNewLocation);
routes.get('/mapMarkers', getMapMarkers);
routes.get('/tasks', handleTasks)
routes.delete('/deleteTask', handleDeleteTasks);
routes.get('/tasks', handleTasks);
routes.post('/pictures', handlePicture);
routes.get('/pictures', handleGetPicture);
routes.get('/token', handleToken);
routes.post('/token', handleAuth);
routes.put('/editTask', handleEditTasks);
routes.get('/colors', getColors);
routes.put('/yayTask', handleYayTask);
routes.put('/nayTask', handleNayTask);
routes.get('/completedTasks', handleProfileTasks);
routes.get('/countTasks', countTasks);
routes.get('/categoryPercentage', categoryPercentage);
routes.post('/friends', saveFriends);
routes.get('/friends', getFriends);
routes.put('/updateLocation', updateLocation);
routes.get('/timer', getTimer);
routes.put('/postimer', putPosTimerPoints);
routes.put('/negtimer', putNegTimerPoints)
<<<<<<< HEAD
routes.get('/syncCalendar', syncCalendar);
routes.post('/calendar', calendarHandler);
routes.get('/getUserInfo', handleGetUserInfo);
routes.get('/checkGoogle', handleGoogle);
routes.get('/friendLocations', friendLocations);
=======
routes.put('/gift', handleGiveGift)
>>>>>>> interactfeature

module.exports = routes;
