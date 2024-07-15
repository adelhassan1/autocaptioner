'use client'
import React, { useRef, useState } from 'react';
import styles from './styles.module.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link'


function Header(){
    return (
    <>
    <div className={styles.top}>
        <Link href="/" className={styles.logo}>AutoCaptioner</Link>
        <div className={styles.nav_bar}>
            <Link href="/">Home</Link>
            <Link href="/upload">upload</Link>
            <Link href="/login">Login</Link>
        </div>             
    </div>
    </>
    );
}


function Text(){
    return(
    <div className={styles.text}>
        <h1>Generate Caption For Your videos</h1>
        <h2>Just Upload, we'll do the rest</h2>
    </div>
    )
}


function Cards() {
    const fileInputRef = useRef(null);

    const HanddleButtonClick = () => {
        fileInputRef.current.click();
    };

    const [ isUploading, setIsUploading ] = useState(false);
    const router = useRouter();

    const handleFileChnage = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                setIsUploading(true);
                const res = await fetch('/upload/api/upload', {
                    method: 'POST',
                    body: formData,
                });
    
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const text = await res.text();
                const data = text ? JSON.parse(text) : {};
                const newName = data.newName;
                router.push('/upload/'+newName);
            } catch (error) {
                console.error('There was a problem with the upload:', error);
            }
            setIsUploading(false);
        }
    };
    return (
    <>
        {isUploading && (
            <div className="bg-black/90 text-white fixed inset-0 flex items-center">
                <div className="w-full text-center">
                    <h2 className="text-4xl mb-4">Uploading</h2>
                    <h3 className="text-xl">Please wait...</h3>
                </div>
            </div>
        )}
        <div className={styles.card_container}>
            <div className={styles.card}>
                word will be here
            </div>
            <div className={styles.two}>
                <button className={styles.btn} onClick={HanddleButtonClick}>Upload File</button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChnage}
                    style={{ display: 'none' }}
                />
            </div>
            <div className={styles.three}>
                video will be here
            </div>
        </div>
    </>
    );
}


export default function Home(){
    return(
    <>
        <header>
            <Header />
        </header>
        <main className={styles.Main}>
            <Text />
            </main>
            <Cards />
    </>    
    );
}
