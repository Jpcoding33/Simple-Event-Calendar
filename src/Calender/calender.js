import { Wrapper, CalenderHead, SevenColGrid, HeadDay, CalenderBody , StyledDay, StyledEvent} from "./styled"
import "bootstrap/dist/css/bootstrap.min.css";
import * as Icon from 'react-bootstrap-icons';
import { Days, MONTHS } from "./const";
import { range, getDaysInMonth, getSortedDays, areDatesTheSame, getDateobj } from "./util";
import { useState } from "react";

export const Calender = ({startingDate, eventsArr, addEvent, removeEvent}) => {
    const [currentMonth, setCurrentMonth] = useState(startingDate.getMonth());
    const [currentYear, setCurrentYear] = useState(startingDate.getFullYear());
    const DaysInMonth = getDaysInMonth(currentMonth, currentYear);
    const nextMonth = () => {
        if(currentMonth < 11){
            setCurrentMonth((prev) => prev + 1);
        }
        else{
            setCurrentMonth(0);
            setCurrentYear((prev) => prev + 1);
        }
    };
    const prevMonth = () => {
        if(currentMonth > 0){
            setCurrentMonth((prev) => prev - 1);
        }
        else{
            setCurrentMonth(11);
            setCurrentYear((prev) => prev - 1);
        }
    };

    const onAddEvent = (date) => {
        addEvent(date);
    }
    const onRemoveEvent = (date,title) => {
        removeEvent(date,title);
    }


    return (
        <Wrapper>
            <CalenderHead>
                <Icon.ArrowLeftCircleFill onClick={prevMonth}/>
                <p className="m-0">{MONTHS[currentMonth]} {currentYear}</p>
                <Icon.ArrowRightCircleFill onClick={nextMonth}/>
            </CalenderHead>
            <SevenColGrid>
                {getSortedDays(currentMonth, currentYear).map((day) => (
                    <HeadDay>{day}</HeadDay>
                ))}
            </SevenColGrid>
            <CalenderBody fourCol={DaysInMonth === 28}>
                {range(DaysInMonth).map((day) => (
                    <StyledDay 
                    onClick={() => onAddEvent(getDateobj(day, currentMonth, currentYear))}
                    active={
                            areDatesTheSame(new Date(), getDateobj(day, currentMonth, currentYear))
                    }>
                        <p>{day}</p>
                        {
                            eventsArr.map((event) => 
                                areDatesTheSame(
                                    getDateobj(day, currentMonth, currentYear) ,
                                    event.date
                                )
                             &&
                            <StyledEvent>
                                <span>{event.title}</span>
                                <button className="border-0 bg-transparent"><Icon.XLg className="ms-2" onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveEvent(event.date,event.title);
                                    }}/></button>
                            </StyledEvent>
                            )
                        }
                    </StyledDay>
                ))}
            </CalenderBody>
        </Wrapper>
    )
}