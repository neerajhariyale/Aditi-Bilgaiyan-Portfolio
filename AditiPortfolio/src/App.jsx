import { useState, useEffect } from 'react'
import { portfolioData } from './data.js'
import './App.css'
import emailjs from '@emailjs/browser'
import Toast from './components/Toast'
import InlineMessage from './components/InlineMessage'
import LoadingSpinner from './components/LoadingSpinner'
import { EMAILJS_CONFIG, getTemplateParams } from './config/emailjs'

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-gray-800">
            {portfolioData.personalInfo.name}
          </div>
          <div className="hidden md:flex space-x-8">
            {['Home', 'Education', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

// Hero Section Component
const HeroSection = () => {
  const [currentTitle, setCurrentTitle] = useState(0)
  const titles = ['UI/UX Designer', 'Graphic Designer']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800">
              Hi, I'm <span className="text-blue-600">{portfolioData.personalInfo.name}</span>
            </h1>
            <div className="text-2xl lg:text-3xl text-gray-600 h-12">
              <span className="inline-block animate-pulse">
                {titles[currentTitle]}
              </span>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              {portfolioData.personalInfo.about}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Get In Touch
              </button>
              <button
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                View My Work
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl">
                <img
                  src={portfolioData.personalInfo.image}
                  alt={portfolioData.personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Education Section Component
const EducationSection = () => {
  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Education</h2>
          <p className="text-lg text-gray-600">My academic journey and achievements</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.education.map((edu) => (
            <div key={edu.id} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img src={edu.logo} alt={edu.institute} className="w-full h-full object-FIT" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{edu.institute}</h3>
                  <p className="text-lg text-blue-600 font-medium mb-1">{edu.degree}</p>
                  <p className="text-gray-600 mb-2">{edu.stream}</p>
                  <p className="text-sm text-gray-500 mb-3">{edu.duration}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">CGPA/Percentage:</span>
                    <span className="font-semibold text-green-600">{edu.cgpa}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Experience Section Component
const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Experience</h2>
          <p className="text-lg text-gray-600">My professional journey and achievements</p>
        </div>
        <div className="space-y-8">
          {portfolioData.experience.map((exp) => (
            <div key={exp.id} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800">{exp.role}</h3>
                      <p className="text-lg text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-500 mt-2 md:mt-0">
                      {exp.startDate} - {exp.endDate}
                      <br />
                      <span className="text-blue-600">{exp.location}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.description.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Projects Section Component
const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Projects</h2>
          <p className="text-lg text-gray-600">Some of my recent work and creative projects</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {portfolioData.projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img src={project.image} alt={project.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Project
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Skills Section Component
const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Skills</h2>
          <p className="text-lg text-gray-600">My expertise and capabilities</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Skills</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">Core Skills</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {portfolioData.skills.coreSkills.join(', ')}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">Technical</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {portfolioData.skills.technical.join(', ')}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">Tools</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {portfolioData.skills.tools.join(', ')}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">Soft Skills</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {portfolioData.skills.softSkills.join(', ')}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">Other Skills</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {portfolioData.skills.otherSkills.join(', ')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Section Component
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState(null)
  const [inlineMessage, setInlineMessage] = useState(null)

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear inline message when user starts typing
    if (inlineMessage) {
      setInlineMessage(null)
    }
  }

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  const hideToast = () => {
    setToast(null)
  }

  const showInlineMessage = (message, type) => {
    setInlineMessage({ message, type })
  }

  const hideInlineMessage = () => {
    setInlineMessage(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    hideInlineMessage()

    try {
      // Prepare template parameters
      const templateParams = getTemplateParams(formData)

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      )

      if (response.status === 200) {
        // Success
        showToast('Message submitted successfully. Aditi will contact you soon.', 'success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error('EmailJS returned non-200 status')
      }
    } catch (error) {
      console.error('EmailJS Error:', error)
      showToast('Submission failed. Please try again later.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Connect With Me</h2>
          <p className="text-lg text-gray-600">Let's work together on your next project</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Tell me about your project..."
              />
            </div>
            
            {/* Inline Message */}
            <InlineMessage 
              message={inlineMessage?.message} 
              type={inlineMessage?.type} 
              show={!!inlineMessage} 
            />
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send Message</span>
              )}
            </button>
          </form>
          <div className="mt-12 text-center">
            <div className="flex justify-center space-x-8">
              <a href={`mailto:${portfolioData.personalInfo.email}`} className="text-gray-600 hover:text-blue-600 transition-colors">
                <span className="sr-only">Email</span>
                📧 {portfolioData.personalInfo.email}
              </a>
              <a href={`tel:${portfolioData.personalInfo.phone}`} className="text-gray-600 hover:text-blue-600 transition-colors">
                <span className="sr-only">Phone</span>
                📱 {portfolioData.personalInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </section>
  )
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <EducationSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  )
}

export default App
