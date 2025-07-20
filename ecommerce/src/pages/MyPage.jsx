import { useState, useEffect } from 'react';
import { getMyInfo , updateMyInfo } from '../api/usersApi';
import '../Form.css';

function MyPage() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    zipcode: '',
    streetAddress: '',
    detailAddress: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 페이지 로드 시 사용자 정보 불러오기
  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const data = await getMyInfo();
        setFormData({
          email: data.email,
          name: data.name,
          phoneNumber: data.phoneNumber || '',
          zipcode: data.address?.zipcode || '',
          streetAddress: data.address?.streetAddress || '',
          detailAddress: data.address?.detailAddress || '',
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMyInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateMyInfo(formData);
      alert('회원 정보가 성공적으로 수정되었습니다.');
      // 수정된 정보로 폼 다시 채우기
      setFormData({
        email: updatedUser.email,
        name: updatedUser.name,
        phoneNumber: updatedUser.phoneNumber || '',
        zipcode: updatedUser.address?.zipcode || '',
        streetAddress: updatedUser.address?.streetAddress || '',
        detailAddress: updatedUser.address?.detailAddress || '',
      });
    } catch (err) {
      alert(`수정 실패: ${err.message}`);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div>
      <h1>회원 정보 수정</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>이메일 </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>이름</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>전화번호</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        {/* 주소 관련 필드는 추후 주소 API 연동 */}
        <div>
          <label>우편번호</label>
          <input type="text" name="zipcode" value={formData.zipcode} placeholder="우편번호" />
        </div>
        <div>
          <label>주소</label>
          <input type="text" name="streetAddress" value={formData.streetAddress} placeholder="주소" />
        </div>
        <div>
          <label>상세주소</label>
          <input type="text" name="detailAddress" value={formData.detailAddress} onChange={handleChange} placeholder="상세주소" />
        </div>
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
}

export default MyPage;