import React from 'react';
import { useAsyncQueue } from "../index"

// 模拟一个异步任务
const asyncTask = async (input: number) => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(input * 2);
    }, Math.random() * 9000 + 1000); // Math.random() * 9000 + 1000
  });
};

const App: React.FC = () => {
  const taskQueue = []
  for(let i = 0;i < 51;i++){
    taskQueue.push(()=>asyncTask(i))
  }
   const { run, pause, status, reset,results } = useAsyncQueue(taskQueue, 10);
  
 


  return (
    <div>
      <button onClick={run}>开始执行异步任务</button>
      <button onClick={pause}>暂停任务队列</button>
      <button onClick={reset}>重置任务队列</button>
      <p>任务队列状态: {status}</p>
      {results.length && <p style={{wordBreak:'break-all'}}>异步任务结果: {results.join(',')}</p>}
    </div>
  );
};

export default App;