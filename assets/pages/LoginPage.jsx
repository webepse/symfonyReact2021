import React, {useState, useContext} from 'react';
import AuthContext from '../contexts/AuthContext';
import authAPI from '../services/authAPI'
import Field from '../components/forms/Field'
import { toast } from 'react-toastify'

const LoginPage = (props) => {

    const {setIsAuthenticated} = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState("")

    const handleChange = (event) => {
        const value = event.currentTarget.value
        const name = event.currentTarget.name 

        // ... copie de l'objet credentials et la vifgule permet de dire avec modification (ajout ou remplacement)
        // si on laisse simplement le name, il va venir écrire une entré name donc on va utiliser les crochet pour prendre en considération la valeur de la const name (ex: username)
        setCredentials({...credentials, [name]:value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        // console.log(credentials)
        try{
            await authAPI.authenticate(credentials)
            setError("")
            setIsAuthenticated(true)
            toast.success("Vous êtes connecté")
            props.history.replace("/customers")
        }catch(error){
            setError("Aucun compte ne possède cette adresse e-mail ou les informations ne correspond pas")
        }
    }

    return ( 
        <>
            <div className="row">
                <div className="col-4 offset-4">
                    <form onSubmit={handleSubmit}>
                        <h1>Connexion</h1>
                       <Field 
                        label="Adresse Email"
                        type="email"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder="Adresse E-mail de connexion"
                        error={error}
                       />
                        <Field 
                            label="Mot de passe"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            type="password"
                            error=""
                        />
                        <div className="form-group">
                            <button className="btn btn-success">Connexion</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
     );
}
 
export default LoginPage;