import { useEffect, useState } from 'react';
import './Timer.css';

const TOTAL_TIME = 180000; // 3 minutes
// const TOTAL_TIME = 10000; // 10 seconds

function Timer() {
  const [ timeRemaining, setTimeRemaining ] = useState(0);
  const [ endTime, setEndTime ] = useState<number|null>(null);
  const percentRemaining = timeRemaining / TOTAL_TIME * 100;

  function start() {
    const newTimeRemaining = TOTAL_TIME - timeRemaining;
    setEndTime(Date.now() + newTimeRemaining);
    setTimeRemaining(newTimeRemaining);
  }

  function stop() {
    setEndTime(null);
    setTimeRemaining(0);
  }

  useEffect(() => {
    if (endTime) {
      const intervalId = setInterval(() => {
        let newTimeRemaining = endTime - Date.now();
        if (newTimeRemaining < 0) {
          newTimeRemaining = 0;
          setEndTime(null)
        }
        setTimeRemaining(newTimeRemaining);
      }, 100);
      return () => {
        clearInterval(intervalId);
      }
    }
  }, [ endTime ]);

  const timeExpired = timeRemaining === 0;
  let className = "Timer";
  if (timeExpired) {
    className += " Timer--expired";
  }

  return (
    <div className={className} onClick={start} onDoubleClick={stop}>
      <div className="Timer__sand" style={{height: percentRemaining + '%'}}></div>
    </div>
  );
}

export default Timer;