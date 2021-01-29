import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/button.scss'
import classes from '../styles/pages/privacy-about.module.scss';
import NavBar from '../components/NavBar';


const PrivacyPage = () => {
    return(
        <>
            <NavBar />
            <div className={classes.BackgroundPolicy}> 
                <div className={classes.Content}>
                    <h1 className={classes.Title}>Privacy Policy</h1>
                    <h2 className={classes.SubTitle}>Principles</h2>
                    <p>We respect our website users’ privacy. Our Privacy Policy is guided by a few fundamental principles:</p>
                    <ul>
                        <li>All personal data we store is anonymised.</li>
                        <li>We don’t ask for unnecessary information from our users. We only store or ask for information that is essential to the delivery of our gamified political engagement service.</li>
                        <li>We don’t share our users’ personal information unless we are required to do so to comply with the law or to protect our rights.</li>
                        <li>Information is only shared to your local council as a statistic, and may be used as part of a wider report on engagement with climate issues.</li>
                        <li>We don’t store personal information on servers unless it is required for the on-going operation of the site.</li>
                        <li>Any information we do store will be removed upon request. </li>
                        <li>We will only email you via the mailing list about gathering feedback and further ways you can engage with our games.</li>
                    </ul>

                    <h2 className={classes.SubTitle}>Website visitors</h2>
                    <p>Like most website operators we collect information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. This data does not personally identify our users and we do not publish it. Our purpose in collecting it is to better understand how our visitors use our website.</p>
                    <p>We do not collect potentially personally-identifying information like Internet Protocol (IP) addresses: we do not enable comments on our website or allow anyone other than ourselves to login.</p>
                    <p>When playing our game we will collect usage statistics which will be used to help improve the playability of our games.</p>
                    <p>When playing the games you may be asked for various pieces of information. This data is used to create a legitimate entry that your local council can consider a voice as part of their wider engagement on climate policies in your area.</p>

                    <h2 className={classes.SubTitle}>Gathering of personally-identifying information</h2>
                    <p>Our sign-up form asks users to provide their email address to allow us to respond. We only ask for the essential information required to fulfill the purpose of the interaction, and do not disclose it to third parties.</p>

                    <h2 className={classes.SubTitle}>Website statistics</h2>
                    <p>We use the Google Analytics service to collect statistics about the interactions of our website visitors. For example, we monitor the site’s most popular pages, the length of time users spend on the site, and the locations from which requests for pages are made. We do not display this information publicly or provide it to others other than as described below.</p>

                    <h2 className={classes.SubTitle}>Protection of personally-identifying information</h2>
                    <p>We disclose potentially personally-identifying and personally-identifying information only to those of its employees, contractors and affiliated organizations that (i) need to know that information in order to process it on our behalf, and (ii) that have agreed not to disclose it to others. Some of those employees, contractors and affiliated organizations may be located outside of your home country; by using this website you consent to the transfer of such information to them.</p>
                    <p>We will not rent or sell potentially personally-identifying and personally-identifying information to anyone. We disclose potentially personally-identifying and personally-identifying information only in response to a court order or other governmental request, or when we believe in good faith that disclosure is reasonably necessary to protect the property or our rights, third parties or the public at large.</p>
                    <p>We take all measures reasonably necessary to protect against the unauthorized access, use, alteration or destruction of potentially personally-identifying and personally-identifying information.</p>

                    <h2 className={classes.SubTitle}>Cookies</h2>
                    <p>A cookie is a string of information that a website stores on a visitor’s computer, and that the visitor’s browser provides to the website each time the visitor returns. We use cookies to help us to identify and track visitors and monitor their usage of our website. Visitors to our site who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using the site. This may have implications on the auto-save feature of our games.</p>

                    <h2 className={classes.SubTitle}>Privacy Policy changes</h2>
                    <p>We may change the Privacy Policy from time to time, at our sole discretion. Those changes will always be posted immediately to this page. Your continued use of the site after any change to this Privacy Policy will constitute your acceptance of such change.</p>


                    <Link to="/user"><button className="Btn">Go Back</button></Link>
                </div>
            </div>
        </>
    )
}

export default PrivacyPage;