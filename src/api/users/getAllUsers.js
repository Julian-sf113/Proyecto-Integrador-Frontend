import { urlAPI } from '../../config/index.js';

export const getAllUsers = async () => {
    const response = await fetch(`${urlAPI}/users`);
    
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
};
