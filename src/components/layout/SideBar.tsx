import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from '../organisms/Header';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';

type Props = {
  children?: ReactNode;
  title?: string;
};

const SideBar = ({ children, title = 'default.' }: Props) => (
  <div>
    <div className='sideBar'>作業管理</div>
    <div className='sideBar-content'>
      <ul>
        <li>テスト</li>
        <li>テスト</li>
        <li>テスト</li>
      </ul>
    </div>
  </div>
);

export default SideBar;
