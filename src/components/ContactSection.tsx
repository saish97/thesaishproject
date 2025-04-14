'use client';

import { FormEvent, useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function ContactSection() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      // You could replace this with an actual API call
      // Example: const response = await fetch('/api/contact', { 
      //   method: 'POST', 
      //   headers: { 'Content-Type': 'application/json' }, 
      //   body: JSON.stringify(formData) 
      // });
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful submission
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  return (
    <section className="py-15 px-4 sm:px-6 lg:px-8 bg-gray-300 dark:bg-gray-700" id="contact">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-600 dark:text-gray-300">let's connect.</h2>
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 text-gray-600 dark:text-gray-300 focus:ring-teal-500 outline-none transition-all"
                  required
                  disabled={formStatus === 'submitting'}
                  aria-label="Your name"
                />
              </div>
              <div className="space-y-2">
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  required
                  disabled={formStatus === 'submitting'}
                  aria-label="Your email address"
                />
              </div>
              <div className="space-y-2">
                <textarea
                  id="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  required
                  disabled={formStatus === 'submitting'}
                  aria-label="Your message"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-teal-600 text-gray-50 dark:text-gray-300 hover:bg-teal-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={formStatus === 'submitting'}
                aria-label="Send message"
              >
                {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              {formStatus === 'success' && (
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400" role="alert">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {formStatus === 'error' && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400" role="alert">
                  Failed to send message. Please try again or contact me directly via email.
                </div>
              )}
            </form>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-6 text-gray-600 dark:text-gray-300">find me on</h3>
            <div className="space-y-4">
              <SocialLink
                href="https://github.com/saish97"
                icon={<GitHubIcon />}
                label="GitHub"
              />
              <SocialLink
                href="https://linkedin.com/in/saishgaonkar/"
                icon={<LinkedInIcon />}
                label="LinkedIn"
              />
              <SocialLink
                href="mailto:saishgaonkar97@gmail.com"
                icon={<EmailIcon />}
                label="Email"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300 transition-colors"
      tabIndex={0}
      aria-label={`Visit ${label}`}
    >
      {icon}
      {label}
    </a>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}