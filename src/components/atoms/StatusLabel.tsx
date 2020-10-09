import { Badge } from 'react-bootstrap';

interface IProps {
  label: string;
}

export const NotLabel = (props: IProps) => (
  <Badge variant='danger'>{props.label}</Badge>
);

export const CompleteLabel = (props: IProps) => (
  <Badge variant='success'>{props.label}</Badge>
);

export const ContinueLabel = (props: IProps) => (
  <Badge variant='warning'>{props.label}</Badge>
);
