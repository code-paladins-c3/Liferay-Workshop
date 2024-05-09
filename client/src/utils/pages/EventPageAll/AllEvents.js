import { useEffect, useRef, useState } from 'react';
import supabase from '../../../config/supabaseClient'
import Select from 'react-select';
import Navbar from '../../../components/navbar/navbar'; 
import './AllEvents.css';


const eventCardClasses = "min-w-max rounded-lg shadow-lg";
const imageClasses = "rounded-t-lg";

const EventCard = ({ bgColor, imgSrc, imgAlt, date, title, location }) => {
  return (
    <div className={`bg-${bgColor} text-white ${eventCardClasses}`}>
      <img src={imgSrc} alt={imgAlt} className={imageClasses} />
      <div className="p-4">
        <div className="text-sm">{date}</div>
        <div className="font-bold text-lg">{title}</div>
        <div className="text-sm">{location}</div>
      </div>
    </div>
  );
};

const AllEvents = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const events = [
    
    {
      bgColor: "red-500",
      imgSrc: "https://placehold.co/300x200/e53e3e/ffffff",
      imgAlt: "Event Image",
      date: "26 ABR > 01 MAI",
      title: "DEVOPS",
      location: "Semana de DevOps",
    },
    {
      bgColor: "blue-500",
      imgSrc: "https://placehold.co/300x200/3182ce/ffffff",
      imgAlt: "Event Image",
      date: "08 JUN > 30 JUN",
      title: "PYTHON",
      location: "WorkShop de Python",
    },
    {
      bgColor: "zinc-800",
      imgSrc: "https://placehold.co/300x200/4a5568/ffffff",
      imgAlt: "Event Image",
      date: "15 AGO > 18 AGO",
      title: "JAVA",
      location: "Aprenda Java do zero",

    },
    {
      bgColor: "yellow-600",
        imgSrc: "https://placehold.co/300x200/d69e2e/ffffff",
        imgAlt: "Event Image",
        date: "SEX, 07 JUN - 19:30",
        title: "NODE JS",
        location: "Seja um BackEnd Ninja com Node JS",

    },
    {
      bgColor: "blue-500",
      imgSrc: "https://placehold.co/300x200/3182ce/ffffff",
      imgAlt: "Event Image",
      date: "08 JUN > 30 JUN",
      title: "PYTHON",
      location: "WorkShop de Python",
    },
    {
      bgColor: "zinc-800",
      imgSrc: "https://placehold.co/300x200/4a5568/ffffff",
      imgAlt: "Event Image",
      date: "15 AGO > 18 AGO",
      title: "JAVA",
      location: "Aprenda Java do zero",

    },
    {
      bgColor: "red-500",
      imgSrc: "https://placehold.co/300x200/e53e3e/ffffff",
      imgAlt: "Event Image",
      date: "26 ABR > 01 MAI",
      title: "DEVOPS",
      location: "Semana de DevOps",
    },
    // ... add more events
  ];

  const eventListRef = useRef(null);

  const handleNextSlide = () => {
    if (currentIndex < events.length - 1) {
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

  
  useEffect(() => {
    const handleResize = () => {
      
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]); 


const months = [
    { value: 1, label: 'Janeiro' },
    { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' },
    { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' },
    { value: 10, label: 'Outubro' },
    { value: 11, label: 'Novembro' },
    { value: 12, label: 'Dezembro' },
];

const [selectedMonth, setSelectedMonth] = useState(null);

const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
};

  return (


    <>
    
    <div>
      <Navbar/>
      
      </div>
    
    
    <div className="flex items-center">
      <button onClick={handlePrevSlide} className="coruselBtnPrevious">
        &lt;
      </button>
      <div className="flex overflow-x-scroll space-x-4 p-4" ref={eventListRef}>
        {events.map((event, index) => (
          <EventCard
            key={index}
            {...event} />
        ))}
      </div>
      <button onClick={handleNextSlide} className="coruselBtnNext">
        &gt;
      </button>
    </div>
    

    <div className="container">
  <div className='filter-AllEvents-modified'>
    <span>Filtrar por mês:&nbsp;&nbsp;&nbsp; </span>
    <Select  
        value={selectedMonth}
        onChange={handleMonthChange}
        options={months}
    />
  </div>

  <div className="events-container">
    {events.map((event, index) => (
        <div className="EventCard-modified" key={index}>
            <EventCard {...event} />
        </div>
    ))}
  </div>
</div>
    
    </>

      
  );
};

export default AllEvents;
