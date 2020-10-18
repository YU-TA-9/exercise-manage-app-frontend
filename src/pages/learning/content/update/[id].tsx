import Layout from '@/components/layout/Layout';
import {
  ILearningContentPayload,
  ILearningContent,
} from '@/interfaces/ILearning';
import BackButton from '@/components/atoms/BackButton';
import axios from '@/common/module/customAxios';
import { useState } from 'react';
import Router from 'next/router';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

interface IProps {
  id: number;
  data: ILearningContent;
}

const UpdateLearning = (props: IProps) => {
  const [contentId, setContentId] = useState<number>(props.id);

  const [payload, setPayload] = useState<ILearningContentPayload>({
    title: props.data.title,
    description: props.data.description,
    color: props.data.color,
    status: props.data.status,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('/api/learning/content/' + contentId, payload).then((res) => {
      Router.push('/learning/content/list');
    });
  };

  return (
    <Layout title='LEARNING - ContentUpdate | Exercise-Manage-App'>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <BackButton
              onClick={() => {
                Router.push('/learning/content/list');
              }}></BackButton>
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
              <Form.Group controlId='formDescription'>
                <Form.Label>設定色</Form.Label>
                <Form.Control
                  value={payload.color}
                  name='color'
                  type='color'
                  maxLength={6}
                  onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group controlId='formStatus'>
                <Form.Label>状態</Form.Label>
                <Form.Control
                  as='select'
                  custom
                  value={payload.status}
                  name='status'
                  onChange={handleChange}>
                  <option value={0} key={0}>
                    未着手
                  </option>
                  <option value={1} key={1}>
                    着手中
                  </option>
                  <option value={2} key={2}>
                    完了
                  </option>
                </Form.Control>
              </Form.Group>
              <Button
                variant='primary'
                type='submit'
                disabled={!payload.title || !payload.description}>
                更新
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

UpdateLearning.getInitialProps = async ({ query }) => {
  const res = await axios.get('/api/learning/content/' + query.id);
  console.log(res.data);
  return { id: query.id, data: res.data };
};

export default UpdateLearning;
