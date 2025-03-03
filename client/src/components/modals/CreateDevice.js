import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, DropdownToggle, Form, FormControl, Modal, Row } from "react-bootstrap";
import { Context } from "../..";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";




const CreateDevice = observer(({ show, onHide }) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])
    
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
      }, [])


    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i ))
    }
    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
    }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
         <Dropdown className="mt-2 mb-2">
            <DropdownToggle>{device.selectedType.name || "Выберите тип"}</DropdownToggle>
            <Dropdown.Menu>
                {device.types.map(type =>
                    <Dropdown.Item 
                        onClick={() => device.setSelectedType(type)} 
                        key={type.id}
                    >
                        {type.name}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
         </Dropdown>
         <Dropdown className="mt-2 mb-2">
            <DropdownToggle>{device.selectedBrand.name || "Выберите бренд"}</DropdownToggle>
            <Dropdown.Menu>
                {device.brands.map(brand =>
                    <Dropdown.Item 
                        onClick={() => device.setSelectedBrand(brand)} 
                        key={brand.id}
                    >
                        {brand.name}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
         </Dropdown>
         <FormControl
            value={name}
            onChange={e => setName(e.target.value)} 
            className="mt-3"
            placeholder="Введите название устройства"
         />   
         <FormControl
            value={price}
            onChange={e => setPrice(Number(e.target.value))} 
            className="mt-3"
            placeholder="Введите стоимость устройства"
            type="text"
         />   
         <FormControl 
            className="mt-3"
            type="file"
            onChange={selectFile}
         />   
         <hr/>
         <Button
            variant="outline-dark"
            onClick={addInfo}
         >
            Добавить новое свойство
         </Button>
         {info.map(i =>
            <Row className="mt-4" key={i.number}>
                <Col md={4}>
                    <FormControl
                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                        value={i.title}
                        placeholder="Введите название свойства "
                    />
                </Col>
                <Col md={4}>
                    <FormControl
                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                        value={i.description}
                        placeholder="Введите описание свойства "
                    />
                </Col>
                <Col md={4}>
                    <Button 
                    onClick={() => removeInfo(i.number)}
                    variant="outline-danger"
                    >
                        Удалить</Button>
                </Col>
            </Row>
         )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;