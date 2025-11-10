import { Route, Routes } from 'react-router-dom';
import Blood_Bowl from './components/Blood_Bowl.tsx';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Blood_Bowl/>}/>
      </Routes>
    </div>
  )
}

export default App