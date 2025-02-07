'use client'
import React, { useState } from 'react';
import { Menu } from 'antd';
import Link from 'next/link'
import './globals.css'
import { useTranslations } from 'next-intl';
import style from './page.module.scss'

const MenuApp = () => {
  const t  = useTranslations();
  const items = [
    {
      label: (
        <Link href="/" rel="noopener noreferrer">
          WeAssistant
        </Link>
      ),
      key: 'home',
    },
    {
      label: (
        <Link href="/chat" rel="noopener noreferrer">
          {t('Demo')}
        </Link>
      ),
      key: 'Demo',
    },
    {
      key: 'About',
      label: (
        <Link href="/about" rel="noopener noreferrer">
          {t('About')}
        </Link>
      ),
    },
    {
      key: 'Contact',
      label: (
        <Link href="/contact" rel="noopener noreferrer">
          {t('Contact')}
        </Link>
      ),
    },
  ];
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <>
      <Menu className={style['menu-box']} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      
    </>
  
  ;
};
export default MenuApp;