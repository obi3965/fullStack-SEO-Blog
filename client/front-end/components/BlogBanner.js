import styles from '../styles/Blog.module.css'
import Link from 'next/link'


function BlogBanner() {
    return (
        <>
          <div className={styles.BlogBanner}>
        <div className={styles.BlogBannerItems}>
         <h1 className={styles.BlogBannerTitle}>life is an adventure,
         <br />
          it's not a package tour.
         </h1>
     
         <Link className={styles.BlogBannerBtn} href='/blog'>all Blogs</Link>
     </div>
    </div>  
        </>
    )
}

export default BlogBanner
