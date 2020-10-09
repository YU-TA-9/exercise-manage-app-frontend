import { Card } from 'react-bootstrap';

const TextCard = ({ children }) => {
  return (
    <Card>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export default TextCard;
