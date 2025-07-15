import { useState, useEffect, useRef } from 'react'; // useEffect, useRef 추가
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { logoutUser } from '../api/usersApi';

function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // 드롭다운 영역을 참조하기 위한 ref

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

  // 드롭다운 바깥 영역을 클릭했을 때 메뉴를 닫는 로직
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    // 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);
    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">My Shop</Link>
      </div>
      <nav className="header-nav">
        <Link to="/">홈</Link>
        <Link to="/products">상품 목록</Link>
        {isLoggedIn ? (
          // ref를 최상위 div에 연결
          <div className="dropdown" ref={dropdownRef}>
            <button 
              className="dropdown-toggle"
              // 클릭하면 상태를 토글
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              마이페이지
            </button>
            
            {/* dropdownOpen 상태에 따라 메뉴를 조건부 렌더링 */}
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/my-page" onClick={() => setDropdownOpen(false)}>회원 정보</Link>
                <Link to="/orders" onClick={() => setDropdownOpen(false)}>주문 내역</Link>
                <Link to="/unregister" onClick={() => setDropdownOpen(false)}>회원 탈퇴</Link>
                <hr/>
                <button onClick={handleLogout} className="logout-button-in-dropdown">로그아웃</button>
              </div>
            )}
          </div>
        ) : (
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