import { urlAPI } from '../../config/index.js';

export const getAllTasks = async () => {
    const response = await fetch(`${urlAPI}/tasks`);
    
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
};
