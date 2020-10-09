import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from '../organisms/Header';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
import SideBar from '@/components/layout/SideBar';
import MainPage from '@/components/layout/MainPage';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout2 = ({ children, title = 'default.' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>

    <Header></Header>
    <SideBar></SideBar>
    <MainPage>{children}</MainPage>
  </div>
);

export default Layout2;
