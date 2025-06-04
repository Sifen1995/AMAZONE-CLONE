import axios from 'axios'

 const axiosInstance=axios.create({
   baseURL:"http://localhost:5000"
   
   //deployed on render
  //  baseURL:"https://amazone-clone-backend-k4mr.onrender.com"
    
})

export {axiosInstance};