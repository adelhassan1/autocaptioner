'use client'
import React, { useRef, useState } from 'react';
import styles from './styles.module.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link'


function Header(){
    return (
    <>
    <div className={styles.heading}>
        <Link href="/" className={styles.log}>AutoCaptioner</Link>
        <div className={styles.navbar}>
            <Link href="/" className={styles.links}>Home</Link>
            <Link href="/upload" className={styles.links}>upload</Link>
        </div>             
    </div>
    </>
    );
}


function MainContent() {
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
    return(
    <>
        {isUploading && (
            <div className="bg-black/90 text-white fixed inset-0 flex items-center">
                <div className="w-full text-center">
                    <h2 className="text-4xl mb-4">Uploading</h2>
                    <h3 className="text-xl">Please wait...</h3>
                </div>
            </div>
        )}
        <section className={styles.main}>
        <div className={styles.contents}>
        <h1>Generating Caption For Your videos by any Language</h1>
        <h2>Just Upload, We will do the rest</h2>
        <button className={styles.botton} onClick={HanddleButtonClick}>Upload File</button>
        <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChnage }
            style={{display: 'none'}}
            />
        </div>
        </section>
    </>
    );
}
export default function Home(){
    return(
    <>
        <Header />
        <MainContent />
    </>    
    );
}
