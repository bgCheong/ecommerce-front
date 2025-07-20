import { Outlet } from 'react-router-dom';
import Header from './Header';
import '../App.css'; // App.css import 추가


function Layout({ isLoggedIn, setIsLoggedIn }) {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main style={{ padding: '1rem 2rem' }}>
        {/* 자식 경로의 페이지들이 이 자리에 렌더링됩니다. */}
        <Outlet context={{ setIsLoggedIn }} />
      </main>
    </div>
  );
}

export default Layout;