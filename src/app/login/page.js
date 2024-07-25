'use client'
import React, { useState } from "react";
import styles from './loginStyles.module.css';
import { FaRegUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { FaRegEnvelopeOpen } from "react-icons/fa6";
import Header from '@/app/components/header'



function LoginForm() {
    const [action, setAction] = useState('Login');
    return (
    <>
        <Header />
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.text}>{action}</div>
                <div className={styles.underline}></div>
            </div>
            <div className={styles.inputs}>
                {action==="Login"?<div></div>:<div className={styles.input}>
                    <span> <FaRegUser /> </span>
                    <input type="text" placeholder="Name"></input>
                </div>}
                
                <div className={styles.input}>
                    <span><FaRegEnvelopeOpen /></span>
                    <input type="email" placeholder="Email"></input>
                </div>
                <div className={styles.input}>
                    <span> <FaLock /> </span>
                    <input type="password" placeholder="Password" required=""></input>
                </div>
                {action==="Sign Up"?<div></div>:<button className={styles.forget_password}>Lost password? <span>Click Here</span></button>}
                
                <div className={styles.submit_container}>
                    <div className={action==="Login" ? `${styles.submit} && ${styles.gray}` : styles.submit} onClick={() => {setAction("Sign Up")}}>Sign Up</div>
                    <div className={action==="Sign Up" ? `${styles.submit} && ${styles.gray}` : styles.submit} onClick={() => {setAction("Login")}}>Login</div>
                </div>
            </div>
        </div>
    </>
    );
} 
export default function Login() {
    return (
        <div className="pl-96 pt-24">
            <LoginForm />
        </div>
    );
}