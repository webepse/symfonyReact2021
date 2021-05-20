import React, {useState} from 'react';
import Field from '../components/forms/Field';
import {Link} from "react-router-dom"

const CustomerPage = (props) => {

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })

    const handleChange = (event) => {
        // const value = event.currentTarget.value
        // const name = event.currentTarget.name 
        const {name, value} = event.currentTarget
      
        setCustomer({...customer, [name]:value})
    }

    return ( 
        <>
            <h1>Création d'un client</h1>
            <form>
                <Field 
                    name="lastName"
                    label="Nom de famille"
                    placeholder="Nom de la famille du client"
                    value={customer.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <Field 
                    name="firstName"
                    label="Prénom"
                    placeholder="Prénom du client"
                    value={customer.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />
                <Field 
                    name="email"
                    label="Adresse E-mail"
                    placeholder="Adresse E-mail du client"
                    type="email"
                    value={customer.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Field 
                    name="company"
                    label="Entreprise"
                    placeholder="Entreprise du client"
                    value={customer.company}
                    onChange={handleChange}
                    error={errors.company}
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/customers" className="btn btn-secondary">Retour au clients</Link>
                </div>
            </form>
        </>
     );
}
 
export default CustomerPage;