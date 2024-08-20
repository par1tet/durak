import { Route, Routes } from 'react-router-dom'
import { GameWithUSelf } from './pages/GameWithUSelf/GameWithUSelf.tsx'
import { MainPage } from './pages/MainPage/MainPage.tsx'

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
