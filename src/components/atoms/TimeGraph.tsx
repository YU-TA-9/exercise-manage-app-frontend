import { ITimeGraphLineData } from '@/interfaces/IGraph';
import { secondToHour } from '@/common/util/TimeUtils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment-timezone';

export interface IProps {
  lineData: ITimeGraphLineData[];
  xticks: number[];
}

const TimeGraph = (props: IProps) => (
  <ResponsiveContainer>
    <LineChart
      margin={{
        top: 15,
        right: 35,
        left: 5,
        bottom: 5,
      }}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis
        scale={'utc'}
        ticks={props.xticks}
        dataKey='implementationDate'
        type='number'
        domain={[props.xticks[0], props.xticks[props.xticks.length - 1]]}
        tickFormatter={(unixTime) => moment(unixTime, 'X').format('D')}
        interval={0}
        allowDataOverflow={true}
        allowDuplicatedCategory={false}
      />
      <YAxis
        domain={[0, 28800]}
        tickFormatter={(x) => x / 3600}
        ticks={[0, 7200, 14400, 21600, 28800]}
        unit='H'
      />
      <Tooltip
        labelFormatter={(unixTime) => moment(unixTime, 'X').format('YYYY/M/D')}
        formatter={(value, name, props) => secondToHour(value) + 'H'}
      />
      <Legend />
      {props.lineData.map((elem) => (
        <Line
          data={elem.data}
          type='monotone'
          dataKey='time'
          key={elem.contentTitle}
          name={elem.contentTitle}
          stroke={elem.lineColor}
          activeDot={{ r: 8 }}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
);

export default TimeGraph;
