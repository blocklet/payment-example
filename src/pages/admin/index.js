import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from '../../components/admin/layout';

export default function Index() {
  return (
    <Routes>
      <Route path="/manager" element={<Layout />}>
        <Route path="" element={<Navigate to="/manager/plans" />} />
      </Route>
    </Routes>
  );
}
