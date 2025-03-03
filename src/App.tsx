import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('education');
  interface ProjectCardProps {
    title: string;
    date: string;
    description: string;
    imageUrl: string;
    link: string;
    linkType?: 'github' | 'devpost'; // Add linkType prop to differentiate
  }
  
  const ProjectCard: React.FC<ProjectCardProps> = ({ title, date, description, imageUrl, link, linkType = 'github' }) => (
    <div className="bg-gruvbox-light-bg dark:bg-gruvbox-bg rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gruvbox-orange dark:text-gruvbox-orange">{title}</h3>
        <p className="text-sm text-gruvbox-light-gray dark:text-gruvbox-gray mb-2">{date}</p>
        <p className="text-gruvbox-light-fg dark:text-gruvbox-fg mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center text-gruvbox-orange hover:text-gruvbox-red transition-colors">
            {linkType === 'github' ? (
              <>
                <Github size={18} className="mr-1" /> View on GitHub
              </>
            ) : (
              <>
                <ExternalLink size={18} className="mr-1" /> View on Devpost
              </>
            )}
          </a>
        </div>
      </div>
    </div>
  );
  

  // Initialize dark mode based on user preference
  useEffect(() => {
      setDarkMode(true);
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      // Show scroll to top button when user scrolls down 300px
      setShowScrollToTop(window.scrollY > 300);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="font-sans dark:bg-gruvbox-bg dark:text-gruvbox-fg bg-gruvbox-light-bg text-gruvbox-light-fg min-h-screen">
      {/* Navigation */}
<nav className="fixed w-full bg-white dark:bg-gruvbox-bg shadow-md z-50 transition-colors">
  <div className="container mx-auto px-6 py-3 flex justify-between items-center">
    <a href="#home" className="text-2xl font-bold text-gruvbox-orange dark:text-gruvbox-orange" 
       onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
      Pranavi
    </a>

    {/* Desktop Navigation */}
    <div className="hidden md:flex items-center space-x-8">
      {['home', 'about', 'skills', 'publications', 'projects', 'contact'].map((section) => (
        <a
          key={section}
          href={`#${section}`}
          className={`capitalize hover:text-gruvbox-orange dark:hover:text-gruvbox-orange transition-colors ${
            activeSection === section ? 'text-gruvbox-orange dark:text-gruvbox-orange font-semibold' : 'dark:text-gruvbox-fg text-gruvbox-light-fg'
          }`}
          onClick={(e) => { e.preventDefault(); scrollToSection(section); }}
        >
          {section}
        </a>
      ))}

      {/* Dark Mode Toggle */}
      <button 
        onClick={toggleDarkMode} 
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gruvbox-darkgray transition-colors"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={20} className="text-gruvbox-yellow" /> : <Moon size={20} className="text-gruvbox-blue" />}
      </button>
    </div>

    {/* Mobile Navigation Toggle */}
    <div className="md:hidden flex items-center space-x-4">
      {/* Dark Mode Toggle */}
      <button 
        onClick={toggleDarkMode} 
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gruvbox-darkgray transition-colors"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={20} className="text-gruvbox-yellow" /> : <Moon size={20} className="text-gruvbox-blue" />}
      </button>
      
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-gruvbox-light-fg dark:text-gruvbox-fg hover:text-gruvbox-orange dark:hover:text-gruvbox-orange focus:outline-none"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  </div>
  
  {/* Mobile Navigation Menu */}
  {isMenuOpen && (
    <div className="md:hidden bg-white dark:bg-gruvbox-bg py-2 px-4 shadow-inner transition-colors">
      {['home', 'about', 'skills', 'publications', 'projects', 'contact'].map((section) => (
        <a
          key={section}
          href={`#${section}`}
          className={`block py-2 capitalize hover:text-gruvbox-orange dark:hover:text-gruvbox-orange transition-colors ${
            activeSection === section ? 'text-gruvbox-orange dark:text-gruvbox-orange font-semibold' : 'dark:text-gruvbox-fg text-gruvbox-light-fg'
          }`}
          onClick={(e) => { e.preventDefault(); scrollToSection(section); }}
        >
          {section}
        </a>
      ))}
    </div>
  )}
</nav>


      <section id="home" className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-gruvbox-light-bg to-white dark:from-gruvbox-bg dark:to-gruvbox-bg dark:bg-opacity-90 transition-colors">
  <div className="container mx-auto px-6 py-16 md:py-24">
    <div className="flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-12 md:mb-0">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
          Hello, I'm <span className="text-gruvbox-orange dark:text-gruvbox-orange">Sai Pranavi Jeedigunta</span>
        </h1>
        <p className="text-xl md:text-2xl text-gruvbox-light-fg dark:text-gruvbox-fg opacity-80 mb-6">
          Information Systems Graduate Student | Data Engineering, Data Science, Analytics & AI Enthusiast
        </p>

        {/* Buttons */}
        <div className="flex space-x-4 mb-6">
          <button 
            onClick={() => scrollToSection('about')}
            className="bg-gruvbox-orange hover:bg-gruvbox-red text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center"
          >
            Learn More <ChevronDown className="ml-2" size={18} />
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="border-2 border-gruvbox-orange text-gruvbox-orange hover:bg-gruvbox-orange hover:bg-opacity-10 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Contact Me
          </button>
        </div>

        {/* Social Icons Below Buttons */}
        <div className="flex space-x-6">
          <a 
            href="https://linkedin.com/in/pranavijs/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gruvbox-orange hover:text-gruvbox-red transition-colors"
          >
            <Linkedin size={28} />
          </a>
          <a 
            href="https://github.com/SaiPranaviJeedigunta/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gruvbox-orange hover:text-gruvbox-red transition-colors"
          >
            <Github size={28} />
          </a>
          <a 
            href="mailto:jeedigunta.s@northeastern.edu" 
            className="text-gruvbox-orange hover:text-gruvbox-red transition-colors"
          >
            <Mail size={28} />
          </a>
        </div>

      </div>

      {/* Profile Picture */}
      <div className="md:w-1/2 flex justify-center">
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-lg">
          <img 
            src="/profile.jpg" 
            alt="Sai Pranavi Jeedigunta" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</section>


      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gruvbox-bg dark:bg-opacity-95 transition-colors">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gruvbox-light-fg dark:text-gruvbox-fg">About Me</h2>
          
          <div className="flex flex-col md:flex-row gap-12 mb-12">
            {/* Profile Image */}
            <div className="md:w-1/3 flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gruvbox-light-yellow dark:bg-gruvbox-yellow bg-opacity-20 dark:bg-opacity-20 flex items-center justify-center shadow-lg">
              <span className="text-6xl">👩‍💻</span>
              </div>
            </div>
            
            {/* About Text */}
            <div className="md:w-2/3">
              <p className="text-lg leading-relaxed mb-6 text-gruvbox-light-fg dark:text-gruvbox-fg">
                I am a passionate Information Systems graduate student at Northeastern University with a strong background in data science, 
                analytics, and engineering. My expertise spans across various domains including machine learning, data visualization, 
                and big data technologies.
              </p>
              <p className="text-lg leading-relaxed mb-6 text-gruvbox-light-fg dark:text-gruvbox-fg">
                I'm actively seeking opportunities in data engineering, data analytics, and data science roles where I can leverage my 
                technical skills and analytical mindset to drive data-informed decisions and create impactful solutions.
              </p>
              <p className="text-lg leading-relaxed text-gruvbox-light-fg dark:text-gruvbox-fg">
                My approach combines technical expertise with strong communication skills, allowing me to translate complex data insights 
                into actionable business strategies.
              </p>
            </div>
          </div>
          
          {/* Education/Experience Tabs */}
          <div className="mt-12">
            <div className="flex border-b border-gray-200 dark:border-gruvbox-darkgray mb-8">
              <button 
                className={`py-3 px-6 font-medium text-lg ${
                  activeTab === 'education' 
                    ? 'border-b-2 border-gruvbox-orange text-gruvbox-orange' 
                    : 'text-gruvbox-light-fg dark:text-gruvbox-fg hover:text-gruvbox-orange dark:hover:text-gruvbox-orange'
                }`}
                onClick={() => setActiveTab('education')}
              >
                Education
              </button>
              <button 
                className={`py-3 px-6 font-medium text-lg ${
                  activeTab === 'experience' 
                    ? 'border-b-2 border-gruvbox-orange text-gruvbox-orange' 
                    : 'text-gruvbox-light-fg dark:text-gruvbox-fg hover:text-gruvbox-orange dark:hover:text-gruvbox-orange'
                }`}
                onClick={() => setActiveTab('experience')}
              >
                Experience
              </button>
            </div>
            
            {/* Education Content */}
            {activeTab === 'education' && (
              <div className="bg-gruvbox-light-bg dark:bg-gruvbox-bg bg-opacity-50 dark:bg-opacity-50 p-8 rounded-lg shadow-md">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-medium text-gruvbox-orange dark:text-gruvbox-orange">Master of Science in Information Systems</h4>
                    <p className="text-gruvbox-light-fg dark:text-gruvbox-fg">Northeastern University, Boston, MA</p>
                    <p className="text-gruvbox-light-gray dark:text-gruvbox-gray">Expected Dec. 2025</p>
                    <p className="mt-2 text-gruvbox-light-fg dark:text-gruvbox-fg">
                      <strong>Relevant Courses:</strong> Data Science Engineering Methods and Tools, Program Structure and Algorithms, 
                      Big Data Systems and Intelligence Analytics, Data Management and Database Design, User Experience Design and Testing
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-gruvbox-orange dark:text-gruvbox-orange">Bachelor of Technology in Computer Science Engineering</h4>
                    <p className="text-gruvbox-light-fg dark:text-gruvbox-fg">Gokaraju Rangaraju Institute of Engineering and Technology, Hyderabad, India</p>
                    <p className="text-gruvbox-light-gray dark:text-gruvbox-gray">Jun 2023</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Experience Content */}
            {activeTab === 'experience' && (
              <div className="bg-gruvbox-light-bg dark:bg-gruvbox-bg bg-opacity-50 dark:bg-opacity-50 p-8 rounded-lg shadow-md">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-medium text-gruvbox-orange dark:text-gruvbox-orange">Data Science and Analytics Research Assistant</h4>
                    <p className="text-gruvbox-light-fg dark:text-gruvbox-fg">Gokaraju Rangaraju Institute of Engineering and Technology, Hyderabad, India</p>
                    <p className="text-gruvbox-light-gray dark:text-gruvbox-gray">Jan. 2022 – May 2023</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gruvbox-light-fg dark:text-gruvbox-fg">
                      <li>Led a team of 4 in AI-driven research, resulting in a publication at IEEE 2023 ICACCS</li>
                      <li>Automated data collection and annotation via web scraping (BeautifulSoup) and MakeSense.ai and Excel</li>
                      <li>Built Power BI dashboards and Python visualizations to analyze violation trends and model performance metrics</li>
                      <li>Developed real-time violation detection models using YOLOv5, OpenCV, and TensorFlow, improving accuracy by 30% on a dataset of 10,000+ images and videos</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-gruvbox-orange dark:text-gruvbox-orange">Digital Marketing Intern</h4>
                    <p className="text-gruvbox-light-fg dark:text-gruvbox-fg">Indian Institute of Digital Education, Hyderabad, India</p>
                    <p className="text-gruvbox-light-gray dark:text-gruvbox-gray">Sept. 2022 – Nov. 2022</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gruvbox-light-fg dark:text-gruvbox-fg">
                      <li>Analyzed performance metrics with Excel and Google Analytics, troubleshooting SEO issues to increase organic traffic by 15%</li>
                      <li>Created marketing materials with Canva and executed SEM campaigns, improving engagement and brand visibility</li>
                      <li>Prepared reports and presentations using PowerPoint and Word, ensuring clarity and alignment with objectives</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gruvbox-light-bg dark:bg-gruvbox-bg bg-opacity-30 dark:bg-opacity-80 transition-colors">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gruvbox-light-fg dark:text-gruvbox-fg">Technical Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gruvbox-bg dark:bg-opacity-70 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gruvbox-orange dark:text-gruvbox-orange">Programming & Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Java', 'FastAPI', 'Docker', 'REST APIs', 'Keras', 'Jupyter Notebook', 'Terraform'].map(skill => (
                  <span key={skill} className="bg-gruvbox-light-yellow dark:bg-gruvbox-yellow bg-opacity-20 dark:bg-opacity-20 text-gruvbox-light-orange dark:text-gruvbox-orange px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gruvbox-bg dark:bg-opacity-70 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gruvbox-orange dark:text-gruvbox-orange">Database Systems & Data Warehousing</h3>
              <div className="flex flex-wrap gap-2">
                {['SQL', 'MySQL', 'Oracle SQL', 'BigQuery', 'Snowflake', 'NoSQL', 'Pinecone'].map(skill => (
                  <span key={skill} className="bg-gruvbox-light-yellow dark:bg-gruvbox-yellow bg-opacity-20 dark:bg-opacity-20 text-gruvbox-light-orange dark:text-gruvbox-orange px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gruvbox-bg dark:bg-opacity-70 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gruvbox-orange dark:text-gruvbox-orange">Data Analysis and Visualization</h3>
              <div className="flex flex-wrap gap-2">
                {['Power BI', 'Tableau', 'Matplotlib', 'Seaborn', 'Streamlit', 'Pandas', 'GeoPandas', 'Numpy'].map(skill => (
                  <span key={skill} className="bg-gruvbox-light-yellow dark:bg-gruvbox-yellow bg-opacity-20 dark:bg-opacity-20 text-gruvbox-light-orange dark:text-gruvbox-orange px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gruvbox-bg dark:bg-opacity-70 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gruvbox-orange dark:text-gruvbox-orange">Big Data & ETL Tools</h3>
              <div className="flex flex-wrap gap-2">
                {['Apache Spark', 'Kafka', 'GCP Dataflow', 'Apache Airflow', 'LlamaIndex', 'Azure Databricks', 'Talend'].map(skill => (
                  <span key={skill} className="bg-gruvbox-light-yellow dark:bg-gruvbox-yellow bg-opacity-20 dark:bg-opacity-20 text-gruvbox-light-orange dark:text-gruvbox-orange px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gruvbox-bg dark:bg-opacity-70 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gruvbox-orange dark:text-gruvbox-orange">Data Mining & Machine Learning</h3>
              <div className="flex flex-wrap gap-2">
                {['PyTorch', 'Scikit-learn', 'NLP', 'spaCy', 'NLTK', 'BeautifulSoup', 'Selenium', 'TensorFlow'].map(skill => (
                  <span key={skill} className="bg-gruvbox-light-yellow dark:bg-gruvbox-yellow bg-opacity-20 dark:bg-opacity-20 text-gruvbox-light-orange dark:text-gruvbox-orange px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gruvbox-bg dark:bg-opacity-70 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gruvbox-orange dark:text-gruvbox-orange">Cloud Platforms & Version Control</h3>
              <div className="flex flex-wrap gap-2">
                {['Google Cloud Platform (GCP)', 'AWS', 'Azure', 'Git', 'GitHub', 'GitLab', 'Kubernetes'].map(skill => (
                  <span key={skill} className="bg-gruvbox-light-yellow dark:bg-gruvbox-yellow bg-opacity-20 dark:bg-opacity-20 text-gruvbox-light-orange dark:text-gruvbox-orange px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-gruvbox-bg dark:bg-opacity-70 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gruvbox-orange dark:text-gruvbox-orange">Office Productivity</h3>
              <div className="flex flex-wrap gap-2">
                {['MS Office Suite', 'Google Workspace'].map(skill => (
                  <span key={skill} className="bg-gruvbox-light-yellow dark:bg-gruvbox-yellow bg-opacity-20 dark:bg-opacity-20 text-gruvbox-light-orange dark:text-gruvbox-orange px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
{/* Publications Section */}
<section id="publications" className="py-20 bg-white dark:bg-gruvbox-bg dark:bg-opacity-95 transition-colors">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gruvbox-light-fg dark:text-gruvbox-fg">
      Publications
    </h2>

    <div className="flex flex-col md:flex-row items-center bg-gruvbox-light-bg dark:bg-gruvbox-bg bg-opacity-50 dark:bg-opacity-80 p-6 md:p-8 rounded-lg shadow-md">
      {/* Image Section */}
      <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
        <img 
          src="https://plus.unsplash.com/premium_photo-1690958385391-76844034f557?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Traffic Violation Detection" 
          className="rounded-lg shadow-lg w-64 h-64 object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="md:w-2/3 md:pl-6">
        <h3 className="text-xl font-semibold text-gruvbox-orange dark:text-gruvbox-orange mb-2">
          Traffic Rules Violation Detection using YOLO and HAAR Cascade
        </h3>
        <p className="text-gruvbox-light-fg dark:text-gruvbox-fg mb-2"><strong>Publisher:</strong> IEEE</p>
        <p className="text-gruvbox-light-fg dark:text-gruvbox-fg mb-4">
          <strong>Abstract:</strong> This paper presents a real-time traffic violation detection system using 
          YOLOv5 and Haar Cascade to identify violations such as triple riding, not wearing a helmet, 
          over-speeding, and using a phone while driving. The system enhances road monitoring and assists 
          traffic police in enforcing regulations efficiently.
        </p>
        <a 
          href="https://ieeexplore.ieee.org/document/10112954" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-gruvbox-orange hover:text-gruvbox-red transition-colors"
        >
          <ExternalLink size={20} className="mr-2" />
          View Publication
        </a>
      </div>
    </div>
  </div>
</section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-gruvbox-light-bg dark:bg-gruvbox-bg transition-colors">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gruvbox-light-fg dark:text-gruvbox-fg">Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* EduSearch AI */}
            <ProjectCard 
              title="EduSearch AI: Transforming MIT Course Playlists"
              date="Dec. 2024"
              description="Designed a scalable pipeline with OpenAI Whisper for transcript generation, Pinecone for semantic search, and Airflow for automated processing, reducing manual effort by 80%."
              imageUrl="https://images.unsplash.com/photo-1588912914078-2fe5224fd8b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              link="https://github.com/SaiPranaviJeedigunta/EduSearch-AI-Transforming-Course-Playlists-into-Interactive-Learning-Resources.git"
            />

            {/* Multi-Agent RAG Application */}
            <ProjectCard 
              title="Multi-Agent RAG Application"
              date="Dec. 2024"
              description="Created an interactive Streamlit interface supporting 200+ document selections for research, Q&A, and export. Used Docling for document parsing & Pinecone for vector storage."
              imageUrl="https://plus.unsplash.com/premium_photo-1725985758251-b49c6b581d17?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              link="https://github.com/SaiPranaviJeedigunta/Multi-Agent-RAG-Application.git"
            />

            {/* Cloud Resource Management System */}
            <ProjectCard 
              title="Cloud Resource Management System"
              date="Dec. 2024"
              description="Developed an OLTP PL/SQL application to automate cloud resource billing, usage tracking, and allocation, utilizing triggers, stored procedures, and real-time updates."
              imageUrl="https://plus.unsplash.com/premium_photo-1683120968693-9af51578770e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              link="https://github.com/SaiPranaviJeedigunta/Cloud-Resource-Management-System-DAMG6210.git"
            />

            {/* Stock Market Anomaly Detection */}
            <ProjectCard 
              title="Stock Market Anomaly Detection"
              date="Feb. 2025"
              description="Detecting stock market anomalies using AI-driven sentiment analysis and historical data to spot unusual trends and potential risks early."
              imageUrl="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              link="https://devpost.com/software/stock-market-anomaly-detection"
              linkType="devpost"
            />

            {/* Multi-Modal Document Analysis Platform */}
            <ProjectCard 
              title="Multi-Modal Document Analysis Platform"
              date="Oct. 2024"
              description="Built a Streamlit platform for document analysis with 80% faster querying than traditional methods. Used BeautifulSoup, Selenium, GCS bucket, and Snowflake."
              imageUrl="https://plus.unsplash.com/premium_photo-1669658981976-4b72e927a902?q=80&w=3053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              link="https://github.com/SaiPranaviJeedigunta/Multi-Modal-Document-Analysis-Platform"
            />

            {/* Interactive Model Evaluation Framework for GPT-4 */}
            <ProjectCard 
              title="Interactive Model Evaluation Framework for GPT-4"
              date="Sept. 2024"
              description="Built a Streamlit app to evaluate OpenAI models using the GAIA dataset, providing real-time insights and accuracy evaluation."
              imageUrl="https://images.unsplash.com/photo-1737894543912-7991b9070a33?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              link="https://github.com/SaiPranaviJeedigunta/Interactive-Model-Evaluation-Framework-for-GPT-4-using-GAIA-Benchmark.git"
            />


            {/* InsightExtract */}
            <ProjectCard 
              title="InsightExtract: Automated Document Querying"
              date="Sept. 2024"
              description="Developed a query interface using FastAPI backend & OpenAI API for NLP processing, achieving 95% accuracy in document retrieval."
              imageUrl="https://media.istockphoto.com/id/1510163195/photo/dms-online-document-database-and-automated-processes-to-manage-files-document-management.jpg?s=1024x1024&w=is&k=20&c=RyYntKGJcYu61bSOtuu36OjNQnTdvRUyRzCL_rLdXf4="
              link="https://github.com/SaiPranaviJeedigunta/InsightExtract-Automated-Document-Querying.git"
            />

            {/* Impact of Information Revelation in Book Popularity */}
            <ProjectCard 
              title="Impact of Information Revelation in Book Popularity"
              date="July 2024"
              description="Analyzed 5,000+ books using Kullback-Leibler divergence (KLD) and metadata from Project Gutenberg, identifying popularity factors."
              imageUrl="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
              link="https://github.com/SaiPranaviJeedigunta/Impact-of-Information-Relevation-in-Book-Popularity.git"
            />

            {/* Rent Insights Hub */}
            <ProjectCard 
              title="Rent Insights Hub"
              date="May 2024"
              description="Developed a web app to visualize rental data and predict rent prices using machine learning, achieving 85% accuracy."
              imageUrl="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
              link="https://github.com/SaiPranaviJeedigunta/Rent-Price-Prediction.git"
            />

            {/* Fast Food Calorie Prediction */}
            <ProjectCard 
              title="Fast Food Calorie Prediction & Model Interpretability"
              date="April 2024"
              description="Built a machine learning pipeline to predict calorie content using Random Forest and SHAP analysis for interpretability."
              imageUrl="https://images.unsplash.com/photo-1565299507177-b0ac66763828"
              link="https://github.com/SaiPranaviJeedigunta/Fast-Food-Calorie-Prediction-and-Model-Interpretability-Using-ML.git"
            />

            {/* News Recommendation and Summarization */}
            <ProjectCard 
              title="News Recommendation and Summarization"
              date="May 2023"
              description="Developed a content-based news recommendation system using TF-IDF and cosine similarity, analyzing 5,000+ articles."
              imageUrl="https://images.unsplash.com/photo-1504711434969-e33886168f5c"
              link="https://github.com/SaiPranaviJeedigunta/News-Recommendation-and-Summarization.git"
            />

            {/* Traffic Rules Violation Detection */}
            <ProjectCard 
              title="Traffic Rules Violation Detection"
              date="May 2023"
              description="Developed a real-time violation detection system using YOLOv5 and Haar Cascade to identify traffic rule violations."
              imageUrl="https://images.unsplash.com/photo-1505158498176-0150297fbd7d"
              link="https://github.com/SaiPranaviJeedigunta/Traffic-Rules-Violation-Detection.git"
            />

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gruvbox-light-bg dark:bg-gruvbox-bg bg-opacity-30 dark:bg-opacity-80 transition-colors">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gruvbox-light-fg dark:text-gruvbox-fg">
            Get In Touch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gruvbox-orange dark:text-gruvbox-orange">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="text-gruvbox-orange dark:text-gruvbox-orange mr-4" size={24} />
                  <a
                    href="mailto:jeedigunta.s@northeastern.edu"
                    className="text-gruvbox-light-fg dark:text-gruvbox-fg hover:text-gruvbox-orange dark:hover:text-gruvbox-orange transition-colors"
                  >
                    jeedigunta.s@northeastern.edu
                  </a>
                </div>
                <div className="flex items-center">
                  <Linkedin className="text-gruvbox-orange dark:text-gruvbox-orange mr-4" size={24} />
                  <a
                    href="https://linkedin.com/in/pranavijs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gruvbox-light-fg dark:text-gruvbox-fg hover:text-gruvbox-orange dark:hover:text-gruvbox-orange transition-colors"
                  >
                    linkedin.com/in/pranavijs/
                  </a>
                </div>
                <div className="flex items-center">
                  <Github className="text-gruvbox-orange dark:text-gruvbox-orange mr-4" size={24} />
                  <a
                    href="https://github.com/SaiPranaviJeedigunta/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gruvbox-light-fg dark:text-gruvbox-fg hover:text-gruvbox-orange dark:hover:text-gruvbox-orange transition-colors"
                  >
                    github.com/SaiPranaviJeedigunta/
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gruvbox-orange dark:text-gruvbox-orange">
                Send Me a Message
              </h3>
              
              <form
                action="https://formspree.io/f/mzzdnkdz"
                method="POST"
                className="space-y-4"
              >
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-gruvbox-light-fg dark:text-gruvbox-fg mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gruvbox-darkgray rounded-lg focus:outline-none focus:ring-2 focus:ring-gruvbox-orange bg-white dark:bg-gruvbox-bg dark:bg-opacity-50 text-gruvbox-light-fg dark:text-gruvbox-fg"
                    placeholder="Your Name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-gruvbox-light-fg dark:text-gruvbox-fg mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gruvbox-darkgray rounded-lg focus:outline-none focus:ring-2 focus:ring-gruvbox-orange bg-white dark:bg-gruvbox-bg dark:bg-opacity-50 text-gruvbox-light-fg dark:text-gruvbox-fg"
                    placeholder="Your Email"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-gruvbox-light-fg dark:text-gruvbox-fg mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gruvbox-darkgray rounded-lg focus:outline-none focus:ring-2 focus:ring-gruvbox-orange bg-white dark:bg-gruvbox-bg dark:bg-opacity-50 text-gruvbox-light-fg dark:text-gruvbox-fg"
                    placeholder="Your Message"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-gruvbox-orange hover:bg-gruvbox-red text-white font-semibold py-2 px-6 rounded-lg transition-colors w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gruvbox-light-fg dark:bg-gruvbox-bg text-white py-8 transition-colors">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gruvbox-light-bg dark:text-gruvbox-fg">&copy; {new Date().getFullYear()} Sai Pranavi Jeedigunta. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a 
                href="https://linkedin.com/in/pranavijs/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gruvbox-light-bg dark:text-gruvbox-fg hover:text-gruvbox-light-yellow dark:hover:text-gruvbox-yellow transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com/SaiPranaviJeedigunta/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gruvbox-light-bg dark:text-gruvbox-fg hover:text-gruvbox-light-yellow dark:hover:text-gruvbox-yellow transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="mailto:jeedigunta.s@northeastern.edu" 
                className="text-gruvbox-light-bg dark:text-gruvbox-fg hover:text-gruvbox-light-yellow dark:hover:text-gruvbox-yellow transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gruvbox-orange text-white p-3 rounded-full shadow-lg hover:bg-gruvbox-red transition-colors"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;