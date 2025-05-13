# LuckUse - A React Hooks Library

欢迎使用我的 React Hook 库！这个库提供了一系列实用的自定义 React Hook，旨在帮助您更高效地开发 React 应用程序。

## 特性
- **功能丰富**：包含多种常用的自定义 Hook，可满足不同场景的开发需求。
- **类型安全**：使用 TypeScript 编写，提供完善的类型定义，确保代码的健壮性。
- **易于集成**：可以轻松集成到现有的 React 项目中。

## 安装
您可以使用 npm 或 pnpm 来安装这个库：

## Hooks 列表

### useAsyncQueue
执行一系列异步任务，支持暂停、重置和并发控制。

#### 参数
- `tasks`: 异步任务数组
- `concurrency`: 并发任务数量，默认为 1

#### 使用示例
```tsx:/Users/chenxuanhong/code/luck_use_lib/src/hooks/useAsyncQueue.tsx
import useAsyncQueue from './useAsyncQueue';

const asyncTask1 = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return 'Task 1 completed';
};

const asyncTask2 = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return 'Task 2 completed';
};

const tasks = [asyncTask1, asyncTask2];

const App = () => {
  const { run, reset, pause, status, results } = useAsyncQueue(tasks);

  return (
    <div>
      <button onClick={run}>运行</button>
      <button onClick={reset}>重置</button>
      <button onClick={pause}>暂停</button>
      <p>状态: {status}</p>
      <p>结果: {JSON.stringify(results)}</p>
    </div>
  );
};

```

### useCurrency
用于格式化货币数值。

#### 参数
- `initialValue`: 初始数值
- `config`: 配置对象，包含 `locale`（地区，默认为 'zh-CN'）、`currency`（货币类型，默认为 'CNY'）、`minimumFractionDigits`（最小小数位数，默认为 2）和 `maximumFractionDigits`（最大小数位数，默认为 2）。

#### 使用示例
```tsx:/Users/chenxuanhong/code/luck_use_lib/src/hooks/useCurrency.tsx
import useCurrency from './useCurrency';

const App = () => {
  const { value, formattedValue, setValue } = useCurrency(100);

  return (
    <div>
      <p>原始值: {value}</p>
      <p>格式化后的值: {formattedValue}</p>
      <button onClick={() => setValue(value + 10)}>增加 10</button>
    </div>
  );
};

```

### useIdle
用于检测用户在页面上多久没有操作。

#### 参数
- `timeout`: 超时时间，单位为毫秒，默认为 300000 毫秒（即 5 分钟）
- `continueListeningAfterTimeout`: 超时候是否继续监听，默认为 false

#### 使用示例
```tsx:/Users/chenxuanhong/code/luck_use_lib/src/hooks/useIdle.tsx
import useIdle from './useIdle';

const App = () => {
  const { idleTime, isTimedOut, resetIdleTimer } = useIdle(300000, false);

  return (
    <div>
      <p>空闲时间: {idleTime} 毫秒</p>
      <p>是否超时: {isTimedOut ? '是' : '否'}</p>
      <button onClick={resetIdleTimer}>重置计时器</button>
    </div>
  );
};

```

### useLocalStorage
用于操作浏览器的本地存储。

#### 参数
- `key`: 存储的键名
- `initialValue`: 初始值

#### 使用示例
```tsx:/Users/chenxuanhong/code/luck_use_lib/src/hooks/useLocalStorage.tsx
import useLocalStorage from './useLocalStorage';

const App = () => {
  const { storedValue, setValue, clearStorage } = useLocalStorage('myKey', '初始值');

  return (
    <div>
      <p>存储的值: {storedValue}</p>
      <button onClick={() => setValue('新值')}>设置新值</button>
      <button onClick={clearStorage}>清空存储</button>
    </div>
  );
};

```
