import React from 'react'
import useFetch from '../../hooks/useFetch';
import { useParams } from "react-router-dom";
import { BsArrowRight, BsCheck } from "react-icons/bs"
import { IoCalendarClearOutline } from "react-icons/io5"
import { BsClockHistory } from "react-icons/bs"
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import "./reservationDetail.scss"
import { useState } from 'react';
import axios from 'axios';
const ReservationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const res = useFetch(`/reservations/find/${id}`)
  const villa = useFetch(`/villas/find/${res.data.villaId}`)
  const selectedRes = res.data;
  const selectedVilla = villa.data;
  const selectedCalendar = selectedVilla.calendar;
  const selectedBooked = selectedCalendar && selectedCalendar.booked;
  const selectedPending = selectedCalendar && selectedCalendar.pending;
  function formatDate(string) {
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }
  function formatTime(string) {
    return new Date(string).toLocaleTimeString();
  }
  console.log(selectedVilla)
  const [bookType, setBookType] = useState({})
  const handleRadioCheck = (e) => {
    setBookType(() => ({ isBooked: false, isPending: false, [e.target.value]: true }))
  }
  const resDates = {
    startDate: selectedRes.checkinDate,
    endDate: selectedRes.checkoutDate,
    reservationId: id
  }
  
  const handleSaveReservation = async () => {
    let updateDates;
    try {

      if (bookType.isBooked) {
        console.log("burada boooked")
        updateDates = {
          calendar: {
            booked: [...selectedBooked, resDates]
            
          }
        };
        if (!selectedBooked.some((d) => res.data.reservationId === d.reservationId)) {
          await axios.put("/villas/" + res.data.villaId, updateDates)
          console.log("HEREERR")
        }
        else {
          alert("Aynı reservasyonu tekrar ekleyemezsin.")
        }

      }
      else {
        console.log("burada pending")
        updateDates = {
          calendar: {
            pending: [...selectedPending, resDates]
          }
        };
        if (!selectedPending.some((d) => res.data._id === d._id)) {
          await axios.put("/villas/" + res.data.villaId, updateDates)
        }
        else {
          alert("Aynı reservasyonu tekrar ekleyemezsin.")
        }
      }

      const updatebookType = {
        ...bookType
      };

      await axios.put("/reservations/" + id, updatebookType)
        .then(response => {
          if (response.status === 200) {
            window.location.reload();
          }
        })
    } catch (err) { console.log(err) }
  }
  return (
    <div className='reservationDetail'>
      <div className='resControl'>
        <div>
          <div className='pending'>
            <input id='pending' type="radio" value="isPending" name="bookReservation" onClick={handleRadioCheck} />
            <label htmlFor='pending'>Pending Payment</label>
          </div>
          <div className='booked'>
            <input id='booked' type="radio" value="isBooked" name="bookReservation" onClick={handleRadioCheck} />
            <label htmlFor='booked'>Booked</label>
          </div>
        </div>
        <button onClick={handleSaveReservation}> <BsCheck /> Save Reservation</button>
      </div>
      <div className='villaInfos'>
        <div className='villaImg'>
          <img src={selectedVilla.photos && selectedVilla.photos[0]} alt="" />
          <div className='villaTitle'>
            <h3>{selectedVilla.name}</h3>
            <span>{selectedVilla.city},{selectedVilla.location}</span>
          </div>
        </div>
        <div className='villaInfo'>
          <label className='dateLabel'>
            <div className='dateLabel_in'>
              <div className='dli_title'>Checkin Date</div>
              <div className='dli_desc'><IoCalendarClearOutline /> {formatDate(selectedRes.checkinDate && selectedRes.checkinDate)} <BsClockHistory /> {selectedVilla.rules && selectedVilla.rules.checkinTime}</div>
            </div>
            <div className='dateLabel_day'>
              <div><BsArrowRight /></div>
              <span>{Math.ceil(moment(selectedRes.checkoutDate).diff(selectedRes.checkinDate) / (1000 * 60 * 60 * 24))} Nights</span>
            </div>
            <div className='dateLabel_out'>
              <div className='dli_title'>Checkout Date</div>
              <div className='dli_desc'><IoCalendarClearOutline /> {formatDate(selectedRes.checkoutDate && selectedRes.checkoutDate)} <BsClockHistory /> {selectedVilla.rules && selectedVilla.rules.checkoutTime}</div>
            </div>
          </label>
          <div className='resInfoDetail'>
            <div className='personalInfo'>
              <div>
                <label>Customer Name:</label>
                <span>{selectedRes.name}</span>
              </div>
              <div>
                <label>Passport:</label>
                <span>{selectedRes.passport}</span>
              </div>
              <div>
                <label>Phone:</label>
                <span>{selectedRes.phone}</span>
              </div>
              <div>
                <label>Email:</label>
                <span>{selectedRes.email}</span>
              </div>
              <div>
                <label>Reservation Date:</label>
                <span>{formatDate(selectedRes.reservationDate)}</span>
              </div>
            </div>
            <div className='personalInfo'>
              <div>
                <label>Total Payment:</label>
                <span>{selectedRes.totalPayment}TL</span>
              </div>
              <div>
                <label>First Payment will:</label>
                <span>{selectedRes.payment} - {selectedRes.totalPayment * 30 / 100}TL</span>
              </div>
              <div>
                <label>Remaining Payment:</label>
                <span>{selectedRes.totalPayment - (selectedRes.totalPayment * 30 / 100)}TL</span>
              </div>
              <div>
                <label>Payment Type:</label>
                <span>{selectedRes.paymentType}</span>
              </div>

              <div>
                <label>Status:</label>
                <span className={selectedRes.isBooked ? "booked" : selectedRes.isPending ? "pending" : "waiting"}>{selectedRes.isBooked ? "Booked" : selectedRes.isPending ? "Pending" : "Waiting"}</span>
              </div>


            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default ReservationDetail