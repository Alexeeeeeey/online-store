import { makeAutoObservable } from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [];
        this._brands = [];
        this._devices = [];
        this._selectedType = {}; // Выбранный тип (например, холодильники)
        this._selectedBrand = {}; // Выбранный бренд (изначально пустой)
        this._page = 1; // Текущая страница
        this._totalCount = 0; // Общее количество товаров
        this._limit = 3; // Лимит товаров на странице
        makeAutoObservable(this);
    }

    // Метод для установки выбранного бренда (с проверкой на сброс)
    setSelectedBrand(brand) {
        this.setPage(1); // Всегда сбрасываем страницу при изменении бренда
        
        // Если передан пустой объект, сбрасываем выбранный бренд
        if (Object.keys(brand).length === 0) {
            this._selectedBrand = {};
        } else {
            this._selectedBrand = brand;
        }
    }

    // Остальные методы остаются без изменений
    setTypes(types) {
        this._types = types;
    }
    setBrands(brands) {
        this._brands = brands;
    }
    setDevices(devices) {
        this._devices = devices;
    }
    setSelectedType(type) {
        this.setPage(1);
        this._selectedType = type;
    }
    setPage(page) {
        this._page = page;
    }
    setTotalCount(count) {
        this._totalCount = count;
    }

    // Геттеры (без изменений)
    get types() {
        return this._types;
    }
    get brands() {
        return this._brands;
    }
    get devices() {
        return this._devices;
    }
    get selectedType() {
        return this._selectedType;
    }
    get selectedBrand() {
        return this._selectedBrand;
    }
    get totalCount() {
        return this._totalCount;
    }
    get page() {
        return this._page;
    }
    get limit() {
        return this._limit;
    }
}