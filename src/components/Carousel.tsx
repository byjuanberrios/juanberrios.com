import { useRef, useState } from "react";

export default function Carousel({ images }: { images: string[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="carouselWrapper max-w-[min(88vw,_595px)] overflow-hidden mt-2.5 mb-1.5">
      <div
        className="carousel snap-x scroll-pr-12 w-full overflow-x-auto whitespace-nowrap cursor-grab select-none"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className="carousel-items flex gap-3">
          {images.map((item) => (
            <img
              src={item}
              className="item h-[200px] bg-amber-300 rounded !select-none"
              key={item}
              draggable="false"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
