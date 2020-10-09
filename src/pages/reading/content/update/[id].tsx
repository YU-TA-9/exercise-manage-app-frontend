import Layout from '@/components/layout/Layout';
import { IReadingContentPayload, IReadingContent } from '@/interfaces/IReading';
import BackButton from '@/components/atoms/BackButton';
import axios from '@/common/module/customAxios';
import { useState } from 'react';
import Router from 'next/router';
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap';

interface IProps {
  id: number;
  data: IReadingContent;
}

const UpdateReading = (props: IProps) => {
  const [contentId, setContentId] = useState<number>(props.id);

  const [payload, setPayload] = useState<IReadingContentPayload>({
    title: props.data.title,
    description: props.data.description,
    color: props.data.color,
    status: props.data.status,
  });

  // 画像更新ペイロード
  const [imagePayload, setImagePayload] = useState<any>(null);

  // 画像表示用
  const [imageDisplay, setImageDisplay] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(process.env.HOST_URL + '/api/reading/content/' + contentId, payload)
      .then((res) => {
        Router.push('/reading/content/list');
      });
  };

  const handleChangeFile = (e) => {
    setImagePayload(e.target.files[0]);

    const reader: FileReader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImageDisplay(reader.result);
    };
  };

  const handleUploadFile = (e) => {
    e.preventDefault();
    const formData: FormData = new FormData();
    formData.append('image', imagePayload);
    axios
      .patch(
        process.env.HOST_URL + '/api/reading/content/image/' + contentId,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((res) => {
        Router.push('/reading/content/list');
      });
  };

  return (
    <Layout title='READING - ContentUpdate | Exercise-Manage-App'>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <BackButton
              onClick={() => {
                Router.push('/reading/content/list');
              }}></BackButton>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='formTitle'>
                <Form.Label>読書名</Form.Label>
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
                    未読
                  </option>
                  <option value={1} key={1}>
                    読書中
                  </option>
                  <option value={2} key={2}>
                    読了
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
          <Col xs={12} md={6}>
            <Row>
              <Col xs={12}>
                <Form.File>
                  <Form.File.Input onChange={handleChangeFile} />
                </Form.File>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <p>更新前</p>
                <Image
                  decoding='async'
                  src={
                    props.data.imagePath === null
                      ? '/icon/icon-no-data.png'
                      : process.env.HOST_URL +
                        '/api/reading/content/image/' +
                        props.data.imagePath
                  }
                  rounded
                  height='100px'
                />
              </Col>
              <Col xs={6}>
                <p>更新後</p>
                <Image
                  decoding='async'
                  src={imageDisplay ? imageDisplay : ''}
                  rounded
                  height='100px'
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Button
                  variant='primary'
                  type='submit'
                  disabled={!imagePayload}
                  onClick={handleUploadFile}>
                  画像更新
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

UpdateReading.getInitialProps = async ({ query }) => {
  const res = await axios.get(
    process.env.HOST_URL + '/api/reading/content/' + query.id
  );
  console.log(res.data);
  return { id: query.id, data: res.data };
};

export default UpdateReading;
