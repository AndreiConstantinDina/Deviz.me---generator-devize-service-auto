import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import './home.css'

const Home = (props) => {
    return (
        <div className="home-container">
            <Helmet>
                <title>devize-auto.ro</title>
                <meta name="description" content="Description of the website" />
                <meta property="og:title" content="devize-auto.ro" />
                <meta property="og:description" content="Description of the website" />
            </Helmet>
            <div className="home-header">
                <div className="home-hero">
                    <div className="home-content">
                        <h1 className="home-title">
                            <span>CEL MAI BUN LOC PENTRU DEVIZELE TALE</span>
                            <br></br>
                        </h1>
                        <Link to="/" className="home-navlink">
                            <div className="home-io-btn">
                                <span className="home-caption">CREZĂ UN DEVIZ</span>
                            </div>
                        </Link>
                    </div>
                    <div className="home-images">
                        <div className="home-column">
                            <img
                                alt="pastedImage"
                                src="https://images.unsplash.com/photo-1530088528371-105e6f3b2336?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDE3fHxtZWNoYW5pY3xlbnwwfHx8fDE2ODI1MzQ2MzY&amp;ixlib=rb-4.0.3&amp;h=1500"
                                className="home-pasted-image"
                            />
                        </div>
                        <div className="home-column1">
                            <img
                                alt="pastedImage"
                                src="https://images.unsplash.com/photo-1615906655593-ad0386982a0f?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDJ8fG1lY2hhbmljfGVufDB8fHx8MTY4MjUzNDYzNg&amp;ixlib=rb-4.0.3&amp;h=1500"
                                className="home-pasted-image1"
                            />
                            <img
                                alt="pastedImage"
                                src="https://images.unsplash.com/photo-1578934644323-a65dd8502ed6?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDM1fHxtZWNoYW5pY3xlbnwwfHx8fDE2ODI1MzQ2Mzk&amp;ixlib=rb-4.0.3&amp;h=1500"
                                className="home-pasted-image2"
                            />
                        </div>
                        <div className="home-column2">
                            <img
                                alt="pastedImage"
                                src="https://images.unsplash.com/photo-1606337321936-02d1b1a4d5ef?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDh8fG1lY2hhbmljfGVufDB8fHx8MTY4MjUzNDYzNg&amp;ixlib=rb-4.0.3&amp;h=1500"
                                className="home-pasted-image3"
                            />
                            <img
                                alt="pastedImage"
                                src="https://images.unsplash.com/photo-1643701079732-3b1c7a797e3d?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDE1fHxtZWNoYW5pY3xlbnwwfHx8fDE2ODI1MzQ2MzY&amp;ixlib=rb-4.0.3&amp;h=1500"
                                className="home-pasted-image4"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-sections">
                <div className="home-section">
                    <div className="home-image"></div>
                    <div className="home-content1">
                        <h2 className="home-text02">
                            <span>CE ESTE DEVIZE-AUTO.RO?</span>
                            <br></br>
                        </h2>
                        <span>
              Devize-auto.ro este o platformă dedicată service-urilor auto din
              Romania ce își doresc o aplicație modernă pentru crearea și
              gestionarea activității de zi cu zi.
            </span>
                    </div>
                </div>
                <div className="home-section1">
                    <div className="home-content2">
                        <div className="home-heading">
                            <h2 className="home-text06">
                                <span>CE FEL DE BENEFICII ADUCE</span>
                                <br></br>
                                <span>DEVIZE-AUTO.RO?</span>
                            </h2>
                        </div>
                        <ul className="list">
                            <li className="list-item">
                <span>
                  Toate devizele și facturile tale într-un singur loc,
                  disponibile la un click distanță.
                </span>
                            </li>
                            <li className="list-item">
                <span>
                  Istoricul reparațiilor autovehiculelor este asigurat prin
                  aplicație atunci când acestea revin în service.
                </span>
                            </li>
                            <li className="list-item">
                {/*<span>*/}
                {/*  Asistență tehnică folosind inteligența artificială, atunci*/}
                {/*  când intri în pană de idei.*/}
                {/*</span>*/}
                            </li>
                            <li className="list-item">
                <span>
                  Eficiența la locul de muncă, posibilitatea monitorizării
                  evoluției angajaților și statistici privind clienții în
                  fiecare lună.
                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="home-image1"></div>
                </div>
                <div className="home-section2">
                    <div className="home-image2">
                        <div className="home-image-overlay"></div>
                    </div>
                    <div className="home-content4">
                        <h2 className="home-text14">
                            <span>CÂT COSTĂ SĂ FOLOSESC DEVIZE-AUTO.RO?</span>
                            <br></br>
                        </h2>
                        <span>
              Nimic! Aplicația noastră poate fi utilizată gratuit, fără limite
              de utilizare! Tot ce trebuie să faci este să îți creezi un cont!
            </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
