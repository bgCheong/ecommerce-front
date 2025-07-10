import axios from 'axios';


// Axios 인스턴스 생성
const apiClient = axios.create({
  // 나중에 실제 백엔드 API 주소를 여기에 설정합니다.
  // baseURL: 'http://localhost:8000/api'
});

// 요청 인터셉터 추가
apiClient.interceptors.request.use(
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

// --- 응답 인터셉터 추가 ---
apiClient.interceptors.response.use(
  (response) => response, // 성공적인 응답은 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 재시도한 요청이 아닐 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 플래그 설정

      try {
        const storedRefreshToken = localStorage.getItem('refreshToken');
        if (!storedRefreshToken) throw new Error('No refresh token available.');

        // 토큰 재발급 API 호출
        const response = await axios.post('/api/users/refresh', { refreshToken: storedRefreshToken });
        const newAccessToken = response.data.accessToken;

        // 새로운 Access Token 저장
        localStorage.setItem('accessToken', newAccessToken);

        // 원래 요청의 헤더를 새로운 토큰으로 교체
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // 원래 실패했던 요청을 새로운 토큰으로 재시도
        return apiClient(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰이 만료되는 등 재발급 실패 시 로그아웃 처리
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // 로그인 페이지로 이동
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;