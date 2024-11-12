
const UserOutput = (props) => {
  const {title, content, examples} = props
  return (
    <div>
      <h1>{title}</h1>
      <h3>{content}</h3>
      {examples && <p>{examples}</p>}
    </div>
  )
}

export default UserOutput