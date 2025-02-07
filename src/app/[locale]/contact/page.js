'use client'

import Menucustom from '../menu'
import styles from './page.module.scss'
import { Card } from 'antd';
import Footer from '../components/footer'
import Link from 'next/link'


const { Meta } = Card;

export default function Contact() {

    return <>
        <Menucustom></Menucustom>

        <Card
            hoverable
            style={{ width: 360, margin: '80px auto' }}
            cover={<img alt="contact" src="/contact_background.jpg" />}
        >
            <Link  href='mailto:info@xiaoweibot.com' target='_blank'>
                <Meta style={{marginBottom: '16px'}} title="Email" description="mailto:info@xiaoweibot.com" />
            </Link>
            <Link href='https://x.com/xiaoweibot' target='_blank'>
                <Meta title="X Account" description="@xiaoweibot" />
            </Link>
        </Card>
        <Footer></Footer>
    </>
}