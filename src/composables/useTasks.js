import { ref, reactive } from 'vue';

// Shared state
const tasks = ref([]);
const currentTaskId = ref(null);

// Load from localStorage
const savedTasks = localStorage.getItem('focus-flow-tasks');
if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
}

const savedCurrentTask = localStorage.getItem('focus-flow-current-task');
if (savedCurrentTask) {
    currentTaskId.value = savedCurrentTask;
}

export function useTasks() {
    const saveTasks = () => {
        localStorage.setItem('focus-flow-tasks', JSON.stringify(tasks.value));
    };

    const addTask = (text) => {
        if (!text.trim()) return;

        const newTask = {
            id: Date.now().toString(),
            text: text.trim(),
            completed: false,
            sessions: 0,
            createdAt: new Date().toISOString()
        };

        tasks.value.push(newTask);
        saveTasks();
        return newTask.id;
    };

    const toggleTask = (id) => {
        const task = tasks.value.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
        }
    };

    const deleteTask = (id) => {
        tasks.value = tasks.value.filter(t => t.id !== id);
        if (currentTaskId.value === id) {
            currentTaskId.value = null;
            localStorage.removeItem('focus-flow-current-task');
        }
        saveTasks();
    };

    const setCurrentTask = (id) => {
        currentTaskId.value = id;
        if (id) {
            localStorage.setItem('focus-flow-current-task', id);
        } else {
            localStorage.removeItem('focus-flow-current-task');
        }
    };

    const incrementTaskSession = (taskId) => {
        const task = tasks.value.find(t => t.id === taskId);
        if (task) {
            task.sessions++;
            saveTasks();
        }
    };

    return {
        tasks,
        currentTaskId,
        addTask,
        toggleTask,
        deleteTask,
        setCurrentTask,
        incrementTaskSession
    };
}
