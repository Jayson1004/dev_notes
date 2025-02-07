'use client'
import React, { useState } from 'react';
import Link from 'next/link'
import './globals.css'
import { useTranslations } from 'next-intl';
import Menucustom from './menu'
import { Button, Carousel } from 'antd';
import styles from './page.module.scss'
import Footer from './components/footer'


const App = ({lang}) => {
  const t  = useTranslations();
  const contentStyle = {
    position: 'absolute',
    bottom: '0',
    left: 0,
    width:' 100%',
    minHeight: '160px',
    padding:'10px',
    color: '#fff',
    background: 'transparent',
  };
  return <main className={styles.pageBox}>
      <Menucustom></Menucustom>
      <header >
            <h1 >{t('home.aim')}</h1>
            <p >{t('home.desc')}</p>
            <Link href="/chat">
            <Button type='primary'>
              {t('home.StartChatting')}
            </Button>
            </Link>
        </header>
      <section>
      <Carousel autoplay fade>
        <div className={styles.carBox}>
          <img src='/schedule.jpg' alt='' /> 
          <div style={contentStyle}>
            <h2>{t('home.ScheduleManagement')}</h2>
            <h3>{t('home.ScheduleManagementDec')}</h3>
          </div>
        </div>
        <div className={styles.carBox}>
          <img src='/secretary.jpg' alt='' /> 
          <div style={contentStyle}>
            <h2>{t('home.SecretaryAffairs')}</h2>
            <h3>{t('home.SecretaryAffairsDec')}</h3>
          </div>
        </div>
        <div className={styles.carBox}>
          <img src='/emotional.jpg' alt='' /> 
          <div style={contentStyle}>
            <h2>{t('home.EmotionalCompanionship')}</h2>
            <h3>{t('home.EmotionalCompanionshipDec')}</h3>
          </div>
        </div>
      </Carousel>
      </section>
      <Footer></Footer>
    </main>

  ;
};
export default App;

