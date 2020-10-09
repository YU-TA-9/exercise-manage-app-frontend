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
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Layout2 from '@/components/layout/Layout2';

export interface ITimeGraphElems {
  lineData: any[];
  lineKey: string | Function;
  lineName: string;
  lineColor: string;
}

export interface ITimeGraphProps {
  //data: any[];
  elems: any;
  dateRange: any[];
}

const initialDate = {
  dates: [
    1598918400,
    1599004800,
    1599091200,
    1599177600,
    1599264000,
    1599350400,
    1599436800,
    1599523200,
    1599609600,
    1599696000,
    1599782400,
    1599868800,
    1599955200,
    1600041600,
    1600128000,
    1600214400,
    1600300800,
    1600387200,
    1600473600,
    1600560000,
    1600646400,
    1600732800,
    1600819200,
    1600905600,
    1600992000,
    1601078400,
    1601164800,
    1601251200,
    1601337600,
    1601424000,
  ],
};

const initialData = {
  graph: [
    {
      contentTitle: 'test',
      data: [
        {
          time: 10,
          implementationDate: 1599868800,
        },
        {
          time: 20,
          implementationDate: 1599955200,
        },
        {
          time: 30,
          implementationDate: 1600041600,
        },
        {
          time: 40,
          implementationDate: 1600128000,
        },
        {
          time: 35,
          implementationDate: 1600387200,
        },
      ],
    },
    {
      contentTitle: 'テスト学習',
      data: [
        {
          time: 60,
          implementationDate: 1599955200,
        },
        {
          time: 60,
          implementationDate: 1600041600,
        },
        {
          time: 25,
          implementationDate: 1600128000,
        },
        {
          time: 60,
          implementationDate: 1600214400,
        },
        {
          time: 120,
          implementationDate: 1600300800,
        },
        {
          time: 120,
          implementationDate: 1600387200,
        },
      ],
    },
    {
      contentTitle: 'テスト学習登録',
      data: [
        {
          time: 450,
          implementationDate: 1600128000,
        },
        {
          time: 30,
          implementationDate: 1600300800,
        },
      ],
    },
    {
      contentTitle: 'AWS',
      data: [
        {
          time: 80,
          implementationDate: 1600214400,
        },
        {
          time: 80,
          implementationDate: 1600387200,
        },
      ],
    },
  ],
};

const TimeGraph = (props: ITimeGraphProps) => {
  return (
    <Layout2>
      <ResponsiveContainer height='100%'>
        <LineChart
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            scale={'utc'}
            ticks={initialDate.dates}
            dataKey='implementationDate'
            type='number'
            domain={[
              initialDate.dates[0],
              initialDate[initialDate.dates.length - 1],
            ]}
            tickFormatter={(unixTime) => moment(unixTime, 'X').format('D')}
            interval={0}
            allowDataOverflow={true}
            allowDuplicatedCategory={false}
          />
          <YAxis domain={[0, 'dataMax + 100']} />
          <Tooltip
            labelFormatter={(unixTime) =>
              moment(unixTime, 'X').format('YYYY/M/D')
            }
          />
          <Legend />
          {initialData.graph.map((elem) => (
            <Line
              data={elem.data}
              type='monotone'
              dataKey='time'
              key={elem.contentTitle}
              name={elem.contentTitle}
              //stroke={elem.lineColor}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Layout2>
  );
};

export default TimeGraph;
