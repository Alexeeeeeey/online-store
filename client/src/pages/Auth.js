import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { registration, login } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data.user);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container 
      className="d-flex justify-content-center align-items-center"
      style={{ height: "calc(100vh - 54px)" }}
    >
      <Card style={{ width: 600 }} className="p-5 shadow">
        <h2 className="text-center mb-4">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Введите ваш email..."
              className="py-2"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              placeholder="Введите ваш пароль..."
              className="py-2"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          <Row className="d-flex justify-content-between align-items-center">
            <div className="col-auto">
              {isLogin ? (
                <>
                  <span>Нет аккаунта? </span>
                  <NavLink 
                    to={REGISTRATION_ROUTE} 
                    className="text-decoration-none"
                  >
                    Зарегистрируйся!
                  </NavLink>
                </>
              ) : (
                <>
                  <span>Есть аккаунт? </span>
                  <NavLink 
                    to={LOGIN_ROUTE} 
                    className="text-decoration-none"
                  >
                    Войдите!
                  </NavLink>
                </>
              )}
            </div>
            <div className="col-auto">
              <Button 
                variant="success" 
                className="px-4 py-2"
                onClick={click}
              >
                {isLogin ? 'Войти' : 'Регистрация'}
              </Button>
            </div>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;