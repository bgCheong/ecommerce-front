import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <div>
      <Header />
      <main style={{ padding: '1rem 2rem' }}>
        {/* 자식 경로의 페이지들이 이 자리에 렌더링됩니다. */}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;