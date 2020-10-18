import Layout from '@/components/layout/Layout';
import TimeGraphWithCalendar from '@/components/organisms/TimeGraphWithCalendar';
import moment from 'moment-timezone';

interface IProps {
  startDate: string;
  endDate: string;
}

const Reading = (props: IProps) => {
  return (
    <Layout title='READING - Graph | Exercise-Manage-App'>
      <TimeGraphWithCalendar
        startDate={props.startDate}
        endDate={props.endDate}
        getGraphUrl={'/api/reading/time'}
        heading='読書時間'
      />
    </Layout>
  );
};

Reading.getInitialProps = async () => {
  const startDate: string = moment().startOf('month').format('YYYY/M/D');
  const endDate: string = moment().endOf('month').format('YYYY/M/D');
  return { startDate: startDate, endDate: endDate };
};

export default Reading;
