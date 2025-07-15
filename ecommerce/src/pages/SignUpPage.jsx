import { useState, useEffect } from 'react';
import { signUpUser , duplicateCheckUser } from '../api/usersApi';
import {useNavigate} from 'react-router-dom';


function SignUpPage() {
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    zipcode: '',
    streetAddress: '',
    detailAddress: ''
  });

  const navigate = useNavigate();

  // --- 추가된 부분 시작 ---

  // 비밀번호 유효성 검사 메시지와 상태를 위한 state
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // 1. 요청 처리 중 상태 추가
  const [duplChk , setDuplChk] = useState(false);

  // formData.password가 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    // 백엔드의 정규식과 동일한 정규식
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.password) {
      // 비밀번호 입력이 없을 경우 메시지 없음
      setPasswordMessage('');
      setIsPasswordValid(false);
    } else if (passwordRegex.test(formData.password)) {
      // 정규식 통과
      setPasswordMessage('사용 가능한 비밀번호입니다.');
      setIsPasswordValid(true);
    } else {
      // 정규식 불일치
      setPasswordMessage('최소 8자 이상, 대문자, 숫자, 특수문자를 포함해야 합니다.');
      setIsPasswordValid(false);
    }
  }, [formData.password]); // formData.password가 바뀔 때마다 이 함수가 실행됨

  // --- 추가된 부분 끝 ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDuplicateSearch = async () => {

    try {
      const response = await duplicateCheckUser({ id : formData.id });
      if(response.success==false)
      {
          alert('사용가능한 아이디 입니다.');
          setDuplChk(true);
      }
      else
      {
        alert('이미 사용중인 아이디 입니다.');
        setDuplChk(false);
      }
    } catch (error) {
      alert(`${error.message}`);
    }
  };

  const handleAddressSearch = () => {
    alert('주소 검색 기능은 준비 중입니다.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) { // 비밀번호 유효성을 통과해야만 제출
      alert('비밀번호가 형식에 맞지 않습니다.');
      return;
    }

    if(!duplChk)
    {
      alert('아이디 중복확인 해주세요.');
      return;
    }

    if (!formData.id.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }

    if (!formData.email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (!formData.password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    if (!formData.name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    if (!isPasswordValid) {
      alert('비밀번호가 형식에 맞지 않습니다.');
      return;
    }

    setIsSubmitting(true); // 2. 요청 시작 시 true로 변경 

    try {
      const response = await signUpUser(formData);
      alert(response);
      navigate('/');
    } catch (error) {
      alert(`회원가입 실패: ${error.message}`);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        {/* ... email, name, phoneNumber, address 필드 ... */}
        <div>
          <label>아이디</label>
          <input type="id" name="id" value={formData.id} onChange={handleChange}  />
          <button type="button" onClick={handleDuplicateSearch}>중복확인</button>
        </div>
        <div>
          <label>이메일</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange}  />
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange}  />
          {/* 유효성 검사 메시지 표시 */}
          {passwordMessage && (
            <p style={{ color: isPasswordValid ? 'green' : 'red', fontSize: '0.8rem' }}>
              {passwordMessage}
            </p>
          )}
        </div>
         <div>
          <label>이름</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}  />
        </div>
        <div>
          <label>전화번호</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <div>
          <label>우편번호</label>
          <input type="text" name="zipcode" value={formData.zipcode} readOnly />
          <button type="button" onClick={handleAddressSearch}>주소 검색</button>
        </div>
        <div>
          <label>주소</label>
          <input type="text" name="streetAddress" value={formData.streetAddress} readOnly />
        </div>
        <div>
          <label>상세주소</label>
          <input type="text" name="detailAddress" value={formData.detailAddress} onChange={handleChange} />
        </div>
        {/* 비밀번호가 유효할 때만 가입하기 버튼 활성화 */}
        <button type="submit" disabled={!isPasswordValid || isSubmitting}>가입하기</button>
      </form>
    </div>
  );
}

export default SignUpPage;