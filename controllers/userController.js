const User = require('../models/Users');
// Function to get user details
async function getUserDetails(req, res) {
    try {
      const userId = req.user.userId; // Extract user ID from request object
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
      const userId = req.user.userId; // Extract user ID from request object
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
      const userId = req.user.userId; // Extract user ID from request object
      const { password } = req.body;
      await User.findByIdAndUpdate(userId, { password });
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  // Function to delete user account
  async function deleteAccount(req, res) {
    try {
      const userId = req.user.userId; // Extract user ID from request object
      await User.findByIdAndDelete(userId);
      res.json({ message: 'Account deleted successfully' });
    } catch (error) {
      console.error('Error deleting account:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  module.exports = { getUserDetails, updateName, updatePassword, deleteAccount };