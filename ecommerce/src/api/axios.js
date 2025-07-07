import axios from 'axios';

// Axios 인스턴스 생성
const instance = axios.create({
  // 나중에 실제 백엔드 API 주소를 여기에 설정합니다.
  // baseURL: 'http://localhost:8000/api'
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰을 가져옴
    const token = localStorage.getItem('accessToken');
    
    // 토큰이 존재하면, 모든 요청 헤더에 Authorization 헤더를 추가
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config; // 수정된 설정으로 요청을 계속 진행
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);

export default instance;