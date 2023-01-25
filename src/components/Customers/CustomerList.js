import { useEffect, useState } from "react"
import { Customer } from "./Customer"

import "./CustomerList.css"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user`)
                .then(response => response.json())
                .then((data) => {
                    setCustomers(data)
                })                
        },
        []
    )

    return <article className="customers">
        {
            customers.map(customer => <Customer key={`customer--${customer.id}`}
                id={customer.userId}
                fullName={customer.user.fullName}
                address={customer.address}
                phoneNumber={customer.phoneNumber} 
                />)
            }
        
    </article>
}