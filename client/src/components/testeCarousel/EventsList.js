import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventsList.css';
import Select from 'react-select';
import supabase from '../../config/supabaseClient';
// import SessionContext from '../../api/context/SessionContext';

const eventCardClasses = "min-w-max rounded-lg shadow-lg";
const imageClasses = "rounded-t-lg";

const EventCard = ({ bgColor, imgSrc, imgAlt, date, title, description }) => {
  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
    return { day, month };
  };

  const { day, month } = formatDate(date);

  return (
    <div className={`bg-${bgColor} text-white ${eventCardClasses}`}>
      <img src={imgSrc} alt={imgAlt} className={imageClasses} />
      <div className="p-4 flex flex-col">
        <div className="date-info mb-2">
          <div className="dayCard">{day}</div>
          <div className="monthCard">{month}</div>
        </div>
        <div className="event-info">
          <div className="titleCard">{title}</div>
          <div className="text-sm">{description}</div>
        </div>
      </div>
    </div>
  );
};

const EventList = () => {
  // const { user } = useContext(SessionContext);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tags, setTags] = useState([]);
  const eventListRef = useRef(null);

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login');
  //   }
  // }, [user, navigate]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase.from('event').select('*');
      if (error) throw error;

      setEvents(data);
      setFilteredEvents(data);

      const uniqueTags = [...new Set(data.map(event => event.tag))];
      const tagOptions = [{ value: 'all', label: 'Todos' }, ...uniqueTags.map(tag => ({ value: tag, label: tag }))];
      setTags(tagOptions);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const navigateToCreateEvent = () => {
    navigate('/eventcreate');
  };

  const navigateToAllEvents = () => {
    navigate('/allevents');
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleNextSlide = () => {
    if (currentIndex < filteredEvents.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      eventListRef.current.scrollBy({
        left: eventListRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  const handlePrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      eventListRef.current.scrollBy({
        left: -eventListRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleTagChange = (selectedOption) => {
    setSelectedTag(selectedOption);
    if (selectedOption.value === 'all') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => event.tag === selectedOption.value);
      setFilteredEvents(filtered);
    }
  };

  

  return (
    <div>
      <div className="filter-by-tag">
        <span className='name-tag'>Filtrar por tag:&nbsp;&nbsp;&nbsp; </span>
        <Select className='select-tag' value={selectedTag} onChange={handleTagChange} options={tags} />
      </div>
      <div className="flex items-center">
        <button onClick={handlePrevSlide} className="coruselBtnPrevious">
          &lt;
        </button>
        <div className="flex overflow-x-hidden space-x-4 p-4" ref={eventListRef}>
          {filteredEvents.map((event, index) => (
            <EventCard
              key={index}
              bgColor={event.theme.toLowerCase().replace(/\s+/g, '-')}
              imgSrc={event.photo}
              imgAlt={event.name}
              date={event.date}
              title={event.name}
              description={event.description}
            />
          ))}
        </div>
        <button onClick={handleNextSlide} className="coruselBtnNext">
          &gt;
        </button>
      </div>
      <div className="btn-final">
        <button  onClick={navigateToCreateEvent} className="btn btn-primary mr-2">Criar Eventos</button>
        <button onClick={navigateToAllEvents} className="btn btn-outline-primary">Todos os Eventos</button>
      </div>
    </div>
  );
};

export default EventList;