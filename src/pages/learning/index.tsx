import Layout from '@/components/layout/Layout';
import TimeGraphWithCalendar from '@/components/organisms/TimeGraphWithCalendar';
import moment from 'moment-timezone';

interface IProps {
  startDate: string;
  endDate: string;
}

const Learning = (props: IProps) => {
  return (
    <Layout title='LEARNING - Graph | Exercise-Manage-App'>
      <TimeGraphWithCalendar
        startDate={props.startDate}
        endDate={props.endDate}
        getGraphUrl={process.env.HOST_URL + '/api/learning/time'}
        heading='学習時間'
      />
    </Layout>
  );
};

Learning.getInitialProps = async () => {
  const startDate: string = moment().startOf('month').format('YYYY/M/D');
  const endDate: string = moment().endOf('month').format('YYYY/M/D');
  return { startDate: startDate, endDate: endDate };
};

export default Learning;
