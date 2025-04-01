import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CreateGroup from './pages/CreateGroup'
import GroupPage from './pages/GroupPage'
import AddExpense from './pages/AddExpense'

function App() {
  return (
    <div className="p-6">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreateGroup />} />
        <Route path="/groups/:id" element={<GroupPage />} />
        <Route path="/groups/:id/add" element={<AddExpense />} />
      </Routes>
    </div>
  )
}

export default App
