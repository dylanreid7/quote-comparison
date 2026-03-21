import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import QuoteComparisonPage from './pages/QuoteComparisonPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:quoteId" element={<QuoteComparisonPage />} />
      </Routes>
    </BrowserRouter>
      
  )
}

export default App
