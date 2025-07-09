import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // 토큰 삭제
    setIsLoggedIn(false); // 로그아웃 상태로 변경
    alert('로그아웃 되었습니다.');
    navigate('/'); // 홈으로 이동
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">My Shop</Link>
      </div>
      <nav className="header-nav">
        <Link to="/">홈</Link>
        <Link to="/products">상품 목록</Link>
        {isLoggedIn ? (
          // 로그인 상태일 때 보여줄 메뉴
          <button onClick={handleLogout} className="logout-button">로그아웃</button>
        ) : (
          // 로그아웃 상태일 때 보여줄 메뉴
          <>
            <Link to="/signup">회원가입</Link>
            <Link to="/login">로그인</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;