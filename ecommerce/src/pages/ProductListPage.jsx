import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../api/productsApi'; // API 함수 import
import './ProductListPage.css';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <div>상품 목록을 불러오는 중...</div>;
  }

  return (
    <div>
      <h1>상품 목록</h1>
      <div className="product-grid">
        {products.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id} className="product-card-link">
            <div className="product-card">
              <h3>{product.name}</h3>
              <p>{product.price.toLocaleString()}원</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;