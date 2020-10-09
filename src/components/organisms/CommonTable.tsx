import { Table } from 'react-bootstrap';
import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const CommonTable = ({ children }: Props) => (
  <Table striped bordered>
    {children}
  </Table>
);

export default CommonTable;
