import { urlAPI } from '../../config/index.js';

export const getUserTasks = async (userId) => {
    const response = await fetch(`${urlAPI}/users/${userId}/tasks`);
    
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
};
