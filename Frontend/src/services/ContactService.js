import axios from 'axios'
const url = '/api/persons'
const get = () => {
    const dat = axios.get(url)
    .then(response => {
        return response.data})
    return dat
}

const update = (id,obj) => {
    const dat = axios.put(`${url}/${id}`,obj)
    .then(response => {
        return response.data})
    return dat
}

const insert = (obj) => {
    const dat = axios.post(`${url}`,obj)
    .then(response => {
        return response.data})
    return dat
}

const remove = (id) => {
    const dat = axios.delete(`${url}/${id}`).then(response=>{
        return response.data
    })
    return dat
}
export default{
    get : get,
    update : update,
    insert : insert,
    remove : remove
}