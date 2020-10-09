import React from 'react';
import DatePicker from 'react-datepicker';
import { Button } from 'react-bootstrap';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';

interface IProps {
  calendarValue: string;
  calendarOnChange: Function;
  leftOnClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  rightOnClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const CustomCalendar = (props: IProps) => {
  return (
    <React.Fragment>
      <Button variant='warning' type='button' onClick={props.leftOnClick}>
        <BsChevronDoubleLeft />
      </Button>
      <Button variant='warning' type='button' onClick={props.rightOnClick}>
        <BsChevronDoubleRight />
      </Button>
      <DatePicker
        id='graph-datepicker'
        selected={new Date(props.calendarValue)}
        onChange={props.calendarOnChange}
        dateFormat='yyyy/M/d'
      />
    </React.Fragment>
  );
};

export default CustomCalendar;
