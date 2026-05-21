import { Routes, Route } from 'react-router'
import './App.css'

// screens
import { GameScreen } from '@/components/screens/GameScreen/GameScreen'
import { HomeScreen } from '@/components/screens/HomeScreen/HomeScreen'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/game/:mapName' element={<GameScreen />} />
    </Routes>
  )
}

export default App
