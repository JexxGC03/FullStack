const Course = ({course}) => {
  console.log(course)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (header) => {
  console.log("Header is: ", header)
  return (
    <div>
      <h2>{header.course}</h2>
    </div>
  )
}

const Content = ({parts}) => {
  console.log(parts)
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part.name} exercise={part.exercises} />
      ))}
    </div>
  )
}

const Part = (content) => {
  console.log(content)
  return (
    <p>
      {content.part} {content.exercise}
    </p>
  )
}

const Total = ({parts}) => {
  console.log(parts)
  return (
    <p><strong>
      Total exercises: {parts.reduce((sum, part) => sum + part.exercises, 0)}
      </strong>
    </p>
  )
}

export default Course