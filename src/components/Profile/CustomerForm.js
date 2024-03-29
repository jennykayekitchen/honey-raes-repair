import { useEffect, useState } from "react"
import "../../index.css"



export const CustomerForm = () => {
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])
    
    // TODO: Provide initial state for profile
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: ""
    })
    
    useEffect(() => {
        fetch(`http://localhost:8088/customers?_expand=user&userId=${honeyUserObject.id}`)
        .then(response => response.json())
        .then((data) => {
                const customerObject = data[0]
                updateProfile(customerObject)
            })
        },
        []
        )
        
        
        const localHoneyUser = localStorage.getItem("honey_user")
        const honeyUserObject = JSON.parse(localHoneyUser)
        
        
        
        
        const handleSaveButtonClick = (event) => {
            event.preventDefault()
            
            /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
            */
           
           return fetch(`http://localhost:8088/customers/${profile.id}`, {
               method: "PUT",
               headers: {
                   "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
            })
            .then(response => response.json())
            .then(() => {
                setFeedback("Customer profile successfully saved")
            })
        }

        return (
            
            
            <form className="profile">
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
    {feedback}
</div>
            <h2 className="profile__title">New Service Ticket</h2>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                
                                const copy = {...profile}
                                copy.address = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Phone Number:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.phoneNumber = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        )
}