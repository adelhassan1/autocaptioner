'use client'

import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from './styles.module.css';
import Link from "next/link";

function Header() {
    return (
        <header className={styles.head}>
            <Link href="/" className={styles.logo}>AutoCaptioner</Link>
            <nav className={styles.nav_bar}>
                <Link href="/">Home</Link>
                <a href="#Services">Services</a>
                <Link href="/upload">Upload</Link>
                <Link href="/login">Login</Link>
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
                    Whether you're a content creator, marketer, or simply someone who loves sharing videos with friends and family,
                    our Caption Generator is here to help you add the perfect touch of text to your videos.
                </p>
                <a href="/login">Get Started</a>
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
                        <i className='bx bx-text'></i>
                    </div>
                    <div className={styles.info}>
                        <h2>Audio to Text</h2>
                        <h3>Transfer audio to Text by any language you choose</h3>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}>
                        <i className='bx bxs-captions'></i>
                    </div>
                    <div className={styles.info}>
                        <h2>Generate Caption</h2>
                        <h3>Generate Caption For Your Videos to any language you choose</h3>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}>
                        <i className='bx bx-download'></i>
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
        <HelmetProvider>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
                />
            </Helmet>
            <Header />
            <main>
                <HomeContent />
                <Service />
            </main>
            <Footer />
        </HelmetProvider>
    );
}
