import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LearnerDashboard from './pages/LearnerDashboard';
import LearnerAssignmentView from './pages/LearnerAssignmentView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/learnerdashboard" element={<LearnerDashboard />} />
        <Route path="/learnerassignmentView" element={<LearnerAssignmentView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;