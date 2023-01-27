import { useState } from "react"
import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"


export const TicketContainer = () => {
    //searchTerms is state, setSearchTerms updates state
    const [ searchTerms, setSearchTerms] = useState("")

    //state = value that something equals at a certain time
    //setState = updates the value of state at certain time
    //useState = holds both state and setState 
    return <>
        <TicketSearch setterFunction={setSearchTerms} />
        <TicketList searchTermsState={searchTerms}/>
    </>
}
//prop is an object with all the info we give it