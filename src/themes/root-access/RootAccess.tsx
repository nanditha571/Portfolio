import { motion } from 'framer-motion';
import type { Portfolio } from '@/types/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
};

export default function RootAccess({ data }: { data: Portfolio }) {
  const { personal, about, skills, projects, experience, education, certifications, socials, resume } = data;

  return (
    <div className="relative min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.15),transparent_60%)]" />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(34,197,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.3) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="relative z-10">
        {/* Header */}
        <header className="relative min-h-screen flex items-center justify-center px-6">
          <div className="max-w-4xl w-full text-center">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="text-green-500/60 text-sm mb-6">
              {'>'} initializing portfolio...
            </motion.div>
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="text-green-500/60 text-sm mb-8">
              {'>'} loading {personal.firstName}_{personal.lastName}.profile
            </motion.div>
            <motion.h1 custom={2} variants={fadeUp} initial="hidden" animate="visible" className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 text-green-300" style={{ textShadow: '0 0 20px rgba(34,197,94,0.5)' }}>
              {personal.firstName} {personal.lastName}
            </motion.h1>
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="text-green-500/80 text-base sm:text-lg mb-10">
              <span className="text-green-600">$</span> cat role.txt
              <br />
              <span className="text-green-300">{personal.role}</span>
            </motion.div>
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-4 justify-center">
              <a href="#projects" className="px-8 py-3.5 rounded bg-green-500 text-black font-bold uppercase tracking-wider hover:scale-105 transition-transform" style={{ boxShadow: '0 0 15px rgba(34,197,94,0.4)' }}>./projects</a>
              <a href="#contact" className="px-8 py-3.5 rounded border border-green-500/40 text-green-300 font-bold uppercase tracking-wider hover:bg-green-500/10 transition-colors">./contact</a>
            </motion.div>
          </div>
        </header>

        {/* About */}
        <section className="py-20 px-6 border-t border-green-500/10">
          <div className="max-w-4xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-2xl sm:text-3xl font-bold mb-8 text-green-300">
              {'>'} cat about.md
            </motion.h2>
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-green-500/5 border border-green-500/20 rounded-lg p-6 sm:p-8">
              <p className="text-green-200/80 leading-relaxed whitespace-pre-wrap">{about.bio}</p>
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-20 px-6 bg-green-500/[0.02]">
          <div className="max-w-4xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-2xl sm:text-3xl font-bold mb-8 text-green-300">
              {'>'} ls -la skills/
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={skill.name} className="border border-green-500/20 bg-green-500/5 p-4 rounded hover:border-green-400/60 transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-300 font-semibold">{skill.name}</span>
                    {skill.level && <span className="text-green-500/70 text-xs">{skill.level}%</span>}
                  </div>
                  {skill.level && (
                    <div className="h-1 w-full rounded-full bg-green-900/40 overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1.2, ease: 'easeOut' }} className="h-full rounded-full bg-green-500" style={{ boxShadow: '0 0 8px rgba(34,197,94,0.6)' }} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-2xl sm:text-3xl font-bold mb-8 text-green-300">
              {'>'} ./projects --list
            </motion.h2>
            <div className="space-y-6">
              {projects.map((project, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={project.id} className="border border-green-500/20 bg-green-500/5 p-6 sm:p-8 rounded hover:border-green-400/60 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-600">$</span>
                        <h3 className="text-xl font-bold text-green-200">{project.title}</h3>
                      </div>
                      <p className="text-green-200/60 text-sm leading-relaxed mb-4 pl-5">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4 pl-5">
                        {project.stack.map((tech) => (
                          <span key={tech} className="px-2.5 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-xs">{tech}</span>
                        ))}
                      </div>
                      <div className="flex gap-4 pl-5">
                        {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-sm text-green-400 hover:text-green-300 underline underline-offset-4 decoration-green-500/30 hover:decoration-green-300 transition-all">[demo]</a>}
                        {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-sm text-green-400 hover:text-green-300 underline underline-offset-4 decoration-green-500/30 hover:decoration-green-300 transition-all">[repo]</a>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="py-20 px-6 bg-green-500/[0.02] border-t border-green-500/10">
          <div className="max-w-4xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-2xl sm:text-3xl font-bold mb-8 text-green-300">
              {'>'} cat experience.log
            </motion.h2>
            <div className="space-y-6">
              {experience.map((job, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={job.id} className="border-l-2 border-green-500/30 pl-6 pb-6 last:border-l-transparent">
                  <span className="text-green-600 text-sm block mb-1">[{job.startDate} — {job.current ? 'Present' : job.endDate}]</span>
                  <h3 className="text-xl font-bold text-green-200">{job.role}</h3>
                  <p className="text-green-400 font-medium">{job.company}</p>
                  <p className="text-green-200/60 mt-2 text-sm leading-relaxed">{job.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-2xl sm:text-3xl font-bold mb-8 text-green-300">
              {'>'} cat education.cfg
            </motion.h2>
            <div className="space-y-6">
              {education.map((edu, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={edu.id} className="border border-green-500/20 bg-green-500/5 p-6 rounded">
                  <span className="text-green-600 text-sm block mb-1">[{edu.startDate} — {edu.endDate}]</span>
                  <h3 className="text-xl font-bold text-green-200">{edu.degree} in {edu.field}</h3>
                  <p className="text-green-400 font-medium">{edu.institution}</p>
                  <p className="text-green-200/60 mt-2 text-sm">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 px-6 bg-green-500/[0.02] border-t border-green-500/10">
          <div className="max-w-4xl mx-auto">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-2xl sm:text-3xl font-bold mb-8 text-green-300">
              {'>'} ls -la certs/
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {certifications.map((cert, i) => (
                <motion.div custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={cert.id} className="border border-green-500/20 bg-green-500/5 p-5 rounded hover:border-green-400/60 transition-all">
                  <h3 className="text-lg font-bold text-green-200">{cert.name}</h3>
                  <p className="text-green-400 text-sm mt-1">{cert.issuer}</p>
                  <span className="text-green-600 text-xs font-mono mt-2 block">{cert.date}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Socials & Resume */}
        <section id="contact" className="py-20 px-6 border-t border-green-500/10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-2xl sm:text-3xl font-bold mb-8 text-green-300">
              {'>'} whoami
            </motion.h2>
            <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-4 mb-10">
               {socials.github && <a href={socials.github} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded border border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500/20 transition-all text-sm">github.com/{personal.firstName}{personal.lastName}</a>}
               {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded border border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500/20 transition-all text-sm">linkedin.com/in/{personal.firstName}-{personal.lastName}</a>}
               {socials.twitter && <a href={socials.twitter} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded border border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500/20 transition-all text-sm">x.com/{personal.firstName}{personal.lastName}</a>}
              {socials.email && <a href={`mailto:${socials.email}`} className="px-5 py-2.5 rounded border border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500/20 transition-all text-sm">{socials.email}</a>}
              {socials.website && <a href={socials.website} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded border border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500/20 transition-all text-sm">{socials.website}</a>}
            </motion.div>
            {resume.url && (
              <motion.a custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} href={resume.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded bg-green-500 text-black font-bold hover:scale-105 transition-transform text-sm" style={{ boxShadow: '0 0 15px rgba(34,197,94,0.4)' }}>
                {'>'} ./download_resume.sh ({resume.fileName})
              </motion.a>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-green-500/10">
          <div className="max-w-4xl mx-auto text-center text-sm text-green-500/40">
            <span>© {new Date().getFullYear()} {personal.firstName} {personal.lastName} — root@folioforge:~$</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
