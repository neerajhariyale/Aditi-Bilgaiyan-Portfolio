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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Lucide Icons
import { 
  Menu, Mail, Phone, MapPin, Linkedin, ExternalLink, Send, Sparkles, 
  Briefcase, GraduationCap, Code2, PenTool, Play, Instagram, Palette,
  MousePointerClick, Layers, Wand2, Users, Clock, MessageCircle, 
  Lightbulb, Target, ArrowRight, Heart, Star, Zap, Eye, ChevronDown
} from 'lucide-react'

// React Icons for Tool/Software Icons
import { 
  SiFigma, SiCanva, SiAdobephotoshop, SiAdobeillustrator, 
  SiAdobeaftereffects, SiHtml5, SiCss3, SiCplusplus
} from 'react-icons/si'
import { FaCut, FaDatabase, FaCode } from 'react-icons/fa'

// Custom Components
import Toast from './components/Toast'
import LoadingSpinner from './components/LoadingSpinner'

// Tool Icons Mapping
const toolIcons = {
  'Figma': { icon: SiFigma, color: '#F24E1E' },
  'Canva': { icon: SiCanva, color: '#00C4CC' },
  'Adobe Photoshop': { icon: SiAdobephotoshop, color: '#31A8FF' },
  'Illustrator': { icon: SiAdobeillustrator, color: '#FF9A00' },
  'After Effects': { icon: SiAdobeaftereffects, color: '#9999FF' },
  'Capcut': { icon: FaCut, color: '#000000' },
  'HTML': { icon: SiHtml5, color: '#E34F26' },
  'CSS': { icon: SiCss3, color: '#1572B6' },
  'C++': { icon: SiCplusplus, color: '#00599C' },
  'SQL': { icon: FaDatabase, color: '#336791' },
  'OOPS': { icon: FaCode, color: '#6366F1' },
}

// Skill Icons Mapping
const skillIcons = {
  'Designing social media post': Palette,
  'Video editing': Play,
  'Creativity Imagination': Lightbulb,
  'Typography': PenTool,
  'Color Theory': Palette,
  'Layout Composition': Layers,
  'Branding Knowledge': Target,
  'UI/UX Basics': MousePointerClick,
  'Prototyping': Wand2,
  'Responsive Design': Layers,
  'Animation': Zap,
  'File Formats and Exporting': Layers,
  'Logo and Icons': Star,
  'Image Editing': Eye,
  'Problem Solving': Lightbulb,
  'Teamwork': Users,
  'Communication': MessageCircle,
  'Time Management': Clock,
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

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
    setIsOpen(false)
  }

  const navItems = ['Home', 'About', 'Experience', 'Projects', 'Designs', 'Skills', 'Contact']

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-sky-500/5 border-b border-sky-100' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-xl font-semibold sparkle space-x-2 hidden sm:block">
              Aditi Bilgaiyan
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item}
                variant="ghost"
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-600 hover:text-sky-600 hover:bg-sky-50 font-medium px-4 rounded-full transition-all"
              >
                {item}
              </Button>
            ))}
            <Button 
              className="ml-4 bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white rounded-full shadow-lg shadow-sky-500/20"
              onClick={() => scrollToSection('contact')}
            >
              Hire Me
            </Button>
          </div>

          {/* Mobile Nav */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-white/95 backdrop-blur-xl">
                <div className="flex flex-col space-y-2 mt-8">
                  {navItems.map((item) => (
                    <Button
                      key={item}
                      variant="ghost"
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="w-full justify-start text-lg hover:bg-sky-50 hover:text-sky-600 rounded-xl py-6"
                    >
                      {item}
                    </Button>
                  ))}
                  <Button 
                    className="mt-4 bg-gradient-to-r from-sky-500 to-cyan-400 text-white rounded-xl py-6"
                    onClick={() => scrollToSection('contact')}
                  >
                    Hire Me
                  </Button>
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
    <section id="home" className="min-h-screen pt-20 flex items-center relative overflow-hidden hero-pattern">
      {/* Decorative Blobs */}
      <div className="blob w-96 h-96 bg-sky-300/20 top-20 -left-48" />
      <div className="blob w-80 h-80 bg-cyan-300/20 bottom-20 right-0" style={{ animationDelay: '2s' }} />
      <div className="blob w-64 h-64 bg-sky-200/15 top-1/2 left-1/3" style={{ animationDelay: '4s' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fadeInLeft">
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sky-50 to-cyan-50 border border-sky-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium text-sky-700">Available for opportunities</span>
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <p className="text-lg text-gray-600">Hello, I'm</p>
                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight">
                  <span className="gradient-text">{name}</span>
                </h1>
                <h2 className="text-2xl lg:text-3xl text-gray-700 font-semibold flex items-center gap-3">
                  <Palette className="w-8 h-8 text-sky-500" />
                  {title}
                </h2>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                {about}
              </p>

              {/* Stats */}
              <div className="flex gap-8 py-4">
                <div className="text-center">
                  <p className="text-3xl font-bold gradient-text">5+</p>
                  <p className="text-sm text-gray-500">Months Experience</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-bold gradient-text">10+</p>
                  <p className="text-sm text-gray-500">Projects Done</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-bold gradient-text">6+</p>
                  <p className="text-sm text-gray-500">Design Tools</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 hover:from-sky-600 hover:via-sky-500 hover:to-cyan-500 text-white shadow-xl shadow-sky-500/20 rounded-full px-8 animate-gradient"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail className="mr-2 h-5 w-5" /> Let's Talk
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-sky-200 hover:bg-sky-50 text-sky-700 rounded-full px-8"
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              >
                <Eye className="mr-2 h-5 w-5" /> View Work
              </Button>
              {linkedin && (
                <Button size="lg" variant="ghost" className="rounded-full" asChild>
                  <a href={`https://${linkedin}`} target="_blank" rel="noreferrer">
                    <Linkedin className="h-5 w-5 text-sky-600" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end animate-fadeInRight">
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-sky-200 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute -inset-8 rounded-full border-2 border-dashed border-cyan-200 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
              
              {/* Main image */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl animate-pulse-glow">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -right-4 top-1/4 bg-white rounded-2xl shadow-xl p-3 animate-float">
                <SiFigma className="w-8 h-8" style={{ color: '#F24E1E' }} />
              </div>
              <div className="absolute -left-4 top-1/2 bg-white rounded-2xl shadow-xl p-3 animate-float" style={{ animationDelay: '1s' }}>
                <SiAdobephotoshop className="w-8 h-8" style={{ color: '#31A8FF' }} />
              </div>
              <div className="absolute right-8 bottom-8 bg-white rounded-2xl shadow-xl p-3 animate-float" style={{ animationDelay: '2s' }}>
                <SiCanva className="w-8 h-8" style={{ color: '#00C4CC' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
          <ChevronDown className="w-6 h-6 text-sky-400" />
        </div>
      </div>
    </section>
  )
}

const AboutSection = () => {
  const { email, phone, location, linkedin } = portfolioData.personalInfo;

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-sky-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-200 border-0 px-4 py-1">
            <Star className="w-3 h-3 mr-1 inline" /> About Me
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Education & Background</h2>
          <div className="section-divider w-24 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education Cards */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-sky-600" />
              Education
            </h3>
            {portfolioData.education.map((edu) => (
              <Card key={edu.id} className="hover-lift border-0 shadow-lg bg-white overflow-hidden group">
                <div className="h-1 w-full bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400"></div>
                <CardHeader className="flex flex-row items-start gap-4 pb-2">
                  <Avatar className="h-16 w-16 border-2 border-sky-100 shadow-md">
                    <AvatarImage src={edu.logo} alt={edu.institute} className="object-cover" />
                    <AvatarFallback className="bg-sky-100">
                      <GraduationCap className="h-8 w-8 text-sky-500" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-sky-600 transition-colors">
                      {edu.institute}
                    </CardTitle>
                    <CardDescription className="text-sky-600 font-medium mt-1">
                      {edu.degree}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-sky-400" />
                    {edu.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-sky-200 text-sky-700 font-medium">
                      {edu.duration}
                    </Badge>
                    <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-0">
                      {edu.cgpa}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-sky-600" />
              Contact Info
            </h3>
            <Card className="border-0 shadow-lg bg-blue-100 overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <a href={`mailto:${email}`} className="font-medium text-gray-800 hover:text-sky-600 hover:underline">{email}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Phone</p>
                    <a href={`tel:${phone}`} className="font-medium text-gray-800 hover:text-sky-600 hover:underline">{phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Location</p>
                    <p className="font-medium text-gray-800">{location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">LinkedIn</p>
                    <a href={`https://${linkedin}`} target="_blank" rel="noreferrer" className="font-medium text-gray-800 hover:text-sky-600 hover:underline">
                      Connect with me
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-200 border-0 px-4 py-1">
            <Briefcase className="w-3 h-3 mr-1 inline" /> Work Experience
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Professional Journey</h2>
          <div className="section-divider w-24 mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          {portfolioData.experience.map((exp, idx) => (
            <div key={exp.id} className="relative">
              {/* Timeline line */}
              {idx < portfolioData.experience.length - 1 && (
                <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-sky-400 to-cyan-300" />
              )}
              
              <Card className="border-0 shadow-xl hover-lift bg-white mb-8 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-500 via-sky-400 to-cyan-400" />
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/20">
                        <Briefcase className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-900">{exp.role}</CardTitle>
                        <CardDescription className="text-lg text-sky-600 font-semibold mt-1">
                          {exp.company}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <Badge className="bg-sky-100 text-sky-700 border-0 px-3 py-1">
                        {exp.startDate} - {exp.endDate}
                      </Badge>
                      <span className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" /> {exp.location}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {exp.description.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 mt-2 flex-shrink-0" />
                        <span className="text-gray-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-sky-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-200 border-0 px-4 py-1">
            <Layers className="w-3 h-3 mr-1 inline" /> Portfolio
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A showcase of my UI/UX design projects created with attention to detail and user experience
          </p>
          <div className="section-divider w-24 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {portfolioData.projects.map((project) => (
            <Card key={project.id} className="overflow-hidden border-0 shadow-xl hover-lift group bg-white">
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <Button className="bg-white text-sky-600 hover:bg-sky-50 rounded-full shadow-xl" asChild>
                    <a href={project.link} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> View Project
                    </a>
                  </Button>
                </div>
              </div>
              
              {/* Project Info */}
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors">
                  {project.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" className="px-0 text-sky-600 group/btn" asChild>
                  <a href={project.link} target="_blank" rel="noreferrer">
                    View Details 
                    <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
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

const GraphicDesignShowcase = () => {
  const designWorks = [
    {
      id: 1,
      title: "Social Media Creatives",
      description: "Eye-catching social media designs showcasing brand identity and creativity.",
      type: "post",
      instagramUrl: "https://www.instagram.com/p/DTZwaPhjImc/",
      embedUrl: "https://www.instagram.com/p/DTZwaPhjImc/embed/captioned",
      tags: ["Social Media", "Branding", "Creative Design"]
    },
    {
      id: 2,
      title: "Motion Graphics & Reels",
      description: "Dynamic motion graphics and video content showcasing animation skills.",
      type: "reel",
      instagramUrl: "https://www.instagram.com/reel/DQrO3P7jVcs/",
      embedUrl: "https://www.instagram.com/reel/DQrO3P7jVcs/embed/captioned",
      tags: ["Motion Graphics", "Video Editing", "Animation"]
    },
    {
      id: 3,
      title: "Visual Storytelling",
      description: "Creative visual storytelling through compelling imagery and design.",
      type: "post",
      instagramUrl: "https://www.instagram.com/p/DTZ1XMKjRLF/",
      embedUrl: "https://www.instagram.com/p/DTZ1XMKjRLF/embed/captioned",
      tags: ["Storytelling", "Visual Design", "Creative"]
    },
    {
      id: 4,
      title: "Brand Identity Design",
      description: "Professional brand identity designs with cohesive visual elements.",
      type: "post",
      instagramUrl: "https://www.instagram.com/p/DTSmGGFjWfX/",
      embedUrl: "https://www.instagram.com/p/DTSmGGFjWfX/embed/captioned",
      tags: ["Brand Identity", "Logo Design", "Visual Branding"]
    },
    {
      id: 5,
      title: "Marketing Visuals",
      description: "Engaging marketing visuals designed to capture attention effectively.",
      type: "post",
      instagramUrl: "https://www.instagram.com/p/DUAQYp4ja_3/",
      embedUrl: "https://www.instagram.com/p/DUAQYp4ja_3/embed/captioned",
      tags: ["Marketing", "Digital Design", "Promotional"]
    }
  ]

  return (
    <section id="designs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-700 hover:from-sky-200 hover:to-cyan-200 border-0 px-4 py-1">
            <Palette className="w-3 h-3 mr-1 inline" /> Creative Works
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Graphic Design Showcase</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A collection of my creative works including social media designs, motion graphics, and visual content
          </p>
          <div className="section-divider w-24 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designWorks.map((work) => (
            <Card 
              key={work.id} 
              className="overflow-hidden border-0 shadow-xl hover-lift group bg-white rounded-2xl"
            >
              {/* Badge */}
              <div className="absolute top-4 left-4 z-20">
                <Badge className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white border-0 shadow-lg">
                  {work.type === 'reel' ? (
                    <><Play className="w-3 h-3 mr-1" /> Reel</>
                  ) : (
                    <><Instagram className="w-3 h-3 mr-1" /> Post</>
                  )}
                </Badge>
              </div>

              {/* Instagram Embed */}
              <div className="instagram-embed-container">
                <iframe
                  src={work.embedUrl}
                  className="w-full h-[450px] border-0"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency="true"
                  allow="encrypted-media"
                  title={work.title}
                />
              </div>

              {/* Content */}
              <CardContent className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {work.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{work.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {work.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-sky-50 text-sky-700 text-xs border border-sky-100"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button 
                  size="sm"
                  className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white rounded-full"
                  asChild
                >
                  <a href={work.instagramUrl} target="_blank" rel="noreferrer">
                    <Instagram className="mr-2 h-4 w-4" /> View on Instagram
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-sky-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-200 border-0 px-4 py-1">
            <Zap className="w-3 h-3 mr-1 inline" /> Skills & Tools
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">My Expertise</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Proficient in industry-leading design tools and creative software
          </p>
          <div className="section-divider w-24 mx-auto" />
        </div>

        {/* Tools & Software with Icons */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Design Tools & Software</h3>
          <TooltipProvider>
            <div className="flex flex-wrap justify-center gap-6">
              {portfolioData.skills.tools.map((tool, index) => {
                const toolData = toolIcons[tool]
                const IconComponent = toolData?.icon
                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div className="skill-card w-24 h-24 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-xl border border-sky-100">
                        {IconComponent ? (
                          <IconComponent 
                            className="w-10 h-10 tool-icon" 
                            style={{ color: toolData.color }}
                          />
                        ) : (
                          <PenTool className="w-10 h-10 text-sky-500" />
                        )}
                        <span className="text-xs font-medium text-gray-600 text-center px-2">{tool}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tool}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          </TooltipProvider>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Core Design Skills */}
          <Card className="border-0 shadow-lg hover-lift overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-sky-500 to-cyan-400" />
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
                  <PenTool className="w-6 h-6 text-sky-600" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-800">Core Design Skills</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.coreSkills.map((skill, index) => {
                  const IconComponent = skillIcons[skill] || Sparkles
                  return (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-sky-50 text-sky-700 border border-sky-100 flex items-center gap-1"
                    >
                      <IconComponent className="w-3 h-3" />
                      {skill}
                    </Badge>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Technical Skills */}
          <Card className="border-0 shadow-lg hover-lift overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-sky-400 to-teal-400" />
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-sky-600" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-800">Technical Proficiency</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.technical.map((skill, index) => {
                  const IconComponent = skillIcons[skill] || Code2
                  return (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-sky-50 text-sky-700 border border-sky-100 flex items-center gap-1"
                    >
                      <IconComponent className="w-3 h-3" />
                      {skill}
                    </Badge>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Soft Skills */}
          <Card className="border-0 shadow-lg hover-lift overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-cyan-400 to-teal-400" />
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-cyan-600" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-800">Soft Skills</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.softSkills.map((skill, index) => {
                  const IconComponent = skillIcons[skill] || Sparkles
                  return (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-cyan-50 text-cyan-700 border border-cyan-100 flex items-center gap-1"
                    >
                      <IconComponent className="w-3 h-3" />
                      {skill}
                    </Badge>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Other Technical Skills */}
        <div className="mt-8">
          <Card className="border-0 shadow-lg hover-lift overflow-hidden max-w-md mx-auto">
            <div className="h-1 bg-gradient-to-r from-gray-500 to-gray-700" />
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-gray-600" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-800">Programming Knowledge</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <div className="flex flex-wrap gap-4 justify-center">
                  {portfolioData.skills.otherSkills.map((skill, index) => {
                    const toolData = toolIcons[skill]
                    const IconComponent = toolData?.icon
                    return (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <div className="w-16 h-16 bg-gray-50 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200">
                            {IconComponent ? (
                              <IconComponent className="w-8 h-8" style={{ color: toolData.color }} />
                            ) : (
                              <Code2 className="w-8 h-8 text-gray-500" />
                            )}
                            <span className="text-xs text-gray-600">{skill}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{skill}</p>
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const showToast = (message, type) => setToast({ message, type })
  const hideToast = () => setToast(null)

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
        showToast('Message sent successfully! I will get back to you soon.', 'success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error('EmailJS returned non-200 status')
      }
    } catch (error) {
      console.error('EmailJS Error:', error)
      showToast('Failed to send message. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="blob w-96 h-96 bg-sky-200/20 -top-48 -right-48" />
      <div className="blob w-80 h-80 bg-cyan-200/20 -bottom-40 -left-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-200 border-0 px-4 py-1">
            <Mail className="w-3 h-3 mr-1 inline" /> Get In Touch
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Let's Work Together</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Have a project in mind? I'd love to hear about it. Let's create something amazing together!
          </p>
          <div className="section-divider w-24 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Contact Information</h3>
            <p className="text-gray-600">
              I'm open for freelance opportunities, internships, and full-time roles. Feel free to reach out!
            </p>

            <div className="space-y-4">
              <Card className="border-0 shadow-md hover-lift bg-gradient-to-r from-sky-50 to-cyan-50">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href={`mailto:${portfolioData.personalInfo.email}`} className="font-medium text-gray-800 hover:text-sky-600 transition-colors">
                      {portfolioData.personalInfo.email}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover-lift bg-gradient-to-r from-sky-50 to-cyan-50">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a href={`tel:${portfolioData.personalInfo.phone}`} className="font-medium text-gray-800 hover:text-sky-600 transition-colors">
                      {portfolioData.personalInfo.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover-lift bg-gradient-to-r from-sky-50 to-cyan-50">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-800">{portfolioData.personalInfo.location}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400" />
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="bg-sky-50 border-sky-200 focus:border-sky-500 focus:ring-sky-500 rounded-xl py-6"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="bg-sky-50 border-sky-200 focus:border-sky-500 focus:ring-sky-500 rounded-xl py-6"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700 font-medium">Your Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="min-h-[150px] bg-sky-50 border-sky-200 focus:border-sky-500 focus:ring-sky-500 rounded-xl resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 hover:from-sky-600 hover:via-sky-500 hover:to-cyan-500 text-white text-lg py-6 rounded-xl shadow-lg shadow-sky-500/20"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size="sm" />
                        <span className="ml-2">Sending...</span>
                      </>
                    ) : (
                      <>
                        Send Message <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="bg-sky-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 via-sky-400 to-cyan-400 flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold">{portfolioData.personalInfo.name}</span>
              <p className="text-sky-300 text-sm">Graphic Designer & UI/UX Enthusiast</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10" asChild>
              <a href={`https://${portfolioData.personalInfo.linkedin}`} target="_blank" rel="noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10" asChild>
              <a href={`mailto:${portfolioData.personalInfo.email}`}>
                <Mail className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10" asChild>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <Instagram className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>

        <Separator className="my-8 bg-sky-800" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sky-300 text-sm">
          <p>© {new Date().getFullYear()} {portfolioData.personalInfo.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-sky-400 fill-sky-400" /> in India
          </p>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <GraphicDesignShowcase />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </div>
    </TooltipProvider>
  )
}

export default App
