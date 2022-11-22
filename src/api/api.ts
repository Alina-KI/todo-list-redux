import axios from 'axios'

const API_PATH = 'http://127.0.0.1:8000/'

export const api = axios.create({
  baseURL: API_PATH
})

api.interceptors.request.use((config) => {
  return config
})