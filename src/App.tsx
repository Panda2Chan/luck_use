import React from 'react';
import UseCurrencyDemo from './demo/useCurrency.demo';
import UseLocalStorageDemo from './demo/useLocalStorage.demo';
import UseIdleDemo from './demo/useIdle.demo';
import UseAsyncQueueDemo from './demo/useAsyncQueue.demo';
import UseNetworkDemo from './demo/useNetwork.demo';
import UseKeySequenceDemo from './demo/useKeySequence.demo';


const App: React.FC = () => {

  return (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <li><UseCurrencyDemo /></li>
      <li><UseLocalStorageDemo /></li>
      <li><UseIdleDemo /></li>
      <li><UseAsyncQueueDemo /></li>
      <li><UseNetworkDemo /></li>
      <li><UseKeySequenceDemo /></li>
    </ul>

  );
};

export default App;