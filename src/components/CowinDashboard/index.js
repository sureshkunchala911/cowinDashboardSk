// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {vaccinationData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(vaccinationDataApiUrl, options)
    const ResponseData = await response.json()

    if (response.ok === true) {
      this.setState({
        vaccinationData: ResponseData,
        apiStatus: apiStatusConstants.success,
      })
      console.log(ResponseData.last_7_days_vaccination)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="containerBg">
      <div className="logoContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          alt="website logo"
          className="logo"
        />
        <p className="logo-name">Co-WIN</p>
      </div>
      <p className="title">CoWin Vaccination in India</p>
      <div testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    </div>
  )

  renderFailureView = () => (
    <div className="containerBg">
      <div className="logoContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          alt="website logo"
          className="logo"
        />
        <p className="logo-name">Co-WIN</p>
      </div>
      <p className="title">CoWin Vaccination in India</p>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failureImage"
      />
      <h1 className="heading">Something went wrong</h1>
    </div>
  )

  renderSuccessView = () => {
    const {vaccinationData} = this.state

    return (
      <div className="containerBg">
        <div className="logoContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <p className="logo-name">Co-WIN</p>
        </div>
        <h1 className="title">CoWIN Vaccination in India</h1>
        <div>
          <VaccinationCoverage apiData={vaccinationData} />
          <VaccinationByGender apiData={vaccinationData} />
          <VaccinationByAge apiData={vaccinationData} />
        </div>
      </div>
    )
  }

  view = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.view()}</>
  }
}
export default CowinDashboard
