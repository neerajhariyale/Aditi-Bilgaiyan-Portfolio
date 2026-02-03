import aditiImage from "./assets/aditiimage.jpeg"
import portfolioImage from "./assets/portfolio-page.png"
import cleaningLandingPage from "./assets/cleaning-landing-page.png"
import EducationLandingPage from "./assets/education-landing-page.png"
import DigitalAgencyLandingPage from "./assets/digital-agency-page.png"
import RazorPayCloneLandingPage from "./assets/digital-agency-page.png"

export const portfolioData = {
  personalInfo: {
    name: "Aditi Bilgaiyan",
    title: "Graphic Designer & UI/UX Enthusiast",
    about: "Creative and detail-oriented Graphic Designer seeking to deliver impactful visual solutions through innovative design and branding. Experienced in creating social media creatives, banners, and marketing visuals.",
    image: aditiImage,
    email: "bilgaiyanaditi805@gmail.com",
    phone: "+91 8305629699",
    linkedin: "linkedin.com/in/aditibilgaiyan",
    location: "Bhopal, Madhya Pradesh"
  },

  education: [
    {
      id: 1,
      institute: "Oriental College of Technology",
      degree: "B.Tech, Information Technology",
      location: "Bhopal, Madhya Pradesh",
      cgpa: "7.61 CGPA",
      duration: "Aug 2021 - May 2025",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1OvVd7uKH41P-Q4bvbFcmNegzevNO4MZ9yw&s"
    },
    {
      id: 2,
      institute: "Nirmal Jyoti Senior Secondary School",
      degree: "12th Grade",
      location: "Bina, Madhya Pradesh",
      cgpa: "82 Percent",
      duration: "May 2021",
      logo: "data:image/jpeg;base64,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"
    }
  ],

  experience: [
    {
      id: 1,
      company: "i guru IT-infrastructure",
      role: "Graphic Designer Intern",
      startDate: "Currently working",
      endDate: "Present",
      location: "Work from office",
      description: [
        "During my current internship as a Graphic Designer, I have gained strong practical experience in visual communication and design execution. I have learned how to convert ideas and requirements into visually appealing designs that align with brand identity and target audience needs.",
        "I have developed hands-on skills in designing social media creatives, banners, posters, thumbnails, and marketing visuals while maintaining consistency in colors, typography, and layout. I now understand the importance of visual hierarchy, spacing, alignment, and readability in creating effective designs.",
        "Created a personal portfolio website to showcase projects and skills.",
        "Additionally, I have gained experience in using professional design tools efficiently, organizing design files properly, and following brand guidelines."
      ],
      logo: "https://via.placeholder.com/150"
    }
  ],

  projects: [
    {
      id: 1,
      name: "Digital Agency Landing Page",
      description: "Creative digital agency landing page with responsive design and branding focus.",
      image: DigitalAgencyLandingPage,
      technologies: ["Figma", "Auto-Layout", "Strokes", "Effect", "Typography"],
      link: "https://www.figma.com/design/LVTLgdBeKSaNC2I7i5OmnI/Aditi-Ui-Ux-Portfolio?node-id=31-3&t=l1Y5z7h2VDPud0Qf-0"
    },
    {
      id: 2,
      name: "Portfolio",
      description: "Professional portfolio showcasing projects with clean layouts, modern typography, and user-focused visual hierarchy.",
      image: portfolioImage,
      technologies: ["Figma", "Auto-Layout", "Effect", "Typography"],
      link: "https://www.figma.com/design/LVTLgdBeKSaNC2I7i5OmnI/Aditi-Ui-Ux-Portfolio?node-id=404-3218&t=l1Y5z7h2VDPud0Qf-0"
    },
    {
      id: 3,
      name: "Razorpay Clone",
      description: "Clone of the Razorpay landing page using HTML, CSS and Tailwind CSS, featuring responsive design and database integration.",
      image: RazorPayCloneLandingPage,
      technologies: ["HTML", "CSS", "Javascript", "Tailwind CSS", "MySQL"],
      link: "https://www.figma.com/design/LVTLgdBeKSaNC2I7i5OmnI/Aditi-Ui-Ux-Portfolio?node-id=439-56&t=l1Y5z7h2VDPud0Qf-0"
    }
  ],

  skills: {
    coreSkills: [
      "Designing social media post",
      "Video editing",
      "Creativity Imagination",
      "Typography",
      "Color Theory",
      "Layout Composition",
      "Branding Knowledge"
    ],
    technical: [
      "UI/UX Basics",
      "Prototyping",
      "Responsive Design",
      "Animation",
      "File Formats and Exporting",
      "Logo and Icons",
      "Image Editing",
      "HTML",
      "CSS"
    ],
    tools: [
      "Figma",
      "Canva",
      "Adobe Photoshop",
      "Illustrator",
      "After Effects",
      "Capcut"
    ],
    softSkills: [
      "Problem Solving",
      "Teamwork",
      "Communication",
      "Time Management"
    ],
    otherSkills: [
      "C++",
      "SQL",
      "OOPS"
    ]
  }
};
