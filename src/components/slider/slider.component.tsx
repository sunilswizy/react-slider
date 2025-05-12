import { useEffect, useRef, useState } from 'react';
import './slider.styles.css';

const images = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1633604910247-7a50983b11ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Bird on Tree"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1608644117670-ed72368bc63b?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Bird on Tree 2"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1627851756778-c80b164b2905?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Bird on Tree 3"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1559403053-900e0c4abc8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Bird on Tree 4"
    },
];


const Slider = () => {
    const [selectedImage, setSelectedImage] = useState(0);
    const intervalRef = useRef<number | null>(null);
    const [fade, setFade] = useState(false);

    const startInterval = () => {
        if(intervalRef.current) return;

        intervalRef.current = setInterval(() => 
            setSelectedImage((prev) => (prev + 1) % images.length),
            3000
        );
    };

    const endInterval = () => {
        if(intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null;
        };
    };

    useEffect(() => {
        startInterval();

        return () => {
            endInterval();
        }
    }, []);

    useEffect(() => {
        setFade(true);
        const timeOut = setTimeout(() => setFade(false), 500)

        return () => {
            clearInterval(timeOut);
        }
    }, [selectedImage]);

    const handleNextImage = () => {
        if(images.length - 1 == selectedImage) {
            return setSelectedImage(0)
        }

        setSelectedImage(selectedImage + 1);
    };

    const handlePreviousImage = () => {
        if(selectedImage === 0) {
            return setSelectedImage(images.length - 1);
        }

        setSelectedImage(selectedImage - 1);
    };

    return (
        <section className="slider-container" onMouseEnter={endInterval} onMouseLeave={startInterval} aria-label='Slide show Component'>
          <img  className={`slider-images ${fade ? 'animate': ''}`} alt={images[selectedImage].alt} src={images[selectedImage].url} />

          <div className='slider-buttons'>
            <button aria-label='previous-button' onClick={handlePreviousImage}>{'<'}</button>
            <button aria-label='next-button' onClick={handleNextImage}>{'>'}</button>
          </div>

          <div className='slider-actions'>
            {
                images.map((img, idx) => {
                    return (
                        <button
                            key={img.id}
                            onClick={() => setSelectedImage(idx)}
                            className={`slider-action-button ${idx == selectedImage ? 'active' : ''}`}
                            aria-label={`Slide ${idx + 1}`}
                        ></button>
                    );
                })
            }
          </div>
        </section>
    )
};

export default Slider;