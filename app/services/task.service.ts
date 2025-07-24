import AsyncStorage from '@react-native-async-storage/async-storage';

import { Task } from './service.type';

const TASKS_KEY = 'tasks';
const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=10';

export const fetchTasks = async (): Promise<Task[]> => {
    try {
        const response = await fetch(API_URL);
        const tasks: Task[] = await response.json();
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
        return tasks;
    } catch (error) {
        const cached = await AsyncStorage.getItem(TASKS_KEY);
        if (cached) return JSON.parse(cached);
        throw new Error('Failed to fetch tasks');
    }
};

export const addTask = async (title: string): Promise<Task> => {
    const tasks = await getCachedTasks();
    const newTask: Task = { id: Date.now(), title, completed: false };
    const updated = [newTask, ...tasks];
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
    return newTask;
};

export const toggleTask = async (id: number): Promise<Task[]> => {
    const tasks = await getCachedTasks();
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
    return updated;
};

export const getCachedTasks = async (): Promise<Task[]> => {
    const cached = await AsyncStorage.getItem(TASKS_KEY);
    return cached ? JSON.parse(cached) : [];
}; 