import { createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { GameWithUSelf } from './pages/GameWithUSelf/GameWithUSelf.tsx'
import { MainPage } from './pages/MainPage/MainPage.tsx'
import { rootStore } from './store/rootStore.ts'

const rootStoreContext: rootStore = new rootStore()
export const rootContext = createContext(rootStoreContext)

function App() {
	return (
		<rootContext.Provider value={rootStoreContext}>
			<main className="mainpage">
				<Routes>
					<Route path='/' element={<MainPage />} />
					<Route path='/gamewithuself' element={<GameWithUSelf />} />
				</Routes>
			</main>
		</rootContext.Provider>
	)
}

export default App
