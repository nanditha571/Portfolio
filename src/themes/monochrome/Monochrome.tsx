import { motion } from 'framer-motion';
import type { Portfolio } from '@/types/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Monochrome({ data }: { data: Portfolio }) {
  const { personal, about, skills, projects, experience, education, certifications, socials, resume } = data;

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-serif antialiased">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <header className="pt-24 pb-20 sm:pt-32 sm:pb-28">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-neutral-900 text-white flex items-center justify-center text-4xl sm:text-5xl font-bold tracking-tight shrink-0 overflow-hidden">
              {personal.avatar ? (
                <img src={personal.avatar} alt="" className="w-full h-full object-cover opacity-90" />
              ) : (
                `${personal.firstName[0]}${personal.lastName[0]}`
              )}
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs font-sans font-semibold tracking-[0.3em] uppercase text-neutral-500 mb-3">{personal.role}</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
                {personal.firstName} <span className="text-neutral-400">{personal.lastName}</span>
              </h1>
              <p className="text-neutral-600 font-sans text-base sm:text-lg max-w-md">{about.tagline}</p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                <a href="#projects" className="inline-block px-6 py-3 bg-neutral-900 text-white text-sm font-sans font-semibold tracking-wide uppercase hover:bg-neutral-800 transition-colors">Portfolio</a>
                <a href="#contact" className="inline-block px-6 py-3 border border-neutral-300 text-neutral-900 text-sm font-sans font-semibold tracking-wide uppercase hover:bg-neutral-50 transition-colors">Contact</a>
              </div>
            </div>
          </motion.div>
        </header>

        {/* About */}
        <section className="py-20 border-t border-neutral-200">
          <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-10 tracking-tight">
            About
          </motion.h2>
          <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-2xl">
            <p className="text-lg sm:text-xl leading-relaxed text-neutral-700">{about.bio}</p>
          </motion.div>
        </section>

        {/* Skills */}
        <section className="py-20 border-t border-neutral-200">
          <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-10 tracking-tight">
            Expertise
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {skills.map((skill, i) => (
              <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={skill.name} className="group">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-semibold text-base tracking-wide">{skill.name}</span>
                  {skill.level && <span className="text-xs font-sans text-neutral-400">{skill.level}%</span>}
                </div>
                {skill.level && (
                  <div className="h-px w-full bg-neutral-200 relative">
                    <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: skill.level / 100 }} transition={{ duration: 1.2, ease: 'easeOut' }} className="h-full bg-neutral-900 origin-left" />
                  </div>
                )}
                {skill.category && <span className="text-xs text-neutral-400 mt-1.5 block font-sans uppercase tracking-widest">{skill.category}</span>}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 border-t border-neutral-200">
          <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 tracking-tight">
            Selected Work
          </motion.h2>
          <div className="space-y-16">
            {projects.map((project, i) => (
              <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={project.id} className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 ${i % 2 === 1 ? 'md:text-right' : ''}`}>
                <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300" />
                    )}
                  </div>
                </div>
                <div className={`md:col-span-7 flex flex-col justify-center ${i % 2 === 1 ? 'md:items-end md:text-right' : ''}`}>
                  <span className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-2">{project.featured ? 'Featured' : 'Project'}</span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">{project.title}</h3>
                  <p className="text-neutral-600 leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-sans tracking-wide">{tech}</span>
                    ))}
                  </div>
                  <div className="flex gap-6">
                    {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold border-b border-neutral-900 pb-0.5 hover:border-neutral-500 transition-colors">Live Site</a>}
                    {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold border-b border-neutral-900 pb-0.5 hover:border-neutral-500 transition-colors">GitHub</a>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="py-20 border-t border-neutral-200">
          <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 tracking-tight">
            Experience
          </motion.h2>
          <div className="space-y-0">
            {experience.map((job, i) => (
              <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={job.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 py-8 border-b border-neutral-200 last:border-b-0">
                <div className="sm:col-span-3">
                  <span className="text-sm font-sans text-neutral-500 tracking-wide">{job.startDate} — {job.current ? 'Present' : job.endDate}</span>
                </div>
                <div className="sm:col-span-9">
                  <h3 className="text-xl font-bold">{job.role}</h3>
                  <p className="text-neutral-500 font-medium mt-1">{job.company}</p>
                  <p className="text-neutral-600 mt-3 leading-relaxed">{job.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="py-20 border-t border-neutral-200">
          <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 tracking-tight">
            Education
          </motion.h2>
          <div className="space-y-0">
            {education.map((edu, i) => (
              <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={edu.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 py-8 border-b border-neutral-200 last:border-b-0">
                <div className="sm:col-span-3">
                  <span className="text-sm font-sans text-neutral-500 tracking-wide">{edu.startDate} — {edu.endDate}</span>
                </div>
                <div className="sm:col-span-9">
                  <h3 className="text-xl font-bold">{edu.degree} in {edu.field}</h3>
                  <p className="text-neutral-500 font-medium mt-1">{edu.institution}</p>
                  <p className="text-neutral-600 mt-3 leading-relaxed">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 border-t border-neutral-200">
          <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 tracking-tight">
            Certifications
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-px bg-neutral-200 border border-neutral-200">
            {certifications.map((cert, i) => (
              <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={cert.id} className="bg-white p-8 group hover:bg-neutral-50 transition-colors">
                <span className="text-xs font-sans text-neutral-400 tracking-widest uppercase block mb-2">{cert.date}</span>
                <h3 className="text-lg font-bold">{cert.name}</h3>
                <p className="text-neutral-500 text-sm mt-1">{cert.issuer}</p>
                {cert.url && <a href={cert.url} target="_blank" rel="noreferrer" className="inline-block mt-3 text-sm font-semibold border-b border-neutral-900 pb-0.5 hover:border-neutral-500 transition-colors">Verify</a>}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Socials & Resume */}
        <section id="contact" className="py-24 border-t border-neutral-200 text-center">
          <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight">
            Get in Touch
          </motion.h2>
          <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-4 mb-10">
            {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="px-6 py-3 border border-neutral-300 text-sm font-sans font-semibold tracking-wide uppercase hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all">GitHub</a>}
            {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="px-6 py-3 border border-neutral-300 text-sm font-sans font-semibold tracking-wide uppercase hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all">LinkedIn</a>}
            {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="px-6 py-3 border border-neutral-300 text-sm font-sans font-semibold tracking-wide uppercase hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all">Twitter</a>}
            {socials.email && <a href={`mailto:${socials.email}`} className="px-6 py-3 border border-neutral-300 text-sm font-sans font-semibold tracking-wide uppercase hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all">Email</a>}
            {socials.website && <a href={socials.website} target="_blank" rel="noreferrer" className="px-6 py-3 border border-neutral-300 text-sm font-sans font-semibold tracking-wide uppercase hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all">Website</a>}
          </motion.div>
          {resume.url && (
            <motion.a custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} href={resume.url} target="_blank" rel="noreferrer" className="inline-block px-8 py-3 bg-neutral-900 text-white text-sm font-sans font-semibold tracking-wide uppercase hover:bg-neutral-800 transition-colors">
              Resume — {resume.fileName}
            </motion.a>
          )}
        </section>

        {/* Footer */}
        <footer className="py-10 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-neutral-400 font-sans">
          <span>© {new Date().getFullYear()} {personal.firstName} {personal.lastName}</span>
          <span>Crafted with precision</span>
        </footer>
      </div>
    </div>
  );
}
