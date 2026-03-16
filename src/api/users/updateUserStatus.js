import { urlAPI } from '../../config/index.js';

export const updateUserStatus = async (userId, statusData) => {
    const response = await fetch(`${urlAPI}/users/${userId}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(statusData)
    });
    
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
};
