
import { useState, useEffect, useRef } from "react"

/**
 * 监听组合键或快捷键序列，例如输入 ↑ ↑ ↓ ↓ ← → ← → B A 触发彩蛋
 * @param {string[]} sequence 组合键或快捷键序列
 * @param {Function} callback 回调函数
 * @returns {isCompleted,setIsCompleted}
 */
type SequenceArr = string[]
const useKeySequence = (sequence: SequenceArr, callback: Function) => {
  const currentSequence = useRef<SequenceArr>([])
  const [isCompleted, setIsCompleted] = useState(false)
  const completedRef = useRef(false)

  const handleKeyDown = (e: KeyboardEvent) => {
    if (completedRef.current) {
      return
    }
    const key = e.key as string
    currentSequence.current.push(key)

    const current = currentSequence.current;
    const len = sequence.length;
    for (let i = 0; i <= current.length - len; i++) {
      // 输入的任意子序列满足目标序列时即可
      const subSequence = current.slice(i, i + len);
      if (subSequence.join('') === sequence.join('')) {
        setIsCompleted(true)
        completedRef.current = true
        callback()
        // 移除键盘按下事件监听
        window.removeEventListener('keydown', handleKeyDown)
        break;
      }
    }
  }


  const reset = () => {
    setIsCompleted(false)
    completedRef.current = false
    currentSequence.current = []
    window.addEventListener('keydown', handleKeyDown)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  },[])
  return {
    isCompleted,
    reset,
  }
}
export default useKeySequence