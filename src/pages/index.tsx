import { IRadar, IBar } from '@/interfaces/IGraph';
import Layout from '@/components/layout/Layout';
import CustomCard from '@/components/atoms/CustomCard';
import GraphCard from '@/components/atoms/GraphCard';
import { secondToHour } from '@/common/util/TimeUtils';
import axios from '@/common/module/customAxios';
import CustomCalendar from '@/components/molecules/CustomCalendar';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment-timezone';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
} from 'recharts';

interface IProps {
  initialDate: string;
}

interface IStateGraph {
  radar: IRadar[];
  bar: IBar[];
}

interface IStateSumTime {
  running: number;
  learning: number;
  reading: number;
}

const IndexPage = (props: IProps) => {
  // レーダーグラフ生成時に不要なエラーが出るため初期値を設定
  const initialRadarGraphData = [
    { title: 'ランニング', time: 0 },
    { title: '学習', time: 0 },
    { title: '読書', time: 0 },
  ];

  const [calendar, setCalendar] = useState<string>(props.initialDate);

  useEffect(() => {
    axios
      .get(process.env.HOST_URL + '/api/all/time?date=' + calendar)
      .then((res) => {
        console.log(res.data);

        // 合計時間計算
        const sumLearningTime: number = res.data.learning.reduce(
          (sum, elem) => sum + elem.time,
          0
        );
        const sumReadingTime: number = res.data.reading.reduce(
          (sum, elem) => sum + elem.time,
          0
        );
        setSumTime({
          running: res.data.running,
          learning: sumLearningTime,
          reading: sumReadingTime,
        });

        // グラフデータ更新
        const radarGraphJson: IRadar[] = [
          {
            title: 'ランニング',
            time: res.data.running,
          },
          {
            title: '学習',
            time: sumLearningTime,
          },
          {
            title: '読書',
            time: sumReadingTime,
          },
        ];

        const barGraphJson: IBar[] = [];
        barGraphJson.push({
          contentTitle: 'ランニング',
          runningTime: res.data.running,
        });

        res.data.learning.map((elem) => {
          barGraphJson.push({
            contentTitle: elem.contentTitle,
            learningTime: elem.time,
          });
        });

        res.data.reading.map((elem) => {
          barGraphJson.push({
            contentTitle: elem.contentTitle,
            readingTime: elem.time,
          });
        });

        setGraph({ radar: radarGraphJson, bar: barGraphJson });
      });
  }, [calendar]);

  const [sumTime, setSumTime] = useState<IStateSumTime>({
    running: 0,
    learning: 0,
    reading: 0,
  });

  const [graph, setGraph] = useState<IStateGraph>({
    radar: initialRadarGraphData,
    bar: [],
  });

  const handleChange = (value: string) => {
    setCalendar(moment(value).format('YYYY/M/D'));
  };

  const handleArrowRight = () => {
    setCalendar(moment(calendar).add(1, 'days').format('YYYY/M/D'));
  };

  const handleArrowLeft = () => {
    setCalendar(moment(calendar).add(-1, 'days').format('YYYY/M/D'));
  };

  return (
    <Layout title='TOP | Exercise-Manage-App'>
      <Container>
        <Row>
          <Col xs={12}>
            <CustomCalendar
              calendarValue={calendar}
              calendarOnChange={(date) => handleChange(date)}
              leftOnClick={handleArrowLeft}
              rightOnClick={handleArrowRight}></CustomCalendar>
          </Col>
        </Row>
        <Row>
          <Col md={8} xs={12}>
            <GraphCard>
              <ResponsiveContainer>
                <RadarChart width={300} height={300} data={graph.radar}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey='title' />
                  <PolarRadiusAxis
                    type='number'
                    angle={90}
                    axisLine={false}
                    tick={true}
                    tickFormatter={(x) => x / 3600}
                    domain={[0, 28800]}
                    tickCount={5}
                    unit='H'
                  />
                  <Radar
                    name='Main'
                    dataKey='time'
                    stroke='#8B20F5'
                    fill='#8B20F5'
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </GraphCard>
          </Col>
          <Col md={4} xs={12}>
            <Row>
              <Col xs={12}>
                <CustomCard
                  imagePath='/icon/icon-running.png'
                  title='ランニング'
                  time={secondToHour(sumTime.running)}></CustomCard>
              </Col>
              <Col xs={12}>
                <CustomCard
                  imagePath='/icon/icon-learning.png'
                  title='学習'
                  time={secondToHour(sumTime.learning)}></CustomCard>
              </Col>
              <Col xs={12}>
                <CustomCard
                  imagePath='/icon/icon-reading.png'
                  title='読書'
                  time={secondToHour(sumTime.reading)}></CustomCard>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <GraphCard>
              <ResponsiveContainer>
                <BarChart
                  layout='vertical'
                  data={graph.bar}
                  margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis
                    type='number'
                    domain={[0, 28800]}
                    tickFormatter={(x) => x / 3600}
                    ticks={[0, 7200, 14400, 21600, 28800]}
                    unit='H'
                  />
                  <YAxis dataKey='contentTitle' type='category' angle={30} />
                  <Bar dataKey='runningTime' fill='#F5A020' stackId='a' />
                  <Bar dataKey='learningTime' fill='#2AE869' stackId='a' />
                  <Bar dataKey='readingTime' fill='#5BB7FF' stackId='a' />
                </BarChart>
              </ResponsiveContainer>
            </GraphCard>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

IndexPage.getInitialProps = async () => {
  const today: string = moment().format('YYYY/M/D');
  return {
    initialDate: today,
  };
};

export default IndexPage;
