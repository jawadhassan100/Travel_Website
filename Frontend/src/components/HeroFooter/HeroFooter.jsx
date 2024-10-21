import herofooter1 from "../../assets/hfoot1.png"
import herofooter2 from "../../assets/hfoot2.png"

const HeroFooter = () => {
  return (
    <>
    <div className="overflow-hidden hidden lg:flex md:flex">
    <img
      src={herofooter1}
      alt=""
      className="absolute -mt-12 -z-20"
    />
    <img
      src={herofooter2}
      alt=""
      className="relative rotate-[.7deg] -top-4 -z-10"
    />
  </div>
    </>
  
  )
}

export default HeroFooter