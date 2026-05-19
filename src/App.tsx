import { Routes, Route } from 'react-router'
import './App.css'

// components
import { 
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem
} from '@/components/ui/context-menu'

// screens
import { GameScreen } from '@/components/screens/GameScreen'
import { HomeScreen } from '@/components/screens/HomeScreen'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/spacecon' element={<GameScreen map='spacecon' />} />
      <Route path='/undrcty' element={<GameScreen map='undrcty' />} />
      <Route path='/universe11' element={<GameScreen map='universe11' />} />
    </Routes>
  )
}

export default App
