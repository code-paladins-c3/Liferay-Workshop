import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from "../../../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import './EventPage.css';
import LocationIcon from './Asserts/Location.png';
import ClockIcon from './Asserts/Clock.png';
import CalendarIcon from './Asserts/Calendar.png';
import MaxPeopleIcon from './Asserts/MaxPeople.png';
import GoogleCalendar from './Asserts/GoogleCalendar.png';
import Verify from './Asserts/verify.png';

const EventPage = () => {
    const { eventId } = useParams();
    const [showPopup, setShowPopup] = useState(false);
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            const { data, error } = await supabase
                .from('event')
                .select('*')
                .eq('id', eventId);
            if (error) {
                console.error('Error fetching event:', error);
            } else if (data) {
                setEvent(data[0]);
            }
        };

        fetchEvent();
    }, [eventId]);

    const handleButtonClick = () => {
        setShowPopup(true);
        
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    const tags = event.tag ? event.tag.split(',') : [];

    const googleCalendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${event.date}T${event.time}/${event.date}T${event.time}&location=${encodeURIComponent(event.location)}&sf=true&output=xml`;

    return (
        <div className="event-page">
            <img src={event.photo} alt="Event" className="event-image" />
            <div className="event-content">
                <div className="event-left">
                    <h1 className="event-title">{event.name}</h1>
                    <p className="event-description">{event.description}</p>
                </div>
                <div className="event-right">
                    <div className="event-tags">
                        <h2>TAG:</h2>
                        <div className="tags">
                            {tags.map((tag, index) => (
                                <div className="tag" key={index}>{tag.trim()}</div>
                            ))}
                        </div>
                    </div>
                    <div className="event-details">
                        <h2>Detalhes:</h2>
                        <div className="detail">
                            <img src={CalendarIcon} alt="Date" />
                            <span>{event.date}</span>
                        </div>
                        <div className="detail">
                            <img src={ClockIcon} alt="Time" />
                            <span>{event.time}</span>
                        </div>
                        <div className="detail">
                            <img src={LocationIcon} alt="Location:" />
                            <span>Liferay, Recife-PE</span>
                        </div>
                        <div className="detail">
                            <img src={MaxPeopleIcon} alt="Max People" />
                            <span>{event.maxparticipants}</span>
                        </div>
                    </div>
                    <button className="subscribe-button" onClick={handleButtonClick}>Inscrever-se</button>
                    {showPopup && (
                        <div className="popup">
                            <img src={Verify} alt="Verify" className='imgVerify' />
                            <h2 className='Inscricao-Text'>Inscrição realizada com sucesso!</h2>
                            <br></br>
                            <br></br>
                            <br></br>
                            <a href={googleCalendarLink} target="_blank" rel="noopener noreferrer">
                                <button className='btn-saveCalendar'>Salvar no google Calendar  <img src={GoogleCalendar} alt="Save to Google Calendar" className='imgCalendar' /></button>
                            </a>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default EventPage;
