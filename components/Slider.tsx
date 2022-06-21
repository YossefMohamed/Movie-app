import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { NextPage } from "next";

const Slider: NextPage<any> = (props) => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView:2.5,
      spacing: 15,
    },
  });

  return (
    <div ref={ref} className="keen-slider">
      {props.children}
    </div>
  );
};

export default Slider;
