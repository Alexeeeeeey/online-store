import React, { useContext } from "react";
import { Context } from "..";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token"); // Очищаем токен из localStorage
  };

  console.log("User auth status:", user.isAuth); // Отладка

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <NavLink style={{ color: "white", textDecoration: "none", fontSize: "20px" }} to={SHOP_ROUTE}>
          КупиДевайс
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ color: "white" }}>
            {user.isAuth ? (
              <>
                <Button variant="outline-light" onClick={() => navigate(ADMIN_ROUTE)} className="me-2">
                  Админ панель
                </Button>
                <Button 
                  variant="outline-light" 
                  onClick={logOut} // Используем logOut без лишних скобок
                >
                  Выйти
                </Button>
              </>
            ) : (
              <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>
                Авторизация
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBar;