import React, {useState, useEffect} from 'react';
import Pagination from '../components/Pagination'
import customersAPI from "../services/customersAPI"
import {Link} from "react-router-dom"
import { toast } from 'react-toastify'
import TableLoader from '../components/loaders/TableLoader'

const CustomersPage = (props) => {

    const [customers, setCustomers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    
    // filtre
    const [search, setSearch] = useState("")

    // loading
    const [loading, setLoading] = useState(true)

    const fetchCustomers = async () => {
        try{
            const data = await customersAPI.findAll()
            setCustomers(data)
            setLoading(false) // j'ai fini de charger                        
        }catch(error){
            toast.error("Impossible de charger les client")
            //console.log(error.response)
        }
    }

    useEffect(()=>{
        fetchCustomers()
    }, [])


    // supprimer un customer
    const handleDelete = async (id) => {
        const orignalCustomers = [...customers] //copie des customers

        // optimiste
        setCustomers(customers.filter(customer => customer.id !== id))

        // pessimiste, si cele n'a pas fonctionné, on réintègre la copie dans le state
        try{
            await customersAPI.delete(id)
            toast.warning("Le client a bien été supprimé")
        }catch(error){
           setCustomers(orignalCustomers)
            //console.log(error.response)
            toast.error("La suppression du client n'a pas pu fonctionner")
            // notif à faire
        }

    }
   

    // pour le filtre
    const handleSearch = event => {
        const value = event.currentTarget.value 
        setSearch(value)
        // mettre à la page 1 pour que la fonction getData fonctionne correctement
        setCurrentPage(1)
    }

    // système de filtre
    const filteredCustomers = customers.filter(c =>
              c.firstName.toLowerCase().includes(search.toLowerCase()) || 
            c.lastName.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
        )

    // pour la pagination 
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const itemsPerPage= 10

    // modification avec le filter
    const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage)

    return ( 
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Liste des clients</h1>
                <Link className="btn btn-primary mb-3" to="/customers/new">Créer un client</Link>
            </div>
            {/* filtre */}
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Recherche..." onChange={handleSearch} value={search} />
            </div>
            {(!loading) ? (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th>Factures</th>
                        <th className="text-center">Montant total</th>
                        <th className="text-center">Montant restant</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCustomers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td><Link to={`/client/${customer.id}`}>{customer.firstName} {customer.lastName}</Link></td>
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
                                <Link className="btn btn-sm btn-success mb-2" to={`/customers/${customer.id}`}>Editer</Link>
                                <button
                                disabled={customer.invoices.length > 0}
                                onClick={()=> handleDelete(customer.id)}
                                className="btn btn-sm btn-danger">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )   : (
                    <TableLoader />
                )
            }
            { itemsPerPage < filteredCustomers.length && 
                <Pagination 
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredCustomers.length}
                onPageChanged={handlePageChange}
                />
            }

           
        </>


     );
}
 
export default CustomersPage;