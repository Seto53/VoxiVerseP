"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer";
import {useSidebar} from "@/components/SidebarContext";
import styles from "../styles/Privacy.module.css";
import Link from "next/link";

const Privacy = () => {
    const {sidebarFolded} = useSidebar();

    return (
        <>
            <Sidebar />
            <div className={`${!sidebarFolded ? "md:pl-[200px]" : ""} flex flex-col flex-1`}>
                <main>
                    <div className={styles.content}>
                        <div className="p-6 w-full text-noble-black-0 flex flex-col gap-2 text-font-l leading-6">
                            <h1 className="text-3xl font-extrabold text-noble-black-200">Privacy Policy</h1>
                            <p className="text-m">Last updated December 20, 2023</p>
                            <p>
                                This privacy notice for VoxiVerse (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;),
                                describes how and why we might collect, store, use, and/or share (&quot;process&quot;)
                                your information when you use our services (&quot;Services&quot;), such as when you:
                            </p>
                            <ul className="list-disc list-inside flex-col flex gap-3">
                                <li>
                                    Visit our website at https://www.voxiverse.com, or any website of ours that links to
                                    this privacy notice
                                </li>
                                <li>Engage with us in other related ways, including any sales, marketing, or events</li>
                            </ul>
                            <p>
                                Questions or concerns? Reading this privacy notice will help you understand your privacy
                                rights and choices. If you do not agree with our policies and practices, please do not
                                use our Services. If you still have any questions or concerns, please contact us at
                                support@voxiverse.com.
                            </p>
                            <h2 className="text-xl font-bold text-noble-black-200 mt-4">SUMMARY OF KEY POINTS</h2>
                            <p>
                                This summary provides key points from our privacy notice, but you can find out more
                                details about any of these topics by clicking the link following each key point or by
                                using our table of contents below to find the section you are looking for.
                            </p>
                            <p>
                                What personal information do we process? When you visit, use, or navigate our Services,
                                we may process personal information depending on how you interact with us and the
                                Services, the choices you make, and the products and features you use. Learn more about
                                personal information you disclose to us.
                            </p>
                            <p>
                                Do we process any sensitive personal information? We do not process sensitive personal
                                information.
                            </p>
                            <p>
                                Do we receive any information from third parties? We do not receive any information from
                                third parties.
                            </p>
                            <p>
                                How do we process your information? We process your information to provide, improve, and
                                administer our Services, communicate with you, for security and fraud prevention, and to
                                comply with law. We may also process your information for other purposes with your
                                consent. We process your information only when we have a valid legal reason to do so.
                                Learn more about how we process your information.
                            </p>
                            <p>
                                In what situations and with which parties do we share personal information? We may share
                                information in specific situations and with specific third parties. Learn more about
                                when and with whom we share your personal information.
                            </p>
                            <p>
                                How do we keep your information safe? We have organizational and technical processes and
                                procedures in place to protect your personal information. However, no electronic
                                transmission over the internet or information storage technology can be guaranteed to be
                                100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other
                                unauthorized third parties will not be able to defeat our security and improperly
                                collect, access, steal, or modify your information. Learn more about how we keep your
                                information safe.
                            </p>
                            <p>
                                What are your rights? Depending on where you are located geographically, the applicable
                                privacy law may mean you have certain rights regarding your personal information. Learn
                                more about your privacy rights.
                            </p>
                            <p>
                                How do you exercise your rights? The easiest way to exercise your rights is by visiting
                                https://www.voxiverse.com/profile, or by contacting us at support@voxiverse.com. We will
                                consider and act upon any request in accordance with applicable data protection laws.
                            </p>
                            <p>
                                Want to learn more about what we do with any information we collect? Review the privacy
                                notice in full.
                            </p>
                            <h2 className="text-xl font-bold text-noble-black-200 mt-4">TABLE OF CONTENTS</h2>
                            <ol className="list-decimal list-inside flex-col flex gap-3">
                                <li>
                                    <Link href="#what-information-do-we-collect">WHAT INFORMATION DO WE COLLECT?</Link>
                                </li>
                                <li>
                                    <Link href="#how-do-we-use-process-your-information">
                                        HOW DO WE PROCESS YOUR INFORMATION?
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#what-legal-bases-do-we-rely-on-to-process-your-information">
                                        WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#when-and-with-whom-do-we-share-your-information">
                                        WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#do-we-use-cookies-and-other-tracking-technologies">
                                        DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#how-do-we-handle-your-social-logins">
                                        HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#how-long-do-we-keep-your-information">
                                        HOW LONG DO WE KEEP YOUR INFORMATION?
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#how-do-we-keep-your-information-safe">
                                        HOW DO WE KEEP YOUR INFORMATION SAFE?
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#what-are-your-privacy-rights">WHAT ARE YOUR PRIVACY RIGHTS?</Link>
                                </li>
                                <li>
                                    <Link href="#controls-for-do-not-track-features">
                                        CONTROLS FOR DO-NOT-TRACK FEATURES
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#do-united-states-residents-have-specific-privacy-rights">
                                        DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#do-other-regions-have-specific-privacy-rights">
                                        DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#do-we-make-updates-to-this-notice">
                                        DO WE MAKE UPDATES TO THIS NOTICE?
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#how-can-you-contact-us-about-this-notice">
                                        HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#how-can-you-review-update-or-delete-the-data-we-collect-from-you">
                                        HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
                                    </Link>
                                </li>
                            </ol>
                            <h2
                                className="text-xl font-bold text-noble-black-200 mt-4"
                                id="what-information-do-we-collect"
                            >
                                1. WHAT INFORMATION DO WE COLLECT?
                            </h2>
                            <h4 className="text-lg font-bold text-noble-black-200">
                                Personal information you disclose to us
                            </h4>
                            <p>In Short: We collect personal information that you provide to us.</p>
                            <p>
                                We collect personal information that you voluntarily provide to us when you register on
                                the Services, express an interest in obtaining information about us or our products and
                                Services, when you participate in activities on the Services, or otherwise when you
                                contact us.
                            </p>
                            <p>
                                Personal Information Provided by You. The personal information that we collect depends
                                on the context of your interactions with us and the Services, the choices you make, and
                                the products and features you use. The personal information we collect may include the
                                following:
                            </p>
                            <ul className="list-disc list-inside flex-col flex gap-3">
                                <li>names</li>
                                <li>email addresses</li>
                                <li>usernames</li>
                                <li>passwords</li>
                                <li>billing addresses</li>
                                <li>profile pictures</li>
                                <li>debit/credit card numbers</li>
                            </ul>
                            <p>Sensitive Information. We do not process sensitive information.</p>
                            <p>
                                Payment Data. We may collect data necessary to process your payment if you make
                                purchases, such as your payment instrument number, and the security code associated with
                                your payment instrument. All payment data is stored by Stripe. You may find their
                                privacy notice link(s) here: https://stripe.com/privacy.
                            </p>
                            <p>
                                Social Media Login Data. We may provide you with the option to register with us using
                                your existing social media account details, like your Facebook, Twitter, or other social
                                media account. If you choose to register in this way, we will collect the information
                                described in the section called{" "}
                                <Link href="#how-do-we-handle-your-social-logins">
                                    &quot;HOW DO WE HANDLE YOUR SOCIAL LOGINS?&quot;
                                </Link>{" "}
                                below.
                            </p>
                            <h4 className="text-lg font-bold text-noble-black-200">
                                Information automatically collected
                            </h4>
                            <p>
                                In Short: Some information — such as IP address and/or browser and device
                                characteristics — is collected automatically when you visit our Services.
                            </p>
                            <p>
                                We automatically collect certain information when you visit, use, or navigate the
                                Services. This information does not reveal your specific identity (like your name or
                                contact information) but may include device and usage information, such as your IP
                                address, browser and device characteristics, operating system, language preferences,
                                referring URLs, device name, country, location, information about how and when you use
                                our Services and other technical information. This information is primarily needed to
                                maintain the security and operation of our Services, and for our internal analytics and
                                reporting purposes.
                            </p>
                            <p>
                                Like many businesses, we also collect information through cookies and similar
                                technologies.
                            </p>
                            <p>The information we collect includes:</p>
                            <ol className="list-disc list-inside flex-col flex gap-3">
                                <li>
                                    Log and Usage Data. Log and usage data is service-related, diagnostic, usage, and
                                    performance information our servers automatically collect when you access or use our
                                    Services and which we record in log files. Depending on how you interact with us,
                                    this log data may include your IP address, device information, browser type and
                                    settings and information about your activity in the Services (such as the date/time
                                    stamps associated with your usage, pages and files viewed, searches and other
                                    actions you take such as which features you use), device event information (such as
                                    system activity, error reports (sometimes called &quot;crash dumps&quot;) and
                                    hardware settings).
                                </li>
                                <li>
                                    Device Data. We collect device data such as information about your computer, phone,
                                    tablet, or other device you use to access the Services. Depending on the device
                                    used, this device data may include information such as your IP address (or proxy
                                    server), device and application identification numbers, location, browser type,
                                    hardware model Internet service provider and/or mobile carrier, operating system and
                                    system configuration information.
                                </li>
                                <li>
                                    Log and Usage Data. Log and usage data is service-related, diagnostic, usage, and
                                    performance information our servers automatically collect when you access or use our
                                    Services and which we record in log files. Depending on how you interact with us,
                                    this log data may include your IP address, device information, browser type, and
                                    settings and information about your activity in the Services (such as the date/time
                                    stamps associated with your usage, pages and files viewed, searches, and other
                                    actions you take such as which features you use), device event information (such as
                                    system activity, error reports (sometimes called &quot;crash dumps&quot;), and
                                    hardware settings).
                                </li>
                                <li>
                                    Device Data. We collect device data such as information about your computer, phone,
                                    tablet, or other device you use to access the Services. Depending on the device
                                    used, this device data may include information such as your IP address (or proxy
                                    server), device and application identification numbers, location, browser type,
                                    hardware model, Internet service provider and/or mobile carrier, operating system,
                                    and system configuration information.
                                </li>
                                <li>
                                    Location Data. We collect location data such as information about your device&quot;s
                                    location, which can be either precise or imprecise. How much information we collect
                                    depends on the type and settings of the device you use to access the Services. For
                                    example, we may use GPS and other technologies to collect geolocation data that
                                    tells us your current location (based on your IP address). You can opt out of
                                    allowing us to collect this information either by refusing access to the information
                                    or by disabling your Location setting on your device. However, if you choose to opt
                                    out, you may not be able to use certain aspects of the Services.
                                </li>
                            </ol>
                            <h2
                                className="text-xl font-bold text-noble-black-200 mt-4"
                                id="how-do-we-use-process-your-information"
                            >
                                2. HOW DO WE PROCESS YOUR INFORMATION?
                            </h2>
                            <p>
                                In Short: We process your information to provide, improve, and administer our Services,
                                communicate with you, for security and fraud prevention, and to comply with law. We may
                                also process your information for other purposes with your consent.
                            </p>
                            <p>
                                We process your personal information for a variety of reasons, depending on how you
                                interact with our Services, including:
                            </p>
                            <ol className="list-disc list-inside flex-col flex gap-3">
                                <li>
                                    To facilitate account creation and authentication and otherwise manage user
                                    accounts. We may process your information so you can create and log in to your
                                    account, as well as keep your account in working order.
                                </li>
                                <li>
                                    To save or protect an individual&quot;s vital interest. We may process your
                                    information when necessary to save or protect an individual’s vital interest, such
                                    as to prevent harm.
                                </li>
                            </ol>
                            <h2
                                className="text-xl font-bold text-noble-black-200 mt-4"
                                id="what-legal-bases-do-we-rely-on-to-process-your-information"
                            >
                                3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?
                            </h2>
                            <p>
                                In Short: We only process your personal information when we believe it is necessary and
                                we have a valid legal reason (i.e., legal basis) to do so under applicable law, like
                                with your consent, to comply with laws, to provide you with services to enter into or
                                fulfill our contractual obligations, to protect your rights, or to fulfill our
                                legitimate business interests.
                            </p>
                            <p>If you are located in the EU or UK, this section applies to you.</p>
                            <p>
                                The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the
                                valid legal bases we rely on in order to process your personal information. As such, we
                                may rely on the following legal bases to process your personal information:
                            </p>
                            <ol className="list-disc list-inside flex-col flex gap-3">
                                <li>
                                    Consent. We may process your information if you have given us permission (i.e.,
                                    consent) to use your personal information for a specific purpose. You can withdraw
                                    your consent at any time. Learn more about withdrawing your consent.
                                </li>
                                <li>
                                    Legal Obligations. We may process your information where we believe it is necessary
                                    for compliance with our legal obligations, such as to cooperate with a law
                                    enforcement body or regulatory agency, exercise or defend our legal rights, or
                                    disclose your information as evidence in litigation in which we are involved.
                                </li>
                                <li>
                                    Vital Interests. We may process your information where we believe it is necessary to
                                    protect your vital interests or the vital interests of a third party, such as
                                    situations involving potential threats to the safety of any person.
                                </li>
                            </ol>
                            <p>If you are located in Canada, this section applies to you.</p>
                            <p>
                                We may process your information if you have given us specific permission (i.e., express
                                consent) to use your personal information for a specific purpose, or in situations where
                                your permission can be inferred (i.e., implied consent). You can withdraw your consent
                                at any time.
                            </p>
                            <p>
                                In some exceptional cases, we may be legally permitted under applicable law to process
                                your information without your consent, including, for example:
                            </p>
                            <ol className="list-disc list-inside flex-col flex gap-3">
                                <li>
                                    If collection is clearly in the interests of an individual and consent cannot be
                                    obtained in a timely way
                                </li>
                                <li>For investigations and fraud detection and prevention</li>
                                <li>For business transactions provided certain conditions are met</li>
                                <li>
                                    If it is contained in a witness statement and the collection is necessary to assess,
                                    process, or settle an insurance claim
                                </li>
                                <li>
                                    For identifying injured, ill, or deceased persons and communicating with next of kin
                                </li>
                                <li>
                                    If we have reasonable grounds to believe an individual has been, is, or may be
                                    victim of financial abuse
                                </li>
                                <li>
                                    If it is reasonable to expect collection and use with consent would compromise the
                                    availability or the accuracy of the information and the collection is reasonable for
                                    purposes related to investigating a breach of an agreement or a contravention of the
                                    laws of Canada or a province
                                </li>
                                <li>
                                    If disclosure is required to comply with a subpoena, warrant, court order, or rules
                                    of the court relating to the production of records
                                </li>
                                <li>
                                    If it was produced by an individual in the course of their employment, business, or
                                    profession and the collection is consistent with the purposes for which the
                                    information was produced
                                </li>
                                <li>If the collection is solely for journalistic, artistic, or literary purposes</li>
                                <li>If the information is publicly available and is specified by the regulations</li>
                            </ol>
                            <h2
                                className="text-xl font-bold text-noble-black-200 mt-4"
                                id="when-and-with-whom-do-we-share-your-information"
                            >
                                4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                            </h2>
                            <p>
                                In Short: We may share information in specific situations described in this section
                                and/or with the following third parties.
                            </p>
                            <p>We may need to share your personal information in the following situations:</p>
                            <ol className="list-disc list-inside flex-col flex gap-3">
                                <li>
                                    Business Transfers. We may share or transfer your information in connection with, or
                                    during negotiations of, any merger, sale of company assets, financing, or
                                    acquisition of all or a portion of our business to another company.
                                </li>
                            </ol>
                            <h2
                                className="text-xl font-bold text-noble-black-200 mt-4"
                                id="do-we-use-cookies-and-other-tracking-technologies"
                            >
                                5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                            </h2>
                            <p>
                                In Short: We do not use cookies or other tracking technologies to collect and store your
                                information.
                            </p>
                            <h2
                                className="text-xl font-bold text-noble-black-200 mt-4"
                                id="how-do-we-handle-your-social-logins"
                            >
                                6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                            </h2>
                            <p>
                                In Short: If you choose to register or log in to our Services using a social media
                                account, we may have access to certain information about you.
                            </p>
                            <p>
                                Our Services offer you the ability to register and log in using your third-party social
                                media account details (like your Facebook or Twitter logins). Where you choose to do
                                this, we will receive certain profile information about you from your social media
                                provider. The profile information we receive may vary depending on the social media
                                provider concerned, but will often include your name, email address, friends list, and
                                profile picture, as well as other information you choose to make public on such a social
                                media platform.
                            </p>
                            <p>
                                We will use the information we receive only for the purposes that are described in this
                                privacy notice or that are otherwise made clear to you on the relevant Services. Please
                                note that we do not control, and are not responsible for, other uses of your personal
                                information by your third-party social media provider. We recommend that you review
                                their privacy notice to understand how they collect, use, and share your personal
                                information, and how you can set your privacy preferences on their sites and apps.
                            </p>
                            <h2
                                className="text-xl font-bold text-noble-black-200 mt-4"
                                id="how-long-do-we-keep-your-information"
                            >
                                7. HOW LONG DO WE KEEP YOUR INFORMATION?
                            </h2>
                            <p>
                                In Short: We keep your information for as long as necessary to fulfill the purposes
                                outlined in this privacy notice unless otherwise required by law.
                            </p>
                            <p>
                                We will only keep your personal information for as long as it is necessary for the
                                purposes set out in this privacy notice, unless a longer retention period is required or
                                permitted by law (such as tax, accounting, or other legal requirements). No purpose in
                                this notice will require us keeping your personal information for longer than the period
                                of time in which users have an account with us.
                            </p>
                            <p>
                                When we have no ongoing legitimate business need to process your personal information,
                                we will either delete or anonymize such information, or, if this is not possible (for
                                example, because your personal information has been stored in backup archives), then we
                                will securely store your personal information and isolate it from any further processing
                                until deletion is possible.
                            </p>
                            <h2
                                className="text-xl font-bold text-noble-black-200 mt-4"
                                id="how-do-we-keep-your-information-safe"
                            >
                                8. HOW DO WE KEEP YOUR INFORMATION SAFE?
                            </h2>
                            <p>
                                In Short: We aim to protect your personal information through a system of organizational
                                and technical security measures.
                            </p>
                            <p>
                                We have implemented appropriate and reasonable technical and organizational security
                                measures designed to protect the security of any personal information we process.
                                However, despite our safeguards and efforts to secure your information, no electronic
                                transmission over the Internet or information storage technology can be guaranteed to be
                                100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other
                                unauthorized third parties will not be able to defeat our security and improperly
                                collect, access, steal, or modify your information. Although we will do our best to
                                protect your personal information, transmission of personal information to and from our
                                Services is at your own risk. You should only access the Services within a secure
                                environment.
                            </p>
                            <h2
                                className="text-xl font-bold text-noble-black-200 mt-4"
                                id="what-are-your-privacy-rights"
                            >
                                9. WHAT ARE YOUR PRIVACY RIGHTS?
                            </h2>
                            <p>
                                In Short: In some regions, such as the European Economic Area (EEA), United Kingdom
                                (UK), Switzerland, and Canada, you have rights that allow you greater access to and
                                control over your personal information. You may review, change, or terminate your
                                account at any time.
                            </p>
                            <p>
                                In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights
                                under applicable data protection laws. These may include the right (i) to request access
                                and obtain a copy of your personal information, (ii) to request rectification or
                                erasure; (iii) to restrict the processing of your personal information; (iv) if
                                applicable, to data portability; and (v) not to be subject to automated decision-making.
                                In certain circumstances, you may also have the right to object to the processing of
                                your personal information. You can make such a request by contacting us by using the
                                contact details provided in the section{" "}
                                <Link href="#how-can-you-contact-us-about-this-notice">
                                    &quot;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&quot;
                                </Link>{" "}
                                below.
                            </p>
                            <p>
                                We will consider and act upon any request in accordance with applicable data protection
                                laws.
                            </p>
                            <p>
                                If you are located in the EEA or UK and you believe we are unlawfully processing your
                                personal information, you also have the right to complain to your Member State data
                                protection authority or UK data protection authority.
                            </p>
                            <p>
                                If you are located in Switzerland, you may contact the Federal Data Protection and
                                Information Commissioner.
                            </p>
                            <p>
                                Withdrawing your consent: If we are relying on your consent to process your personal
                                information, which may be express and/or implied consent depending on the applicable
                                law, you have the right to withdraw your consent at any time. You can withdraw your
                                consent at any time by contacting us by using the contact details provided in the
                                section{" "}
                                <Link href="#how-can-you-contact-us-about-this-notice">
                                    &quot;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&quot;
                                </Link>{" "}
                                below.
                            </p>
                            <p>
                                However, please note that this will not affect the lawfulness of the processing before
                                its withdrawal nor, when applicable law allows, will it affect the processing of your
                                personal information conducted in reliance on lawful processing grounds other than
                                consent.
                            </p>
                            <h4 className="text-lg font-bold text-noble-black-200">Account Information</h4>
                            <p>
                                If you would at any time like to review or change the information in your account or
                                terminate your account, you can:
                            </p>
                            <ol className="list-disc list-inside flex-col flex gap-3">
                                <li>Log in to your account settings and update your user account.</li>
                                <li>Contact us using the contact information provided.</li>
                            </ol>
                            <p>
                                Upon your request to terminate your account, we will deactivate or delete your account
                                and information from our active databases. However, we may retain some information in
                                our files to prevent fraud, troubleshoot problems, assist with any investigations,
                                enforce our legal terms and/or comply with applicable legal requirements.
                            </p>
                            <p>
                                Cookies and similar technologies: Most Web browsers are set to accept cookies by
                                default. If you prefer, you can usually choose to set your browser to remove cookies and
                                to reject cookies. If you choose to remove cookies or reject cookies, this could affect
                                certain features or services of our Services.
                            </p>
                            <p>
                                If you have questions or comments about your privacy rights, you may email us at
                                support@voxiverse.com.
                            </p>
                            <h2
                                className="text-xl font-bold text-noble-black-200 mt-4"
                                id="controls-for-do-not-track-features"
                            >
                                10. CONTROLS FOR DO-NOT-TRACK FEATURES
                            </h2>
                            <p>
                                Most web browsers and some mobile operating systems and mobile applications include a
                                Do-Not-Track (&quot;DNT&quot;) feature or setting you can activate to signal your
                                privacy preference not to have data about your online browsing activities monitored and
                                collected. No uniform technology standard for recognizing and implementing DNT signals
                                has been finalized. As such, we do not currently respond to DNT browser signals or any
                                other mechanism that automatically communicates your choice not to be tracked online. If
                                a standard for online tracking is adopted that we must follow in the future, we will
                                inform you about that practice in a revised version of this privacy notice.
                            </p>
                            <h2
                                className="text-xl font-bold text-noble-black-200 mt-4"
                                id="do-united-states-residents-have-specific-privacy-rights"
                            >
                                11. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                            </h2>
                            <p>
                                In Short: If you are a resident of , you are granted specific rights regarding access to
                                your personal information.
                            </p>
                            <p>What categories of personal information do we collect?</p>
                            <p>
                                We have collected the following categories of personal information in the past twelve
                                (12) months:
                            </p>
                            <table className={styles.privacyTable}>
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Examples</th>
                                        <th>Collected</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>A. Identifiers</td>
                                        <td>
                                            Contact details, such as real name, alias, postal address, telephone or
                                            mobile contact number, unique personal identifier, online identifier,
                                            Internet Protocol address, email address, and account name
                                        </td>
                                        <td>YES</td>
                                    </tr>
                                    <tr>
                                        <td>B. Protected classification characteristics under state or federal law</td>
                                        <td>Gender and date of birth</td>
                                        <td>NO</td>
                                    </tr>
                                    <tr>
                                        <td>C. Commercial information</td>
                                        <td>
                                            Transaction information, purchase history, financial details, and payment
                                            information
                                        </td>
                                        <td>NO</td>
                                    </tr>
                                    <tr>
                                        <td>D. Biometric information</td>
                                        <td>Fingerprints and voiceprints</td>
                                        <td>NO</td>
                                    </tr>
                                    <tr>
                                        <td>E. Internet or other similar network activity</td>
                                        <td>
                                            Browsing history, search history, online behavior, interest data, and
                                            interactions with our and other websites, applications, systems, and
                                            advertisements
                                        </td>
                                        <td>NO</td>
                                    </tr>
                                    <tr>
                                        <td>F. Geolocation data</td>
                                        <td>Device location</td>
                                        <td>NO</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            G. Audio, electronic, visual, thermal, olfactory, or similar information
                                        </td>
                                        <td>
                                            Images and audio, video or call recordings created in connection with our
                                            business activities
                                        </td>
                                        <td>NO</td>
                                    </tr>
                                    <tr>
                                        <td>H. Professional or employment-related information</td>
                                        <td>
                                            Business contact details in order to provide you our Services at a business
                                            level or job title, work history, and professional qualifications if you
                                            apply for a job with us
                                        </td>
                                        <td>NO</td>
                                    </tr>
                                    <tr>
                                        <td>I. Education Information</td>
                                        <td>Student records and directory information</td>
                                        <td>NO</td>
                                    </tr>
                                    <tr>
                                        <td>J. Inferences drawn from collected personal information</td>
                                        <td>
                                            Inferences drawn from any of the collected personal information listed above
                                            to create a profile or summary about, for example, an individual’s
                                            preferences and characteristics
                                        </td>
                                        <td>NO</td>
                                    </tr>
                                    <tr>
                                        <td>K. Sensitive personal Information</td>
                                        <td></td>
                                        <td>NO</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>
                                We will use and retain the collected personal information as needed to provide the
                                Services or for:
                            </p>
                            <ol className="list-disc list-inside flex-col flex gap-3">
                                <li>Category A - As long as the user has an account with us</li>
                            </ol>
                            <p>
                                We may also collect other personal information outside of these categories through
                                instances where you interact with us in person, online, or by phone or mail in the
                                context of:
                            </p>
                            <ol className="list-disc list-inside flex-col flex gap-3">
                                <li>Receiving help through our customer support channels</li>
                                <li>Participation in customer surveys or contests; and</li>
                                <li>Facilitation in the delivery of our Services and to respond to your inquiries</li>
                            </ol>
                            <p>How do we use and share your personal information?</p>
                            <p>
                                Learn about how we use your personal information in the section,{" "}
                                <Link href="#how-do-we-use-process-your-information">
                                    &quot;HOW DO WE PROCESS YOUR INFORMATION?&quot;
                                </Link>
                            </p>
                            <p>Will your information be shared with anyone else?</p>
                            <p>
                                We may disclose your personal information with our service providers pursuant to a
                                written contract between us and each service provider. Learn more about how we disclose
                                personal information to in the section,{" "}
                                <Link href="#when-and-with-whom-do-we-share-your-information">
                                    &quot;WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?&quot;
                                </Link>
                            </p>
                            <p>
                                We may use your personal information for our own business purposes, such as for
                                undertaking internal research for technological development and demonstration. This is
                                not considered to be &quot;selling&quot; of your personal information.
                            </p>
                            <p>
                                We have not disclosed, sold, or shared any personal information to third parties for a
                                business or commercial purpose in the preceding twelve (12) months. We will not sell or
                                share personal information in the future belonging to website visitors, users, and other
                                consumers.
                            </p>
                            <h2
                                className="text-xl font-bold text-noble-black-200 mt-4"
                                id="do-other-regions-have-specific-privacy-rights"
                            >
                                12. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?
                            </h2>
                            <p>In Short: You may have additional rights based on the country you reside in.</p>
                            <h4 className="text-lg font-bold text-noble-black-200">Australia and New Zealand</h4>
                            <p>
                                We collect and process your personal information under the obligations and conditions
                                set by Australia&quot;s Privacy Act 1988 and New Zealand&quot;s Privacy Act 2020
                                (Privacy Act).
                            </p>
                            <p>
                                This privacy notice satisfies the notice requirements defined in both Privacy Acts, in
                                particular: what personal information we collect from you, from which sources, for which
                                purposes, and other recipients of your personal information.
                            </p>
                            <p>
                                If you do not wish to provide the personal information necessary to fulfill their
                                applicable purpose, it may affect our ability to provide our services, in particular:
                            </p>
                            <ol className="list-disc list-inside flex-col flex gap-3">
                                <li>offer you the products or services that you want</li>
                                <li>respond to or help with your requests</li>
                                <li>manage your account with us</li>
                                <li>confirm your identity and protect your account</li>
                            </ol>
                            <p>
                                At any time, you have the right to request access to or correction of your personal
                                information. You can make such a request by contacting us by using the contact details
                                provided in the section{" "}
                                <Link href="#how-can-you-review-update-or-delete-the-data-we-collect-from-you">
                                    &quot;HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?&quot;
                                </Link>
                            </p>
                            <p>
                                If you believe we are unlawfully processing your personal information, you have the
                                right to submit a complaint about a breach of the Australian Privacy Principles to the
                                Office of the Australian Information Commissioner and a breach of New Zealand&quot;s
                                Privacy Principles to the Office of New Zealand Privacy Commissioner.
                            </p>
                            <h4 className="text-lg font-bold text-noble-black-200">Republic of South Africa</h4>
                            <p>
                                At any time, you have the right to request access to or correction of your personal
                                information. You can make such a request by contacting us by using the contact details
                                provided in the section{" "}
                                <Link href="#how-can-you-review-update-or-delete-the-data-we-collect-from-you">
                                    &quot;HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?&quot;
                                </Link>
                            </p>
                            <p>
                                If you are unsatisfied with the manner in which we address any complaint with regard to
                                our processing of personal information, you can contact the office of the regulator, the
                                details of which are:
                            </p>
                            <p>
                                The Information Regulator (South Africa) General enquiries:
                                enquiries@inforegulator.org.za Complaints (complete POPIA/PAIA form 5):
                                PAIAComplaints@inforegulator.org.za & POPIAComplaints@inforegulator.org.za
                            </p>
                            <h2
                                className="text-xl font-bold text-noble-black-200 mt-4"
                                id="do-we-make-updates-to-this-notice"
                            >
                                13. DO WE MAKE UPDATES TO THIS NOTICE?
                            </h2>
                            <p>
                                In Short: Yes, we will update this notice as necessary to stay compliant with relevant
                                laws.
                            </p>
                            <p>
                                We may update this privacy notice from time to time. The updated version will be
                                indicated by an updated &quot;Revised&quot; date and the updated version will be
                                effective as soon as it is accessible. If we make material changes to this privacy
                                notice, we may notify you either by prominently posting a notice of such changes or by
                                directly sending you a notification. We encourage you to review this privacy notice
                                frequently to be informed of how we are protecting your information.
                            </p>
                            <h2
                                className="text-xl font-bold text-noble-black-200 mt-4"
                                id="how-can-you-contact-us-about-this-notice"
                            >
                                14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                            </h2>
                            <p>
                                If you have questions or comments about this notice, you may email us at
                                support@voxiverse.com.
                            </p>
                            <h2
                                className="text-xl font-bold text-noble-black-200 mt-4"
                                id="how-can-you-review-update-or-delete-the-data-we-collect-from-you"
                            >
                                15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
                            </h2>
                            <p>
                                Based on the applicable laws of your country, you may have the right to request access
                                to the personal information we collect from you, change that information, or delete it.
                                To request to review, update, or delete your personal information, please visit:
                                https://www.voxiverse.com/profile.
                            </p>
                        </div>
                        <Footer />
                    </div>
                </main>
            </div>
        </>
    );
};

export default Privacy;
