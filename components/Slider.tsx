import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import CardSlider from "./CardSlider";
import { NextPage } from "next";

const Slider: NextPage<{trendShows:any}> =(props) =>{
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 2.5,
      spacing: 15,
    },
  });

  return (
    <div ref={ref} className="keen-slider">

    {
      props.trendShows.map(show => {
        return (
          <div className="keen-slider__slide  number-slide1 ">
          <CardSlider name={show.title} image={show.backdrop_path} />
        </div>
        )})
            }
    
     
      
    </div>
  );
}

export default Slider;
