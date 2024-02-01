import { faCode, faPen } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon names you want to use
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Assuming you're using Font Awesome
import React, { useEffect, useState } from "react";
import styles from "../../styles/admin.module.css";
import "../../styles/userinfo.css";
import SelectComponent from "./select";

const UsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:80/users.php");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUsers(data);
        console.log("User Inventory:", data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchRolesData = async () => {
      try {
        const response = await fetch("http://localhost:80/roles.php");
        if (!response.ok) {
          throw new Error("Failed to fetch roles data");
        }
        const data = await response.json();
        // Modify the role data structure to have "id" and "name" properties
        const modifiedRolesData = data.map((role) => ({
          id: role.id,
          name: role.name,
        }));
        setRoles(modifiedRolesData);
        console.log("Roles:", modifiedRolesData);
      } catch (error) {
        console.error("Error fetching roles data:", error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchUsers(), fetchRolesData()]);
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  const mapRolesToIcons = (roles) => {
    // Map roles to corresponding icons
    const roleIcons = roles.map((role, index) => {
      let icon = null;
      if (role.name === "artist") {
        icon = <FontAwesomeIcon icon={faPen} />;
      } else if (role.name === "developer") {
        icon = <FontAwesomeIcon icon={faCode} />;
      }
      // ... map other roles to icons

      return {
        value: role.name,
        label: (
          <span key={index}>
            {icon} {role.name}
          </span>
        ),
      };
    });

    return roleIcons;
  };
  const handleRoleChange = (userId, selectedValue) => {
    const roleName = selectedValue.value;
    const roleId = roles.find((role) => role.id === roleName)?.id;
    console.log(`Setting role for user ${userId} to:`, roleId);
    console.log("Selected roles:", roleName); // Log the selected roles
    setSelectedRoles({ [userId]: roleId });
    console.log(
      `Selected roles: ${Array.isArray(selectedRoles) ? selectedRoles.join(', ') : selectedRoles}`,
      `User ID: ${userId}`,
      `Role ID: ${roleId}`,
      `Selected value: ${selectedValue}`,
      `Roles: ${roles.map(role => role.name).join(', ')}`,
      `Mapped roles to icons: ${mapRolesToIcons(roles).join(', ')}`,
      `Role ID found: ${roles.find((role) => role.id === roleName)?.id}`
    );
  };

  // Log the roles array to verify the role data
  console.log("Roles:", roles);

  const handleRoleSubmit = (userId) => {
    const roleId = selectedRoles[userId];
    console.log(`Setting role for user ${userId} to:`, roleId);
    if (!roleId) {
      console.error(`Role not selected for user ${userId}`);
      return;
    }

    console.log(`Setting roles for user ${userId} to:`, roleId);

    // Send PUT request to update user roles
    fetch(`http://localhost:80/setRoles.php`, {
      method: "POST",
      body: JSON.stringify({ user_id: userId, role: roleId }),

      headers: {
        "Content-Type": "application/json", // or 'application/x-www-form-urlencoded' based on your PHP script
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User roles updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error updating user roles:", error);
      });
  };

  const handleRoleDelete = (userId) => {
    console.log(`Deleting role for user ${userId}`);
    const roleId = selectedRoles[userId];

    if (!roleId) {
      console.error(`Role not selected for user ${userId}`);
      return;
    }
    // Send DELETE request to delete user roles
    fetch(`http://localhost:80/deleteRole.php`, {
      method: "POST",
      body: JSON.stringify({ user_id: userId, role_id: roleId }),
      headers: {
        "Content-Type": "application/json", // or 'application/x-www-form-urlencoded' based on your PHP script
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User roles deleted successfully:", data);
      })
      .catch((error) => {
        console.error("Error deleting user roles:", error);
      });
  };


  return (
    <div>
      <h3 className={styles.title}>Users</h3>
      {users.map((user, index) => (
        <div key={index} className={styles.userContainer}>
          <p>Username: {user.username}</p>
          <img
            src={`http://localhost:80/profile_pictures/${user.profile_pics}`}
            alt={user.username}
            className={styles.userImage}
          />
          <p className={styles.userRoles}>Roles: {user.roles}</p>

          <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
    <div>

          <p>Add role</p>
          <SelectComponent
            value={selectedRoles[user.user_id]}
            onChange={(selectedValue) =>
              handleRoleChange(user.user_id, selectedValue)
            }
            options={mapRolesToIcons(roles)}
          />
          <button
            onClick={() => handleRoleSubmit(user.user_id)}
            className={styles.confirmButton}
          >
            Confirm
          </button>

          <p>Remove role</p>
          <SelectComponent
            value={selectedRoles[user.user_id]}
            onChange={(selectedValue) =>
              handleRoleChange(user.user_id, selectedValue)
            }
            options={mapRolesToIcons(roles)}
          />
          <button
            onClick={() =>
              handleRoleDelete(user.user_id)
            }
            className={styles.confirmButton}
          >
            Confirm
          </button>
        </div>

        </div>

        </div>
      ))}
    </div>
  );
};

export default UsersDashboard;
