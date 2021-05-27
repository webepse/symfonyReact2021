import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify'
import ShowInvoices from '../components/ShowInvoices';
import customersAPI from '../services/customersAPI'

const ClientPage = (props) => {

    //var id= props.match.params.id
    var {id} = props.match.params

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: "",
        invoices: {},
        user: {}
    })

    const fetchClient = async id => {
        try{
            const {firstName, lastName, email, company, invoices, user} = await customersAPI.find(id)
            setCustomer({firstName,lastName,email,company,invoices,user})
        }catch(error){
            toast.error("Le client n'a pas pu être chargé")
            props.history.replace("/customers")
        }
    }

    useEffect(()=>{
        fetchClient(id)
    },[id])


    const factures = Object.keys(customer.invoices).map(key => {
        return (
            <ShowInvoices key={key} infos={customer.invoices[key]} />
        )

    })

    return ( 
        <>
            <h1>Page client</h1>
            <div><strong>Identity: </strong>{customer.lastName} {customer.firstName}</div>
            <div><strong>User: </strong>{customer.user.lastName} {customer.user.firstName}</div>
            <div className="row">
                {factures}
            </div>
        </>
     );
}
 
export default ClientPage;