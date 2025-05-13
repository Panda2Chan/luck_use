import { useEffect, useState } from 'react';

/**
 * 自定义 Hook，用于检测用户在页面上多久没有操作
 * @param {number} timeout - 超时时间，单位为毫秒，默认为 300000 毫秒（即 5 分钟）
 * @param {boolean} continueListeningAfterTimeout - 超时候是否继续监听，默认为 false
 * @returns {{idleTime: number, isTimedOut: boolean, resetIdleTimer: () => void}} - idleTime 为距离用户上次操作已经过去的时间，单位为毫秒；isTimedOut 表示是否已经超时；resetIdleTimer 为重置空闲计时器的函数
 */
const useIdle = (timeout: number = 300000, continueListeningAfterTimeout: boolean = false) => {
  const [idleTime, setIdleTime] = useState(0);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());
  const [isTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    const handleActivity = () => {
      if (isTimedOut &&!continueListeningAfterTimeout) {
        return;
      }
      setLastActiveTime(Date.now());
      setIdleTime(0);
      setIsTimedOut(false);
    };

    // 监听用户操作事件
    const events = ['mousemove','mousedown', 'keydown', 'touchstart', 'scroll'];
    // 如果超时后不继续监听，只在未超时的时候添加监听
    if (continueListeningAfterTimeout || (!isTimedOut &&!continueListeningAfterTimeout)) {
      events.forEach(event => {
        window.addEventListener(event, handleActivity);
      });
    }

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - lastActiveTime;
      // 解决 idleTime 精度问题，将其转换为 1000 的整数
      const roundedElapsedTime = Math.floor(elapsedTime / 1000) * 1000;
      if (roundedElapsedTime >= timeout) {
        setIdleTime(timeout);
        setIsTimedOut(true);
        // 如果超时后不继续监听，移除事件监听器和定时器
        if (!continueListeningAfterTimeout) {
          events.forEach(event => {
            window.removeEventListener(event, handleActivity);
          });
          clearInterval(intervalId);
        }
      } else {
        setIdleTime(roundedElapsedTime);
        setIsTimedOut(false);
      }
    }, 1000);

    return () => {
      // 清除事件监听器和定时器
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      clearInterval(intervalId);
    };
  }, [lastActiveTime, timeout, isTimedOut, continueListeningAfterTimeout]);

  const resetIdleTimer = () => {
    setLastActiveTime(Date.now());
    setIdleTime(0);
    setIsTimedOut(false);
  };

  return { idleTime, isTimedOut, resetIdleTimer };
};

export default useIdle;
