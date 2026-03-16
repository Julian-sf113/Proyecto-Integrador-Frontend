import { urlAPI } from '../../config/index.js';

export const updateUser = async (userId, userData) => {
    const response = await fetch(`${urlAPI}/users/${userId}`, {
        method: 'PUT',
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
