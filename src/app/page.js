'use client'

import React from "react";
import Header from '@/app/components/header'
import styles from './styles.module.css';
import Link from "next/link";

import { SiAudiomack } from "react-icons/si";
import { FaClosedCaptioning } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import { FaUniversalAccess } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaTools } from "react-icons/fa";


function Header() {
    return (
        <header className={styles.head}>
            <Link href="/" className={styles.logo}>AutoCaptioner</Link>
            <nav className={styles.nav_bar}>
                <Link href="/">Home</Link>
                <Link href="#Services">Services</Link>
                <Link href="#About">About</Link>
                <Link href="/upload">Upload</Link>
                <Link href="/login" target="_blank">Login</Link>
            </nav>
        </header>
    );
}

function HomeContent() {
    return (
        <section className={styles.home} id="Home">
            <div className={styles.home_content}>
                <h1>Welcome to AutoCaptioner</h1>
                <p>The ultimate tool for creating descriptive and engaging captions for your videos with ease!
                    Whether you are a content creator, marketer, or simply someone who loves sharing videos with friends and family,
                    our Caption Generator is here to help you add the perfect touch of text to your videos.
                </p>
                <Link href="/login">Get Started</Link>
            </div>
        </section>
    );
}

function Service() {
    return (
        <section className={styles.services} id="Services">
            <h1>Services</h1>
            <div className={styles.content}>
                <div className={styles.card}>
                    <div className={styles.icon}>
                        <span><SiAudiomack /></span>
                    </div>
                    <div className={styles.info}>
                        <h2>Audio to Text</h2>
                        <h3>Transfer audio to Text by any language you choose</h3>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}>
                        <span><FaClosedCaptioning /></span>
                    </div>
                    <div className={styles.info}>
                        <h2>Generate Caption</h2>
                        <h3>Generate Caption For Your Videos to any language you choose</h3>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}>
                        <span><FaDownload /></span>
                    </div>
                    <div className={styles.info}>
                        <h2>Download</h2>
                        <h3>Download Your Video after generating Caption</h3>
                    </div>
                </div>
            </div>
        </section>
    );
}
function About() {
    return (
    <>
        <section className={styles.About} id="About">
        <h1>About</h1>
        <div className={styles.content}>
                <div className={styles.card}>
                    <div className={styles.icon}>
                        <span><FaUniversalAccess  /></span>
                    </div>
                    <div className={styles.info}>
                        <h2>Our Mission</h2>
                        <h3>Empowering Accessibility</h3>
                        <p>Our mission is to make video content accessible to everyone, 
                            regardless of their hearing abilities or language proficiency</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}>
                        <span><FaEye /></span>
                    </div>
                    <div className={styles.info}>
                        <h2>Our Vision</h2>
                        <h3>Shaping the Future of Video Accessibility</h3>
                        <p>We utilize advanced technologies like React.js for a seamless user experience, 
                            AWS S3 for secure and scalable video storage, 
                            and Amazon Transcribe for precise caption generation</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}>
                        <span><FaTools /></span>
                    </div>
                    <div className={styles.info}>
                        <h2>Our Technology</h2>
                        <h3>Innovative Solutions</h3>
                        <p>We utilize advanced technologies like React.js for a seamless user experience, 
                            AWS S3 for secure and scalable video storage, 
                            and Amazon Transcribe for precise caption generation</p>
                    </div>
                </div>
        </div>
        </section>
    </>
    );
}
function Footer() {
    return (
        <footer className={styles.foot}>
            <div className={styles.text}>
                <p>Copyright <span>AutoCaptioner</span> &copy; 2024</p>
            </div>
        </footer>
    );
}

export default function WelcomePage() {
    return (
        <>
            <Head>
                <title>Auto Captioner</title> 
            </Head>
                {/* <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
                />  */}
            <Header />
            <main>
                <HomeContent />
                <Service />
                <About />
            </main>
            <Footer />
        </>
    );
}
