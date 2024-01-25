import React from 'react';
import ChangePassword from '../components/Settings/changePassword.jsx';
import ChangeProfile from '../components/Settings/changeProfile.jsx';

function Settings() {
  return (
    <div className="Settings">
      <main>
        <ChangePassword />
        <ChangeProfile />     
      </main>
    </div>
  );
}
export default Settings;
