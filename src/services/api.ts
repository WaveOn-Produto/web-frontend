import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001"
});

// Interceptor para adicionar o token JWT automaticamente
apiClient.interceptors.request.use(
  (config) => {
    // Verifica se está no browser antes de acessar localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com erros de autenticação
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      if (typeof window !== 'undefined') {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Redireciona para login se não estiver na página de login/cadastro
        if (!window.location.pathname.includes('/login') && 
            !window.location.pathname.includes('/cadastro')) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;