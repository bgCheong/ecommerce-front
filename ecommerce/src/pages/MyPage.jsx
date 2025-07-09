import { useState, useEffect } from 'react';
import { getMyInfo } from '../api/usersApi';

function MyPage() {
  // 사용자 정보, 로딩, 에러 상태를 관리
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const data = await getMyInfo();
        setUserInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyInfo();
  }, []); // 페이지가 처음 로딩될 때 한 번만 실행

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <div>
      <h1>마이페이지</h1>
      {userInfo ? (
        <div>
          <p><strong>이름:</strong> {userInfo.name}</p>
          <p><strong>이메일:</strong> {userInfo.email}</p>
          <p><strong>전화번호:</strong> {userInfo.phoneNumber || '등록되지 않음'}</p>
        </div>
      ) : (
        <p>사용자 정보를 찾을 수 없습니다.</p>
      )}
    </div>
  );
}

export default MyPage;