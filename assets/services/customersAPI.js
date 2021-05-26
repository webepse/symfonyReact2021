import Axios from "axios"

function findAll(){
    return Axios.get("http://127.0.0.1:8000/api/customers/")
                .then(response => response.data['hydra:member'])
}

function deleteCustomer(id) {
    return Axios.delete(`http://127.0.0.1:8000/api/customers/${id}`)
}

function find(id){
    return Axios.get(`http://127.0.0.1:8000/api/customers/${id}`)
                .then(response => response.data)
}

function createCustomer(customer){
    return Axios.post("http://127.0.0.1:8000/api/customers", customer)
}

function updateCustomer(id, customer){
    return Axios.put(`http://127.0.0.1:8000/api/customers/${id}`,customer)
}

export default {
    findAll: findAll,
    delete: deleteCustomer,
    find: find,
    create: createCustomer,
    update: updateCustomer
}