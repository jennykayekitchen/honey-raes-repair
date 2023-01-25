export const Employee = ({ id, fullName, email }) => {
    return <section className="employee" key={`employee--${id}`}>
                    <div>Name: {fullName}</div>
                    <div>Email: {email}</div>
                </section>
}