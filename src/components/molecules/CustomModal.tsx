import { Modal, Button } from 'react-bootstrap';

interface IProps {
  title: string;
  body: string;
  show: boolean;
  doYes: Function;
  doNo: Function;
}

const CustomModal = (props: IProps) => {
  return (
    <Modal show={props.show} onHide={() => props.doNo()}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={() => props.doNo()}>
          いいえ
        </Button>
        <Button variant='primary' onClick={() => props.doYes()}>
          はい
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
