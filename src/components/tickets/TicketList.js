import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Tickets.css"

//seachTermsState is a variable that we've passed into TicketList as a prop, and we've destructured the object so we can pull out the info
export const TicketList = ({ searchTermsState }) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, UpdateOpenOnly] = useState(false)

    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    //useEffect = what to do when stuff in [] changes and / or initial render if [])
    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermsState.toLowerCase())
            })
            setFiltered(searchedTickets)
        },
        [ searchTermsState ]
    )

    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
            else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`)
                .then(response => response.json())
                .then((ticketArray) => {
                setTickets(ticketArray)
            })   
    
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (honeyUserObject.staff) {
                setFiltered(tickets)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )

    useEffect(
        () => {
            if (openOnly) {
            const openTicketArray = tickets.filter(ticket => {
                return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
            })
            setFiltered(openTicketArray)
        }
        else {
            const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
            setFiltered(myTickets)
        }
        },
        [ openOnly ]
    )

    return <>
    {
        honeyUserObject.staff
        ? <>
            <button onClick={ () => { setEmergency(true) }}>Emergency Only</button>
            <button onClick={ () => { setEmergency(false) }}>Show All</button>
        </>
        :   <>
            <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
            <button onClick={() => UpdateOpenOnly(true)}>Open Tickets</button>
            <button onClick={() => UpdateOpenOnly(false)}>All My Tickets</button>
            </>
    }

    <h2>List of Tickets</h2>

    <article className="tickets">
        {
            filteredTickets.map(
                (filteredTickets) => {
                    return <section className="ticket">
                        <header>{filteredTickets.description}</header>
                        <footer>Emergency: {filteredTickets.emergency ? "Yes" : "No"} </footer>
                    </section>
                }
            )
        }
    </article>
    </>
}

