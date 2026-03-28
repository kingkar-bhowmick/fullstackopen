import Part from './Part.jsx'

const Content = ({parts}) => 
    {
      return (  <ul> 

            {
               <Part parts={parts}/>
            }

        </ul> )
      
    }


export default Content