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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content 
        part1={course.parts[0].name}
        part2={course.parts[1].name}
        part3={course.parts[2].name}
        exercises1={course.parts[0].exercises}
        exercises2={course.parts[1].exercises}
        exercises3={course.parts[2].exercises}
      />
      <Total 
        exercises1={course.parts[0].exercises} 
        exercises2={course.parts[1].exercises}
        exercises3={course.parts[2].exercises}
      />
    </div>
  )
}

export default App