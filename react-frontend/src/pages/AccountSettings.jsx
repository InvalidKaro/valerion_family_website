import React from 'react';
import '../styles/App.css';
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
//dsd
export default Settings;
