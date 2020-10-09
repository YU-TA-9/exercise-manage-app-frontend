import { Card } from 'react-bootstrap';

const GraphCard = ({ children }) => {
  return (
    <Card>
      <Card.Body className='graph-card'>{children}</Card.Body>
    </Card>
  );
};

export default GraphCard;
