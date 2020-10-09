import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from '../organisms/Header';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
import SideBar from '@/components/layout/SideBar';

type Props = {
  children?: ReactNode;
};

const MainPage = ({ children }: Props) => (
  <div className='main-content'>
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

export default MainPage;
