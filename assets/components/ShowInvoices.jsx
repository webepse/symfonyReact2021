import React from 'react';
import moment from "moment"


const ShowInvoices = ({infos}) => {

    const formatDate = (str) => moment(str).format('DD/MM/YYYY')

    return ( 
        
        <div className="col-4 my-3">
            <div className="card">
                <div className="card-header">
                    <h4>Facture numéro: {infos.chrono}</h4>
                    <h6>{formatDate(infos.sentAt)}</h6>
                </div>
                <div className="card-body">
                    <div><strong>Montant: </strong>{infos.amount.toLocaleString()}</div>
                    <div><strong>Statut: </strong>{infos.status}</div>
                </div>
            </div>
        </div>
        
     );
}
 
export default ShowInvoices;