// API exports centralizados
export { loginAPI } from './auth/login.js';

export { getTasks } from './tasks/getTasks.js';
export { getTaskById } from './tasks/getTaskById.js';
export { createTask } from './tasks/postTask.js';
export { updateTask } from './tasks/patchTask.js';
export { deleteTask } from './tasks/deleteTask.js';
export { patchTaskStatus } from './tasks/patchTaskStatus.js';
export { assignUsersToTask } from './tasks/assignUsersToTask.js';
export { getTaskUsers } from './tasks/getTaskUsers.js';
export { removeUserFromTask } from './tasks/removeUserFromTask.js';
export { filterTasks } from './tasks/filterTasks.js';

export { getUsers } from './users/getUsers.js';
export { createUser } from './users/createUser.js';
export { updateUser } from './users/updateUser.js';
export { deleteUser } from './users/deleteUser.js';
export { patchUserStatus } from './users/patchUserStatus.js';
export { getUserTasks } from './users/getUserTasks.js';

export { getDashboard } from './dashboard/getDashboard.js';
