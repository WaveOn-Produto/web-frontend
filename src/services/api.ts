import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001/api"
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
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const isPublicRoute = currentPath === '/' || 
                             currentPath.includes('/login') || 
                             currentPath.includes('/cadastro');
        
        // Só limpa localStorage e redireciona se for uma rota pública
        // Para rotas protegidas, deixa o componente lidar com o erro
        if (isPublicRoute) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;