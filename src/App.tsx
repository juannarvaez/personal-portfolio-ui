import { useState } from 'react'
import { Button } from '@/components/Button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-gray-900">Personal Portfolio</h1>
      <Button onClick={() => setCount((c) => c + 1)}>Count is {count}</Button>
    </main>
  )
}

export default App
