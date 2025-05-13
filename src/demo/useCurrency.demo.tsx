import React from 'react';
import {useCurrency} from "../index"


const App: React.FC = () => {
  const { value, formattedValue, setValue } = useCurrency(100);

  return (
    <div>
      <input type="number" value={value} onChange={e => setValue(e.target.value as unknown as number)} />
      <p>原始值: {value}</p>
      <p>格式化后的值: {formattedValue}</p>
    </div>
  );
};

export default App;