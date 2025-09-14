import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, Globe, Sparkles, Rocket, ShieldHalf, Server, Brain, Box, LineChart, Smartphone, MonitorSmartphone, ChevronRight, Link as LinkIcon, Briefcase } from "lucide-react";
// === DATA (pulled together from your background) ===
const DATA = {
  name: "Ashraf",
  role: "Software Engineer & Product Builder",
  location: "Marseille, France",
  blurb:
    "I design, build, and ship useful software. From NFC-powered products to high-traffic civic platforms, I turn ideas into reliable systems.",
  contacts: {
    email: "ashraf@example.com", // ← change to your real email later
    github: "https://github.com/your-github", // ← optional
    linkedin: "https://www.linkedin.com/in/your-linkedin", // ← optional
    website: "https://your-domain.com", // ← optional
  },
  highlights: [
    "RapidITech co‑founder – shipping cross‑platform apps for orgs & public sector",
    "Civic tech: project lead for the Aix‑Marseille‑Provence portal (WordPress + Symfony broker)",
    "NFC products: menu & review badges for restaurants/bars with analytics",
    "WooCommerce automations: XML exports, barcode fulfillment, Supabase integrations",
    "Blindfold chess training site powered by local Stockfish",
  ],
  stacks: [
    { title: "Frontend", items: ["Angular", "React", "Tailwind", "shadcn/ui", "Figma"] },
    { title: "Backend", items: ["Spring Boot", "Symfony (PHP)", "Node.js", "JWT", "REST"] },
    { title: "Infra", items: ["Docker", "Kubernetes", "Linux", "Apache/Nginx", "VirtualBox"] },
    { title: "Data & Analytics", items: ["Matomo", "Supabase", "SQL"] },
    { title: "Identity", items: ["Keycloak", "FranceConnect (in progress)"] },
    { title: "PM & QA", items: ["Jira", "GitLab CI", "Unit/Integration tests"] },
  ],
  projects: [
    {
      title: "NFC Menu & Reviews Badges",
      period: "2024 → ongoing",
      tags: ["NFC", "Product", "SaaS", "Analytics"],
      description:
        "Designed a turnkey NFC badge system for restaurants/bars: tap‑to‑menu and tap‑to‑review with link shortener analytics (Polr) and insights on returning visitors.",
      impact: [
        "Fast UX: 1‑tap access, no camera needed",
        "Lightweight analytics pipeline via short links",
        "Generalized to support hotels (Wi‑Fi tap‑to‑connect concept)",
      ],
    },
    {
      title: "Aix‑Marseille‑Provence Portal (Project Lead)",
      period: "2024 → ongoing",
      tags: ["CivicTech", "WordPress", "Symfony", "Performance"],
      description:
        "Responsible for the institutional portal: communication & citizen services. Front in WordPress, backend broker in Symfony (PHP). Focused on performance, UX, and service integrations.",
      impact: [
        "Reduced bottlenecks and planned infra/HTTPd tuning",
        "API integrations (EAQ forms, pools, parking, etc.)",
        "Keycloak auth; FranceConnect integration in progress",
      ],
    },
    {
      title: "WooCommerce Automations for Rewards Store",
      period: "2024 → 2025",
      tags: ["WooCommerce", "PHP", "Supabase", "XML", "Barcodes"],
      description:
        "Built business‑critical automations: XML generation for transport rewards, POST hooks to Supabase for mobility products, and automated barcode issuance/emailing for pool tickets.",
      impact: [
        "Eliminated manual steps; fewer fulfillment errors",
        "Clear mapping between products and internal codes",
        "Improved citizen experience with instant delivery",
      ],
    },
    {
      title: "Blindfold Chess Trainer",
      period: "2024 → ongoing",
      tags: ["Chess", "Stockfish", "Web App"],
      description:
        "A web app that delivers personalized blindfold exercises and puzzle progressions, backed by a local Stockfish engine.",
      impact: [
        "Adaptive difficulty & position capture",
        "Lightweight, text‑based interaction for speed",
        "Foundation for future SaaS offering",
      ],
    },
    {
      title: "RapidITech",
      period: "2025 → ongoing",
      tags: ["Startup", "B2B", "Cross‑platform"],
      description:
        "Co‑founded a studio to conceive, build, and commercialize software for companies & public organizations.",
      impact: [
        "Productized approach: build first, sell to verticals",
        "Lean team with strong engineering focus",
        "Go‑to‑market via targeted outreach",
      ],
    },
  ],
  timeline: [
    { when: "2025", text: "Co‑founded RapidITech; continued civic & NFC projects." },
    { when: "2024", text: "Led AMP portal improvements; launched NFC menu/review badges; built WooCommerce automations." },
    { when: "2023", text: "Scaled backend & infra skills (Docker/K8s); deepened Spring Boot and Angular." },
  ],
  extras: [
    "1800 rapid on Lichess (time‑management work in progress)",
    "Private tutor in chemistry (high‑school level)",
  ],
};

// === SMALL UI HELPERS ===
const Section = ({ id, title, children }: { id?: string; title: string; children: any }) => (
  <section id={id} className="scroll-mt-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="h-5 w-5" />
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

const Pill = ({ children }: { children: any }) => (
  <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium mr-2 mb-2">
    {children}
  </Badge>
);

const Anchor = ({ href, children }: { href: string; children: any }) => (
  <a href={href} className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
    {children}
    <LinkIcon className="h-4 w-4" />
  </a>
);

// === MAIN COMPONENT ===
export default function PortfolioAshraf() {
  const [lang, setLang] = useState<"en" | "fr">("en");

  const t = (en: string, fr: string) => (lang === "en" ? en : fr);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Rocket className="h-4 w-4" />
            </div>
            <span className="font-semibold">Ashraf · {t("Portfolio", "Portfolio")}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#projects" className="hover:opacity-80">{t("Projects", "Projets")}</a>
            <a href="#stack" className="hover:opacity-80">Stack</a>
            <a href="#experience" className="hover:opacity-80">{t("Experience", "Expérience")}</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => setLang(lang === "en" ? "fr" : "en")}>{lang === "en" ? "FR" : "EN"}</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="md:col-span-7">
            <h1 className="text-4xl/tight sm:text-5xl font-bold">
              {t("Hi, I'm", "Salut, je suis")} <span className="text-primary">Ashraf</span>
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              {t(DATA.blurb, "Je conçois et livre des logiciels utiles. Des produits NFC aux plateformes citoyennes à fort trafic, je transforme des idées en systèmes fiables.")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#projects">{t("See Projects", "Voir les projets")}</a>
              </Button>
              <Button asChild variant="outline">
                <a href="#contact">{t("Contact me", "Me contacter")}</a>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Globe className="h-4 w-4" /> {DATA.location}</span>
              <span className="inline-flex items-center gap-2"><ShieldHalf className="h-4 w-4" /> {t("Available for freelance & collaborations", "Disponible pour missions & collaborations")}</span>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {DATA.contacts.github && (
                <Anchor href={DATA.contacts.github}><Github className="h-4 w-4" /> GitHub</Anchor>
              )}
              {DATA.contacts.linkedin && (
                <Anchor href={DATA.contacts.linkedin}><Linkedin className="h-4 w-4" /> LinkedIn</Anchor>
              )}
              <Anchor href={`mailto:${DATA.contacts.email}`}><Mail className="h-4 w-4" /> {t("Email", "E‑mail")}</Anchor>
              {DATA.contacts.website && (
                <Anchor href={DATA.contacts.website}>Website</Anchor>
              )}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="md:col-span-5">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Brain className="h-5 w-5" /> {t("What I do", "Ce que je fais")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3"><Server className="h-4 w-4 mt-0.5" /><p>{t("Design robust backends (Symfony, Spring Boot) and ship clean frontends (Angular/React).", "Conçois des backends robustes (Symfony, Spring Boot) et livre des fronts propres (Angular/React).")}</p></div>
                <div className="flex items-start gap-3"><Box className="h-4 w-4 mt-0.5" /><p>{t("Productize ideas quickly with NFC, analytics, and e‑commerce automation.", "Industrialise vite des idées avec NFC, analytics et automatisations e‑commerce.")}</p></div>
                <div className="flex items-start gap-3"><LineChart className="h-4 w-4 mt-0.5" /><p>{t("Focus on performance, DX, and maintainability.", "Focalisé sur la performance, l’ergonomie développeur et la maintenabilité.")}</p></div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Highlights */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-4">
          {DATA.highlights.map((h, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="p-5 text-sm">{h}</CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-10" />

      {/* Projects */}
      <Section id="projects" title={t("Selected Projects", "Projets sélectionnés")}>        
        <div className="grid md:grid-cols-2 gap-6">
          {DATA.projects.map((p, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.05 }}>
              <Card className="rounded-2xl h-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{p.title}</span>
                    <span className="text-xs text-muted-foreground">{p.period}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                  <div className="flex flex-wrap">
                    {p.tags.map((t, i) => (
                      <Pill key={i}>{t}</Pill>
                    ))}
                  </div>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    {p.impact.map((i, k) => (
                      <li key={k}>{i}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Stack */}
      <Section id="stack" title="Tech Stack">
        <Tabs defaultValue="Frontend" className="w-full">
          <TabsList className="flex flex-wrap justify-start">
            {DATA.stacks.map((s) => (
              <TabsTrigger key={s.title} value={s.title}>{s.title}</TabsTrigger>
            ))}
          </TabsList>
          {DATA.stacks.map((s) => (
            <TabsContent key={s.title} value={s.title} className="mt-6">
              <div className="flex flex-wrap">
                {s.items.map((item) => (
                  <Pill key={item}>{item}</Pill>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Section>

      {/* Experience / Timeline */}
      <Section id="experience" title={t("Experience", "Expérience")}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <ol className="relative border-s pl-6">
              {DATA.timeline.map((e, i) => (
                <li key={i} className="mb-10 ms-6">
                  <span className="absolute -start-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </span>
                  <h4 className="text-base font-semibold text-foreground">{e.when}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1 max-w-prose">{e.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <Card className="rounded-2xl h-full">
              <CardHeader>
                <CardTitle>{t("Also", "Aussi")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
                  {DATA.extras.map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>{t("Let’s work together", "Travaillons ensemble")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {t(
                  "Tell me about your project and I’ll get back within 24–48h.",
                  "Parlez‑moi de votre projet et je reviens vers vous sous 24–48h."
                )}
              </p>
              <form onSubmit={(e) => { e.preventDefault(); alert(t("Thanks! Replace the email at the top to enable real contact.", "Merci ! Remplacez l’e‑mail en haut pour un vrai contact.")); }} className="space-y-3">
                <Input placeholder={t("Your name", "Votre nom")} required />
                <Input type="email" placeholder="Email" required />
                <Textarea placeholder={t("Project details", "Détails du projet")} rows={5} />
                <Button type="submit">{t("Send", "Envoyer")}</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>{t("Capabilities", "Capacités")}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <div className="flex items-start gap-2"><MonitorSmartphone className="h-4 w-4 mt-0.5" /><p>{t("Full‑stack web apps (Angular/React + Symfony/Spring)", "Apps web full‑stack (Angular/React + Symfony/Spring)")}</p></div>
              <div className="flex items-start gap-2"><Smartphone className="h-4 w-4 mt-0.5" /><p>{t("NFC productization & analytics dashboards", "Produits NFC & tableaux de bord analytics")}</p></div>
              <div className="flex items-start gap-2"><ShieldHalf className="h-4 w-4 mt-0.5" /><p>{t("Auth flows with Keycloak, JWT, FranceConnect", "Flux d’authentification avec Keycloak, JWT, FranceConnect")}</p></div>
              <div className="flex items-start gap-2"><Server className="h-4 w-4 mt-0.5" /><p>{t("DevOps: Docker, K8s, CI, Linux", "DevOps : Docker, K8s, CI, Linux")}</p></div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t mt-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Ashraf. {t("All rights reserved.", "Tous droits réservés.")}</span>
          <span className="inline-flex items-center gap-3">
            <a className="hover:underline" href="#">{t("Imprint", "Mentions légales")}</a>
            <a className="hover:underline" href="#">Privacy</a>
          </span>
        </div>
      </footer>
    </div>
  );
}