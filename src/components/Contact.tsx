import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  Mail,
  Copy,
  Check,
  Github,
  Linkedin,
  Send,
  Loader,
  MapPin,
  Clock,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSoundEffects } from '../hooks/useSoundEffects';

export const RECIPIENT_EMAIL = 'basavarajsk2004@gmail.com';

// Fully typed TypeScript interfaces
export type ContactFormState = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactFormInputs {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Floating Magnetic Social Link with hover glow micro-interaction
function MagneticSocialLink({
  href,
  icon: Icon,
  label,
  subLabel,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  subLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:border-indigo-500/50 hover:bg-indigo-500/10 text-zinc-300 hover:text-white transition-all duration-200 shadow-lg flex items-center gap-3.5 cursor-pointer group hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]"
    >
      <div className="w-10 h-10 rounded-xl bg-surface-0/80 border border-zinc-800 flex items-center justify-center text-theme group-hover:scale-110 group-hover:border-theme/40 transition-all">
        <Icon className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
      </div>
      <div>
        <span className="text-xs font-mono font-bold text-white block group-hover:text-indigo-200 transition-colors">
          {label}
        </span>
        {subLabel && (
          <span className="text-[11px] font-mono text-zinc-500 block">
            {subLabel}
          </span>
        )}
      </div>
      <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-auto" />
    </motion.a>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<ContactFormState>('idle');
  const [form, setForm] = useState<ContactFormInputs>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [deliveryNote, setDeliveryNote] = useState<string>('');

  const { playClick, playKeypress, playSuccess } = useSoundEffects();

  // One-Click Email Copy Pill with tooltip state
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(RECIPIENT_EMAIL);
      setCopied(true);
      playClick();
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // fallback
    }
  };

  // Strict Form Validation
  const validate = (): boolean => {
    const err: ContactFormErrors = {};
    if (!form.name.trim()) {
      err.name = 'Please provide your full name.';
    }
    if (!form.email.trim()) {
      err.email = 'Please provide your email address.';
    } else if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      err.email = 'Please provide a valid email format (e.g., name@domain.com).';
    }
    if (!form.message.trim()) {
      err.message = 'Please write your message or project inquiry.';
    } else if (form.message.trim().length < 8) {
      err.message = 'Message must be at least 8 characters long.';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Real Email Dispatch via Direct Fetch POST
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!validate()) {
      return;
    }

    setFormState('submitting');
    setErrorMessage('');
    setDeliveryNote('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() || '';

    try {
      let success = false;
      let apiMessage = '';

      // 1. If Web3Forms access key is configured, use Web3Forms
      if (accessKey) {
        const web3formsPayload = {
          access_key: accessKey,
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          subject: 'New Portfolio Message from Basavaraj-SK Site',
          from_name: form.name.trim() || 'Portfolio Visitor',
          to_email: RECIPIENT_EMAIL,
          timestamp: new Date().toISOString(),
          botcheck: false,
        };

        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(web3formsPayload),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          success = true;
          apiMessage = data.message || 'Delivered via Web3Forms';
        } else {
          apiMessage = data.message || 'Web3Forms returned an error.';
        }
      }

      // 2. If no Web3Forms access key or if Web3Forms was bypassed, dispatch directly to FormSubmit.co
      // FormSubmit requires zero API keys and delivers straight to basavarajsk2004@gmail.com!
      if (!success) {
        const formSubmitPayload = {
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          _subject: 'New Portfolio Message from Basavaraj-SK Site',
          _captcha: 'false',
          _template: 'table',
          _replyto: form.email.trim(),
          timestamp: new Date().toLocaleString(),
        };

        const fsRes = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formSubmitPayload),
        });

        const fsData = await fsRes.json();
        if (fsRes.ok && (fsData.success === 'true' || fsData.success === true || fsData.message)) {
          success = true;
          apiMessage = fsData.message || 'Delivered to basavarajsk2004@gmail.com';
          setDeliveryNote(
            'Delivered directly to ' +
              RECIPIENT_EMAIL +
              '. (Note: If this is your very first test submission, check your inbox or spam for FormSubmit activation).'
          );
        } else {
          apiMessage = fsData.message || 'Email delivery failed.';
        }
      }

      if (success) {
        playSuccess();
        confetti({
          particleCount: 110,
          spread: 75,
          origin: { y: 0.7 },
          colors: ['#6366f1', '#a855f7', '#10b981', '#38bdf8', '#fbbf24'],
        });
        setFormState('success');
      } else {
        setErrorMessage(apiMessage || 'Failed to dispatch email. Please retry or email directly.');
        setFormState('error');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error occurred while sending email.';
      setErrorMessage(msg);
      setFormState('error');
    }
  };

  const handleInputChange = (field: keyof ContactFormInputs, val: string) => {
    playKeypress();
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact" className="relative py-28 bg-surface-0">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-theme/30 bg-theme/10 text-xs font-mono text-zinc-300 mb-3 shadow-[0_0_12px_var(--glow-color)]">
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            <span>DIRECT INBOX DISPATCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
            Let&apos;s Build Something Resilient.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
            All messages submitted below route straight to{' '}
            <span className="text-zinc-200 font-mono font-medium">{RECIPIENT_EMAIL}</span>.
            Available for Software Development Engineer (SDE) roles in Bangalore and high-performance teams.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (5 cols): Interactive Side Panel & One-Click Copy Pill */}
          <div className="lg:col-span-5 space-y-6">
            {/* One-Click Email Copy Pill with Green Checkmark & Tooltip */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                  ONE-CLICK DIRECT COPY
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  VERIFIED INBOX
                </span>
              </div>
              <p className="text-xs text-zinc-400 mb-4 font-normal">
                Click below to copy recipient address to your clipboard:
              </p>

              {/* Pill Container */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="w-full p-4 rounded-2xl border border-zinc-800 bg-zinc-900/90 hover:border-indigo-500/50 hover:bg-zinc-850 text-left transition-all flex items-center justify-between cursor-pointer group shadow-inner"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs sm:text-sm font-mono text-zinc-100 block font-bold truncate group-hover:text-indigo-300 transition-colors">
                        {RECIPIENT_EMAIL}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 block">
                        Direct target email recipient
                      </span>
                    </div>
                  </div>

                  <div
                    className={`p-2.5 rounded-xl border transition-all shrink-0 ${
                      copied
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                        : 'bg-white/5 border-zinc-800 text-zinc-400 group-hover:text-white'
                    }`}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400 animate-bounce" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Animated Tooltip */}
                <AnimatePresence>
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      className="absolute -top-9 right-4 px-3 py-1 rounded-lg bg-emerald-500 text-zinc-950 text-[11px] font-mono font-bold shadow-lg pointer-events-none flex items-center gap-1.5 z-30"
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>Copied to clipboard!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Quick Links with Magnetic Hover Glow */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block px-1">
                CONNECTED PLATFORMS &bull; MAGNETIC TARGETS
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                <MagneticSocialLink
                  href="https://github.com/Basavaraj-SK"
                  icon={Github}
                  label="GitHub Profile"
                  subLabel="github.com/Basavaraj-SK"
                />
                <MagneticSocialLink
                  href="https://linkedin.com/in/basavaraj-sk"
                  icon={Linkedin}
                  label="LinkedIn Network"
                  subLabel="linkedin.com/in/basavaraj-sk"
                />
              </div>
            </div>

            {/* Bangalore Location & Time Indicator */}
            <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>Bangalore, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>IST (UTC+5:30)</span>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Form with Idle, Submitting, Success, and Error States */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-7 sm:p-9 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-indigo-400" />
                    <span>Send a Direct Message</span>
                  </h3>
                  <span className="text-xs font-mono text-zinc-500">
                    Routes directly to {RECIPIENT_EMAIL}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-1 rounded-md">
                  DIRECT API POST
                </span>
              </div>

              <AnimatePresence mode="wait">
                {/* SUCCESS STATE */}
                {formState === 'success' ? (
                  <motion.div
                    key="success-container"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="py-12 px-4 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-5 shadow-[0_0_25px_rgba(16,185,129,0.35)]">
                      <Check className="w-8 h-8 stroke-[2.5]" />
                    </div>
                    <h4 className="text-2xl font-black text-white mb-2">Message Delivered</h4>
                    <p className="text-sm font-mono text-zinc-200 max-w-md mb-2 leading-relaxed">
                      Message sent successfully to Basavaraj. I&apos;ll get back to you soon!
                    </p>
                    {deliveryNote && (
                      <p className="text-xs font-mono text-zinc-400 max-w-md mb-8 leading-relaxed">
                        {deliveryNote}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        playClick();
                        setForm({ name: '', email: '', message: '' });
                        setFormState('idle');
                      }}
                      className="px-6 py-3 rounded-xl border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-xs font-mono font-bold text-white transition-all cursor-pointer shadow-md flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Send Another Message</span>
                    </button>
                  </motion.div>
                ) : (
                  /* IDLE, SUBMITTING & ERROR STATES */
                  <motion.form
                    key="form-container"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    {/* Inline Error Alert */}
                    {formState === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl border border-red-500/40 bg-red-500/10 text-red-200 text-xs font-mono flex items-start gap-3"
                      >
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <strong className="block text-white font-semibold mb-0.5">
                            Submission Failure
                          </strong>
                          <span>
                            {errorMessage || 'Unable to deliver message right now.'}
                          </span>
                          <div className="mt-3 flex items-center gap-3">
                            <button
                              type="button"
                              onClick={handleSubmit}
                              className="px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/40 hover:bg-red-500/30 text-white font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                              <RefreshCw className="w-3 h-3" />
                              <span>Retry Submission</span>
                            </button>
                            <a
                              href={`mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(
                                'Portfolio Message from ' + (form.name || 'Visitor')
                              )}&body=${encodeURIComponent(form.message)}`}
                              className="text-zinc-300 hover:text-white underline underline-offset-2"
                            >
                              Send via default mail app
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Hidden Form Fields */}
                    <input
                      type="hidden"
                      name="subject"
                      value="New Portfolio Message from Basavaraj-SK Site"
                    />
                    <input
                      type="hidden"
                      name="from_name"
                      value={form.name || 'Portfolio Visitor'}
                    />

                    {/* Input: Name */}
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-medium">
                        Your Name <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        disabled={formState === 'submitting'}
                        className={`w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/60 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 text-sm font-mono text-white placeholder:text-zinc-600 outline-none transition-all ${
                          errors.name ? 'border-red-500/80' : ''
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[11px] font-mono text-red-400 mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Input: Email */}
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-medium">
                        Your Email <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="alex@company.com"
                        disabled={formState === 'submitting'}
                        className={`w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/60 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 text-sm font-mono text-white placeholder:text-zinc-600 outline-none transition-all ${
                          errors.email ? 'border-red-500/80' : ''
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] font-mono text-red-400 mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Input: Message */}
                    <div>
                      <label className="block text-xs font-mono text-zinc-300 mb-1.5 font-medium">
                        Message / Role Inquiry <span className="text-indigo-400">*</span>
                      </label>
                      <textarea
                        rows={4}
                        name="message"
                        value={form.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Describe your engineering role, project scope, or opportunity..."
                        disabled={formState === 'submitting'}
                        className={`w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/60 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 text-sm font-mono text-white placeholder:text-zinc-600 outline-none transition-all resize-none ${
                          errors.message ? 'border-red-500/80' : ''
                        }`}
                      />
                      {errors.message && (
                        <span className="text-[11px] font-mono text-red-400 mt-1 block">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs font-mono transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      {formState === 'submitting' ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin text-white" />
                          <span>Delivering to {RECIPIENT_EMAIL}...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message to Basavaraj</span>
                          <Sparkles className="w-3.5 h-3.5 ml-1" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
