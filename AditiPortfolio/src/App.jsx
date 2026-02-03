import { useState, useEffect } from 'react'
import { portfolioData } from './data.js'
import './App.css'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG, getTemplateParams } from './config/emailjs'

// Shadcn UI Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Icons
import { Menu, Mail, Phone, MapPin, Linkedin, ExternalLink, Send, Download, Sparkles, Briefcase, GraduationCap, Code2, PenTool } from 'lucide-react'

// Toast Component (Custom or Shadcn - staying with usage of custom for now but styled better if possible, or simple alert/custom toast logic present in old App.jsx)
import Toast from './components/Toast'
import LoadingSpinner from './components/LoadingSpinner'

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

  const navItems = ['Home', 'Education', 'Experience', 'Projects', 'Skills', 'Contact']

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-gray-100' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {portfolioData.personalInfo.name}
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Button
                key={item}
                variant="ghost"
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-medium"
              >
                {item}
              </Button>
            ))}
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Button
                      key={item}
                      variant="ghost"
                      onClick={() => {
                        scrollToSection(item.toLowerCase())
                      }}
                      className="w-full justify-start text-lg"
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

const HeroSection = () => {
  const { name, title, about, image, linkedin } = portfolioData.personalInfo;

  return (
    <section id="home" className="min-h-screen pt-20 flex items-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in slide-in-from-left duration-700 fade-in">
            <div className="space-y-4">
              <Badge variant="secondary" className="px-3 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200">
                <Sparkles className="w-3 h-3 mr-1 inline" /> Available for opportunities
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900">
                Hi, I'm <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  {name}
                </span>
              </h1>
              <h2 className="text-2xl lg:text-3xl text-gray-600 font-medium h-12 flex items-center">
                {title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                {about}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail className="mr-2 h-4 w-4" /> Get In Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-200 hover:bg-blue-50 text-blue-700"
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              >
                <Briefcase className="mr-2 h-4 w-4" /> View Projects
              </Button>
              {linkedin && (
                <Button size="lg" variant="ghost" asChild>
                  <a href={`https://${linkedin}`} target="_blank" rel="noreferrer">
                    <Linkedin className="h-5 w-5 text-blue-700" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end animate-in slide-in-from-right duration-700 fade-in">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const EducationSection = () => {
  return (
    <section id="education" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="border-blue-200 text-blue-700">Academic Journey</Badge>
          <h2 className="text-4xl font-bold text-gray-900">Education</h2>
          <Separator className="w-20 mx-auto bg-blue-600 h-1 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.education.map((edu) => (
            <Card key={edu.id} className="hover:shadow-xl transition-all duration-300 border-gray-100 overflow-hidden group">
              <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <Avatar className="h-16 w-16 border-2 border-gray-100">
                  <AvatarImage src={edu.logo} alt={edu.institute} className="object-cover" />
                  <AvatarFallback><GraduationCap className="h-8 w-8 text-gray-400" /></AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg font-bold text-gray-800">{edu.institute}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{edu.degree}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" /> {edu.location}
                  </div>
                  <div className="font-semibold text-gray-900 border-l-2 border-blue-500 pl-3">
                    {edu.duration}
                  </div>
                  <div className="pt-2">
                    <Badge variant="secondary" className="text-green-700 bg-green-50 hover:bg-green-100">
                      {edu.cgpa}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="border-blue-200 text-blue-700">Work History</Badge>
          <h2 className="text-4xl font-bold text-gray-900">Experience</h2>
          <Separator className="w-20 mx-auto bg-blue-600 h-1 rounded-full" />
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {portfolioData.experience.map((exp) => (
            <Card key={exp.id} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">{exp.role}</CardTitle>
                      <CardDescription className="text-lg text-blue-600 font-medium font-sans">{exp.company}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-sm py-1 px-3 border-gray-300">
                      {exp.startDate} - {exp.endDate}
                    </Badge>
                    <div className="text-sm text-gray-500 mt-2 flex items-center justify-end">
                      <MapPin className="h-3 w-3 mr-1" /> {exp.location}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {exp.description.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="border-blue-200 text-blue-700">Portfolio</Badge>
          <h2 className="text-4xl font-bold text-gray-900">Featured Projects</h2>
          <Separator className="w-20 mx-auto bg-blue-600 h-1 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {portfolioData.projects.map((project) => (
            <Card key={project.id} className="overflow-hidden border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 flex flex-col h-full group">
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <Button variant="secondary" className="gap-2" asChild>
                    <a href={project.link} target="_blank" rel="noreferrer">
                      View Project <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <img src={project.image} alt={project.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{project.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" className="px-0 text-blue-600" asChild>
                  <a href={project.link} target="_blank" rel="noreferrer">
                    View Details <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const SkillsSection = () => {

  // Group skills for rendering
  const skillCategories = [
    { title: "Core Design Skills", skills: portfolioData.skills.coreSkills, icon: <PenTool className="h-5 w-5 text-purple-500" /> },
    { title: "Technical Proficiency", skills: portfolioData.skills.technical, icon: <Code2 className="h-5 w-5 text-blue-500" /> },
    { title: "Tools & Software", skills: portfolioData.skills.tools, icon: <Briefcase className="h-5 w-5 text-green-500" /> },
    { title: "Soft Skills", skills: portfolioData.skills.softSkills, icon: <Sparkles className="h-5 w-5 text-orange-500" /> },
    { title: "Other Skills", skills: portfolioData.skills.otherSkills, icon: <Code2 className="h-5 w-5 text-gray-500" /> },
  ];

  return (
    <section id="skills" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="border-blue-200 text-blue-700">Competencies</Badge>
          <h2 className="text-4xl font-bold text-gray-900">Skills & Expertise</h2>
          <Separator className="w-20 mx-auto bg-blue-600 h-1 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                {cat.icon}
                <CardTitle className="text-lg font-bold text-gray-800">{cat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm font-normal bg-white border border-gray-200 text-gray-700 shadow-sm hover:shadow-md transition-shadow">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  const hideToast = () => {
    setToast(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const templateParams = getTemplateParams(formData)
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      )

      if (response.status === 200) {
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
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-blue-200 text-blue-700">Contact</Badge>
              <h2 className="text-4xl font-bold text-gray-900">Let's Work Together</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                I'm interested in freelance opportunities and open for internship or full-time roles. However, if you have other request or question, don't hesitate to use the form.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="border-none shadow-md bg-slate-50">
                <CardContent className="flex items-center space-x-4 p-6">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href={`mailto:${portfolioData.personalInfo.email}`} className="text-lg font-medium text-gray-900 hover:text-blue-600">
                      {portfolioData.personalInfo.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-slate-50">
                <CardContent className="flex items-center space-x-4 p-6">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a href={`tel:${portfolioData.personalInfo.phone}`} className="text-lg font-medium text-gray-900 hover:text-blue-600">
                      {portfolioData.personalInfo.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="min-h-[150px] bg-slate-50"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Sending...</span>
                  </>
                ) : (
                  <>
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

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

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {portfolioData.personalInfo.name}
          </span>
          <p className="text-gray-400 text-sm mt-2">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          {/* Add social links here if needed */}
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      <HeroSection />
      <EducationSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default App
