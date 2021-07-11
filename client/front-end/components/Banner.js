
import React from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'



const Banner = () => {
  return(
    <div className={styles.banner}>
     <div className={styles.bannerItems}>
         <h1 className={styles.bannerTitle}>life is an adventure,
         <br />
          it's not a package tour.
         </h1>
     
         <Link className={styles.bannerBtn} href='/'>view all</Link>
     </div>
    </div>
   )

 }

export default Banner