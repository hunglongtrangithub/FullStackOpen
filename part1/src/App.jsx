const Part = (part) => {
  return <p>{part.part} {part.excercises}</p>
}

const Header = (course) => {
  return <h1>{course.course}</h1>
}

const Content = (parts) => {
  return (
    <div>
      <Part part={parts.part1} excercises={parts.exercises1}/>
      <Part part={parts.part2} excercises={parts.exercises2}/>
      <Part part={parts.part3} excercises={parts.exercises3}/>
    </div>
  )
}

const Total = (excercises) => {
  return (
    <p>
      Number of exercises {
        excercises.exercises1 + excercises.exercises2 + excercises.exercises3
      }
    </p>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content 
        part1={part1}
        part2={part2}
        part3={part3}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
      <Total 
        exercises1={exercises1} 
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  )
}

export default App