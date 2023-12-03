// routes/teamRoutes.js
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.post('/api/team', teamController.createTeam);
router.get('/api/team',teamController.getAllTeams);
router.get('/api/team/:id', teamController.getTeamById);

module.exports= router;