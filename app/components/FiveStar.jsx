import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import LeftStar from "@/public/img/left-star.svg"
import RightStar from "@/public/img/right-star.svg"

const FiveStar = ({ greenStars, setGreenStars }) => {
    const array = Array(10).fill(0);
    const [blueStars, setBlueStars] = useState(-1);
    const [isClicked, setIsClicked] = useState(false);
    const [isRemoveOpen, setIsRemoveOpen] = useState(false);

    const handleMouseEnter = async (index) => {
        setBlueStars(index)
    };
    const handleMouseLeave = () => {
        setIsClicked(false);
        setBlueStars(-1);
    };
    const handleClick = (index) => {
        setGreenStars(index);
        setIsClicked(true);
    };
    const handleRemoveRating = () => {
        setGreenStars(-1);
    }

    return (<div className={'relative'} onMouseEnter={() => setIsRemoveOpen(true)} onMouseLeave={() => setIsRemoveOpen(false)}>
        <FontAwesomeIcon icon={faX} className={"size-[10px] text-[#324554] cursor-pointer absolute top-[11.5px] left-0 transform -translate-x-1/2 -translate-y-1/2 " + (greenStars != -1 && isRemoveOpen ? "block" : "hidden")} onClick={handleRemoveRating} />
        <div className='flex gap-0 px-[7px]'>
            {array.map((i, index) => {
                const StarComponent = index % 2 === 0 ? LeftStar : RightStar;
                return (
                    <StarComponent
                        key={index}
                        className='w-[12px] h-[22.5px]'
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onClick={() => handleClick(index)}
                        data-name={index}
                        fill={
                            isClicked
                                ? greenStars >= index
                                    ? "#00E054"//green
                                    : "#324554"//empty
                                : blueStars >= index
                                    ? "#41BCF4"//blue
                                    : blueStars == -1
                                        ? greenStars >= index
                                            ? "#00E054"//green
                                            : "#324554"//empty
                                        : "#324554"//empty
                        }
                    />
                )
            })}
        </div>
    </div>
    );
};

export default FiveStar;