import { Link } from "react-router-dom";
import "./WhatsappSettings.css"
const SettingsPage = () => {
  return (
    <div className="settings-page">
      <h1>Settings</h1>
      {/* Profile Section */}
      <Link to={'/profile'}>
        <h2>Profile</h2>
        <button>Change Profile Picture</button>
        <input type="text" placeholder="Update Display Name" />
        <textarea placeholder="Update Status"></textarea>
      </Link>

      {/* Privacy Section */}
      <section>
        <h2>Privacy</h2>
        <label>
          Last Seen: 
          <select>
            <option>Everyone</option>
            <option>My Contacts</option>
            <option>Nobody</option>
          </select>
        </label>
        <label>
          <input type="checkbox" /> Disable Read Receipts
        </label>
        <button>Manage Blocked Contacts</button>
      </section>

      {/* Notifications Section */}
      <section>
        <h2>Notifications</h2>
        <label>
          <input type="checkbox" /> Enable Message Notifications
        </label>
        <label>
          <input type="checkbox" /> Enable Group Notifications
        </label>
        <label>
          Notification Sound: 
          <select>
            <option>Default</option>
            <option>Beep</option>
            <option>Chime</option>
          </select>
        </label>
      </section>

      {/* Appearance Section */}
      <section>
        <h2>Appearance</h2>
        <label>
          Theme:
          <select>
            <option>Light</option>
            <option>Dark</option>
            <option>System Default</option>
          </select>
        </label>
        <label>
          Font Size:
          <select>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </label>
      </section>

      {/* Help Section */}
      <section>
        <h2>Help</h2>
        <button>FAQs</button>
        <button>Contact Support</button>
      </section>
    </div>
  );
};

export default SettingsPage;
