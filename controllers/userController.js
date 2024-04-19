const User = require('../models/Users');
// Function to get user details
async function getUserDetails(req, res) {
    try {
      const userId = req.session.userId; // Retrieve user ID from session
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  // Function to update user's name
  async function updateName(req, res) {
    try {
      // Check if userId exists in session
      if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const userId = req.session.userId; // Extract user ID from session
      const { name } = req.body;
      await User.findByIdAndUpdate(userId, { name });
      res.json({ message: 'Name updated successfully' });
    } catch (error) {
      console.error('Error updating name:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  
  // Function to update user's password
  async function updatePassword(req, res) {
    try {
        // Check if userId exists in session
        if (!req.session || !req.session.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const userId = req.session.userId; // Extract user ID from session
        const { password } = req.body;
        await User.findByIdAndUpdate(userId, { password });
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

  
  async function deleteAccount(req, res) {
    try {
      // Check if userId exists in req.user
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const userId = req.user.userId; // Extract user ID from request object
      await User.findByIdAndDelete(userId);
      res.json({ message: 'Account deleted successfully' });
    } catch (error) {
      console.error('Error deleting account:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  module.exports = { getUserDetails, updateName, updatePassword, deleteAccount };