import axios from 'axios';

// Axios 인스턴스 생성
const instance = axios.create({
  // 나중에 실제 백엔드 API 주소를 여기에 설정합니다.
  // baseURL: 'http://localhost:8000/api'
});

export default instance;