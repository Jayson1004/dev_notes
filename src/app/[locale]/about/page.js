'use client'

import Menucustom from '../menu'
import styles from './page.module.scss'
import Footer from '../components/footer'
import { useTranslations } from 'next-intl';

export default function About() {
    const t  = useTranslations();
    return <main>
        <Menucustom></Menucustom>
        <h1>{t('about.OurMission')}</h1>
        <p>{t('about.OurMissionContent')}</p>
        <div className={styles['flex-desc']}>
            <div className={styles['description-box']}>
                <img src="/ceo.jpg" alt="Aimny" />
                <h3>Aimny</h3>
                <p>{t('about.Position')}: CEO</p>
                <p>{t('about.CEOskil')}</p>
            </div>
            <div className={styles['description-box']}>
                <img src="/cto.jpg" alt="Aimny" />
                <h3>Bruce</h3>
                <p>Position: CTO</p>
                <p>Bruce is familiar with various AI technologies</p>
            </div>
            <div className={styles['description-box']}>
                <img src="/coo.jpg" alt="Aimny" />
                <h3>Mike</h3>
                <p>Position: COO</p>
                <p>Mike is proficient in user needs and products</p>
            </div>
        </div>
        <Footer></Footer>
    </main>
}