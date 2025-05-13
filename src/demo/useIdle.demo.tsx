import React from 'react';
import {useIdle} from "../index";

// 模拟 useIdle 的使用，设置空闲时间为 3000 毫秒
const App: React.FC = () => {
  const {idleTime, isTimedOut,resetIdleTimer} = useIdle(3000);

  return (
    <div>
       已经空闲 {idleTime} ms
      <p>用户是否空闲: {isTimedOut ? '是' : '否'}</p>
      <button onClick={resetIdleTimer}>重置计时器</button>
    </div>
  );
};

export default App;