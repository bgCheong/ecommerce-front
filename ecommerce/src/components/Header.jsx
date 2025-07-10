import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/usersApi';
import './Header.css';

function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
     try {
      await logoutUser(); // 로그아웃 API 호출
    } catch (error) {
      console.error(error); // 실패하더라도 프론트엔드에서는 로그아웃 처리
    } finally {
      // 두 토큰 모두 삭제
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsLoggedIn(false);
      alert('로그아웃 되었습니다.');
      navigate('/');
    }
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