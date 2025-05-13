import React from 'react';
import UseCurrencyDemo  from './demo/useCurrency.demo'; 
import UseLocalStorageDemo from './demo/useLocalStorage.demo';
import UseIdleDemo from './demo/useIdle.demo';
import UseAsyncQueueDemo from './demo/useAsyncQueue.demo';
import useNetworkDemo from './demo/useNetwork.demo';


const App: React.FC = () => {
  const compArr = [
    UseCurrencyDemo,
    UseLocalStorageDemo,
    UseIdleDemo,
    UseAsyncQueueDemo,
    useNetworkDemo,
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