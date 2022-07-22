import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { NextPage } from "next";

const Slider: NextPage<{
  perView?: number;
  children: React.ReactNode;
}> = ({ perView = 2.5, children }) => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: perView,
      spacing: 15,
    },
  });

  return (
    <div ref={ref} className="keen-slider">
      {children}
    </div>
  );
};

export default Slider;
