import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import MyPage from './pages/MyPage';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  // 로그인 상태를 최상위 컴포넌트에서 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 앱이 처음 시작될 때 localStorage를 확인하여 로그인 상태를 설정
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="products/:productId" element={<ProductDetailPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage />} />
        {/* 로그인해야만 접근 가능한 경로 */}
        <Route element={<ProtectedRoute />}>
          <Route path="my-page" element={<MyPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;