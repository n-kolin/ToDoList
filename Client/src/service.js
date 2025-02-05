import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5024"

axios.interceptors.response.use(
  response => response,
  error => {
    console.log('Error:', error.message);
    return Promise.reject(error);
  }
)

export default {
  getTasks: async () => {
    const result = await axios.get(`/items`)    
    return result.data;
  },

  addTask: async(name)=>{
    console.log('addTask', name)
    const result = await axios.post(`/items`,{
      name:name,
      isComplete:false 
    })
    //TODO
    return result.data;
  },

  setCompleted: async(id, isComplete)=>{
    console.log('setCompleted', {id, isComplete})
    const result = await axios.put(`/items/${id}`,{
      isComplete:isComplete 
    })
    //TODO
    return result.data;
  },

  deleteTask:async(id)=>{
    console.log('deleteTask')
    const result = await axios.delete(`/items/${id+4}`)
    //TODO
    return result.data;
  }
};
