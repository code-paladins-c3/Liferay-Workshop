import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/navbar';
import Carousel from './components/Carousel/Carousel';

function App(props) {

  const images = [
    'https://media.istockphoto.com/id/626132614/pt/foto/blue-fronted-redstart-the-beautiful-blue.jpg?s=1024x1024&w=is&k=20&c=WuZk5dRfpAPbponj8oYAlSf1Q07BOYn2tbTOF5h0AIM=',
    'https://media.istockphoto.com/id/1224588778/pt/foto/baltimore-oriole-on-white-background.jpg?s=1024x1024&w=is&k=20&c=tCTEAowR_mNCaP-1tk8Bz7IYS3yZKBJQjDCE3PKmOSQ=',
    'https://media.istockphoto.com/id/1304608920/pt/foto/scarlet-ibis-flying.jpg?s=1024x1024&w=is&k=20&c=_v6Xf2zCQC9goeM0BoFN63mO0FLRxYfpOslssgl3pdE=',
    'https://media.istockphoto.com/id/540128322/pt/foto/sialia-sialis-sialia-sialis-p%C3%A1ssaro-empoleirar-se-masculino.jpg?s=1024x1024&w=is&k=20&c=XlUQPZRD3eYb6Hu0UxD3QFXZA4pXvjLk2denuPvcPAk=',
    'https://media.istockphoto.com/id/1475266818/pt/foto/yellow-fronted-woodpecker.jpg?s=1024x1024&w=is&k=20&c=CbwxT3jE4ChaP6wDtx2hcTMXf0-kce6HgqD1RHkblHg=',
    
  ];




  return (
    <><header>
      <div>

        <Navbar />

      </div>
    </header>
    <main>
    <Carousel images={images} />

    </main></>
  );
}

export default App;
