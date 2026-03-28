
const sumTotal = ({parts}) =>  parts.reduce(
  
  (accumulator, currentValue) => accumulator + currentValue.exercises,
  0,
);



  const Exercise = ({parts}) => <p><b>total of {sumTotal({parts})} exercises</b></p>

export default Exercise