import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseItem from '../CourseItem'

import './index.css'

const api = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAIL',
}

class Home extends Component {
  state = {apiStatus: api.initial, courseList: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: api.loading})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({apiStatus: api.success, courseList: updateData})
      console.log(updateData)
    } else {
      this.setState({apiStatus: api.fail})
    }
  }

  loadingView = () => (
    <div data-testid="loader" className="loader-con">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  failView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        className="failure"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.getData} type="button">
        Retry
      </button>
    </div>
  )

  success = () => {
    const {courseList} = this.state
    return (
      <div className="course-container">
        <h1 className="main-heading">Courses</h1>
        <ul className="list-container">
          {courseList.map(each => (
            <CourseItem key={each.id} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case api.loading:
        return this.loadingView()
      case api.success:
        return this.success()
      case api.fail:
        return this.failView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderView()}
      </div>
    )
  }
}

export default Home
