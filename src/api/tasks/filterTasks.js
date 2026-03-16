import { urlAPI } from '../../config/index.js';

export const filterTasks = async (filters) => {
    const params = new URLSearchParams();
    
    if (filters.userId) params.append('userId', filters.userId);
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    
    const url = params.toString() ? `${urlAPI}/tasks/filter?${params}` : `${urlAPI}/tasks/filter`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
};
