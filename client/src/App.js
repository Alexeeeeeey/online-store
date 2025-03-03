import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { Spinner } from "react-bootstrap";
import { check } from "./http/userAPI";
import { jwtDecode } from "jwt-decode";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Декодируем токен и восстанавливаем данные пользователя
      const userData = jwtDecode(token);
      user.setUser(userData);
      user.setIsAuth(true);
      setLoading(false);
    } else {
      // Если токена нет, выполняем запрос на сервер для проверки авторизации
      check()
        .then(data => {
          user.setUser(data);
          user.setIsAuth(true);
        })
        .catch(() => {
          user.setUser(null);
          user.setIsAuth(false);
        })
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;