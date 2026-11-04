import type { LegalContent, LegalSection } from "@/components/legal";
import { ContactLink, LegalLink } from "@/components/legal";

function InShort(props: { children: React.ReactNode }) {
    return <p><strong>In short:</strong> <em>{props.children}</em></p>;
}

const sections: LegalSection[] = [
    {
        id: "summary",
        title: "Summary of key points",
        content: (
            <>
                <p>
                    This summary provides key points from our Privacy Notice, but you can find out more details about any of
                    these topics by following the link after each key point or by using the table of contents.
                </p>
                <p>
                    <strong>What personal information do we process?</strong> When you visit, use, or navigate our
                    Services, we may process personal information depending on how you interact with us and the Services,
                    the choices you make, and the products and features you use. Learn more about{" "}
                    <a href="#collected">personal information you disclose to us</a>.
                </p>
                <p>
                    <strong>Do we process any sensitive personal information?</strong> Some of the information may be
                    considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins,
                    sexual orientation, and religious beliefs. We do not process sensitive personal information.
                </p>
                <p>
                    <strong>Do we collect any information from third parties?</strong> We do not collect any information
                    from third parties.
                </p>
                <p>
                    <strong>How do we process your information?</strong> We process your information to provide, improve,
                    and administer our Services, communicate with you, for security and fraud prevention, and to comply with
                    law. We may also process your information for other purposes with your consent. We process your
                    information only when we have a valid legal reason to do so. Learn more about{" "}
                    <a href="#processing">how we process your information</a>.
                </p>
                <p>
                    <strong>In what situations and with which types of parties do we share personal information?</strong>{" "}
                    We may share information in specific situations and with specific categories of third parties. Learn
                    more about <a href="#sharing">when and with whom we share your personal information</a>.
                </p>
                <p>
                    <strong>How do we keep your information safe?</strong> We have adequate organizational and technical
                    processes and procedures in place to protect your personal information. However, no electronic
                    transmission over the internet or information storage technology can be guaranteed to be 100% secure,
                    so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will
                    not be able to defeat our security and improperly collect, access, steal, or modify your information.
                    Learn more about <a href="#security">how we keep your information safe</a>.
                </p>
                <p>
                    <strong>What are your rights?</strong> Depending on where you are located geographically, the
                    applicable privacy law may mean you have certain rights regarding your personal information. Learn more
                    about <a href="#rights">your privacy rights</a>.
                </p>
                <p>
                    <strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by
                    visiting our <ContactLink>contact page</ContactLink>, or by contacting us. We will consider and act upon
                    any request in accordance with applicable data protection laws.
                </p>
            </>
        ),
    },
    {
        id: "collected",
        title: "What information do we collect?",
        content: (
            <>
                <h3>Personal information you disclose to us</h3>
                <InShort>We collect personal information that you provide to us.</InShort>
                <p>
                    We collect personal information that you voluntarily provide to us when you register on the Services,
                    express an interest in obtaining information about us or our products and Services, when you
                    participate in activities on the Services, or otherwise when you contact us.
                </p>
                <p>
                    <strong>Personal Information Provided by You.</strong> The personal information that we collect depends
                    on the context of your interactions with us and the Services, the choices you make, and the products and
                    features you use. The personal information we collect may include the following:
                </p>
                <ul>
                    <li>names</li>
                    <li>phone numbers</li>
                    <li>email addresses</li>
                    <li>mailing addresses</li>
                    <li>usernames</li>
                    <li>passwords</li>
                    <li>contact preferences</li>
                    <li>contact or authentication data</li>
                    <li>billing addresses</li>
                </ul>
                <p><strong>Sensitive Information.</strong> We do not process sensitive information.</p>
                <p>
                    <strong>Social Media Login Data.</strong> We may provide you with the option to register with us using
                    your existing social media account details, like your Facebook, X, or other social media account. If
                    you choose to register in this way, we will collect certain profile information about you from the
                    social media provider, as described in the section called "
                    <a href="#social-logins">How do we handle your social logins?</a>" below.
                </p>
                <p>
                    All personal information that you provide to us must be true, complete, and accurate, and you must
                    notify us of any changes to such personal information.
                </p>
                <h3>Information automatically collected</h3>
                <InShort>
                    Some information, such as your Internet Protocol (IP) address and/or browser and device
                    characteristics, is collected automatically when you visit our Services.
                </InShort>
                <p>
                    We automatically collect certain information when you visit, use, or navigate the Services. This
                    information does not reveal your specific identity (like your name or contact information) but may
                    include device and usage information, such as your IP address, browser and device characteristics,
                    operating system, language preferences, referring URLs, device name, country, location, information
                    about how and when you use our Services, and other technical information. This information is primarily
                    needed to maintain the security and operation of our Services, and for our internal analytics and
                    reporting purposes.
                </p>
                <p>
                    Like many businesses, we also collect information through cookies and similar technologies. You can find
                    out more about this in our <LegalLink document="cookies">Cookie Policy</LegalLink>.
                </p>
                <p>The information we collect includes:</p>
                <ul>
                    <li>
                        <strong>Log and Usage Data.</strong> Log and usage data is service-related, diagnostic, usage, and
                        performance information our servers automatically collect when you access or use our Services and
                        which we record in log files. Depending on how you interact with us, this log data may include your
                        IP address, device information, browser type, and settings and information about your activity in
                        the Services (such as the date/time stamps associated with your usage, pages and files viewed,
                        searches, and other actions you take such as which features you use), device event information
                        (such as system activity, error reports (sometimes called "crash dumps"), and hardware settings).
                    </li>
                    <li>
                        <strong>Device Data.</strong> We collect device data such as information about your computer, phone,
                        tablet, or other device you use to access the Services. Depending on the device used, this device
                        data may include information such as your IP address (or proxy server), device and application
                        identification numbers, location, browser type, hardware model, Internet service provider and/or
                        mobile carrier, operating system, and system configuration information.
                    </li>
                    <li>
                        <strong>Location Data.</strong> We collect location data such as information about your device's
                        location, which can be either precise or imprecise. How much information we collect depends on the
                        type and settings of the device you use to access the Services. For example, we may use GPS and
                        other technologies to collect geolocation data that tells us your current location (based on your IP
                        address). You can opt out of allowing us to collect this information either by refusing access to
                        the information or by disabling your Location setting on your device. However, if you choose to opt
                        out, you may not be able to use certain aspects of the Services.
                    </li>
                </ul>
                <h3>Google API</h3>
                <p>
                    Our use of information received from Google APIs will adhere to{" "}
                    <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>,
                    including the{" "}
                    <a href="https://developers.google.com/terms/api-services-user-data-policy#limited-use" target="_blank" rel="noopener noreferrer">Limited Use requirements</a>.
                </p>
            </>
        ),
    },
    {
        id: "processing",
        title: "How do we process your information?",
        content: (
            <>
                <InShort>
                    We process your information to provide, improve, and administer our Services, communicate with you, for
                    security and fraud prevention, and to comply with law. We may also process your information for other
                    purposes with your consent.
                </InShort>
                <p>
                    We process your personal information for a variety of reasons, depending on how you interact with our
                    Services, including:
                </p>
                <ul>
                    <li><strong>To facilitate account creation and authentication and otherwise manage user accounts.</strong> We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
                    <li><strong>To deliver and facilitate delivery of services to the user.</strong> We may process your information to provide you with the requested service.</li>
                    <li><strong>To respond to user inquiries/offer support to users.</strong> We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
                    <li><strong>To send administrative information to you.</strong> We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.</li>
                    <li><strong>To fulfill and manage your orders.</strong> We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.</li>
                    <li><strong>To enable user-to-user communications.</strong> We may process your information if you choose to use any of our offerings that allow for communication with another user.</li>
                    <li><strong>To request feedback.</strong> We may process your information when necessary to request feedback and to contact you about your use of our Services.</li>
                    <li><strong>To send you marketing and promotional communications.</strong> We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time. For more information, see "<a href="#rights">What are your privacy rights?</a>" below.</li>
                    <li><strong>To deliver targeted advertising to you.</strong> We may process your information to develop and display personalized content and advertising tailored to your interests, location, and more. For more information see our <LegalLink document="cookies">Cookie Policy</LegalLink>.</li>
                    <li><strong>To protect our Services.</strong> We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</li>
                    <li><strong>To identify usage trends.</strong> We may process information about how you use our Services to better understand how they are being used so we can improve them.</li>
                    <li><strong>To determine the effectiveness of our marketing and promotional campaigns.</strong> We may process your information to better understand how to provide marketing and promotional campaigns that are most relevant to you.</li>
                    <li><strong>To save or protect an individual's vital interest.</strong> We may process your information when necessary to save or protect an individual's vital interest, such as to prevent harm.</li>
                </ul>
            </>
        ),
    },
    {
        id: "legal-bases",
        title: "What legal bases do we rely on to process your information?",
        content: (
            <>
                <InShort>
                    We only process your personal information when we believe it is necessary and we have a valid legal
                    reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws,
                    to provide you with services to enter into or fulfill our contractual obligations, to protect your
                    rights, or to fulfill our legitimate business interests.
                </InShort>
                <p>
                    The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases
                    we rely on in order to process your personal information. As such, we may rely on the following legal
                    bases to process your personal information:
                </p>
                <ul>
                    <li><strong>Consent.</strong> We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time. Learn more about <a href="#withdraw-consent">withdrawing your consent</a>.</li>
                    <li><strong>Performance of a Contract.</strong> We may process your personal information when we believe it is necessary to fulfill our contractual obligations to you, including providing our Services or at your request prior to entering into a contract with you.</li>
                    <li>
                        <strong>Legitimate Interests.</strong> We may process your information when we believe it is reasonably necessary to achieve our legitimate business interests and those interests do not outweigh your interests and fundamental rights and freedoms. For example, we may process your personal information for some of the purposes described in order to:
                        <ul>
                            <li>Send users information about special offers and discounts on our products and services</li>
                            <li>Develop and display personalized and relevant advertising content for our users</li>
                            <li>Analyze how our Services are used so we can improve them to engage and retain users</li>
                            <li>Support our marketing activities</li>
                            <li>Diagnose problems and/or prevent fraudulent activities</li>
                            <li>Understand how our users use our products and services so we can improve user experience</li>
                        </ul>
                    </li>
                    <li><strong>Legal Obligations.</strong> We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.</li>
                    <li><strong>Vital Interests.</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.</li>
                </ul>
            </>
        ),
    },
    {
        id: "sharing",
        title: "When and with whom do we share your personal information?",
        content: (
            <>
                <InShort>
                    We may share information in specific situations described in this section and/or with the following
                    categories of third parties.
                </InShort>
                <p>
                    <strong>Vendors, Consultants, and Other Third-Party Service Providers.</strong> We may share your data
                    with third-party vendors, service providers, contractors, or agents ("third parties") who perform
                    services for us or on our behalf and require access to such information to do that work. We have
                    contracts in place with our third parties, which are designed to help safeguard your personal
                    information. This means that they cannot do anything with your personal information unless we have
                    instructed them to do it. They will also not share your personal information with any organization
                    apart from us. They also commit to protect the data they hold on our behalf and to retain it for the
                    period we instruct.
                </p>
                <p>The categories of third parties we may share personal information with are as follows:</p>
                <ul>
                    <li>Cloud Computing Services</li>
                    <li>Data Analytics Services</li>
                    <li>Government Entities</li>
                    <li>Social Networks</li>
                    <li>User Account Registration & Authentication Services</li>
                    <li>Performance Monitoring Tools</li>
                    <li>Communication & Collaboration Tools</li>
                    <li>Data Storage Service Providers</li>
                    <li>AI Platforms</li>
                    <li>Sales & Marketing Tools</li>
                    <li>Ad Networks</li>
                    <li>Retargeting Platforms</li>
                </ul>
                <p>We also may need to share your personal information in the following situations:</p>
                <ul>
                    <li><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                    <li><strong>When we use Google Maps Platform APIs.</strong> We may share your information with certain Google Maps Platform APIs (e.g., Google Maps API, Places API). Google Maps uses GPS, Wi-Fi, and cell towers to estimate your location. GPS is accurate to about 20 meters, while Wi-Fi and cell towers help improve accuracy when GPS signals are weak, like indoors. This data helps Google Maps provide directions, but it is not always perfectly precise. We obtain and store on your device ("cache") your location. You may revoke your consent anytime by contacting us at the contact details provided at the end of this document.</li>
                    <li><strong>Affiliates.</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.</li>
                    <li><strong>Business Partners.</strong> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
                    <li><strong>Other Users.</strong> When you share personal information (for example, by posting comments, contributions, or other content to the Services) or otherwise interact with public areas of the Services, such personal information may be viewed by all users and may be publicly made available outside the Services in perpetuity. If you interact with other users of our Services and register for our Services through a social network (such as Facebook), your contacts on the social network will see your name, profile photo, and descriptions of your activity. Similarly, other users will be able to view descriptions of your activity, communicate with you within our Services, and view your profile.</li>
                </ul>
            </>
        ),
    },
    {
        id: "cookies",
        title: "Do we use cookies and other tracking technologies?",
        content: (
            <>
                <InShort>We may use cookies and other tracking technologies to collect and store your information.</InShort>
                <p>
                    We may use cookies and similar tracking technologies (like web beacons and pixels) to gather
                    information when you interact with our Services. Some online tracking technologies help us maintain
                    the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and
                    assist with basic site functions.
                </p>
                <p>
                    We also permit third parties and service providers to use online tracking technologies on our Services
                    for analytics and advertising, including to help manage and display advertisements or to tailor
                    advertisements to your interests. The third parties and service providers use their technology to
                    provide advertising about products and services tailored to your interests which may appear either on
                    our Services or on other websites.
                </p>
                <p>
                    Specific information about how we use such technologies and how you can refuse certain cookies is set
                    out in our <LegalLink document="cookies">Cookie Policy</LegalLink>.
                </p>
                <h3>Google Analytics</h3>
                <p>
                    We may share your information with Google Analytics to track and analyze the use of the Services. To
                    opt out of being tracked by Google Analytics across the Services, visit{" "}
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a>.
                    For more information on the privacy practices of Google, please visit the{" "}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy & Terms page</a>.
                </p>
            </>
        ),
    },
    {
        id: "social-logins",
        title: "How do we handle your social logins?",
        content: (
            <>
                <InShort>
                    If you choose to register or log in to our Services using a social media account, we may have access to
                    certain information about you.
                </InShort>
                <p>
                    Our Services offer you the ability to register and log in using your third-party social media account
                    details (like your Facebook or X logins). Where you choose to do this, we will receive certain profile
                    information about you from your social media provider. The profile information we receive may vary
                    depending on the social media provider concerned, but will often include your name, email address,
                    friends list, and profile picture, as well as other information you choose to make public on such a
                    social media platform.
                </p>
                <p>
                    We will use the information we receive only for the purposes that are described in this Privacy Notice
                    or that are otherwise made clear to you on the relevant Services. Please note that we do not control,
                    and are not responsible for, other uses of your personal information by your third-party social media
                    provider. We recommend that you review their privacy notice to understand how they collect, use, and
                    share your personal information, and how you can set your privacy preferences on their sites and apps.
                </p>
            </>
        ),
    },
    {
        id: "transfers",
        title: "Is your information transferred internationally?",
        content: (
            <>
                <InShort>We may transfer, store, and process your information in countries other than your own.</InShort>
                <p>
                    Our servers are located in Germany and Romania. Regardless of your location, please be aware that your
                    information may be transferred to, stored by, and processed by us in our facilities and in the
                    facilities of the third parties with whom we may share your personal information (see "
                    <a href="#sharing">When and with whom do we share your personal information?</a>" above), including
                    facilities in the United States, Romania, and other countries.
                </p>
                <p>
                    If you are a resident in the European Economic Area (EEA), United Kingdom (UK), or Switzerland, then
                    these countries may not necessarily have data protection laws or other similar laws as comprehensive as
                    those in your country. However, we will take all necessary measures to protect your personal
                    information in accordance with this Privacy Notice and applicable law.
                </p>
                <p><strong>European Commission's Standard Contractual Clauses:</strong></p>
                <p>
                    We have implemented measures to protect your personal information, including by using the European
                    Commission's Standard Contractual Clauses for transfers of personal information between our group
                    companies and between us and our third-party providers. These clauses require all recipients to
                    protect all personal information that they process originating from the EEA or UK in accordance with
                    European data protection laws and regulations. Our Standard Contractual Clauses can be provided upon
                    request. We have implemented similar appropriate safeguards with our third-party service providers and
                    partners and further details can be provided upon request.
                </p>
            </>
        ),
    },
    {
        id: "retention",
        title: "How long do we keep your information?",
        content: (
            <>
                <InShort>
                    We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy
                    Notice unless otherwise required by law.
                </InShort>
                <p>
                    We will only keep your personal information for as long as it is necessary for the purposes set out in
                    this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax,
                    accounting, or other legal requirements). No purpose in this notice will require us keeping your
                    personal information for longer than three (3) months past the termination of the user's account.
                </p>
                <p>
                    When we have no ongoing legitimate business need to process your personal information, we will either
                    delete or anonymize such information, or, if this is not possible (for example, because your personal
                    information has been stored in backup archives), then we will securely store your personal information
                    and isolate it from any further processing until deletion is possible.
                </p>
            </>
        ),
    },
    {
        id: "security",
        title: "How do we keep your information safe?",
        content: (
            <>
                <InShort>
                    We aim to protect your personal information through a system of organizational and technical security
                    measures.
                </InShort>
                <p>
                    We have implemented appropriate and reasonable technical and organizational security measures designed
                    to protect the security of any personal information we process. However, despite our safeguards and
                    efforts to secure your information, no electronic transmission over the Internet or information storage
                    technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers,
                    cybercriminals, or other unauthorized third parties will not be able to defeat our security and
                    improperly collect, access, steal, or modify your information. Although we will do our best to protect
                    your personal information, transmission of personal information to and from our Services is at your own
                    risk. You should only access the Services within a secure environment.
                </p>
            </>
        ),
    },
    {
        id: "minors",
        title: "Do we collect information from minors?",
        content: (
            <>
                <InShort>We do not knowingly collect data from or market to children under 18 years of age.</InShort>
                <p>
                    We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we
                    knowingly sell such personal information. By using the Services, you represent that you are at least 18
                    or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the
                    Services. If we learn that personal information from users less than 18 years of age has been
                    collected, we will deactivate the account and take reasonable measures to promptly delete such data
                    from our records. If you become aware of any data we may have collected from children under age 18,
                    please contact us at <a href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</a>.
                </p>
            </>
        ),
    },
    {
        id: "rights",
        title: "What are your privacy rights?",
        content: (
            <>
                <InShort>
                    In some regions, such as the European Economic Area (EEA), United Kingdom (UK), and Switzerland, you
                    have rights that allow you greater access to and control over your personal information. You may
                    review, change, or terminate your account at any time, depending on your country, province, or state
                    of residence.
                </InShort>
                <p>
                    In some regions (like the EEA, UK, and Switzerland), you have certain rights under applicable data
                    protection laws. These may include the right (i) to request access and obtain a copy of your personal
                    information, (ii) to request rectification or erasure; (iii) to restrict the processing of your
                    personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated
                    decision-making. In certain circumstances, you may also have the right to object to the processing of
                    your personal information. You can make such a request by contacting us by using the contact details
                    provided in the section "<a href="#contact">How can you contact us about this notice?</a>" below.
                </p>
                <p>We will consider and act upon any request in accordance with applicable data protection laws.</p>
                <p>
                    If you are located in the UK and are unhappy with how we have handled your personal information, you
                    can make a complaint directly to us. This is in addition to the rights you have under the UK General
                    Data Protection Regulation and the Data Protection Act 2018.
                </p>
                <p>How to contact us:</p>
                <ul>
                    <li><strong>Online:</strong> our <ContactLink>contact page</ContactLink></li>
                    <li><strong>Email:</strong> <a href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</a></li>
                    <li><strong>Post:</strong> see "<a href="#contact">How can you contact us about this notice?</a>"</li>
                </ul>
                <p>What happens after you complain:</p>
                <ul>
                    <li>We will acknowledge your complaint within 30 days of receiving it.</li>
                    <li>We will investigate without unjustifiable or excessive delay.</li>
                    <li>We will keep you informed of progress and explain the outcome.</li>
                </ul>
                <p>
                    If you are not happy with our final response, you can refer your complaint to the Information
                    Commissioner's Office, the UK supervisory authority.
                </p>
                <ul>
                    <li><strong>Website:</strong> <a href="https://ico.org.uk/make-a-complaint" target="_blank" rel="noopener noreferrer">ico.org.uk/make-a-complaint</a></li>
                    <li><strong>Helpline:</strong> 0303 123 1113</li>
                    <li><strong>Post:</strong> Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</li>
                </ul>
                <p>
                    If you are located in the EEA or UK and you believe we are unlawfully processing your personal
                    information, you also have the right to complain to your{" "}
                    <a href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm" target="_blank" rel="noopener noreferrer">Member State data protection authority</a>{" "}
                    (in Romania, the National Supervisory Authority for Personal Data Processing) or{" "}
                    <a href="https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/" target="_blank" rel="noopener noreferrer">UK data protection authority</a>.
                </p>
                <p>
                    If you are located in Switzerland, you may contact the{" "}
                    <a href="https://www.edoeb.admin.ch/edoeb/en/home.html" target="_blank" rel="noopener noreferrer">Federal Data Protection and Information Commissioner</a>.
                </p>
                <p id="withdraw-consent" className="scroll-mt-8">
                    <strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal
                    information, you have the right to withdraw your consent at any time. You can withdraw your consent at
                    any time by contacting us by using the contact details provided in the section "
                    <a href="#contact">How can you contact us about this notice?</a>" below.
                </p>
                <p>
                    However, please note that this will not affect the lawfulness of the processing before its withdrawal
                    nor, will it affect the processing of your personal information conducted in reliance on lawful
                    processing grounds other than consent.
                </p>
                <p>
                    <strong>Opting out of marketing and promotional communications:</strong> You can unsubscribe from our
                    marketing and promotional communications at any time by clicking on the unsubscribe link in the emails
                    that we send, or by contacting us using the details provided in the section "
                    <a href="#contact">How can you contact us about this notice?</a>" below. You will then be removed from
                    the marketing lists. However, we may still communicate with you, for example, to send you
                    service-related messages that are necessary for the administration and use of your account, to respond
                    to service requests, or for other non-marketing purposes.
                </p>
                <h3>Account Information</h3>
                <p>If you would at any time like to review or change the information in your account or terminate your account, you can:</p>
                <ul>
                    <li>Log in to your account settings and update your user account.</li>
                    <li>Contact us using the contact information provided.</li>
                </ul>
                <p>
                    Upon your request to terminate your account, we will deactivate or delete your account and information
                    from our active databases. However, we may retain some information in our files to prevent fraud,
                    troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with
                    applicable legal requirements.
                </p>
                <p>
                    <strong>Cookies and similar technologies:</strong> Most Web browsers are set to accept cookies by
                    default. If you prefer, you can usually choose to set your browser to remove cookies and to reject
                    cookies. If you choose to remove cookies or reject cookies, this could affect certain features or
                    services of our Services. For further information, please see our{" "}
                    <LegalLink document="cookies">Cookie Policy</LegalLink>.
                </p>
                <p>
                    If you have questions or comments about your privacy rights, you may email us at{" "}
                    <a href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</a>.
                </p>
            </>
        ),
    },
    {
        id: "do-not-track",
        title: "Controls for Do-Not-Track features",
        content: (
            <p>
                Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT")
                feature or setting you can activate to signal your privacy preference not to have data about your online
                browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing
                and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser
                signals or any other mechanism that automatically communicates your choice not to be tracked online. If a
                standard for online tracking is adopted that we must follow in the future, we will inform you about that
                practice in a revised version of this Privacy Notice.
            </p>
        ),
    },
    {
        id: "updates",
        title: "Do we make updates to this notice?",
        content: (
            <>
                <InShort>Yes, we will update this notice as necessary to stay compliant with relevant laws.</InShort>
                <p>
                    We may update this Privacy Notice from time to time. The updated version will be indicated by an updated
                    "Last updated" date at the top of this Privacy Notice. If we make material changes to this Privacy
                    Notice, we may notify you either by prominently posting a notice of such changes or by directly sending
                    you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we
                    are protecting your information.
                </p>
            </>
        ),
    },
    {
        id: "contact",
        title: "How can you contact us about this notice?",
        content: (
            <>
                <p>
                    If you have questions or comments about this notice, you may email us at{" "}
                    <a href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</a> or contact us by post at:
                </p>
                <p>
                    <strong>VEST VISUALS SRL</strong>
                    <br />
                    Str. Matei Millo 44
                    <br />
                    300696 Timișoara, Timiș County
                    <br />
                    Romania
                </p>
            </>
        ),
    },
    {
        id: "review-data",
        title: "How can you review, update, or delete the data we collect from you?",
        content: (
            <p>
                Based on the applicable laws of your country, you may have the right to request access to the personal
                information we collect from you, details about how we have processed it, correct inaccuracies, or delete
                your personal information. You may also have the right to withdraw your consent to our processing of your
                personal information. These rights may be limited in some circumstances by applicable law. To request to
                review, update, or delete your personal information, please visit our <ContactLink>contact page</ContactLink>.
            </p>
        ),
    },
];

const content: LegalContent = {
    title: "Privacy Policy",
    intro: (
        <>
            <p>
                This Privacy Notice for VEST VISUALS SRL ("we," "us," or "our") describes how and why we might access,
                collect, store, use, and/or share ("process") your personal information when you use our services
                ("Services"), including when you:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>Visit our website at vestvisuals.ro or any website of ours that links to this Privacy Notice</li>
                <li>Engage with us in other related ways, including any marketing or events</li>
            </ul>
            <p>
                <strong className="font-medium text-foreground">Questions or concerns?</strong> Reading this Privacy Notice
                will help you understand your privacy rights and choices. We are responsible for making decisions about how
                your personal information is processed. If you do not agree with our policies and practices, please do not
                use our Services. If you still have any questions or concerns, please contact us at{" "}
                <a href="mailto:contact@vestvisuals.ro" className="underline underline-offset-4">contact@vestvisuals.ro</a>.
            </p>
        </>
    ),
    sections,
};

export default content;
