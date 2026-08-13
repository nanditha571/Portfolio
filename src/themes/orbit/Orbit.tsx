import { motion } from 'framer-motion';
import type { Portfolio } from '@/types/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export default function Orbit({ data }: { data: Portfolio }) {
  const { personal, about, skills, projects, experience, education, certifications, socials, resume } = data;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-200 overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950" />
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stars" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="20" r="1.5" fill="white" opacity="0.6" />
              <circle cx="80" cy="90" r="1" fill="white" opacity="0.4" />
              <circle cx="150" cy="40" r="1.2" fill="white" opacity="0.5" />
              <circle cx="180" cy="160" r="1" fill="white" opacity="0.3" />
              <circle cx="50" cy="150" r="1.5" fill="white" opacity="0.5" />
              <circle cx="120" cy="10" r="0.8" fill="white" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stars)" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="relative min-h-screen flex items-center justify-center px-6">
          <div className="max-w-5xl w-full text-center">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-mono mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Space Portfolio</span>
            </motion.div>
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 bg-gradient-to-r from-blue-300 via-slate-200 to-blue-300 bg-clip-text text-transparent">
              {personal.firstName} {personal.lastName}
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              {about.tagline}
            </motion.p>
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-4 justify-center">
              <a href="#projects" className="px-8 py-3.5 rounded-xl bg-blue-600 text-white font-bold uppercase tracking-wider hover:scale-105 transition-transform shadow-[0_0_30px_rgba(37,99,235,0.4)]">Explore</a>
              <a href="#contact" className="px-8 py-3.5 rounded-xl border border-blue-500/40 text-blue-300 font-bold uppercase tracking-wider hover:bg-blue-500/10 transition-colors">Contact</a>
            </motion.div>
          </div>
        </header>

        {/* About */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-8 text-blue-300">
              About Me
            </motion.h2>
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative p-8 sm:p-10 rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm">
              <p className="text-lg text-slate-300 leading-relaxed">{about.bio}</p>
              <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-24 px-6 bg-blue-950/10">
          <div className="max-w-5xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 text-blue-300">
              Skills
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={skill.name} className="group p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:border-blue-400/60 transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-blue-100">{skill.name}</span>
                    {skill.level && <span className="text-blue-400 text-sm font-mono">{skill.level}%</span>}
                  </div>
                  {skill.level && (
                    <div className="h-1.5 w-full rounded-full bg-blue-900/40 overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1.2, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 text-blue-300">
              Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={project.id} className="group rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-xl overflow-hidden hover:border-blue-400/60 transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-blue-900/40 to-indigo-900/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.2),transparent_70%)] group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-100 mb-2">{project.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.stack.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono">{tech}</span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">Demo</a>}
                      {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">Source</a>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="py-24 px-6 bg-blue-950/10">
          <div className="max-w-4xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 text-blue-300">
              Experience
            </motion.h2>
            <div className="space-y-10">
              {experience.map((job, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={job.id} className="relative pl-8 pb-10 border-l-2 border-blue-500/30 last:border-l-transparent">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-950" />
                  <span className="text-sm text-blue-400/70 font-mono">{job.startDate} — {job.current ? 'Present' : job.endDate}</span>
                  <h3 className="text-xl font-bold text-blue-100 mt-1">{job.role}</h3>
                  <p className="text-blue-300 font-medium">{job.company}</p>
                  <p className="text-slate-400 mt-2 text-sm leading-relaxed">{job.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 text-blue-300">
              Education
            </motion.h2>
            <div className="grid gap-6">
              {education.map((edu, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={edu.id} className="p-6 rounded-xl border border-blue-500/20 bg-blue-500/5">
                  <span className="text-sm text-blue-400/70 font-mono">{edu.startDate} — {edu.endDate}</span>
                  <h3 className="text-xl font-bold text-blue-100 mt-1">{edu.degree} in {edu.field}</h3>
                  <p className="text-blue-300 font-medium">{edu.institution}</p>
                  <p className="text-slate-400 mt-2 text-sm">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-24 px-6 bg-blue-950/10">
          <div className="max-w-4xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 text-blue-300">
              Certifications
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {certifications.map((cert, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={cert.id} className="p-6 rounded-xl border border-blue-500/20 bg-blue-500/5">
                  <h3 className="text-lg font-bold text-blue-100">{cert.name}</h3>
                  <p className="text-blue-300 text-sm mt-1">{cert.issuer}</p>
                  <span className="text-blue-400/70 text-xs font-mono mt-2 block">{cert.date}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Socials & Resume */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-8 text-blue-300">
              Connect
            </motion.h2>
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-4 mb-10">
              {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-all font-medium">GitHub</a>}
              {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-all font-medium">LinkedIn</a>}
              {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-all font-medium">Twitter</a>}
              {socials.email && <a href={`mailto:${socials.email}`} className="px-6 py-3 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-all font-medium">Email</a>}
              {socials.website && <a href={socials.website} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-all font-medium">Website</a>}
            </motion.div>
            {resume.url && (
              <motion.a custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} href={resume.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-bold hover:scale-105 transition-transform shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                Download Resume ({resume.fileName})
              </motion.a>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-blue-500/10">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-blue-500/50">
            <span>© {new Date().getFullYear()} {personal.firstName} {personal.lastName}</span>
            <span>Built with FolioForge</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
