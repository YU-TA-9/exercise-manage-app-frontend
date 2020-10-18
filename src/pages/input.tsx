import { IContentSelect } from '@/interfaces/ISelect';
import { ITimeList } from '@/interfaces/IList';
import * as category from '@/common/constant/category';
import Layout from '@/components/layout/Layout';
import CustomCard from '@/components/atoms/CustomCard';
import CustomCalendar from '@/components/molecules/CustomCalendar';
import { secondToHour } from '@/common/util/TimeUtils';
import axios from '@/common/module/customAxios';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import moment from 'moment-timezone';

interface IPayload {
  categoryId: category.TCategory;
  contentId: string | number;
  contentTitle: string;
  time: number;
  implementationDate: string;
}

interface IProps {
  value: string;
  contentSelect: IContentSelect;
}

interface IStateSelected {
  id: string | number;
  title: string;
}

const InputPage = (props: IProps) => {
  const initialListData: ITimeList = {
    running: 0,
    learning: [],
    reading: [],
  };

  const [payload, setPayload] = useState<IPayload[]>([]);

  //カレンダー
  const [calendar, setCalendar] = useState<string>(props.value);

  //登録済み一覧
  const [list, setList] = useState<ITimeList>(initialListData);

  // セレクトボックスの中身（初期値）
  const [initialContentSelect, setInitialContentSelect] = useState<
    IContentSelect
  >({
    learning: props.contentSelect.learning,
    reading: props.contentSelect.reading,
  });

  // セレクトボックスの中身
  const [contentSelect, setContentSelect] = useState<IContentSelect>({
    learning: props.contentSelect.learning,
    reading: props.contentSelect.reading,
  });

  // 学習内容セレクトボックスの選択状態
  const [selectedLearning, setSelectedLearning] = useState<IStateSelected>({
    id:
      props.contentSelect.learning.length === 0
        ? ''
        : props.contentSelect.learning[0].contentId,
    title:
      props.contentSelect.learning.length === 0
        ? ''
        : props.contentSelect.learning[0].contentTitle,
  });

  // 読書内容セレクトボックスの選択状態
  const [selectedReading, setSelectedReading] = useState<IStateSelected>({
    id:
      props.contentSelect.reading.length === 0
        ? ''
        : props.contentSelect.reading[0].contentId,
    title:
      props.contentSelect.reading.length === 0
        ? ''
        : props.contentSelect.reading[0].contentTitle,
  });

  const handleChangeCalendar = (value) => {
    setCalendar(moment(value).format('YYYY/M/D'));
  };

  //カレンダーが切り替わったときの処理
  useEffect(() => {
    axios.get('/api/all/time?date=' + calendar).then((res) => {
      console.log(res.data);
      setList(res.data);
      setPayload([]);
    });
  }, [calendar]);

  // ペイロードが変更されたら
  useEffect(() => {
    setContentSelect({
      learning: initialContentSelect.learning.filter(
        (elem) =>
          payload
            .filter((payloadElem) => payloadElem.categoryId === 2)
            .find((payloadElem) => payloadElem.contentId === elem.contentId) ===
          undefined
      ),
      reading: initialContentSelect.reading.filter(
        (elem) =>
          payload
            .filter((payloadElem) => payloadElem.categoryId === 3)
            .find((payloadElem) => payloadElem.contentId === elem.contentId) ===
          undefined
      ),
    });
  }, [payload]);

  useEffect(() => {
    setSelectedLearning({
      id:
        contentSelect.learning.length === 0
          ? ''
          : contentSelect.learning[0].contentId,
      title:
        contentSelect.learning.length === 0
          ? ''
          : contentSelect.learning[0].contentTitle,
    });
  }, [contentSelect.learning]);

  useEffect(() => {
    setSelectedReading({
      id:
        contentSelect.reading.length === 0
          ? ''
          : contentSelect.reading[0].contentId,
      title:
        contentSelect.reading.length === 0
          ? ''
          : contentSelect.reading[0].contentTitle,
    });
  }, [contentSelect.reading]);

  // ランニング追加ボタン
  const addRunning = () => {
    setPayload([
      ...payload,
      {
        categoryId: category.CATEGORY_ID_RUNNING,
        contentId: '',
        contentTitle: 'ランニング',
        time: 0,
        implementationDate: calendar,
      },
    ]);
  };

  // 学習追加ボタン
  const addLearning = () => {
    setPayload([
      ...payload,
      {
        categoryId: category.CATEGORY_ID_LEARNING,
        contentId: selectedLearning.id,
        contentTitle: selectedLearning.title,
        time: 0,
        implementationDate: calendar,
      },
    ]);
  };

  // 読書追加ボタン
  const addReading = () => {
    setPayload([
      ...payload,
      {
        categoryId: category.CATEGORY_ID_READING,
        contentId: selectedReading.id,
        contentTitle: selectedReading.title,
        time: 0,
        implementationDate: calendar,
      },
    ]);
  };

  // 学習内容セレクトボックス
  const handleChangeLearning = (e) => {
    setSelectedLearning({
      id: Number(e.target.value),
      title: e.target.selectedOptions[0].text,
    });
  };

  // 読書内容セレクトボックス
  const handleChangeReading = (e) => {
    setSelectedReading({
      id: Number(e.target.value),
      title: e.target.selectedOptions[0].text,
    });
  };

  // 時間を変更した時
  const handleChangeTime = (e) => {
    let afterPayload = payload.slice();
    afterPayload[e.target.name] = {
      ...payload[e.target.name],
      time: e.target.value,
    };
    setPayload(afterPayload);
  };

  // 削除ボタン
  const handleDeleteTime = (e) => {
    let afterPayload = payload.slice();
    // ペイロードから削除
    afterPayload.splice(e.target.name, 1);
    setPayload(afterPayload);
  };

  // 登録ボタン
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(payload);
    axios.post('/api/all/time', payload).then((res) => {
      Router.push('/');
    });
  };

  const handleArrowRight = () => {
    setCalendar(moment(calendar).add(1, 'days').format('YYYY/M/D'));
  };

  const handleArrowLeft = () => {
    setCalendar(moment(calendar).add(-1, 'days').format('YYYY/M/D'));
  };

  return (
    <Layout title='ALL - Register | Exercise-Manage-App'>
      <Container>
        <Row>
          <Col xs={12}>
            <CustomCalendar
              calendarValue={calendar}
              calendarOnChange={(date) => handleChangeCalendar(date)}
              leftOnClick={handleArrowLeft}
              rightOnClick={handleArrowRight}></CustomCalendar>
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <Row>
              <Col xs={4}>
                <Button
                  disabled={
                    payload.find(
                      (elem) => elem.categoryId === category.CATEGORY_ID_RUNNING
                    ) === undefined
                      ? false
                      : true
                  }
                  type='button'
                  onClick={addRunning}
                  className='button-running'>
                  ランニング追加
                </Button>
              </Col>
              <Col xs={4}>
                <Button
                  disabled={contentSelect.learning.length === 0}
                  variant='primary'
                  type='button'
                  onClick={addLearning}
                  className='button-learning'>
                  学習追加
                </Button>
              </Col>
              <Col xs={4}>
                <Button
                  disabled={contentSelect.reading.length === 0}
                  variant='primary'
                  type='button'
                  onClick={addReading}
                  className='button-reading'>
                  読書追加
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs={4}></Col>
              <Col xs={4}>
                <Form.Control
                  as='select'
                  custom
                  value={selectedLearning.id}
                  name={selectedLearning.title}
                  onChange={handleChangeLearning}>
                  {contentSelect.learning.map((elem, i) => (
                    <option value={elem.contentId} key={i}>
                      {elem.contentTitle}
                    </option>
                  ))}
                </Form.Control>
              </Col>
              <Col xs={4}>
                <Form.Control
                  as='select'
                  custom
                  value={selectedReading.id}
                  name={selectedReading.title}
                  onChange={handleChangeReading}>
                  {contentSelect.reading.map((elem, i) => (
                    <option value={elem.contentId} key={i}>
                      {elem.contentTitle}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                {(() => {
                  if (payload.length === 0)
                    return <p>更新する内容を追加してださい。</p>;
                })()}
                {payload.map((elem, i) => (
                  <Form.Row key={i}>
                    <Col xs={5}>
                      <Form.Label>{elem.contentTitle}</Form.Label>
                    </Col>
                    <Col xs={2}>
                      <Form.Control
                        type='text'
                        placeholder=''
                        value={elem.time}
                        name={String(i)}
                        onChange={handleChangeTime}
                      />
                    </Col>
                    <Col xs={3}>
                      <Button
                        name={String(i)}
                        variant='danger'
                        type='button'
                        onClick={handleDeleteTime}>
                        削除
                      </Button>
                    </Col>
                  </Form.Row>
                ))}
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Form onSubmit={handleSubmit}>
                  <Button
                    variant='primary'
                    type='submit'
                    disabled={payload.length === 0}>
                    登録
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col xs={4}>
            <Row>
              <Col xs={12}>
                <CustomCard
                  imagePath='/icon/icon-running.png'
                  title='ランニング'
                  time={secondToHour(list.running)}></CustomCard>
              </Col>
              <Col xs={12}>
                {list.learning.map((elem, i) => (
                  <CustomCard
                    key={i}
                    imagePath='/icon/icon-learning.png'
                    title={elem.contentTitle}
                    time={secondToHour(elem.time)}></CustomCard>
                ))}
              </Col>
              <Col xs={12}>
                {list.reading.map((elem, i) => (
                  <CustomCard
                    key={i}
                    imagePath='/icon/icon-reading.png'
                    title={elem.contentTitle}
                    time={secondToHour(elem.time)}></CustomCard>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
InputPage.getInitialProps = async () => {
  const today: string = moment().format('YYYY/M/D');
  const res = await axios.get('/api/all/content/select');
  console.log(res.data);
  return {
    value: today,
    contentSelect: res.data,
  };
};

export default InputPage;
