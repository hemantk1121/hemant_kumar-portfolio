import { useState, type FormEvent } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  Send,
  Info,
  RotateCcw,
} from 'lucide-react';
import { CONTACT_CONTENT, PERSONAL_INFO } from '../data/portfolio';
import { Reveal } from './Reveal';
import { SectionHeader } from './SectionHeader';
import { SpotlightCard } from './SpotlightCard';
import { GitHubBrandIcon, LinkedInBrandIcon } from './TechIcons';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [emailCopied, setEmailCopied] = useState(false);
  const [draftCopied, setDraftCopied] = useState(false);
  const [preparedMailto, setPreparedMailto] = useState<string | null>(null);
  const [preparedPlainText, setPreparedPlainText] = useState<string>('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PERSONAL_INFO.email}`;
    }
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }
    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!form.subject.trim()) {
      nextErrors.subject = 'Please enter a subject.';
    }
    if (!form.message.trim() || form.message.trim().length < 6) {
      nextErrors.message = 'Please enter a short message (at least 6 characters).';
    }
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const formattedBody = [
      `Hi Hemant,`,
      '',
      form.message.trim(),
      '',
      '---',
      `From: ${form.name.trim()}`,
      `Reply Email: ${form.email.trim()}`,
    ].join('\n');

    const mailtoHref = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      form.subject.trim()
    )}&body=${encodeURIComponent(formattedBody)}`;

    setPreparedMailto(mailtoHref);
    setPreparedPlainText(
      `To: ${PERSONAL_INFO.email}\nSubject: ${form.subject.trim()}\n\n${formattedBody}`
    );

    window.location.href = mailtoHref;
  };

  const handleCopyDraft = async () => {
    if (!preparedPlainText) return;
    try {
      await navigator.clipboard.writeText(preparedPlainText);
      setDraftCopied(true);
      window.setTimeout(() => setDraftCopied(false), 2200);
    } catch {
      // Clipboard blocked in restricted context
    }
  };

  const handleReset = () => {
    setPreparedMailto(null);
    setPreparedPlainText('');
    setForm(INITIAL_FORM);
    setErrors({});
    setDraftCopied(false);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            index="07"
            eyebrow="Contact"
            title={CONTACT_CONTENT.heading}
            description={CONTACT_CONTENT.subheading}
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Direct Channels */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <Reveal delay={70}>
              <SpotlightCard
                spotlightColor="rgba(229, 240, 78, 0.14)"
                className="p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="group/link flex min-w-0 items-start gap-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e5f04e]/25 bg-[#e5f04e]/10 text-[#e5f04e]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                        Email
                      </div>
                      <div className="mt-1 break-all text-sm sm:text-[15px] font-medium text-zinc-100 transition-colors group-hover/link:text-[#e5f04e]">
                        {PERSONAL_INFO.email}
                      </div>
                    </div>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    title="Copy email address"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:border-[#e5f04e]/40 hover:bg-[#e5f04e]/10 hover:text-[#e5f04e] cursor-pointer"
                  >
                    {emailCopied ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </SpotlightCard>
            </Reveal>

            {/* GitHub Card */}
            <Reveal delay={140}>
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <SpotlightCard
                  spotlightColor="rgba(196, 181, 253, 0.14)"
                  className="p-5 sm:p-6 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white">
                        <GitHubBrandIcon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                          GitHub
                        </div>
                        <div className="mt-1 truncate text-sm sm:text-[15px] font-medium text-zinc-100">
                          {PERSONAL_INFO.githubHandle}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                  </div>
                </SpotlightCard>
              </a>
            </Reveal>

            {/* LinkedIn Card */}
            <Reveal delay={210}>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <SpotlightCard
                  spotlightColor="rgba(96, 165, 250, 0.14)"
                  className="p-5 sm:p-6 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/12 text-violet-300">
                        <LinkedInBrandIcon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                          LinkedIn
                        </div>
                        <div className="mt-1 truncate text-sm sm:text-[15px] font-medium text-zinc-100">
                          Hemant Kumar
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet-300" />
                  </div>
                </SpotlightCard>
              </a>
            </Reveal>
          </div>

          {/* Right Contact Form */}
          <Reveal delay={120} className="lg:col-span-7">
            <SpotlightCard className="p-6 sm:p-8">
              {preparedMailto ? (
                <div className="space-y-5 py-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e5f04e]/30 bg-[#e5f04e]/10 text-[#e5f04e]">
                    <Mail className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-semibold text-white">
                      Email Draft Ready
                    </h3>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-zinc-300">
                      Your default email app should open with your message
                      pre-addressed to{' '}
                      <span className="font-mono text-[#e5f04e]">
                        {PERSONAL_INFO.email}
                      </span>
                      . Because this portfolio is a static site without a mail
                      server, sending happens directly through your email
                      client.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-1">
                    <a
                      href={preparedMailto}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#e5f04e] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#eef76b]"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Open Email Client</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyDraft}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-violet-400/40 hover:bg-white/[0.08] cursor-pointer"
                    >
                      {draftCopied ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-400" />
                          <span>Message Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Copy Message</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100 hover:bg-white/[0.04] cursor-pointer"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Write Another</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, name: e.target.value }));
                          if (errors.name) {
                            setErrors((prev) => ({ ...prev, name: undefined }));
                          }
                        }}
                        placeholder="Your name"
                        aria-invalid={Boolean(errors.name)}
                        className="w-full rounded-xl border border-white/10 bg-black/75 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors focus:border-violet-400/60 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, email: e.target.value }));
                          if (errors.email) {
                            setErrors((prev) => ({ ...prev, email: undefined }));
                          }
                        }}
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                        className="w-full rounded-xl border border-white/10 bg-black/75 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors focus:border-violet-400/60 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, subject: e.target.value }));
                        if (errors.subject) {
                          setErrors((prev) => ({ ...prev, subject: undefined }));
                        }
                      }}
                      placeholder="Internship opportunity, collaboration, or hello"
                      aria-invalid={Boolean(errors.subject)}
                      className="w-full rounded-xl border border-white/10 bg-black/75 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors focus:border-violet-400/60 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    />
                    {errors.subject && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-300"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, message: e.target.value }));
                        if (errors.message) {
                          setErrors((prev) => ({ ...prev, message: undefined }));
                        }
                      }}
                      placeholder="Write your message here..."
                      aria-invalid={Boolean(errors.message)}
                      className="w-full resize-y rounded-xl border border-white/10 bg-black/75 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors focus:border-violet-400/60 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1">
                    <button
                      type="submit"
                      className="group/send inline-flex items-center justify-center gap-2 rounded-xl bg-[#e5f04e] px-6 py-3 text-sm font-semibold text-black shadow-[0_0_28px_-6px_rgba(229,240,78,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#eef76b] cursor-pointer"
                    >
                      <span>Send Message</span>
                      <Send className="h-4 w-4 transition-transform duration-200 group-hover/send:translate-x-0.5 group-hover/send:-translate-y-0.5" />
                    </button>

                    <p className="inline-flex items-center gap-1.5 text-xs text-zinc-400">
                      <Info className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                      <span>Opens your email app with a pre-filled draft.</span>
                    </p>
                  </div>
                </form>
              )}
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
