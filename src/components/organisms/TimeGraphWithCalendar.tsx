import { ITimeGraph } from '@/interfaces/IGraph';
import GraphCard from '@/components/atoms/GraphCard';
import TextCard from '@/components/atoms/TextCard';
import TimeGraph from '@/components/atoms/TimeGraph';
import axios from '@/common/module/customAxios';
import moment from 'moment-timezone';
import { Container, Row, Col } from 'react-bootstrap';
import { Calendar } from 'react-modern-calendar-datepicker';
import { useState, useEffect } from 'react';

interface IProps {
  startDate: string;
  endDate: string;
  getGraphUrl: string;
  heading: string;
}

interface IStateSelectedDayRange {
  from: {
    year: number;
    month: number;
    day: number;
  };
  to: {
    year: number;
    month: number;
    day: number;
  };
}

const TimeGraphWithCalendar = (props: IProps) => {
  const [calendarError, setCalendarError] = useState<boolean>(false);

  const [selectedDayRange, setSelectedDayRange] = useState<
    IStateSelectedDayRange
  >({
    from: {
      year: moment(props.startDate).year(),
      month: moment(props.startDate).month() + 1,
      day: moment(props.startDate).date(),
    },
    to: {
      year: moment(props.endDate).year(),
      month: moment(props.endDate).month() + 1,
      day: moment(props.endDate).date(),
    },
  });

  const [graph, setGraph] = useState<ITimeGraph>({
    xticks: [],
    lineData: [],
  });

  useEffect(() => {
    setCalendarError(false);
    if (selectedDayRange.from === null || selectedDayRange.to === null) return;

    if (
      moment(selectedDayRange.to)
        .add('month', -1)
        .diff(moment(selectedDayRange.from).add('month', -1), 'days') >= 31
    ) {
      setCalendarError(true);
      return;
    }

    axios
      .get(
        props.getGraphUrl +
          '?startDate=' +
          moment(selectedDayRange.from).add('month', -1).format('YYYY/M/D') +
          '&endDate=' +
          moment(selectedDayRange.to).add('month', -1).format('YYYY/M/D')
      )
      .then((res) => {
        console.log(res.data);
        setGraph(res.data);
      });
  }, [selectedDayRange]);

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <TextCard>
            <h1>{props.heading}</h1>
          </TextCard>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <GraphCard>
            <TimeGraph
              xticks={graph.xticks}
              lineData={graph.lineData}></TimeGraph>
          </GraphCard>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <TextCard>
            <Calendar
              value={selectedDayRange}
              onChange={setSelectedDayRange}
              colorPrimary='#0fbcf9'
              colorPrimaryLight='rgba(75, 207, 250, 0.4)'
              shouldHighlightWeekends
              calendarClassName='responsive-calendar'
              renderFooter={() =>
                calendarError ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '1rem 2rem',
                    }}>
                    <p className='text-danger'>
                      日付幅は31日以内で指定してください
                    </p>
                  </div>
                ) : null
              }
            />
          </TextCard>
        </Col>
        <Col xs={8}>
          <TextCard>
            <p>
              {selectedDayRange.from === null
                ? ''
                : moment(selectedDayRange.from)
                    .add('month', -1)
                    .format('YYYY/M/D')}
              <span
                style={{
                  margin: '0 10px',
                }}>
                ~
              </span>
              {selectedDayRange.to === null
                ? ''
                : moment(selectedDayRange.to)
                    .add('month', -1)
                    .format('YYYY/M/D')}
            </p>
          </TextCard>
        </Col>
      </Row>
    </Container>
  );
};

export default TimeGraphWithCalendar;
