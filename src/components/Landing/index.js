import React from 'react'
import Styles from './landing.module.css'
import Image from '../../assets/kaitlyn-baker-vZJdYl5JVXY-unsplash.jpg'
const LandingPage = () => {
    return(
        <header className={Styles.header} style={{ backgroundImage: `url(${Image})` }} >
            <div className={Styles.container}>
                <div className={Styles.card}>
                    <div  className={Styles.xl}>Be Truly Borderless</div>
                    <p className={Styles.p}>Send and receive money globally. Create Virtual dollar cards that work anywhere online</p>
                    <div>
                        <button className={Styles.btn}>Google Play</button>
                        <button className={Styles.btn}>App Store</button>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default LandingPage