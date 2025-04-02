import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos'; // Adjust the base URL as needed

export const updateTodo = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
};
