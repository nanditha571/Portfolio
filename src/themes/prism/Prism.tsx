import { motion } from 'framer-motion';
import type { Portfolio } from '@/types/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const prismGlow = (c: string) => `0 0 20px ${c}44, 0 0 60px ${c}22`;

export default function Prism({ data }: { data: Portfolio }) {
  const { personal, about, skills, projects, experience, education, certifications, socials, resume } = data;

  return (
    <div className="relative min-h-screen bg-[#0f0b2e] text-white overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-purple-500/30 to-transparent rounded-full blur-[100px] rotate-45" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="relative min-h-screen flex items-center justify-center px-6">
          <div className="max-w-5xl w-full text-center">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="inline-block mb-6">
              <span className="relative px-4 py-1.5 rounded-full border border-purple-400/30 bg-white/5 text-purple-200 text-sm font-medium tracking-widest uppercase backdrop-blur-sm">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-pink-500/20 blur-xl" />
                {personal.role}
              </span>
            </motion.div>
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6 bg-gradient-to-r from-indigo-300 via-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              {personal.firstName} {personal.lastName}
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="text-lg sm:text-xl text-purple-200/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              {about.tagline}
            </motion.p>
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-4 justify-center">
              <a href="#projects" className="relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold uppercase tracking-wider hover:scale-105 transition-transform" style={{ boxShadow: prismGlow('#c084fc') }}>View Work</a>
              <a href="#contact" className="px-8 py-3.5 rounded-xl border border-purple-400/40 text-purple-200 font-bold uppercase tracking-wider hover:bg-white/10 transition-colors backdrop-blur-sm">Contact</a>
            </motion.div>
          </div>
        </header>

        {/* About */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent">
              About Me
            </motion.h2>
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative p-8 sm:p-10 rounded-2xl border border-purple-500/20 bg-white/5 backdrop-blur-xl">
              <p className="text-lg text-purple-100/80 leading-relaxed">{about.bio}</p>
              <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent">
              Skills
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={skill.name} className="group p-6 rounded-xl border border-purple-500/20 bg-white/5 backdrop-blur-sm hover:border-purple-400/60 transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-purple-100">{skill.name}</span>
                    {skill.level && <span className="text-purple-300 text-sm font-mono">{skill.level}%</span>}
                  </div>
                  {skill.level && (
                    <div className="h-1.5 w-full rounded-full bg-purple-900/40 overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1.2, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" style={{ boxShadow: '0 0 10px #c084fc' }} />
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
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent">
              Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={project.id} className="group rounded-2xl border border-purple-500/20 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-purple-400/60 transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-pink-900/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(192,132,252,0.2),transparent_70%)] group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-purple-100 mb-2">{project.title}</h3>
                    <p className="text-purple-200/60 text-sm leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.stack.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs font-mono">{tech}</span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-sm text-purple-400 hover:text-pink-300 font-medium transition-colors">Demo</a>}
                      {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-sm text-purple-400 hover:text-pink-300 font-medium transition-colors">Source</a>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent">
              Experience
            </motion.h2>
            <div className="space-y-10">
              {experience.map((job, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={job.id} className="relative pl-8 pb-10 border-l-2 border-purple-500/30 last:border-l-transparent">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-400 to-pink-400 border-4 border-[#0f0b2e]" style={{ boxShadow: '0 0 10px #c084fc' }} />
                  <span className="text-sm text-purple-400/70 font-mono">{job.startDate} — {job.current ? 'Present' : job.endDate}</span>
                  <h3 className="text-xl font-bold text-purple-100 mt-1">{job.role}</h3>
                  <p className="text-purple-300 font-medium">{job.company}</p>
                  <p className="text-purple-200/60 mt-2 text-sm leading-relaxed">{job.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent">
              Education
            </motion.h2>
            <div className="grid gap-6">
              {education.map((edu, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={edu.id} className="p-6 rounded-xl border border-purple-500/20 bg-white/5">
                  <span className="text-sm text-purple-400/70 font-mono">{edu.startDate} — {edu.endDate}</span>
                  <h3 className="text-xl font-bold text-purple-100 mt-1">{edu.degree} in {edu.field}</h3>
                  <p className="text-purple-300 font-medium">{edu.institution}</p>
                  <p className="text-purple-200/60 mt-2 text-sm">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-12 bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent">
              Certifications
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {certifications.map((cert, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={cert.id} className="p-6 rounded-xl border border-purple-500/20 bg-white/5">
                  <h3 className="text-lg font-bold text-purple-100">{cert.name}</h3>
                  <p className="text-purple-300 text-sm mt-1">{cert.issuer}</p>
                  <span className="text-purple-400/70 text-xs font-mono mt-2 block">{cert.date}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Socials & Resume */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent">
              Connect
            </motion.h2>
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-4 mb-10">
              {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-purple-500/30 bg-white/5 text-purple-200 hover:bg-white/10 transition-all font-medium backdrop-blur-sm">GitHub</a>}
              {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-purple-500/30 bg-white/5 text-purple-200 hover:bg-white/10 transition-all font-medium backdrop-blur-sm">LinkedIn</a>}
              {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-purple-500/30 bg-white/5 text-purple-200 hover:bg-white/10 transition-all font-medium backdrop-blur-sm">Twitter</a>}
              {socials.email && <a href={`mailto:${socials.email}`} className="px-6 py-3 rounded-lg border border-purple-500/30 bg-white/5 text-purple-200 hover:bg-white/10 transition-all font-medium backdrop-blur-sm">Email</a>}
              {socials.website && <a href={socials.website} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-lg border border-purple-500/30 bg-white/5 text-purple-200 hover:bg-white/10 transition-all font-medium backdrop-blur-sm">Website</a>}
            </motion.div>
            {resume.url && (
              <motion.a custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} href={resume.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold hover:scale-105 transition-transform" style={{ boxShadow: prismGlow('#c084fc') }}>
                Download Resume ({resume.fileName})
              </motion.a>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-purple-500/10">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-purple-500/50">
            <span>© {new Date().getFullYear()} {personal.firstName} {personal.lastName}</span>
            <span>Built with FolioForge</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
