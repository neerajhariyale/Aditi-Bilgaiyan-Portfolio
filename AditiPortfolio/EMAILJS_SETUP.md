# EmailJS Setup Instructions

## 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}} <{{from_email}}>
Reply-To: {{reply_to}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down your **Template ID**

## 4. Get Public Key
1. Go to "Account" in your dashboard
2. Find your **Public Key** in the API Keys section

## 5. Update Configuration
1. Open `src/config/emailjs.js`
2. Replace the placeholder values:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_actual_service_id',
  TEMPLATE_ID: 'your_actual_template_id', 
  PUBLIC_KEY: 'your_actual_public_key'
}
```

## 6. Install EmailJS Package
Run this command in your project directory:
```bash
npm install @emailjs/browser
```

**Note**: The package has already been installed in this project.

## 7. Test the Form
1. Start your development server: `npm run dev`
2. Fill out the contact form
3. Submit and check if you receive the email

## Template Variables Available
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{message}}` - Message content
- `{{to_name}}` - Recipient name (Aditi)
- `{{reply_to}}` - Reply-to email address

## Troubleshooting
- Make sure all IDs and keys are correct
- Check browser console for any error messages
- Verify your email service is properly connected
- Ensure your template uses the correct variable names
