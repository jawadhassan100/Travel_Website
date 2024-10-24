import hunza from "../../assets/hunza.png"
import murree from "../../assets/murree.png"
import prado5 from "../../assets/prado5.png"
import landcrusier from "../../assets/landcrusier.png"

const Blog = () => {
  return (
   <>
   <div className="bg-slate-400 pt-16 h-full pb-4">
    <section className="md:px-[40px] ">
        <div className="bg-[white] rounded-[10px] ">
        <h1 className="text-[40px] font-semibold  mt-[60px] px-[20px]">Our Tours</h1>
        <div className="lg:flex gap-2 px-[20px]">
            <div className="lg:w-[50%]  py-[40px]">
                <p className="leading-[30px] mb-[20px] font-[600]">Traveling through the breathtaking landscapes of Hunza and Murree offers an unparalleled experience that captivates the senses. With majestic mountains, lush valleys, and serene lakes, these destinations are perfect for nature lovers and adventure seekers alike.</p>
                <p className="leading-[30px] font-[600]">On our tours, you can expect personalized itineraries tailored to your preferences, allowing you to discover hidden gems and iconic landmarks.</p>
            </div>
            <div className="lg:w-[64%] md:w-[48%]  md:flex gap-2 md:pb-[40px]">
                <img src={hunza} alt="" />
                <img src={murree} className="hidden md:block" alt="" />
            </div>
        </div>
      </div>
      </section>

      
      <section className="md:px-[40px]">
        <div className="bg-[white] rounded-[10px]">
        <h1 className="text-[40px] font-semibold  mt-[60px] px-[20px] py-[20px]">Our Transports</h1>
        <div className="lg:flex gap-[20px] ">
            <div className="lg:w-[64%] md:w-[51%]  md:flex gap-2 px-[20px] mb-[40px]">
                <img src={prado5} alt="" />
                <img src={landcrusier} className="hidden md:block" alt="" />
            </div>
            <div className="lg:w-[50%] px-[20px] lg:px-0 py-[40px]">
                <p className="leading-[30px]  mb-[20px] font-[600]">Navigating the stunning landscapes of Pakistan requires reliable and comfortable transportation, and our fleet of premium vehicles ensures just that.With ample space for luggage and passengers, you can relax and enjoy the scenic views without any worries. </p>
                <p className="leading-[30px] font-[600]">We prioritize your convenience with our transport services, offering flexibility and ease for all your travel needs.  With us, you can focus on creating beautiful memories while we take care of the journey itself. </p>
            </div>
          </div>
        </div>
      </section>


      <section className="mt-[50px]">
        <div className="bg-white md:mx-[40px] rounded-[10px] pt-5">
        <h2 className=" md:justify-center lg:px-0 px-[20px] flex w-[100%] text-[30px] font-bold">Why Choose Us!</h2>
        <div className="md:flex lg:jusify-center my-[20px] pb-[30px]" >
            <ul className="lg:pl-[150px] lg:pr-[100px] md:px-[40px]  px-[40px] list-disc">
                <li className="text-[17px] leading-[30px] font-[500] ">Customized Travel Packages: Offer tailor-made packages to suit individual preferences, including honeymoon, family, adventure, and business trips.</li>
                <li className="text-[17px] leading-[30px] font-[500]">24/7 Customer Support: Provide round-the-clock assistance for bookings, travel emergencies, and queries, ensuring a hassle-free experience.</li>
                <li className="text-[17px] leading-[30px] font-[500]">Exclusive Deals & Discounts: Partner with airlines, hotels, and tour operators to offer clients the best rates and special offers.</li>
                <li className="text-[17px] leading-[30px] font-[500]">Hassle-Free Booking: Simplify the booking process through an easy-to-navigate website or app for flights, hotels, and complete vacation packages.</li>
                <li className="text-[17px] leading-[30px] font-[500]">Experienced Travel Advisors: Rely on a team of travel experts to provide clients with personalized recommendations and insights into destinations.</li>
                <li className="text-[17px] leading-[30px] font-[500]">Safe & Secure Travel: Prioritize customer safety with travel insurance, up-to-date travel advisories, and assistance with visas and documentation.</li>
            </ul>
        </div>
      </div>
      </section>
   </div>
   </>
  )
}

export default Blog