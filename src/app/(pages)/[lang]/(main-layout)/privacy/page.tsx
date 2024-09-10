import Container from '@/components/common/container'
import MdxRenderer from '@/components/common/mdx-renderer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { Metadata } from 'next'

const privacyText = `
# Privacy Policy

## 1. General

Restoreplus appreciates your interest in our company. We’re serious about protecting your personal data, so we’d like to inform you about which personal data we collect when you visit our websites and our social media pages. The following data privacy statement applies to our online presence:

- This website
- restoreplus.com
- Facebook
- LinkedIn

The use of our website is generally possible without providing personal data. If personal data (such as a name, address, or email address) are collected on our websites, they are always provided voluntarily as much as possible. The data will not be passed on to third parties without your express consent.

All the personal data you provide will be collected, processed, and used in accordance with the applicable provisions of the GDPR for protecting personal data.

## 2. Name and Address of the Data Controller

The data controller in terms of the General Data Protection Regulation, other data protection laws applicable in the Member States of the European Union, and other provisions of a data protection nature is Restoreplus. Contact data, etc., can be found in the imprint.

## 3. Name and Address of the Data Protection Officer

The data protection officer of the entity responsible for the processing is:

**External:**

VIA Consult GmbH & Co. KG  
Mr. Christian Post  
Kurfürst-Heinrich-Straße 10  
57462 Olpe  
+ 49 (2761) 83668 – 0  
[datenschutz@via-consult.de](mailto:datenschutz@via-consult.de)

Each data subject can at any time contact our data protection officer directly with any questions or suggestions regarding data protection.

## 4. Security

Restoreplus uses technical and organizational security measures to protect the data you provide to Restoreplus from accidental or intentional manipulation, loss, destruction, or access by unauthorized persons.

## 5. Hosting Services Through a Third-Party Provider

As part of the processing on our behalf, the company maxcluster GmbH, Technologiepark 8, 33100 Paderborn (info@maxcluster.de) renders the services of hosting and displaying the website for us as a commissioned data processor. This protects our legitimate interests in having our services displayed correctly. All the data that are collected during the use of this website, or via the forms in the online shop intended for that purpose, are processed on servers of that commissioned data processor.

## 6. Purposes and Legal Bases for Collecting and Possibly Transmitting the Data

Processing operations for which we obtain your consent are legally based on Art. 6(1)(a) GDPR. The processing of personal data to perform a contract (for delivering goods, for example, or performing precontract measures needed for inquiries and other purposes) is legally based on Art. 6(1)(b) GDPR. If our company is subject to a legal obligation which requires the processing of personal data, for example to fulfil tax obligations, the processing is based on Art. 6(1)(c) GDPR. If the processing of personal data is not based on any of the aforementioned legal bases, we process data to safeguard a legitimate interest of our company, Art. 6(1)(f) GDPR.

We will not transmit your personal data to any third party except participating service partners, such as those whom we employ during the performance of the contract. If you contact our trading partners, Restoreplus will no longer be the controller for this data processing.

Data is entered in the areas described below:

### 6.1. Contact Form

The contact form enables interested parties to send enquiries directly to Restoreplus electronically.

If an interested party contacts Restoreplus in this way, the data disclosed in the form (such as a last name, email address, and telephone number) will be stored automatically. The data are stored only for processing purposes or to contact the data subject.

Alternatively, you can contact the company at the email addresses specified on the internet site. All the data disclosed by the person will be stored during that process. In most cases, the emails sent are delivered to the general mailboxes of the departments. That storage also serves the aforementioned purposes.

### 6.2. Portal for Sales Partners

In order to log in to our portal for sales partners, you need a username and a password. You can create these when you register on our site. We use the data you provide during registration exclusively to contact you and do not pass it on to third parties outside our group of companies. Your data will be stored until further notice.

### 6.3. Newsletter

Restoreplus issues a newsletter that provides information about company news and offers on a regular basis.

If you want to receive our newsletter, we need a valid email address. We will check the email address you enter to determine whether you are actually its owner and authorized to receive the newsletter. We’ll send you a confirmation email (double opt-in) for that purpose.

You therefore permit us to send the newsletter to give you the latest news from our company.

This website uses Inxmail to send newsletters. The provider is Inxmail GmbH, Wentzingerstr. 17, 79106 Freiburg, Germany. Inxmail is a service used to organize and send newsletters, and for other purposes. The data you disclose to receive the newsletter will be stored on Inxmail servers. If we send you newsletters with Inxmail, we can determine which newsletter articles you opened and which links you clicked. Inxmail also allows us to allocate the newsletter recipients to various categories (a process known as “tagging”). In doing so, we can divide them according to gender or customer relationship (such as customer or potential customer), for example. Such data processing is based on your consent (Art. 6(1)(a) GDPR). You may withdraw that consent at any time. Withdrawing your consent will not affect the lawfulness of any data processing operations that have already occurred. Therefore, if you don’t want Inxmail to analyze your data, you’ll need to unsubscribe from the newsletter. We include a link for doing so in every newsletter.

We will store the data we have on file so you can receive the newsletter until you unsubscribe from the newsletter, after which they will be erased from both our and Inxmail’s servers. This does not affect data that we store for other purposes (such as email addresses for the member area). For more information, see Inxmail’s data privacy policy under inxmail.de/datenschutz. We have entered into a contract on commissioned data processing with Inxmail in which we obligate Inxmail to protect our newsletter recipients’ data and not send those data to third parties.

### 6.4 SalesViewer® Technology

This website uses SalesViewer® technology from SalesViewer® GmbH on the basis of the website operator’s legitimate interests (Section 6 paragraph 1 lit.f GDPR) in order to collect and save data on marketing, market research and optimization purposes.

In order to do this, a JavaScript-based code, which serves to capture company-related data and according website usage. The data captured using this technology are encrypted in a non-retrievable one-way function (so-called hashing). The data is immediately pseudonymized and is not used to identify website visitors personally.

The data stored by Salesviewer will be deleted as soon as they are no longer required for their intended purpose and there are no legal obligations to retain them.

The data recording and storage can be repealed at any time with immediate effect for the future, by clicking on [https://www.salesviewer.com/opt-out](https://www.salesviewer.com/opt-out) in order to prevent SalesViewer® from recording your data. In this case, an opt-out cookie for this website is saved on your device. If you delete the cookies in the browser, you will need to click on this link again.

## 7. Application

You can submit your application by post, email, or via our career portal. If you apply with us, we will process the information you send us during the application procedure (through the application letter, CV, references, or other means of contact). Your contact details and information about your education and training, qualifications, work experience, and abilities are relevant for us. We will evaluate you based only on your suitability for the job in question, so you don’t need to send us a photo.

At first, we will process your data only to carry out the application procedure and decide whether to hire you. This processing of your personal data is legally based on § 26(1) of the German Federal Data Protection Act (Bundesdatenschutzgesetz, BDSG). If your application is successful, your personal data will become part of your personnel file. We will keep all applications for up to six months after the selection process is over and then erase them or return them to you in their entirety. If you would like us to keep your application data for longer so we can consider you for positions that become open in the future in case we are interested in your application but cannot currently offer you a job, please give us your express permission to do so. We would then keep your application data until you withdraw that consent.

Your personal data will be collected and processed only by people who are responsible for handling the application.

## 8. Cookies and Server Log Files

The websites of Restoreplus use cookies. Cookies are text files that are filed and stored on a computer system via an Internet browser.

Through the use of cookies, it is possible for the visited websites and servers to distinguish the individual's browser from other Internet browsers.

Some cookies are essential for operations and the presentation of our internet presence and do not collect any personal information. Others allow us to adapt your site visit to your preferences and user behavior. To give us permission to do this, please agree to the use of those optional cookies the first time you visit our website.

The setting of cookies for all websites can be prevented by changing the settings of the respective browser, and already set cookies can be deleted at any time in the browser. Deactivating all cookies for this website may limit the usability of individual pages. Further information on the cookies used on this website and their purpose can be found in the cookie settings at the bottom of this page.

## 9. Rights of Data Subjects

As a data subject whose data we collect, you have the following rights:

### 9.1. Right to Confirmation

You have the right to request confirmation of whether personal data concerning you is being processed.

### 9.2. Right of Access

You have the right to receive information about the personal data we have stored about you.

### 9.3. Right to Rectification

You have the right to obtain the rectification of inaccurate personal data concerning you without undue delay.

### 9.4. Right to Erasure

You have the right to obtain the erasure of personal data concerning you without undue delay.

### 9.5. Right to Restriction of Processing

You have the right to request the restriction of processing.

### 9.6. Right to Data Portability

You have the right to receive the personal data concerning you, which you have provided, in a structured, commonly used, and machine-readable format.

### 9.7. Right to Object

You have the right to object to the processing of your personal data at any time.

### 9.8. Right to Withdraw Data Protection Consent

You have the right to withdraw consent to the processing of your personal data at any time.

### 9.9. Right to Lodge a Complaint with a Supervisory Authority

If you believe that the processing of your personal data infringes the GDPR, you have the right to lodge a complaint with a supervisory authority.

## 10. Changes to the Privacy Policy

We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. You are advised to review this privacy policy periodically for any changes.

## 11. Contact

If you have any questions about this privacy policy, please contact us at:

Restoreplus  

info.restoreplus.com

1.sanayi bornova izmir, Restoreplus main office

+1 123 456 7890

---

17.06.2022

`

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale('/privacy', lang)

  return seoData
}

export default function Page() {
  return (
    <div className="py-10">
      <Container>
        <ScrollArea className="h-screen px-5">
          <MdxRenderer mdxText={privacyText} />
        </ScrollArea>
      </Container>
    </div>
  )
}
