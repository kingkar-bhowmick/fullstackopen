// Fixed: receives deleteOnClick and binds each person's id with an arrow function
const Person = ({ persons, deleteOnClick }) => (
  persons.map(person =>
    <p key={person.id}>
      {person.name} {person.number}
      {/* Arrow function here captures THIS person's id when clicked */}
       <br /> <button onClick={() => deleteOnClick(person.id)}>delete</button>
    </p>
  )
)

export default Person