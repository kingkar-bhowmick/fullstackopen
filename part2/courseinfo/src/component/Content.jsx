import Exercise from './Exercise.jsx'
import Part from './Part.jsx'

const Content = ({parts}) => 
    {
      return (  <ul> 

            {
               <Part parts={parts}/>

           
            }

            {
                <Exercise parts={parts}/>
            }

        </ul> )
      
    }


export default Content