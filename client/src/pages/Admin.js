import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";

const useNoBodyShift = (isOpen) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px"; // Убираем возможный сдвиг
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);
};

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);

  useNoBodyShift(brandVisible || typeVisible || deviceVisible);

  return (
    <Container className="d-flex flex-column align-items-center" style={{ maxWidth: "600px" }}>
      <Button
        variant="outline-dark"
        className="mt-4 p-2 w-100"
        style={{ minWidth: "200px" }}
        onClick={() => setTypeVisible(true)}
      >
        Добавить тип
      </Button>
      <Button
        variant="outline-dark"
        className="mt-4 p-2 w-100"
        style={{ minWidth: "200px" }}
        onClick={() => setBrandVisible(true)}
      >
        Добавить бренд
      </Button>
      <Button
        variant="outline-dark"
        className="mt-4 p-2 w-100"
        style={{ minWidth: "200px" }}
        onClick={() => setDeviceVisible(true)}
      >
        Добавить устройство
      </Button>

      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
    </Container>
  );
};

export default Admin;
