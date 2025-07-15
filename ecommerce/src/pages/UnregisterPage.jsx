import { useNavigate, useOutletContext } from 'react-router-dom';
import { deleteAccount } from '../api/usersApi';

function UnregisterPage() {
  const navigate = useNavigate();
  // App.jsx의 전역 로그인 상태 변경 함수를 가져옴
  const { setIsLoggedIn } = useOutletContext();

  const handleDeleteAccount = async () => {
    // 사용자에게 재확인
    if (window.confirm('정말로 회원 탈퇴를 진행하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        const response = await deleteAccount();
        alert(response);

        // 로그아웃 처리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
        navigate('/'); // 홈으로 이동
      } catch (error) {
        alert(`회원 탈퇴 실패: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h1>회원 탈퇴</h1>
      <p>회원 탈퇴 시 모든 정보가 영구적으로 삭제되며, 복구할 수 없습니다.</p>
      <p>정말로 탈퇴하시려면 아래 버튼을 눌러주세요.</p>
      <button onClick={handleDeleteAccount} style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
        계정 영구 삭제
      </button>
    </div>
  );
}

export default UnregisterPage;