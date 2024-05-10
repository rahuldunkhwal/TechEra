import {Link} from 'react'

const CourseItem = props => {
  const {details} = props
  const {id, name, logoUrl} = details

  return (
    <li className="list-item">
      <Link to={`/courses/${id}`}>
        <img src={logoUrl} className="logo" alt={name} />
        <h1 className="heading">{name}</h1>
      </Link>
    </li>
  )
}
export default CourseItem
