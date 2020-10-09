import { Card, Container, Row, Col, Image } from 'react-bootstrap';

interface IProps {
  imagePath: string;
  title: string;
  time: number;
}

const CustomCard = (props: IProps) => {
  return (
    <Card>
      <Card.Body>
        <Container>
          <Row>
            <Col xs={5}>
              <Image src={props.imagePath} thumbnail height='80px' />
            </Col>
            <Col xs={7} className='text-right'>
              <p>{props.title}</p>
              {props.time}
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
