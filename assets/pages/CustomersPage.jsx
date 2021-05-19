import React, {useState, useEffect} from 'react';
import Axios from 'axios'
import Pagination from '../components/Pagination'

const CustomersPage = (props) => {

    const [customers, setCustomers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    
    // filtre
    const [search, setSearch] = useState("")

    useEffect(()=>{
        Axios.get("http://127.0.0.1:8000/api/customers/")
            .then(response => response.data['hydra:member'])
            .then(data => setCustomers(data))
            .catch(error=> console.log(error.response))
    }, [])

   

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
            <h1>Liste des clients</h1>
            {/* filtre */}
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Recherche..." onChange={handleSearch} value={search} />
            </div>
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
                                <button 
                                className="btn btn-sm btn-danger">Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          <Pagination 
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            length={customers.length}
            onPageChanged={handlePageChange}
          />

           
        </>


     );
}
 
export default CustomersPage;