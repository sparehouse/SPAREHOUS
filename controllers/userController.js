const User = require('../models/Users');
const bcrypt = require('bcrypt');
// Function to get user details
async function getUserDetails(req, res) {
    try {
      const userId = req.session.userId; // Retrieve user ID from session
     
      
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
      const userId = req.session.userId; // Extract user ID from session
      const { oldPassword, newPassword } = req.body;
  
      // Retrieve the user from the database
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Verify the old password
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Incorrect old password' });
      }
  
      // Validate the new password
      if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the password in the database
      await User.findByIdAndUpdate(userId, { password: hashedPassword });
  
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  

  
async function deleteAccount(req, res) {
    try {
       
        const userId = req.session.userId; // Extract user ID from session
        await User.findByIdAndDelete(userId);
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


  
  module.exports = { getUserDetails, updateName, updatePassword, deleteAccount };