import React, { useState, useEffect } from 'react';
import '../../styles/userinfo.css';

const UsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:80/users.php');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUsers(data);
        console.log('User Inventory:', data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchRolesData = async () => {
      try {
        const response = await fetch('http://localhost:80/roles.php');
        if (!response.ok) {
          throw new Error('Failed to fetch roles data');
        }
        const data = await response.json();
        // Modify the role data structure to have "id" and "name" properties
        const modifiedRolesData = data.map(role => ({ id: role.id, name: role.name }));
        setRoles(modifiedRolesData);
        console.log('Roles:', modifiedRolesData);
      } catch (error) {
        console.error('Error fetching roles data:', error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchUsers(), fetchRolesData()]);
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  const handleRoleChange = (userId, event) => {
    const roleName = event.target.value;
    const roleId = roles.find(role => role.name === roleName)?.id; // Find the corresponding roleId
    setSelectedRoles({ ...selectedRoles, [userId]: roleId });
  };

  const handleRoleSubmit = (userId) => {
    const roleId = selectedRoles[userId];
  
    if (!roleId) {
      console.error(`Role not selected for user ${userId}`);
      return;
    }
  
    console.log(`Setting roles for user ${userId} to:`, roleId);
  
    // Send PUT request to update user roles
    fetch(`http://localhost:80/setRoles.php?user_id=${userId}&role=${roleId}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // or 'application/x-www-form-urlencoded' based on your PHP script
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log('User roles updated successfully:', data);
  })
  .catch((error) => {
    console.error('Error updating user roles:', error);
  });
  };
  

  return (
    <div>
      <h3>User Inventory</h3>
      {users.map((user, index) => (
        <div key={index}>
          <p>Username: {user.username}</p>
          <img src={`http://localhost:80/profile_pictures/${user.profile_pics}`} alt={user.username} className='user-image' style={{ width: '100px', height: '100px' }} />
          <p>Roles: {user.roles}</p>
          <select value={selectedRoles[user.user_id] || ''} onChange={(event) => handleRoleChange(user.user_id, event)}>
            <option value="">Select role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          <button onClick={() => handleRoleSubmit(user.user_id)}>Confirm</button>
        </div>
      ))}
    </div>
  );
};

export default UsersDashboard;
