import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/usersApi';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await loginUser({ email, password });
      if (response.success) {
        // 로그인 성공 시 토큰을 브라우저의 localStorage에 저장
        localStorage.setItem('accessToken', response.token);
        alert('로그인에 성공했습니다.');
        navigate('/'); // 메인 페이지로 이동
      }
    } catch (error) {
      alert(`로그인 실패: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>이메일</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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