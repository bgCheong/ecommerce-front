import apiClient from './axios';

export const signUpUser = async (userData) => {
  try {
    const response = await apiClient.post('/api/users/signup', userData);
    return response.data;
  } catch (error) {
    // 에러 응답에서 실제 메시지를 추출하여 반환
    const errorMessage = error.response?.data?.message || error.message;
    console.error("회원가입에 실패했습니다.", errorMessage);
    throw new Error(errorMessage);
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/api/users/login', credentials);

    // 응답 헤더에서 JWT 토큰 추출
    const token = response.headers['authorization']?.split(' ')[1]; // "Bearer " 접두사 제거

    if (token) {
      // 성공 시 토큰 반환
      return { success: true, token: token };
    } else {
      throw new Error('응답에서 토큰을 찾을 수 없습니다.');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error("로그인에 실패했습니다.", errorMessage);
    throw new Error(errorMessage);
  }
};