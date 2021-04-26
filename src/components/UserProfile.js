import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function UserProfile() {

  const [userData, updateUserData] = useState({})
  const [sitterData, updateSitterData] = useState([])
  const [confirmedBooking, updateConfirmedBooking] = useState([])
  const [requestedBooking, updateRequestedBooking] = useState([])
  const [displaySitter, setDisplaySitter] = useState(false)
  const [displayBooking, setDisplayBooking] = useState(false)
 
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function getUserData() {
      const { data } = await axios.get('http://api-staging.joinbubble.co.uk/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateUserData(data)
    }
    getUserData()
  }, [])

  useEffect(() => {
    async function getSitterData() {
      const { data } = await axios.get('http://api-staging.joinbubble.co.uk/api/search', {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateSitterData(data)
    }
    getSitterData()
  }, [])

  useEffect(() => {
    async function getBookingData() {
      const { data } = await axios.get('http://api-staging.joinbubble.co.uk/api/booking/activesummary', {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateConfirmedBooking(data.confirmedBookings)
      updateRequestedBooking(data.requestedBookings)
    }
    getBookingData()
  }, [])


  return <div className="body">
    <section className="container">
      <div className="columns is-multiline">
        <div className="column is-8 is-offset-2 has-text-centered">
          <h2 className="title">Hi, {userData.firstName}</h2>
          <img className='userImg' src="../images/profile_default.png" alt="Profile image"/>
          <h3 className="title is-4">Find a sitter</h3>
          <button onClick={() => {
            setDisplaySitter(!displaySitter)
          }} className="button is-block is-primary is-fullwidth is-medium">Search</button>
          <table className={displaySitter ? 'table' : 'closed'}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Distance in km</th>
                <th>Hourly rate</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {sitterData.map(sitter => {
                return <tr key={sitter.id}>
                  <td>{sitter.fullName}</td>
                  <td>{sitter.distanceInKm}</td>
                  <td>{sitter.hourlyRate}</td>
                  <td>{sitter.ratingPercentage}</td>
                </tr>
              })}
            </tbody>
          </table>
          <br />
          <h3 className="title is-4">Your bookings</h3>
          <button onClick={() => {
            setDisplayBooking(!displayBooking)
          }} className="button is-block is-primary is-fullwidth is-medium">List your bookings</button>
          <br />
          <p>Requested Bookings:</p>
          <table className={displayBooking ? 'table' : 'closed'}>
            <thead>
              <tr>
                <th>Status</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Date and time</th>
              </tr>
            </thead>
            <tbody>
              {requestedBooking.map(booking => {
                return <tr key={booking.id}>
                  <td>{booking.bookingStatus}</td>
                  <td>{booking.bookingType}</td>
                  <td>{booking.scheduledDuration}</td>
                  <td>{booking.scheduledStart}</td>
                </tr>
              })}
            </tbody>
          </table>
          <br />
          <p>Confirmed Bookings:</p>
          <table className={displayBooking ? 'table' : 'closed'}>
            <thead>
              <tr>
                <th>Status</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Date and time</th>
              </tr>
            </thead>
            <tbody>
              {confirmedBooking.map(booking => {
                return <tr key={booking.id}>
                  <td>{booking.bookingStatus}</td>
                  <td>{booking.bookingType}</td>
                  <td>{booking.scheduledDuration}</td>
                  <td>{booking.scheduledStart}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
}