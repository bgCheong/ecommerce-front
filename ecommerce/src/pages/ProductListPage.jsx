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
            {/* --- 이 부분이 추가/수정되었습니다 --- */}
            <div className="product-image-container">
              {/* 나중에는 product.imageUrl 같은 DB 데이터를 사용합니다. */}
              <img 
                src={`https://via.placeholder.com/250x250.png?text=${product.name}`} 
                alt={product.name} 
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price.toLocaleString()}원</p>
            </div>
            {/* --- 여기까지 --- */}
          </div>
        </Link>
      ))}
    </div>
  </div>
  );
}

export default ProductListPage;