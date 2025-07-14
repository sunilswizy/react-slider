import './App.css'
import Slider from './components/slider/slider.component';
import ja from '../public/locals/translation.json';


function App() {
  console.log("Ja", ja)

  return (
    <>
      <h1>Birds Slider</h1>
      <Slider />
    </>
  )
}

export default App
