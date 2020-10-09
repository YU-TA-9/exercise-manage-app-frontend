import {
  ILearningContentPayload,
  ILearningContent,
  TLearningStatus,
} from '@/interfaces/ILearning';
import { DEFAULT_COLOR_LEARNING } from '@/common/constant/color';
import axios from '@/common/module/customAxios';
import Layout from '@/components/layout/Layout';
import CommonTable from '@/components/organisms/CommonTable';
import TextCard from '@/components/atoms/TextCard';
import CustomModal from '@/components/molecules/CustomModal';
import {
  CompleteLabel,
  ContinueLabel,
  NotLabel,
} from '@/components/atoms/StatusLabel';
import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

interface IProps {
  list: ILearningContent[];
}

const List = (props: IProps) => {
  const initialPayload: ILearningContentPayload = {
    title: '',
    description: '',
    color: DEFAULT_COLOR_LEARNING,
    status: 0,
  };

  const judgeStatus = (status: TLearningStatus) => {
    switch (status) {
      case 0:
        return <NotLabel label='未着手'></NotLabel>;
      case 1:
        return <ContinueLabel label='着手中'></ContinueLabel>;
      case 2:
        return <CompleteLabel label='完了'></CompleteLabel>;
    }
  };

  const handleClose = () =>
    setModal({
      ...modal,
      body: '削除します。よろしいですか？',
      doYes: () => {},
      show: false,
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(process.env.HOST_URL + '/api/learning/content', payload)
      .then((res) => {
        setPayload(initialPayload);
        Router.push('/learning/content/list');
      });
  };

  const handleDelete = (id) => {
    handleClose();
    axios
      .delete(process.env.HOST_URL + '/api/learning/content/' + id)
      .then((res) => {
        Router.push('/learning/content/list');
      });
  };

  const [payload, setPayload] = useState<ILearningContentPayload>(
    initialPayload
  );

  const [modal, setModal] = useState({
    show: false,
    title: '削除確認',
    body: '削除します。よろしいですか？',
    doYes: () => {},
    doNo: handleClose,
  });

  return (
    <Layout title='LEARNING - ContentList | Exercise-Manage-App'>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <TextCard>
              <h1>学習内容一覧</h1>
            </TextCard>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <TextCard>
              {(() => {
                if (props.list === null || props.list.length === 0) {
                  return (
                    <p className='text-danger'>学習内容を登録してください</p>
                  );
                }

                return (
                  <CommonTable>
                    <thead>
                      <tr>
                        <th>タイトル</th>
                        <th>説明</th>
                        <th>状態</th>
                        <th>設定色</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.list.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{data.title}</td>
                            <td>{data.description}</td>
                            <td>{judgeStatus(data.status)}</td>
                            <td>
                              {data.color === null ? (
                                '未設定'
                              ) : (
                                <div
                                  className='color-area'
                                  style={{ background: data.color }}></div>
                              )}
                            </td>
                            <td>
                              <Link
                                href={
                                  '/learning/content/update/' + data.contentId
                                }
                                passHref>
                                <Button variant='link'>更新</Button>
                              </Link>
                            </td>
                            <td>
                              <Button
                                variant='danger'
                                onClick={() =>
                                  setModal({
                                    ...modal,
                                    show: true,
                                    body:
                                      '「' +
                                      data.title +
                                      '」を削除します。よろしいですか？',
                                    doYes: () => handleDelete(data.contentId),
                                  })
                                }>
                                削除
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </CommonTable>
                );
              })()}
            </TextCard>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='formTitle'>
                <Form.Label>学習名</Form.Label>
                <Form.Control
                  value={payload.title}
                  name='title'
                  type='text'
                  onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group controlId='formDescription'>
                <Form.Label>詳細</Form.Label>
                <Form.Control
                  value={payload.description}
                  name='description'
                  type='textarea'
                  onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group controlId='formColor'>
                <Form.Label>設定色</Form.Label>
                <Form.Control
                  value={payload.color}
                  name='color'
                  type='color'
                  maxLength={6}
                  onChange={handleChange}></Form.Control>
              </Form.Group>
              <Button
                variant='primary'
                type='submit'
                disabled={!payload.title || !payload.description}>
                登録
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <CustomModal
        show={modal.show}
        title={modal.title}
        body={modal.body}
        doYes={modal.doYes}
        doNo={modal.doNo}></CustomModal>
    </Layout>
  );
};

List.getInitialProps = async () => {
  const res = await axios.get(process.env.HOST_URL + '/api/learning/content');
  console.log(res.data);
  return { list: res.data };
};

export default List;
