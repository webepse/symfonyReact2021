import React, {useEffect, useState} from 'react';
import Field from '../components/forms/Field';
import {Link} from "react-router-dom"
import customersAPI from "../services/customersAPI"

const CustomerPage = ({history,match}) => {

    // props.match.params.id - s'il y a rien, je veux que ça soit new
    var {id = "new"} = match.params

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

    const [editing, setEditing] = useState(false) // pour savoir si on édite ou non

    const fetchCustomer = async id => {
        try{
            const {firstName, lastName, email, company} = await customersAPI.find(id)
            setCustomer({firstName, lastName, email, company})
        }catch(error){
            // notif 
            history.replace("/customers")
        }
    }


    useEffect(()=>{
        if(id !== "new"){
            setEditing(true)
            // fonction pour aller chercher les info dans la bdd (api)
            fetchCustomer(id)
        }
    },[id])

    const handleChange = (event) => {
        // const value = event.currentTarget.value
        // const name = event.currentTarget.name 
        const {name, value} = event.currentTarget
      
        setCustomer({...customer, [name]:value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        //console.log(customer)
        try{
            // verifier si on édite ou non
            if(editing){
                // update
                await customersAPI.update(id, customer)
            }else{
                // create
                await customersAPI.create(customer)
                history.replace("/customers") // redirection
            }
        }catch({response}){
            //console.log(response)
            const {violations} = response.data
            //console.log(violations)
            if(violations){
                const apiErrors = {}
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
            }
        }
    }

    return ( 
        <>
            
            {!editing ? <h1>Création d'un client</h1> : <h1>Modification d'un client</h1>}
            <form onSubmit={handleSubmit}>
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
                    <button type="submit" className={"btn btn-"+(!editing ? "success" : "warning")}>{!editing ? "Enregistrer" : "Modifier"}</button>
                    <Link to="/customers" className="btn btn-secondary">Retour aux clients</Link>
                </div>
            </form>
        </>
     );
}
 
export default CustomerPage;