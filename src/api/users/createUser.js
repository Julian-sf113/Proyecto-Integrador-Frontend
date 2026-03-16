import { urlAPI } from '../../config/index.js';

export const createUser = async (userData) => {
    const response = await fetch(`${urlAPI}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
};
