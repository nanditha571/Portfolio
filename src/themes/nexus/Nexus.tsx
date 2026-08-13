import { motion } from 'framer-motion';
import type { Portfolio } from '@/types/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: 'easeOut' },
  }),
};


export default function Nexus({ data }: { data: Portfolio }) {
  const { personal, about, skills, projects, experience, education, certifications, socials, resume } = data;

  return (
    <div className="relative min-h-screen bg-[#050b14] text-cyan-100 overflow-hidden font-sans">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#050b14] to-[#050b14]" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="relative min-h-screen flex items-center justify-center px-6">
          <div className="max-w-5xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 text-center lg:text-left">
                <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-mono mb-8">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
                  </span>
                  <span>ONLINE — COMMAND CENTER</span>
                </motion.div>
                <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(6,182,212,0.4)]">
                  {personal.firstName} {personal.lastName}
                </motion.h1>
                <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="text-lg sm:text-xl text-cyan-200/70 max-w-2xl mb-10 leading-relaxed">
                  {about.tagline}
                </motion.p>
                <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-4">
                  <a href="#projects" className="relative px-8 py-3.5 rounded-lg bg-cyan-500 text-white font-bold uppercase tracking-wider hover:scale-105 transition-transform" style={{ boxShadow: '0 0 20px rgba(6,182,212,0.5)' }}>Access Projects</a>
                  <a href="#contact" className="px-8 py-3.5 rounded-lg border border-cyan-500/40 text-cyan-300 font-bold uppercase tracking-wider hover:bg-cyan-500/10 transition-colors">Init Contact</a>
                </motion.div>
              </div>
              <div className="hidden lg:flex lg:col-span-4 justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full border border-cyan-500/20 animate-[spin_15s_linear_infinite_reverse]" />
                  <div className="absolute inset-8 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center">
                    <span className="text-4xl font-black text-cyan-300">{personal.firstName[0]}{personal.lastName[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* About */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-8 text-cyan-300" style={{ textShadow: '0 0 20px rgba(6,182,212,0.3)' }}>
              Profile Data
            </motion.h2>
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative p-8 sm:p-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm">
              <p className="text-lg text-cyan-100/80 leading-relaxed">{about.bio}</p>
              <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-24 px-6 bg-cyan-950/10">
          <div className="max-w-5xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 text-cyan-300" style={{ textShadow: '0 0 20px rgba(6,182,212,0.3)' }}>
              Core Modules
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={skill.name} className="group p-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-400/60 transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-cyan-100">{skill.name}</span>
                    {skill.level && <span className="text-cyan-400 text-sm font-mono">{skill.level}%</span>}
                  </div>
                  {skill.level && (
                    <div className="h-1.5 w-full rounded-full bg-cyan-900/40 overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1.2, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ boxShadow: '0 0 10px #06b6d4' }} />
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
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 text-cyan-300" style={{ textShadow: '0 0 20px rgba(6,182,212,0.3)' }}>
              Mission Logs
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={project.id} className="group rounded-2xl border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-xl overflow-hidden hover:border-cyan-400/60 transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-cyan-900/40 to-blue-900/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.2),transparent_70%)] group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-cyan-100 mb-2">{project.title}</h3>
                    <p className="text-cyan-200/60 text-sm leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.stack.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">{tech}</span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors">Access</a>}
                      {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors">Source</a>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="py-24 px-6 bg-cyan-950/10">
          <div className="max-w-4xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 text-cyan-300" style={{ textShadow: '0 0 20px rgba(6,182,212,0.3)' }}>
              Mission History
            </motion.h2>
            <div className="space-y-10">
              {experience.map((job, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={job.id} className="relative pl-8 pb-10 border-l-2 border-cyan-500/30 last:border-l-transparent">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-500 border-4 border-[#050b14]" style={{ boxShadow: '0 0 10px #06b6d4' }} />
                  <span className="text-sm text-cyan-400/70 font-mono">{job.startDate} — {job.current ? 'Present' : job.endDate}</span>
                  <h3 className="text-xl font-bold text-cyan-100 mt-1">{job.role}</h3>
                  <p className="text-cyan-300 font-medium">{job.company}</p>
                  <p className="text-cyan-200/60 mt-2 text-sm leading-relaxed">{job.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 text-cyan-300" style={{ textShadow: '0 0 20px rgba(6,182,212,0.3)' }}>
              Training Records
            </motion.h2>
            <div className="grid gap-6">
              {education.map((edu, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={edu.id} className="p-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
                  <span className="text-sm text-cyan-400/70 font-mono">{edu.startDate} — {edu.endDate}</span>
                  <h3 className="text-xl font-bold text-cyan-100 mt-1">{edu.degree} in {edu.field}</h3>
                  <p className="text-cyan-300 font-medium">{edu.institution}</p>
                  <p className="text-cyan-200/60 mt-2 text-sm">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-24 px-6 bg-cyan-950/10">
          <div className="max-w-4xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 text-cyan-300" style={{ textShadow: '0 0 20px rgba(6,182,212,0.3)' }}>
              Clearances
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {certifications.map((cert, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={cert.id} className="p-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
                  <h3 className="text-lg font-bold text-cyan-100">{cert.name}</h3>
                  <p className="text-cyan-300 text-sm mt-1">{cert.issuer}</p>
                  <span className="text-cyan-400/70 text-xs font-mono mt-2 block">{cert.date}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Socials & Resume */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-8 text-cyan-300" style={{ textShadow: '0 0 20px rgba(6,182,212,0.3)' }}>
              Open Channel
            </motion.h2>
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-4 mb-10">
              {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all font-medium">GitHub</a>}
              {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all font-medium">LinkedIn</a>}
              {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all font-medium">Twitter</a>}
              {socials.email && <a href={`mailto:${socials.email}`} className="px-6 py-3 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all font-medium">Email</a>}
              {socials.website && <a href={socials.website} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all font-medium">Website</a>}
            </motion.div>
            {resume.url && (
              <motion.a custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} href={resume.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 text-white font-bold hover:scale-105 transition-transform" style={{ boxShadow: '0 0 20px rgba(6,182,212,0.5)' }}>
                Download Dossier ({resume.fileName})
              </motion.a>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-cyan-500/10">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-cyan-500/50">
            <span>© {new Date().getFullYear()} {personal.firstName} {personal.lastName}</span>
            <span>Nexus System v2.0 — FolioForge</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
