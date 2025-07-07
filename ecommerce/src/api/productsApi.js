import apiClient from './axios'; // 방금 만든 axios 인스턴스를 가져옴

// 모든 상품 목록을 가져오는 API 함수
export const fetchAllProducts = async () => {
  try {
    const response = await apiClient.get('/api/products'); // GET /products 요청
    return response.data;
  } catch (error) {
    console.error('상품 목록을 불러오는 데 실패했습니다.', error);
    throw error; // 에러를 상위로 전파
  }
};

// ID로 특정 상품 하나만 가져오는 API 함수
export const fetchProductById = async (id) => {
  try {
    const response = await apiClient.get(`/api/products/${id}`); // GET /products/{id} 요청
    return response.data;
  } catch (error) {
    console.error('상품 상세 정보를 불러오는 데 실패했습니다.', error);
    throw error;
  }
};