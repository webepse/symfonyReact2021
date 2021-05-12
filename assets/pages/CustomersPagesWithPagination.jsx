import React, {useEffect, useState} from 'react';
import Axios from 'axios'
import Pagination from '../components/Pagination'

const CustomersPagesWithPagination = (props) => {

    const [customers, setCustomers] = useState([])
    // pour la pagination 
    const [currentPage, setCurrentPage] = useState(1)

    const [totalItems, setTotalItems] = useState(0)

    const itemsPerPage = 10

    useEffect(()=>{
        Axios.get(`http://127.0.0.1:8000/api/customers?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
            .then(response => {
                setCustomers(response.data['hydra:member'])
                setTotalItems(response.data['hydra:totalItems'])
            })
            .catch(error => console.log(error.response))
    },[currentPage])

    const handlePageChange = (page) => {
        setCustomers([])
        setCurrentPage(page)
    }

    return ( 
        <>
            <h1>Liste des clients (Pagination API)</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th className="text-center">Factures</th>
                        <th className="text-center">Montant total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* 
                        Et logique (&&) expr1 && expr2 Renvoie expri1 si cette expression peut être convertie en false, sinon renvoie expr2
                    */}
                    {customers.length === 0 && (
                        <tr>
                            <td>Chargement...</td>
                        </tr>
                    )}
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.firstName} {customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>{customer.company}</td>
                            <td className="text-center">
                                <span className="badge badge-primary">
                                    {customer.invoices.length}
                                </span>
                            </td>
                            <td className="text-center">{customer.totalAmount.toLocaleString()}€</td>
                            <td className="text-center">{customer.unpaidAmount.toLocaleString()}€</td>
                            <td>
                                <button className="btn btn-sm btn-danger">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination 
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            length={totalItems}
            onPageChanged={handlePageChange}
          />
        </>
     );
}
 
export default CustomersPagesWithPagination;