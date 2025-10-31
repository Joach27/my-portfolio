import React, { useState, useEffect } from 'react';
import type { CVData, Language, Project, Experience, Education, Certification } from './types';
import Section from './components/Section';
import SkillBadge from './components/SkillBadge';
import { PhoneIcon, MailIcon, LinkedInIcon, GithubIcon, LocationIcon, CalendarIcon, LinkIcon } from './components/icons';
import ThemeToggle from './components/ThemeToggle';

const cvData: CVData = {
  name: "Komovi Joachin AGBEVIADE",
  title: "Software developer, Data Scientist, ML/AI Engineer",
  photoUrl: "https://picsum.photos/seed/johndoe/200/200",
  contact: {
    phone: "+212 0774467782",
    email: "agbeviadekomivi@gmail.com",
    linkedin: "https://linkedin.com/in/j-komivi-agbeviade",
    github: "https://github.com/Joach27",
    location: "Casablanca, Morocco",
  },
  profile: "Final-year Computer Engineering and Artificial Intelligence student, passionate about machine learning, new technologies, and solving real-world problems. Curious, persistent, autonomous, and impact-driven, I enjoy continuous learning and collaborating to deliver smart, concrete, and high-impact solutions.",
  projects: [
    {
      title: "Multi-modal RAG",
      link: "https://github.com/Joach27/multimodal-rag.git",
      description: "Development of a multi-modal RAG system capable of processing documents in various formats (PDF, text, images) and using LLMs to answer complex queries. Project focused on cloud scalability (AWS) and generative model cost optimization.",
      technologies: ["Ollama", "OpenAI", "LangChain", "Sentence transformers", "ChromaDB", "Vectorization", "Streamlit"],
      impact: "This system reduces document processing time by 70% and is highly valuable for law firms, consulting agencies, and research institutions."
    },
    {
      title: "Automatic Industrial Defect Detection (In progress)",
      description: "Development of an anomaly detection system for industrial products using CNNs / transfer learning, with defect visualization (heatmaps) and a Streamlit interface.",
      technologies: ["Python", "TensorFlow", "OpenCV", "PyTorch", "Computer Vision", "Streamlit"],
      impact: "Reduced inspection time by 80% and improved product compliance by 10% through an automated visual defect detection system."
    },
    {
      title: "Chatt (chatbot)",
      link: "https://github.com/Joach27/chatt.git",
      description: "An intelligent conversational chatbot capable of answering questions and engaging in natural dialogue. Backend in Java with OpenRouter API (GPT, Llama, Mistral). Frontend with React & Tailwind CSS. Deployed on Vercel and AWS.",
      technologies: ["Java", "React", "Tailwind CSS", "OpenRouter API", "Vercel", "AWS"],
    },
    {
      title: "University Management System",
      link: "https://github.com/Joach27/uni_management.git",
      description: "Development of a web application for university management with a strong focus on data security, featuring authentication, course registration, assignment submission, and Q&A.",
      technologies: ["Python", "Flask", "React", "JWT", "MySQL"],
    }
  ],
  skills: {
    "Languages & Frameworks": ["Python", "Java", "C", "JavaScript", "Spring Boot", "Node.js", "Express.js", "React.js", "REST APIs", "Streamlit"],
    "Databases & BI": ["MySQL", "SQL", "PostgreSQL", "Oracle", "MongoDB", "ETL", "PowerBI", "Cassandra", "VectorDB", "ChromaDB"],
    "Machine Learning & AI": ["Scikit-learn", "Pandas", "Model evaluation", "ML algorithms", "CNN", "TensorFlow", "PyTorch", "Computer Vision", "RAG", "LLM API", "OpenAI", "Langchain", "Mistral"],
    "DevOps & Cloud": ["Docker", "AWS", "GitHub Actions", "Terraform", "Git", "GitHub"],
    "Monitoring & Automation": ["Prometheus", "Grafana", "Ansible"]
  },
  experience: [
    {
      role: "Web Developer",
      company: "2MAG Agency",
      period: "07/2024 - 11/2024",
      location: "Casablanca",
      description: "Digital marketing and web development company.",
      points: [
        "Developed 7+ professional websites.",
        "Improved website performance scores to 97-99%, improving loading times and user experience.",
        "Web design and implementation.",
        "Worked in an Agile environment with weekly meetings."
      ]
    },
    {
      role: "Software Development Intern",
      company: "YEESU",
      period: "05/2023 - 07/2023",
      location: "France",
      description: "",
      points: [
        "Developed a first-order dynamic system simulation software.",
        "Implemented a user interface with PyQt5.",
        "Created data visualizations using Matplotlib."
      ]
    }
  ],
  education: [
    {
      degree: "Computer Engineering and Artificial Intelligence",
      institution: "HESTIM (Higher School of Engineering and Management Sciences)",
      period: "10/2021 - Present",
      details: ["Java/JEE, JavaScript, C, Python", "Databases: Oracle, MySQL, NoSQL (MongoDB, Cassandra)", "Machine Learning & Deep Learning", "Business Intelligence: ETL, PowerBI", "Big Data: Hadoop, PySpark", "DevOps & MLOps: CI/CD, Docker, AWS, Terraform, Prometheus, Grafana"]
    },
    {
      degree: "Master's in Cybersecurity",
      institution: "INSA Hauts-de-France",
      period: "11/2024 - Present",
      details: ["Cryptography", "Data Security", "Penetration Testing", "Security of Mobile Connected Devices", "Computer Networks", "Mobile Application Security"]
    }
  ],
  certifications: [
    { name: "Deep Learning", issuer: "DeepLearning.AI" },
    { name: "Python for Data Science", issuer: "Coursera" },
    { name: "IBM Full Stack Developer", issuer: "IBM - Coursera" },
    { name: "Oracle Database Management", issuer: "Coursera" },
    { name: "Ethical Hacker", issuer: "CISCO" },
    { name: "CyberOps", issuer: "CISCO" }
  ],
  languages: [
    { name: "French", level: "Native language", rating: 5 },
    { name: "English", level: "Intermediate", rating: 3 }
  ]
};

const ContactLink: React.FC<{ href: string; icon: React.ReactNode; text: string; }> = ({ href, icon, text }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-mainblue transition-colors duration-300">
        {icon}
        <span>{text}</span>
    </a>
);

const RatingCircles: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-3 w-3 rounded-full ${i < rating ? 'bg-mainblue' : 'bg-gray-300 dark:bg-slate-600'}`}></div>
        ))}
    </div>
);

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 font-sans max-w-7xl">
        <header className="relative flex flex-col sm:flex-row items-center mb-8 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
            <img src={cvData.photoUrl} alt={cvData.name} className="w-32 h-32 rounded-full object-cover mb-4 sm:mb-0 sm:mr-8 border-4 border-mainblue/20" />
            <div className="text-center sm:text-left">
                <h1 className="text-4xl font-bold text-darkgray dark:text-white">{cvData.name}</h1>
                <h2 className="text-xl font-semibold text-mainblue mt-1">{cvData.title}</h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    <ContactLink href={`tel:${cvData.contact.phone}`} icon={<PhoneIcon />} text={cvData.contact.phone} />
                    <ContactLink href={`mailto:${cvData.contact.email}`} icon={<MailIcon />} text={cvData.contact.email} />
                    <ContactLink href={cvData.contact.linkedin} icon={<LinkedInIcon />} text="linkedin.com/in/jh" />
                    <ContactLink href={cvData.contact.github} icon={<GithubIcon />} text="github.com/Joach27" />
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <LocationIcon />
                      <span>{cvData.contact.location}</span>
                    </div>
                </div>
            </div>
            <div className="absolute top-4 right-4">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
                    <Section title="Profile">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{cvData.profile}</p>
                    </Section>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
                    <Section title="Projects">
                        <div className="space-y-6">
                            {cvData.projects.map((project: Project, index: number) => (
                                <div key={index} className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-darkgray dark:text-gray-100">{project.title}</h3>
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-mainblue hover:underline flex items-center space-x-1 text-sm">
                                                <LinkIcon /> <span>Source Code</span>
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">{project.description}</p>
                                    {project.impact && <p className="text-sm text-mainblue/80 dark:text-mainblue/90 mt-2 italic">"{project.impact}"</p>}
                                    <div className="mt-3">
                                        {project.technologies.map((tech, i) => <SkillBadge key={i} skill={tech} />)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 text-center border-t border-gray-200 dark:border-slate-700">
                            <a href={cvData.contact.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center group space-x-2 text-mainblue dark:text-blue-400 hover:underline font-semibold transition-colors duration-300">
                                <span>Voir plus de projets</span>
                                <div className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1">
                                    <GithubIcon />
                                </div>
                            </a>
                        </div>
                    </Section>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
                    <Section title="Skills">
                        {Object.entries(cvData.skills).map(([category, skills]) => (
                            <div key={category} className="mb-4">
                                <h3 className="font-semibold text-md text-darkgray dark:text-gray-200 mb-2">{category}</h3>
                                <div>
                                    {skills.map((skill, i) => <SkillBadge key={i} skill={skill} />)}
                                </div>
                            </div>
                        ))}
                    </Section>
                </div>
            </div>

            <div className="lg:col-span-1 space-y-8">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
                    <Section title="Professional Experience">
                        <div className="space-y-6">
                            {cvData.experience.map((exp: Experience, index: number) => (
                                <div key={index}>
                                    <h3 className="text-lg font-semibold text-darkgray dark:text-gray-100">{exp.role}</h3>
                                    <p className="font-medium text-mainblue">{exp.company}</p>
                                    <div className="flex items-center space-x-4 text-sm text-lightgray dark:text-gray-400 mt-1">
                                      <span className="flex items-center space-x-1"><CalendarIcon /><span>{exp.period}</span></span>
                                      <span className="flex items-center space-x-1"><LocationIcon /><span>{exp.location}</span></span>
                                    </div>
                                    <ul className="list-disc list-inside mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                        {exp.points.map((point, i) => <li key={i}>{point}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
                    <Section title="Education">
                        <div className="space-y-6">
                            {cvData.education.map((edu: Education, index: number) => (
                                <div key={index}>
                                    <h3 className="text-lg font-semibold text-darkgray dark:text-gray-100">{edu.degree}</h3>
                                    <p className="font-medium text-mainblue">{edu.institution}</p>
                                    <p className="text-sm text-lightgray dark:text-gray-400 mt-1">{edu.period}</p>
                                    <ul className="list-disc list-inside mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                        {edu.details.map((detail, i) => <li key={i}>{detail}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
                    <Section title="Certifications">
                        <div className="space-y-2">
                            {cvData.certifications.map((cert: Certification, index: number) => (
                                <p key={index} className="text-gray-700 dark:text-gray-300 text-sm">
                                    <span className="font-semibold">{cert.name}</span> - <span className="text-gray-500 dark:text-gray-400">{cert.issuer}</span>
                                </p>
                            ))}
                        </div>
                    </Section>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
                    <Section title="Languages">
                        <div className="space-y-4">
                            {cvData.languages.map((lang: Language, index: number) => (
                                <div key={index}>
                                    <div className="flex justify-between items-center mb-1">
                                      <h4 className="font-semibold dark:text-gray-100">{lang.name}</h4>
                                      <RatingCircles rating={lang.rating} />
                                    </div>
                                    <p className="text-sm text-lightgray dark:text-gray-400">{lang.level}</p>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>
            </div>
        </main>
    </div>
  );
};

export default App;
