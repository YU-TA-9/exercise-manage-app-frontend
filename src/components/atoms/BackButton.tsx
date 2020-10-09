import { Button } from 'react-bootstrap';
import { BsCaretLeftFill } from 'react-icons/bs';

interface IProps {
  onClick: any;
}

const BackButton = (props: IProps) => (
  <Button variant='light' type='button' onClick={props.onClick}>
    <BsCaretLeftFill />
    <span
      style={{
        verticalAlign: 'middle',
      }}>
      戻る
    </span>
  </Button>
);

export default BackButton;
