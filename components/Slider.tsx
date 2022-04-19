import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import CardSlider from "./CardSlider";

function Slider() {
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 2.5,
      spacing: 15,
    },
  });

  return (
    <div ref={ref} className="keen-slider">
      <div className="keen-slider__slide  number-slide1 ">
        <CardSlider />
      </div>
      <div className="keen-slider__slide  number-slide2">
        <CardSlider />
      </div>
      <div className="keen-slider__slide  number-slide3">
        <CardSlider />
      </div>
      <div className="keen-slider__slide  number-slide4">
        <CardSlider />
      </div>
      <div className="keen-slider__slide  number-slide5">
        <CardSlider />
      </div>
      <div className="keen-slider__slide  number-slide6">
        <CardSlider />
      </div>
    </div>
  );
}

export default Slider;
