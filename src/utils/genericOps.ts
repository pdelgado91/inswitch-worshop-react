import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_PUBLIC_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    apikey: import.meta.env.VITE_PUBLIC_API_KEY,
  },
});

// Interceptor para manejar errores de respuesta
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Puedes manejar los errores aquí, como redirigir si hay un 401 o mostrar un mensaje
    console.error("Error en la respuesta de la solicitud:", error);
    return Promise.reject(error);
  }
);

export const getAccessToken = async () => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_PUBLIC_API_AUTH_SERVICE}`,
    new URLSearchParams({
      grant_type: "password",
      username: import.meta.env.VITE_PUBLIC_AUTH_USER,
      password: import.meta.env.VITE_PUBLIC_AUTH_PASSWORD,
    }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response?.data?.access_token;
};

export function getDarkColor() {
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  return color;
}
