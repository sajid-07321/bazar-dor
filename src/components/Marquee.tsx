
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

const toBanglaNumber = (number: number) => {
  return number.toString().replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
};

interface HeadlineItem {
    id: number;
    image: string;
    nameBn: string;
    today: string;
  change: {
    dir: string;
    pct: number;
  };
}

const Marquee = async () => {

    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data = await res.json()
    
    const headLines = data
    
    return (
        <div className="border border-gray-300 py-1 bg-[#FAFCFA]">
           <MarqueeText direction="left"
           duration={10}>

                 {[...headLines, ...headLines].map(
                  (item:HeadlineItem, index) => ( 
                    <span key={`${item.id}-${index}`} className="mx-5">

            {/* Logo */}
            <span className="mr-2">
              {item.image}
            </span>

            {/* Name */}
            <span>
              {item.nameBn}
            </span>

            {/* Price */}
            <span className="mx-2">
              কেজি {toBanglaNumber(Number(item.today))} টাকা
            </span>

            {/* Change */}
            <span
              className={
                item.change.dir === "up"
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
               {item.change.dir === "up" ? "▲" : "▼"}{" "}
              {toBanglaNumber(item.change.pct)}%
            </span>

            <span className="mx-5 border border-gray-300"></span>
          </span>
        ))}

           </MarqueeText>
        </div>
    );
};

export default Marquee;