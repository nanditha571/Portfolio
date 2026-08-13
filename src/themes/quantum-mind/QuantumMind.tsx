import { motion } from 'framer-motion';
import type { Portfolio } from '@/types/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const glow = (c: string) => `0 0 20px ${c}55, 0 0 60px ${c}22`;

export default function QuantumMind({ data }: { data: Portfolio }) {
  const { personal, about, skills, projects, experience, education, certifications, socials, resume } = data;

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-slate-300 overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#0a0a0f] to-[#0a0a0f]" />
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#a78bfa" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="relative min-h-screen flex items-center justify-center px-6">
          <div className="max-w-5xl w-full text-center">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-mono mb-8">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span>AI / Research Portfolio</span>
            </motion.div>
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 bg-gradient-to-r from-indigo-300 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
              {personal.firstName} {personal.lastName}
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              {about.tagline}
            </motion.p>
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-4 justify-center">
              <a href="#projects" className="px-8 py-3.5 rounded-lg bg-indigo-500 text-white font-bold uppercase tracking-wider hover:scale-105 transition-transform" style={{ boxShadow: glow('#a78bfa') }}>View Work</a>
              <a href="#contact" className="px-8 py-3.5 rounded-lg border border-indigo-500/40 text-indigo-300 font-bold uppercase tracking-wider hover:bg-indigo-500/10 transition-colors">Contact</a>
            </motion.div>
          </div>
        </header>

        {/* About */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-8 text-indigo-300" style={{ textShadow: glow('#a78bfa') }}>
              About Me
            </motion.h2>
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative p-8 sm:p-10 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-sm">
              <p className="text-lg text-slate-300 leading-relaxed">{about.bio}</p>
              <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-24 px-6 bg-indigo-950/20">
          <div className="max-w-5xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 text-indigo-300" style={{ textShadow: glow('#a78bfa') }}>
              Neural Stack
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={skill.name} className="group p-6 rounded-xl border border-indigo-500/20 bg-indigo-500/5 hover:border-indigo-400/50 transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-indigo-100">{skill.name}</span>
                    {skill.level && <span className="text-indigo-400 text-sm font-mono">{skill.level}%</span>}
                  </div>
                  {skill.level && (
                    <div className="h-1 w-full rounded-full bg-indigo-900/40 overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1.2, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ boxShadow: '0 0 10px #a78bfa' }} />
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
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 text-indigo-300" style={{ textShadow: glow('#a78bfa') }}>
              Research Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={project.id} className="group rounded-2xl border border-indigo-500/20 bg-indigo-500/5 overflow-hidden hover:border-indigo-400/60 transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-indigo-900/60 to-purple-900/60 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(167,139,250,0.2),transparent_70%)] group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-indigo-100 mb-2">{project.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.stack.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">{tech}</span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Paper</a>}
                      {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Code</a>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="py-24 px-6 bg-indigo-950/20">
          <div className="max-w-4xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 text-indigo-300" style={{ textShadow: glow('#a78bfa') }}>
              Experience
            </motion.h2>
            <div className="space-y-10">
              {experience.map((job, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={job.id} className="relative pl-8 pb-10 border-l-2 border-indigo-500/30 last:border-l-transparent">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#0a0a0f]" style={{ boxShadow: '0 0 10px #a78bfa' }} />
                  <span className="text-sm text-indigo-400/70 font-mono">{job.startDate} — {job.current ? 'Present' : job.endDate}</span>
                  <h3 className="text-xl font-bold text-indigo-100 mt-1">{job.role}</h3>
                  <p className="text-indigo-300 font-medium">{job.company}</p>
                  <p className="text-slate-400 mt-2 text-sm leading-relaxed">{job.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 text-indigo-300" style={{ textShadow: glow('#a78bfa') }}>
              Education
            </motion.h2>
            <div className="grid gap-6">
              {education.map((edu, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={edu.id} className="p-6 rounded-xl border border-indigo-500/20 bg-indigo-500/5">
                  <span className="text-sm text-indigo-400/70 font-mono">{edu.startDate} — {edu.endDate}</span>
                  <h3 className="text-xl font-bold text-indigo-100 mt-1">{edu.degree} in {edu.field}</h3>
                  <p className="text-indigo-300 font-medium">{edu.institution}</p>
                  <p className="text-slate-400 mt-2 text-sm">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-24 px-6 bg-indigo-950/20">
          <div className="max-w-4xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 text-indigo-300" style={{ textShadow: glow('#a78bfa') }}>
              Certifications
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {certifications.map((cert, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={cert.id} className="p-6 rounded-xl border border-indigo-500/20 bg-indigo-500/5">
                  <h3 className="text-lg font-bold text-indigo-100">{cert.name}</h3>
                  <p className="text-indigo-300 text-sm mt-1">{cert.issuer}</p>
                  <span className="text-indigo-400/70 text-xs font-mono mt-2 block">{cert.date}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Socials & Resume */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-8 text-indigo-300" style={{ textShadow: glow('#a78bfa') }}>
              Connect
            </motion.h2>
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-4 mb-10">
              {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 transition-all font-medium">GitHub</a>}
              {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 transition-all font-medium">LinkedIn</a>}
              {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 transition-all font-medium">Twitter</a>}
              {socials.email && <a href={`mailto:${socials.email}`} className="px-6 py-3 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 transition-all font-medium">Email</a>}
              {socials.website && <a href={socials.website} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 transition-all font-medium">Website</a>}
            </motion.div>
            {resume.url && (
              <motion.a custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} href={resume.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-500 text-white font-bold hover:scale-105 transition-transform" style={{ boxShadow: glow('#a78bfa') }}>
                Download Resume ({resume.fileName})
              </motion.a>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-indigo-500/10">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-indigo-500/50">
            <span>© {new Date().getFullYear()} {personal.firstName} {personal.lastName}</span>
            <span>Built with FolioForge</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
