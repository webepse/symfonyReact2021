import Axios from "axios"

function findAll(){
    return  Axios.get("http://127.0.0.1:8000/api/invoices/")
    .then(response => response.data['hydra:member'])
}

function find(id) {
    return Axios.get(`http://127.0.0.1:8000/api/invoices/${id}`)
                .then(response=>response.data)
}

function deleteInvoice(id) {
    return Axios.delete(`http://127.0.0.1:8000/api/invoices/${id}`)
}

function updateInvoice(id, invoice){
    return Axios.put(`http://127.0.0.1:8000/api/invoices/${id}`,{...invoice, customer:`api/customers/${invoice.customer}`})
}

function createInvoice(invoice){
    return Axios.post("http://127.0.0.1:8000/api/invoices",{...invoice, customer:`api/customers/${invoice.customer}`})
}


export default {
    findAll:findAll,
    delete: deleteInvoice,
    update: updateInvoice,
    create: createInvoice,
    find: find
}