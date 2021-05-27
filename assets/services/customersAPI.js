import Axios from "axios"
import {CUSTOMERS_API} from '../config'

function findAll(){
    return Axios.get(CUSTOMERS_API)
                .then(response => response.data['hydra:member'])
}

function deleteCustomer(id) {
    return Axios.delete(`${CUSTOMERS_API}/${id}`)
}

function find(id){
    return Axios.get(`${CUSTOMERS_API}/${id}`)
                .then(response => response.data)
}

function createCustomer(customer){
    return Axios.post(CUSTOMERS_API, customer)
}

function updateCustomer(id, customer){
    return Axios.put(`${CUSTOMERS_API}/${id}`,customer)
}

export default {
    findAll: findAll,
    delete: deleteCustomer,
    find: find,
    create: createCustomer,
    update: updateCustomer
}