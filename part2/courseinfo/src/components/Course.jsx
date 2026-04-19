import Header from './Header.jsx'
import Content from './Content.jsx'


const Course = ({courses}) => courses.map(course => 

            <div>
                <Header name={course.name}/>
                    <Content parts={course.parts}/>
                </div>) 



export default Course