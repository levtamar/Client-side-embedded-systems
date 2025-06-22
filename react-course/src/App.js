

import { useEffect, useState } from 'react';


const esp32IP = 'http://192.168.1.101'; // שנה לפי כתובת ה־IP שלך

function App() {
  const [status, setStatus] = useState('מחכה לחיבור...');
  const [lastCommand, setLastCommand] = useState('');

  // בדיקת חיבור בעת הטעינה
  useEffect(() => {
    fetch(`${esp32IP}/`)
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch((err) => {
        console.error(err);
        setStatus('שגיאה בחיבור ל־ESP32');
      });
  }, []);

  // שליחת פקודות
  const sendCommand = async (command) => {
    try {
      const res = await fetch(`${esp32IP}/${command}`);
      const text = await res.text();
      setLastCommand(`נשלחה פקודה: ${command} (${text})`);
    } catch (err) {
      console.error(err);
      setLastCommand('שגיאה בשליחת פקודה');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>שלט למכסחת דשא</h1>
      <p>🔌 סטטוס חיבור: {status}</p>

      <div style={{ margin: '20px 0' }}>
        <button onClick={() => sendCommand('forward')}>⬆️ קדימה</button>
      </div>
      <div>
        <button onClick={() => sendCommand('left')}>⬅️ שמאלה</button>
        <button onClick={() => sendCommand('stop')}>⏹ עצור</button>
        <button onClick={() => sendCommand('right')}>➡️ ימינה</button>
      </div>
      <div style={{ margin: '20px 0' }}>
        <button onClick={() => sendCommand('backward')}>⬇️ אחורה</button>
      </div>

      <p>{lastCommand}</p>
    </div>
  );
}

export default App;
