import { Link } from 'react-router-dom';
import './Header.css'; // 헤더 스타일을 위한 CSS 파일 (곧 생성)

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">My Shop</Link>
      </div>
      <nav className="header-nav">
        <Link to="/">홈</Link>
        <Link to="/products">상품 목록</Link>
        <Link to="/signup">회원가입</Link> 
        <Link to="/login">로그인</Link> 
      </nav>
    </header>
  );
}

export default Header;