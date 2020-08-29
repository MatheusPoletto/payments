import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

import api from "../../services/api";

function Item(props) {
    return <li>{props.value}</li>;
}
 
function DebtList(){
    const [debts, setDebts] = useState([]);
    
    useEffect(() => {     
        const fetchDebts = async () => {
            const res = await api.get('/debts');
            setDebts(res.data.debts);    
        };
        fetchDebts();
    }, []);

    return (
        <ul>
            {debts.map((debt) => <Item key={debt._id} value={debt.totalValue} />)}
        </ul>
       
        
    );
      
}

export default withRouter(DebtList);