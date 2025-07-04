import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import LearnerDashboard from './pages/LearnerDashboard';
import AssignmentView from './pages/AssignmentView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={
            <PrivateRoute>
              <LearnerDashboard />
            </PrivateRoute>
          } />
          <Route path="/assignment/:id" element={
            <PrivateRoute>
              <AssignmentView />
            </PrivateRoute>
          } />
          <Route path="/assignment/new" element={
            <PrivateRoute>
              <AssignmentView />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}