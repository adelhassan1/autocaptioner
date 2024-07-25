import React from 'react';
import Link from 'next/link';
import styles from '@/app/styles.module.css';

export default function Header() {
    return (
        <header className={styles.head}>
            <Link href="/" className={styles.logo}>AutoCaptioner</Link>
            <nav className={styles.nav_bar}>
                <Link href="/">Home</Link>
                <Link href="#Services">Services</Link>
                <Link href="#About">About</Link>
                <Link href="/upload">Upload</Link>
            </nav>
        </header>
    );
}