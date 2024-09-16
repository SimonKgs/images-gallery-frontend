import { Routes, Route, Navigate } from 'react-router-dom';
import { User } from '../pages/User/User.page';

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="edit" element={<h1>Edit User</h1>} />
      <Route path="*" element={<Navigate to="/user" replace />} />
    </Routes>
  );
};
