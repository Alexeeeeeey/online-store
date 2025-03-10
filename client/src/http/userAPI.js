import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password) => {
  const { data } = await $host.post('api/user/registration', { email, password, role: 'ADMIN' });
  localStorage.setItem('token', data.token); // Сохраняем токен
  return jwtDecode(data.token); // Возвращаем декодированные данные
};

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password });
  localStorage.setItem('token', data.token); // Сохраняем токен
  return jwtDecode(data.token); // Возвращаем декодированные данные
};

export const check = async () => {
  const { data } = await $authHost.get('api/auth/check');
  localStorage.setItem('token', data.token); // Сохраняем токен
  return jwtDecode(data.token); // Возвращаем декодированные данные
};