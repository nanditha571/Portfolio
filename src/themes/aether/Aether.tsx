import { motion } from 'framer-motion';
import type { Portfolio } from '@/types/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Aether({ data }: { data: Portfolio }) {
  const { personal, about, skills, projects, experience, education, certifications, socials, resume } = data;

  return (
    <div className="relative min-h-screen bg-white text-neutral-900 antialiased">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <header className="pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-36">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="max-w-3xl">
            <p className="text-sm text-neutral-500 font-medium tracking-wide mb-4">{personal.role}</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight mb-6 leading-[1.1]">
              {personal.firstName} <span className="text-neutral-400">{personal.lastName}</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-xl mb-10">{about.tagline}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 px-7 py-3.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors">View Projects</a>
              <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 border border-neutral-200 text-neutral-900 text-sm font-medium rounded-full hover:bg-neutral-50 transition-colors">Contact</a>
            </div>
          </motion.div>
        </header>

        {/* About */}
        <section className="py-20 sm:py-28 border-t border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-4 text-3xl sm:text-4xl font-semibold tracking-tight">
              About
            </motion.h2>
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-8">
              <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">{about.bio}</p>
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-20 sm:py-28 border-t border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-4 text-3xl sm:text-4xl font-semibold tracking-tight">
              Skills
            </motion.h2>
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-100">
                  {skills.map((skill) => (
                  <div key={skill.name} className="bg-white p-6 sm:p-8 group hover:bg-neutral-50 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-base">{skill.name}</span>
                      {skill.level && <span className="text-sm text-neutral-400 font-mono">{skill.level}%</span>}
                    </div>
                    {skill.level && (
                      <div className="h-1 w-full rounded-full bg-neutral-100 overflow-hidden">
                        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: skill.level / 100 }} transition={{ duration: 1.2, ease: 'easeOut' }} className="h-full rounded-full bg-neutral-900 origin-left" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 sm:py-28 border-t border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-4 text-3xl sm:text-4xl font-semibold tracking-tight">
              Projects
            </motion.h2>
            <motion.p custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-8 text-neutral-600 text-lg leading-relaxed">
              A selection of projects that define my approach to design and engineering.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={project.id} className="group rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200" />
                  )}
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    {project.featured && <span className="text-xs text-neutral-400 font-mono">Featured</span>}
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-5">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-full">{tech}</span>
                    ))}
                  </div>
                  <div className="flex gap-5">
                    {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-sm font-medium border-b border-neutral-300 pb-0.5 hover:border-neutral-900 transition-colors">Live Site</a>}
                    {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-sm font-medium border-b border-neutral-300 pb-0.5 hover:border-neutral-900 transition-colors">GitHub</a>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="py-20 sm:py-28 border-t border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-12">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-4 text-3xl sm:text-4xl font-semibold tracking-tight">
              Experience
            </motion.h2>
          </div>
          <div className="lg:pl-8 space-y-0">
            {experience.map((job, i) => (
              <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={job.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-8 py-10 border-b border-neutral-100 last:border-b-0">
                <div className="sm:col-span-3">
                  <span className="text-sm text-neutral-500 font-mono">{job.startDate} — {job.current ? 'Present' : job.endDate}</span>
                </div>
                <div className="sm:col-span-9">
                  <h3 className="text-xl font-semibold">{job.role}</h3>
                  <p className="text-neutral-500 mt-1">{job.company}</p>
                  <p className="text-neutral-600 mt-4 leading-relaxed">{job.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="py-20 sm:py-28 border-t border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-12">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-4 text-3xl sm:text-4xl font-semibold tracking-tight">
              Education
            </motion.h2>
          </div>
          <div className="lg:pl-8 space-y-0">
            {education.map((edu, i) => (
              <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={edu.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-8 py-10 border-b border-neutral-100 last:border-b-0">
                <div className="sm:col-span-3">
                  <span className="text-sm text-neutral-500 font-mono">{edu.startDate} — {edu.endDate}</span>
                </div>
                <div className="sm:col-span-9">
                  <h3 className="text-xl font-semibold">{edu.degree} in {edu.field}</h3>
                  <p className="text-neutral-500 mt-1">{edu.institution}</p>
                  <p className="text-neutral-600 mt-4 leading-relaxed">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 sm:py-28 border-t border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-12">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-4 text-3xl sm:text-4xl font-semibold tracking-tight">
              Certifications
            </motion.h2>
          </div>
          <div className="lg:pl-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={cert.id} className="p-6 sm:p-8 rounded-2xl border border-neutral-100 hover:border-neutral-200 hover:shadow-lg transition-all">
                <span className="text-xs text-neutral-400 font-mono block mb-3">{cert.date}</span>
                <h3 className="text-base font-semibold leading-snug">{cert.name}</h3>
                <p className="text-sm text-neutral-500 mt-2">{cert.issuer}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Socials & Resume */}
        <section id="contact" className="py-24 sm:py-32 border-t border-neutral-100 text-center">
          <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
            Get in Touch
          </motion.h2>
          <motion.p custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-neutral-600 text-lg max-w-lg mx-auto mb-10">
            I am currently open to new opportunities and collaborations.
          </motion.p>
          <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-3 mb-10">
            {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="px-6 py-3 border border-neutral-200 rounded-full text-sm font-medium hover:bg-neutral-50 transition-colors">GitHub</a>}
            {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="px-6 py-3 border border-neutral-200 rounded-full text-sm font-medium hover:bg-neutral-50 transition-colors">LinkedIn</a>}
            {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="px-6 py-3 border border-neutral-200 rounded-full text-sm font-medium hover:bg-neutral-50 transition-colors">Twitter</a>}
            {socials.email && <a href={`mailto:${socials.email}`} className="px-6 py-3 border border-neutral-200 rounded-full text-sm font-medium hover:bg-neutral-50 transition-colors">Email</a>}
            {socials.website && <a href={socials.website} target="_blank" rel="noreferrer" className="px-6 py-3 border border-neutral-200 rounded-full text-sm font-medium hover:bg-neutral-50 transition-colors">Website</a>}
          </motion.div>
          {resume.url && (
            <motion.a custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} href={resume.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors">
              Download Resume — {resume.fileName}
            </motion.a>
          )}
        </section>

        {/* Footer */}
        <footer className="py-10 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-neutral-400">
          <span>© {new Date().getFullYear()} {personal.firstName} {personal.lastName}</span>
          <span>Designed with precision.</span>
        </footer>
      </div>
    </div>
  );
}
