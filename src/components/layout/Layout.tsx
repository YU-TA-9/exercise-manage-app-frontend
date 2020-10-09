import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from '../organisms/Header';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';

type Props = {
  children?: ReactNode;
  title: string;
};

const Layout = ({ children, title }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <Header></Header>
    {children}
    <MDBFooter color='green' className='font-small pt-4 mt-4'>
      <div className='footer-copyright text-center py-3'>
        <MDBContainer fluid>
          Copyright © {new Date().getFullYear()} YU-TA-9 All Rights Reserved.
        </MDBContainer>
      </div>
    </MDBFooter>
  </div>
);

export default Layout;
