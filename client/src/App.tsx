import { useEffect, useState } from 'react';
import './App.css';
import ActionsForm from './components/ActionsForm';
import QueueDisplay from './components/QueueDisplay';
import { API_URL } from './consts';

const App = () => {
  const [queueContent, setQueueContent] = useState<string[]>([]);

  const fetchQueue = async () => {
      const response = await fetch(API_URL + '/queue');
      const formattedResponse = await response.json();
      if (Array.isArray(formattedResponse?.queue)) {
          setQueueContent(formattedResponse.queue)
      }
  } 

  useEffect(() => {
      fetchQueue();
      setInterval(fetchQueue, 120000);
  }, []);

  return (
    <div className="app">
      <h1 className='app-title'>Waalaxy FIFO</h1>
      <div className='app-content'>
        <div className='first-panel'>
        </div>
        <div className='second-panel'>
          <ActionsForm reloadQueue={fetchQueue}/>
        </div>
      </div>
    </div>
  );
};

export default App;
