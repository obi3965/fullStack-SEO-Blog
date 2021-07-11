import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import styles from '../styles/Service.module.css'
const Services = () => {
  return(
      <>
      <br /><br /> <br /><br />
      <h1 className={styles.serviceTitle}></h1>
    <Container>
        <Row>
            <Col md="4" xl="4" sm="12">
               <div className={styles.box1}>
                   <div className={styles.icon}>
                   <i className="fas fa-home"></i>
                   </div>
                   <h3 className={styles.boxTitle}>help desk</h3>
                   <p className={styles.boxdesc}>Lorem ipsum dolor sit, amet consectetur 
                    adipisicing elit. Vero architecto 
                    dolor officia culpa harum beatae rerum 
                    !</p>
               </div>
            </Col>
            <Col md="4" xl="4" sm="12">
            <div className={styles.box2}>
                   <div className={styles.icon}>
                   <i className="fas fa-caravan"></i>
                   </div>
                   <h3 className={styles.boxTitle1}>travel site</h3>
                   <p className={styles.boxdesc1}>Lorem ipsum dolor sit, amet consectetur 
                    adipisicing elit. Vero architecto 
                    dolor officia culpa harum beatae rerum 
                    !</p>
               </div>
            </Col>
            <Col md="4" xl="4" sm="12">
            <div className={styles.box3}>
                   <div className={styles.icon}>
                   <i className="fas fa-hotel"></i>
                   </div>
                   <h3 className={styles.boxTitle}>services</h3>
                   <p className={styles.boxdesc}>Lorem ipsum dolor sit, amet consectetur 
                    adipisicing elit. Vero architecto 
                    dolor officia culpa harum beatae rerum 
                    !</p>
               </div>
            </Col>
        </Row>
    </Container>
    </>
   )

 }

export default Services