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


export const duplicateCheckUser = async (credentials) => {

  try {
    const response = await apiClient.get('/api/users/duplicate', {params: credentials});
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }

}

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/api/users/login', credentials);
    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || '로그인에 실패했습니다.';
    throw new Error(errorMessage);
  }
};

export const getMyInfo = async () =>
{
  try
  {
    const response = await apiClient.get('/api/users/me');
    return response.data;
  }
  catch(error)
  {
      console.log(error);
      const errorMessage = error.response?.data?.message ||' 회원정보 불러오기 실패.';
      throw new Error(errorMessage);
  }
}

export const logoutUser = async () => {
  try {
    // 로그아웃 API 호출 (헤더의 토큰은 axios 인터셉터가 자동으로 추가해줌)
    const response = await apiClient.post('/api/users/logout');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || '로그아웃에 실패했습니다.';
    throw new Error(errorMessage);
  }
};

// 토큰 재발급을 위한 API 함수 (나중에 user-service에 해당 API를 만들어야 함)
export const refreshToken = async (token) => {
    try {
        const response = await apiClient.post('/api/users/refresh', { refreshToken: token });
        return response.data;
    } catch (error) {
        throw new Error('토큰 재발급에 실패했습니다.');
    }
};

export const updateMyInfo = async (data) => {
  try {
    // API 게이트웨이가 헤더에 토큰을 자동으로 추가해주므로,
    // 여기서는 그냥 API 경로만 호출하면 됩니다.
    const response = await apiClient.post('/api/users/me' , data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || '사용자 정보 조회에 실패했습니다.';
    throw new Error(errorMessage);
  }
};

export const deleteAccount = async () => {
  try {
    // API 게이트웨이가 헤더에 토큰을 자동으로 추가해주므로,
    // 여기서는 그냥 API 경로만 호출하면 됩니다.
    const response = await apiClient.delete('/api/users/delete');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || '회원 탈퇴처리 실패하였습니다.';
    throw new Error(errorMessage);
  }
};