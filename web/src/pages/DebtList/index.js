import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

import { Table, Col, Row, Container } from 'react-bootstrap';

import Menu from '../../components/Template/Menu';

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
        <>
            <Menu/>
            <Container>
            <Row>
                <Col><Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>#</th>
                <th>Valor</th>                
                </tr>
            </thead>
            <tbody>
                {debts.map((debt) => 
                    <tr>
                        <td>
                            {debt._id}
                        </td>
                        <td>
                        {debt.totalValue}
                        </td>
                    </tr>
                )}                
            </tbody>
            </Table></Col>
            </Row>
            </Container>
            
        </>
        
    );
      
}

export default withRouter(DebtList);