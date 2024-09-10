import Container from '@/components/common/container'
import MdxRenderer from '@/components/common/mdx-renderer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { Metadata } from 'next'

const termsText = `
# Terms and Conditions

## 1. Introduction

Welcome to the Restoreplus website.

This website is owned and operated by Restoreplus, with registered office at [Company Address]. Visitors are required to comply with the following terms and conditions. We request that you read the following carefully before proceeding. The term "this website" refers to the Restoreplus website linked with other Restoreplus websites.

Other Restoreplus websites may have different terms and conditions. When you visit any other Restoreplus sites, please read their respective terms and conditions and do not assume that these terms apply to all Restoreplus websites.

## 2. Legal Notice

Each Restoreplus company is a separate legal entity. However, general terms like "Restoreplus", "Group", "we", and "our" may be used to refer to Restoreplus companies in general or when it is not necessary to refer to a specific Restoreplus company.

This website may contain links to external websites. When these links are followed, the external website may sometimes appear in full-screen mode (you can return to this website by clicking the "back" button on your browser); other times, the website may appear within a frame of this website (you can return using the navigation buttons).

Displaying an external website within a frame of this website is for convenience only and does not imply responsibility for the external website's content, even if operated by a Restoreplus company.

These links are provided for ease and speed in finding relevant products and/or services. It is your responsibility to decide whether these products or services are suitable for you. Restoreplus is not responsible for, and makes no representations about, the ownership, operation, or content of these external websites, or the products or services they offer.

## 3. Conditions of Use

This website contains materials protected by copyrights and/or other intellectual property rights, such as text, photos, other visual elements, and audio elements. All intellectual property rights are owned by or licensed to Restoreplus.

This website also contains trademarks, including the "Restoreplus" name and logo. All trademarks on this website are owned by or licensed to Restoreplus.

### 3.1. Permitted Uses

- You may access all parts of this website.
- You may print one copy of any or all pages for personal reference.

### 3.2. Prohibited Uses

Without our express written permission, you may not:
- Copy (including printing, storing on disk, downloading, or any other method of copying), distribute, publish, modify, or otherwise use any materials from this website, except as permitted in the section "Permitted Uses."
- Remove any copyright, trademark, or other proprietary notices from materials copied from this website.
- Link to this website from any other website.

If you wish to link to this website, please contact our site editor with the following information:
- The URL(s) of the web page(s) you wish to link from.
- The URL(s) of the web page(s) you wish to link to on this website.

We will review your request and decide at our discretion. We are not obliged to accept your request.

## 4. Changes to Terms and Conditions

Restoreplus may amend these terms and the legal notice from time to time. By using this website, you accept the terms and legal notice in force at the time. Please check the terms and legal notice periodically.

## 5. Changes to Website and Operation

Restoreplus may change the format and content of this website at any time. We may also suspend the operation of this website for support or maintenance work, to update the content, or for any other reason. Restoreplus reserves the right to terminate access to this website at any time without notice.

## 6. Data Protection

Information provided to Restoreplus via this website will be used in accordance with our privacy policy. Please read our privacy policy carefully before using our website. By submitting your personal information to us, you consent to its use in accordance with our privacy policy.

## 7. Complaints Procedure

If you have any questions or complaints about this website, please contact the Restoreplus Site Editor at [contact email].

## 8. Governing Law

These terms are subject to the regulatory provisions of local laws and will be interpreted in accordance with these laws. Local courts will have exclusive jurisdiction over any disputes arising from or related to these terms or the use of this website.

---

17.01.2023


`

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale(
    '/terms-and-conditions',
    lang
  )

  return seoData
}

export default function Page() {
  return (
    <div className="py-10">
      <Container>
        <ScrollArea className="mx-5 h-screen">
          <MdxRenderer mdxText={termsText} />
        </ScrollArea>
      </Container>
    </div>
  )
}
