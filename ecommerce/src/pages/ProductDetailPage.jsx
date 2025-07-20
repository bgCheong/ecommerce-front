import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/productsApi';
//import { addToCart } from '../api/cartApi'; // 장바구니 API import
import './ProductDetailPage.css'; // 상세 페이지용 CSS import

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // 수량 상태 추가

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [productId]);

  const handleQuantityChange = (amount) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + amount)); // 최소 수량은 1
  };

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart(product.id, quantity);
      alert(`${product.name} ${quantity}개를 장바구니에 담았습니다.`);
    } catch (err) {
      alert(`에러: ${err.message}`);
    }
  };
  
  const handleBuyNow = () => {
    alert('바로 구매 기능은 준비 중입니다.');
  };

  if (loading) return <div>상품 정보를 불러오는 중...</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <div className="product-detail-container">
      {/* 1. 이미지 영역 */}
      <div className="product-detail-image">
        <img src={`https://via.placeholder.com/500x500.png?text=${product.name}`} alt={product.name} />
      </div>

      {/* 2. 정보 및 액션 영역 */}
      <div className="product-detail-info">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <hr className="divider" />
        <div className="price-section">
          <span className="price-label">가격</span>
          <span className="product-final-price">{(product.price * quantity).toLocaleString()}원</span>
        </div>
        
        {/* 수량 조절 */}
        <div className="quantity-selector">
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <input type="number" value={quantity} readOnly />
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>

        {/* 액션 버튼 */}
        <div className="action-buttons">
          <button className="btn-buy-now" onClick={handleBuyNow}>바로 구매</button>
          <button className="btn-add-to-cart" onClick={handleAddToCart}>장바구니 담기</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;