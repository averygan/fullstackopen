const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><b>Number of exercises {sum}</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => (
  <div>
    {
      parts.map((part) => (
        <Part key={part.id} part={part}/>
      ))
    }
  </div>
)

const Course = ({ course }) => {
    const totalExercises = course.parts.reduce((totalSum, part) => {
      return totalSum + part.exercises;
    }, 0);
  
    return (
      <>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total sum={totalExercises}/>
      </>
    )
  }

  export default Course