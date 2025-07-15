import { Navigate, Outlet , useOutletContext } from 'react-router-dom';

function ProtectedRoute() {
  const token = localStorage.getItem('accessToken');

  const context = useOutletContext();

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 토큰이 있으면 자식 페이지를 보여줌
  return <Outlet context={context}/>;
}

export default ProtectedRoute;