import { useState, useCallback, useRef } from 'react';

// 定义异步任务的类型
type AsyncTask = () => Promise<any>;

// 定义状态类型
type QueueStatus = 'idle' | 'running' | 'paused' | 'completed';

/**
 * 执行一系列异步任务，支持暂停、重置和并发控制
 * @param tasks 异步任务数组
 * @param concurrency 并发任务数量，默认为1
 */
const useAsyncQueue = (tasks: AsyncTask[], concurrency = 1) => {
  const [status, setStatus] = useState<QueueStatus>('idle');
  const [results, setResults] = useState<any[]>([]);
  const taskQueue = useRef<AsyncTask[]>([...tasks]);
  const activeCount = useRef(0);
  const isPaused = useRef(false);

  // 运行队列中的任务
  const run = useCallback(() => {
    // 如果队列正在运行或者没有剩余任务，直接返回
    if (['running','completed'].includes(status) || taskQueue.current.length === 0) return;
    // 解除暂停状态
    isPaused.current = false;
    setStatus('running');

    const executeTask = async () => {
      // 如果处于暂停状态或者没有剩余任务，直接返回
      if (isPaused.current || taskQueue.current.length === 0) return;

      activeCount.current++;
      const task = taskQueue.current.shift()!;
      try {
        const result = await task();
        setResults(prev => [...prev, result]);
      } catch (error) {
        setResults(prev => [...prev, error]);
      } finally {
        activeCount.current--;
        if (taskQueue.current.length === 0 && activeCount.current === 0) {
          setStatus('completed');
        } else {
          executeTask();
        }
      }
    };

    for (let i = 0; i < Math.min(concurrency, taskQueue.current.length); i++) {
      executeTask();
    }
  }, [concurrency, status]);

  // 重置队列
  const reset = useCallback(() => {
    taskQueue.current = [...tasks];
    setResults([]);
    setStatus('idle');
    isPaused.current = false;
    activeCount.current = 0;
  }, [tasks]);

  // 暂停队列
  const pause = useCallback(() => {
    if(status === 'completed') return;
    isPaused.current = true;
    setStatus('paused');
  }, [status]);

  return { run, reset, pause, status, results };
};

export default useAsyncQueue;