import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../config/supabaseClient';
import Select from 'react-select';
import Navbar from '../../../components/navbar/navbar';
import './AllEvents.css';
import SessionContext from '../../../api/context/SessionContext';

const EventCard = ({ bgColor, imgSrc, imgAlt, date, title, description }) => {
  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
    return { day, month };
  };

  const { day, month } = formatDate(date);

  return (
    <div className={`bg-${bgColor} text-white event-card`}>
      <img src={imgSrc} alt={imgAlt} className="event-image" />
      <div className="p-4">
        <div className="date-info">
          <div className="text-lg">{day}</div>
          <div className="text-sm">{month}</div>
        </div>
        <div className="event-info">
          <div className="font-bold text-xl">{title}</div>
          <div className="text-sm">{description}</div>
        </div>
      </div>
    </div>
  );
};

const AllEvents = () => {
  const { user } = useContext(SessionContext);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const eventListRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

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

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleTagChange = (selectedOption) => {
    setSelectedTag(selectedOption);
    if (selectedOption.value === 'all') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => event.tag === selectedOption.value);
      setFilteredEvents(filtered);
    }
  };

  const handleNextSlide = () => {
    if (eventListRef.current.scrollLeft + eventListRef.current.clientWidth < eventListRef.current.scrollWidth) {
      eventListRef.current.scrollBy({ left: eventListRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const handlePrevSlide = () => {
    if (eventListRef.current.scrollLeft > 0) {
      eventListRef.current.scrollBy({ left: -eventListRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
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

        <div className='filter-AllEvents-modified'>
          <span>Filtrar por tag:&nbsp;&nbsp;&nbsp; </span>
          <Select
            value={selectedTag}
            onChange={handleTagChange}
            options={tags}
          />
        </div>

        <div className="events-grid">
          {filteredEvents.map((event, index) => (
            <div className="event-grid-item" key={index}>
              <EventCard
                bgColor={event.theme.toLowerCase().replace(/\s+/g, '-')}
                imgSrc={event.photo}
                imgAlt={event.name}
                date={event.date}
                title={event.name}
                description={event.description}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllEvents;
