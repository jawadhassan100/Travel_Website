import { useState } from 'react';
import review1 from "../../assets/Ellipse 11.svg";
import review2 from "../../assets/Ellipse 12.svg";
import review3 from "../../assets/Ellipse 13.svg";
import review4 from "../../assets/Ellipse 14.svg";
import review5 from "../../assets/Ellipse 15.svg";

const reviewsData = [
  {
    id: 1,
    name: "Tom",
    image: review1,
    review: "It was a very good experience. Recommended for everyone."
  },
  {
    id: 2,
    name: "Alice",
    image: review2,
    review: "Amazing service! I would definitely recommend this to everyone."
  },
  {
    id: 3,
    name: "John",
    image: review3,
    review: "A memorable journey! The team was professional and attentive."
  },
  {
    id: 4,
    name: "Sara",
    image: review4,
    review: "Exceptional experience with great customer support! i am very satisfied."
  },
  {
    id: 5,
    name: "Mike",
    image: review5,
    review: "Highly satisfied with the tour arrangements and the hospitality."
  },
];

const Reviews = () => {
  const [selectedReview, setSelectedReview] = useState(reviewsData[2]);

  const handleImageClick = (review) => {
    setSelectedReview(review);
  };

  return (
    <>
      <div className="bg-[#F3F3F3] pb-[40px] pt-10  ">
        <div className="item-center justify-center flex">
          <h1 className="text-[25px] px-[10px] lg:[48px] font-[700] text-[#525252]">
            Here is what our Clients are saying About us
          </h1>
        </div>

        <div className="flex align-center justify-center mt-[30px]">
          <div className="bg-[white] w-[583px] rounded-[20px]">
            <h2 className="flex justify-center text-[22px] font-[700] mt-[40px] mb-[30px]">
              {selectedReview.name} says:
            </h2>
            <p className="px-[10px] lg:px-[30px] text-[18px] text-center align-center font-[500] pb-[15px]">
              {selectedReview.review}
            </p>
          </div>
        </div>

        <div className="flex align-center justify-center gap-[2px] lg:gap-[16px] mt-[50px]">
          {reviewsData.map((review) => (
            <div key={review.id} className="flex flex-col items-center">
              <img
                src={review.image}
                alt={review.name}
                className={`cursor-pointer transition-transform duration-300 ${
                  selectedReview.id === review.id ? "scale-150" : ""
                }`}
                onClick={() => handleImageClick(review)}
              />
              <p className="flex justify-center align-center font-[700] mt-4">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;
