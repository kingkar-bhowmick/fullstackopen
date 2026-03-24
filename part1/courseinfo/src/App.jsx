// COMPONENT — a function that returns JSX
// { course } — destructure the prop directly (shortcut for props.course)
const Header = ({ course }) => {

  
  console.log(course)
  
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

// receives ONE part object e.g. { name: 'Fundamentals', exercises: 10 }
// dot notation to access properties inside the object
const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

// receives the whole parts ARRAY
// manually picks each item by index [0], [1], [2] and passes to Part
// each Part only gets one object, not the whole array
const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  )
}

// reduce turns the array into a single number
// sum starts at 0, each loop adds the current part's exercises to it
const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return <p>Number of exercises {total}</p>
}

// ROOT component - owns all data, passes it down via props
// child components never reach up for data, they only use what they're given
const App = () => {

  //Single object as course refactored
  const course =  { 
                name : 'Half Stack application development',

                 
                parts: [
                    { name: 'Fundamentals of React',    exercises: 10 },
                    { name: 'Using props to pass data', exercises: 7  },
                    { name: 'State of a component',     exercises: 14 },
                ]
  }
  return (
    <div>
      <Header course={course.name} />   {/* passes a string */}
      <Content parts={course.parts} />    {/* passes the whole array */}
      <Total parts={course.parts} />      {/* same array, different job */}
    </div>
  )
}

export default App