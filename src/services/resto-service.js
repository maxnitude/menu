export default class RestoService {
    _apiBase = 'http://localhost:3000';
    
    async getResource (url) {
        const response = await fetch(`${this._apiBase}${url}`);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Не удалось получить данные`)
        }
    }

    async getMenuItems () {
        return await this.getResource(`/menu/`);
    }
}
