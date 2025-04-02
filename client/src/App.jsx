import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateGroup from './pages/CreateGroup';
import GroupPage from './pages/GroupPage';
import AddExpense from './pages/AddExpense';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen p-6">
      <Header />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<CreateGroup />} />
          <Route path="/groups/:id" element={<GroupPage />} />
          <Route path="/groups/:id/add" element={<AddExpense />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
