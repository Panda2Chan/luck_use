import React from 'react';
import UseCurrencyDemo  from './demo/useCurrency.demo'; 
import UseLocalStorageDemo from './demo/useLocalStorage.demo';
import UseIdle from './demo/useIdle.demo';
import UseAsyncQueue from './demo/useAsyncQueue.demo';


const App: React.FC = () => {
  const compArr = [
    UseCurrencyDemo,
    UseLocalStorageDemo,
    UseIdle,
    UseAsyncQueue,
  ];
  return (
    <ul style={{display:'flex',flexDirection:'column',gap:'20px'}}>
      {compArr.map((Comp, index) => (
        <li key={index} style={{padding:'10px',backgroundColor:'',borderRadius:'5pt'}}>
          <Comp />
        </li>
      ))}
    </ul>
  );
};

export default App;