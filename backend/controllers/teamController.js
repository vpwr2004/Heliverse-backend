// controllers/teamController.js
const Team = require('../models/Team');
const User= require('../models/User');
// Create a new team
exports.createTeam = async (req, res) => {
  try {
    const {teamName, userIds } = req.body;
    
    // console.log('data for saving', teamName, userIds);
    const team = new Team({ TeamName:teamName, users: userIds });
    await team.save();
    // console.log('teams',team);
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get All created teams
exports.getAllTeams=async(req,res)=>{
  try{
    const teams=await Team.find().populate('users');
    console.log('allTeams from backend',teams);
    res.status(200).json(teams);

  }
  catch(error){
    res.status(500).json({error: 'Server error'});
  }
}

// Get teams by id
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('users');
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
