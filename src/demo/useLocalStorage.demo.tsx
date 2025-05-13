import React from 'react';
import {useLocalStorage} from "../index"

const App: React.FC = () => {
  // 使用 useLocalStorage 钩子，初始键为 'demoKey'，初始值为 100
  const {storedValue, setValue,clearStorage} = useLocalStorage('demoKey', 100);

  return (
    <div>
      <input type="text" value={storedValue} onChange={e => setValue(e.target.value)} />
      <p>存储在 localStorage 中的值: {storedValue}</p>
      <button onClick={clearStorage}>清除</button>
    </div>
  );
};

export default App;