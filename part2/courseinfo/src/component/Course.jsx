import Header from './Header.jsx'
import Content from './Content.jsx'


const Course = ({course}) =>

    {return (<div>
        <Header course={course}/>

        <Content parts={course.parts}/>

        
        </div>
        )}




export default Course