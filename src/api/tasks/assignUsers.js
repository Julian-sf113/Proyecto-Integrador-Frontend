import { urlAPI } from '../../config/index.js';

export const assignUsersToTask = async (taskId, userIds) => {
    const response = await fetch(`${urlAPI}/tasks/${taskId}/assign`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userIds })
    });
    
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
};
