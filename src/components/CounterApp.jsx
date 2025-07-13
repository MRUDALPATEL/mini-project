import React, { useState } from 'react'

function CounterApp() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-red-500 gap-4'>
      <h1 className='text-4xl text-white font-bold'>Counter App</h1>
      <p className='text-white text-2xl'>Value: {count}</p>
      <div className='flex gap-4'>
        <button className='px-4 py-2 bg-green-600 text-white rounded' onClick={() => count<10 ? setCount(count + 1) : alert("Maximum Reached")}>Increment</button>
        <button className='px-4 py-2 bg-yellow-600 text-white rounded' onClick={() => count>-10 ? setCount(count - 1) : alert("Minumum Reached")}>Decrement</button>
        <button className='px-4 py-2 bg-gray-600 text-white rounded' onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  )
}

export default CounterApp
