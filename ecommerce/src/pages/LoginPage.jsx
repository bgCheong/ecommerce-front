import { useState } from 'react';
import { useNavigate , useOutletContext  } from 'react-router-dom';
import { loginUser } from '../api/usersApi';

function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsLoggedIn } = useOutletContext(); // context에서 함수 받아오기
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await loginUser({ id, password });
      if (response.success) {
        // 로그인 성공 시 토큰을 브라우저의 localStorage에 저장
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        setIsLoggedIn(true);
        alert('로그인에 성공했습니다.');
        navigate('/'); // 메인 페이지로 이동
      }
    } catch (error) {
      alert(`${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디</label>
          <input type="id" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;