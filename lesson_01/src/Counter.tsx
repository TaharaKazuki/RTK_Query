import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './app/hook'
import { increment, incrementByAmount, reset, decrement } from './features/counter/counterSlice'

const Counter = () => {
  const dispatch = useAppDispatch()
  const count = useAppSelector((state) => state.counter.count)

  const [incrementAmount, setIncrementAmount] = useState<number | string>(0)

  const addValue = Number(incrementAmount) || 0

  const resetAll = () => {
    setIncrementAmount(0)
    dispatch(reset())
  }

  const incrementHandler = () => dispatch(increment())

  const decrementHandler = () => dispatch(decrement())

  return (
    <section>
      <p>{count}</p>
      <div>
        <button onClick={incrementHandler}>+</button>
        <button onClick={decrementHandler}>-</button>
      </div>

      <input
        type="text"
        value={incrementAmount}
        onChange={(e) => setIncrementAmount(e.target.value)}
      />

      <div>
        <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
        <button onClick={resetAll}>Reset</button>
      </div>
    </section>
  )
}

export default Counter
