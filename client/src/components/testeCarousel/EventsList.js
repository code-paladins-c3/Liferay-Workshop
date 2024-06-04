import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import './EventsList.css';
import Select from 'react-select';
import supabase from '../../config/supabaseClient';
import SessionContext from '../../api/context/SessionContext';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import SetaDireita from './setaDireita.png';
import SetaEsquerda from './setaEsquerda.png';

const eventCardClasses = "min-w-max rounded-lg shadow-lg";


const EventCard = ({ bgColor, imgSrc, imgAlt, date, title, description , id }) => {
  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
    return { day, month };
  };

  const { day, month } = formatDate(date);

  return (
    <Link to={`/eventpage/${id}`}>
    <div className={`bg-${bgColor} text-white ${eventCardClasses} card`}>
      <div className='margin-Carr'>
      <img src={imgSrc} alt={imgAlt} className='imageClasses' />
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
    </div>
    </Link>

  );
};

const handleOnResize = (event) => {
  const { innerWidth: width } = window;
  let itemsToShow = 1;

  if (width >= 1024) {
    itemsToShow = 2;
  }

  return { items: itemsToShow };
};

const EventList = () => {
  const { user } = useContext(SessionContext);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tags, setTags] = useState([]);
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

  const navigateToCreateEvent = () => {
    navigate('/eventcreate');
  };

  const navigateToAllEvents = () => {
    navigate('/allevents');
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

  

  return (
    <div className='EventL-conteiner'>
      <div className="filter-by-tag">
        <span className='name-tag'>Filtrar por tag:&nbsp;&nbsp;&nbsp; </span>
        <Select className='select-tag' value={selectedTag} onChange={handleTagChange} options={tags} />
      </div>
      <div className="">
      <AliceCarousel
          mouseTracking
          keyboardNavigation
          items={
           filteredEvents.map((event, index) => (
           
              <EventCard
                bgColor={event.theme.toLowerCase().replace(/\s+/g, '-')}
                imgSrc={event.photo}
                imgAlt={event.name}
                date={event.date}
                title={event.name}
                description={event.description}
                className={'event-card'}
                id={event.id}
              />
            
          ))}
          responsive={{
            100: { items: 1, },
            256: { items: 1, },
            300: { items: 1, },
            512: { items: 2, },
            900: { items: 2, },
            1024: { items: 3, },
            1920: { items: 4, }
          
          }}
          infinite
          onResized={handleOnResize}
          renderPrevButton={() => 
            <button className="alice-carousel__prev-btn">
              <img src={SetaEsquerda} alt="Previous" />
            </button>
          }
          renderNextButton={() => 
            <button className="alice-carousel__next-btn">
              <img src={SetaDireita} alt="Next" />
            </button>
          }
        />

      </div>
      <div className="btn-final">
        <button  onClick={navigateToCreateEvent} className="btn btn-primary mr-2">Criar Eventos</button>
        <button onClick={navigateToAllEvents} className="btn btn-outline-primary">Todos os Eventos</button>
      </div>
    </div>
  );
};

export default EventList;