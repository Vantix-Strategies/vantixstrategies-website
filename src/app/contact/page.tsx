import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Software Consulting Inquiry",
  description: "Get in touch with us to discuss your project. We help startups and small businesses with AI, Web, Mobile, and Cloud development.",
};

export default function ContactPage() {
  return <ContactForm />;
}
