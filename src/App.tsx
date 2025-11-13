import { useEffect } from 'react';
import { TimerShell } from './components/TimerShell';

function App() {
  useEffect(() => {
    // Request notification permission on app load
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <main>
      <TimerShell />
    </main>
  );
}

export default App;

