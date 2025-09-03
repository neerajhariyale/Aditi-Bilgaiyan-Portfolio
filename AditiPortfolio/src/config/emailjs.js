// EmailJS Configuration
// Replace these with your actual EmailJS credentials

export const EMAILJS_CONFIG = {
  // Your EmailJS Service ID
  SERVICE_ID: 'YOUR_SERVICE_ID',
  
  // Your EmailJS Template ID
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',
  
  // Your EmailJS Public Key
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY'
}

// Template parameters that will be sent to EmailJS
export const getTemplateParams = (formData) => ({
  from_name: formData.name,
  from_email: formData.email,
  message: formData.message,
  to_name: 'Aditi',
  reply_to: formData.email
})
