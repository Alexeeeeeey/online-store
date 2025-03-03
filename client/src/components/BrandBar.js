import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { Card, Row, Col } from "react-bootstrap";

const BrandBar = observer(() => {
    const { device } = useContext(Context);

    const handleBrandClick = (brand) => {
        // Если кликнули на уже выбранный бренд — сбрасываем его
        if (brand.id === device.selectedBrand?.id) {
            device.setSelectedBrand({}); // Сброс через пустой объект
        } else {
            device.setSelectedBrand(brand); // Иначе выбираем бренд
        }
    };

    return (
        <Row className="d-flex flex-nowrap overflow-auto">
            {device.brands.map(brand => 
                <Col 
                    key={brand.id} 
                    xs="auto"
                    className="pe-2"
                >
                    <Card
                        style={{ 
                            cursor: "pointer",
                            minWidth: "120px",
                            borderColor: brand.id === device.selectedBrand?.id ? '#dc3545' : '#dee2e6' // Цвета для выделения
                        }}
                        className="p-3 text-center"
                        onClick={() => handleBrandClick(brand)} // Используем новый обработчик
                    >
                        {brand.name}
                    </Card>
                </Col>
            )}
        </Row>
    );
});

export default BrandBar;