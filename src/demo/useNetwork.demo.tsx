
import {useNetwork} from "../index"

const App: React.FC = () => {
  // 使用 useLocalStorage 钩子，初始键为 'demoKey'，初始值为 100
  const online = useNetwork();
  return (
    <div>
      <p>网络状态: {online ? '在线' : '离线'}</p>
    </div>
  );
}
export default App;
