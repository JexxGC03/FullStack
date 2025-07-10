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
  console.log(header)
  return (
    <div>
      <h2>{header.course}</h2>
    </div>
  )
}

const Content = (content) => {
  console.log(content)
  return (
    <div>
      {content.parts.map(part => (
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

const Total = (total) => {
  console.log(total)
  return (
    <p><strong>
      Total exercises: {total.parts.reduce((sum, part) => sum + part.exercises, 0)}
      </strong>
    </p>
  )
}

export default Course