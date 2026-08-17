# Multi-Step Loan Application

A responsive multi-step loan application web application developed as part of my **Full Stack Developer Internship at Zetheta Algorithms Pvt. Ltd.**

The application provides a complete loan application workflow, from entering loan and personal details to KYC, employment, address, documents, consent, electronic signature, review, and final submission.

## 🚀 Features

- Multi-step loan application wizard
- Loan details with validation
- Personal details with age, email and mobile validation
- PAN & Aadhaar validation
- Employment details with conditional validation
- Address management with PIN code lookup
- Same-as-current-address synchronization
- Document selection, validation and preview
- Consent & Terms acceptance
- Electronic signature using HTML Canvas
- Complete application review
- Application completeness validation
- Client-side submission flow with application reference number
- Responsive and accessible UI
- Persistent session state using Zustand

## 🛠️ Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Zustand** — State Management
- **React Hook Form** — Form Management
- **Zod** — Validation
- **Framer Motion** — Animations
- **Lucide React** — Icons

## 📋 Application Flow

```text
Loan Details
     ↓
Personal Details
     ↓
KYC
     ↓
Employment
     ↓
Address
     ↓
Documents
     ↓
Consent & Signature
     ↓
Review & Submit
     ↓
Application Submitted
