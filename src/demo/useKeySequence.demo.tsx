import {useKeySequence} from '../index'

const App: React.FC = () => {
    // 定义需要监听的按键序列
    const keySequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown']
    const {isCompleted, reset} =  useKeySequence(keySequence, () => {
        alert('你触发了彩蛋！')
    })

    return (
        <div>
            <button onClick={() => reset()}>重置彩蛋</button>
            <p>请依次按下 ⬆️ ⬆️ ⬇️ ⬇️ 来触发彩蛋</p>
            <p>触发了彩蛋：{isCompleted ? '是' : '否'}</p>
        </div>
    )
}

export default App
