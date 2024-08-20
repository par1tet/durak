import { Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/MainPage.tsx'
import { GameWithUSelf } from './pages/GameWithUSelf.tsx'

function App() {
  return (
    <main className="mainpage">
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/gamewithuself' element={<GameWithUSelf />} />
      </Routes>
    </main>
  )
}

export default App
