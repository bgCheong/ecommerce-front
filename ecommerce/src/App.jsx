import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage'; // 1. 상세 페이지 import
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductListPage />} />
        {/* 2. 동적 경로 라우트 추가 */}
        <Route path="products/:productId" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;