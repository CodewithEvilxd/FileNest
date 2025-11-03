
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  ArrowRight,
  CheckCircle2,
  CloudUpload,
  Folder,
  Globe,
  Lock,
  Shield,
  Star,
  Zap,
  Sparkles,
  FileText,
  Users,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x3b82f6,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    // GSAP animations with proper targeting
    const tl = gsap.timeline();

    // Wait for DOM to be ready and elements to exist
    const checkElements = () => {
      const title = document.querySelector('.hero-title');
      const subtitle = document.querySelector('.hero-subtitle');
      const buttons = document.querySelector('.hero-buttons');
      const features = document.querySelector('.hero-features');

      if (title && subtitle && buttons && features) {
        tl.fromTo(title, {
          opacity: 0,
          y: 50,
          scale: 0.8
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out"
        })
        .fromTo(subtitle, {
          opacity: 0,
          y: 30
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        }, "-=0.8")
        .fromTo(buttons, {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6")
        .fromTo(features, {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.4");
      } else {
        // Retry after a short delay if elements not found
        setTimeout(checkElements, 50);
      }
    };

    setTimeout(checkElements, 100);

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      gsap.to(particles.rotation, {
        x: mouseY * 0.1,
        y: mouseX * 0.1,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative">
      {/* Three.js Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ mixBlendMode: 'multiply' }}
      />
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <CloudUpload className="h-7 w-7 md:h-8 md:w-8 text-blue-600" />
                <motion.div
                  className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-xl md:text-2xl tracking-wide font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FileNest
              </span>
            </motion.div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <motion.a
                href="#features"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
                whileHover={{ scale: 1.05 }}
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </motion.a>
              <motion.a
                href="#pricing"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
                whileHover={{ scale: 1.05 }}
              >
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </motion.a>
              <motion.a
                href="#security"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
                whileHover={{ scale: 1.05 }}
              >
                Security
                <span className="absolute -bottom-1 left-0 w-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </motion.a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/sign-in">
                  <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-6 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                    Get started
                  </Button>
                </Link>
              </motion.div>
              <ThemeToggle />
            </div>
            <div className="md:hidden">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link href="/sign-in">
                  <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-4 py-2 text-xs font-medium shadow-lg">
                    Start
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 md:pt-28 pb-16 md:pb-24">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="mx-auto max-w-6xl h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 dark:border-gray-700 px-3 py-1 text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300 mb-6">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-black dark:bg-gray-900" /> Free 150 MB • No credit card needed
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-none tracking-tight mb-6">
            Store, share, and{" "}
            <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent" style={{fontFamily: 'cursive'}}>
              collaborate
            </span>
            <br className="hidden md:block" />
            <span className="text-gray-600 dark:text-gray-300" style={{fontFamily: 'cursive'}}>with confidence.</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed mb-8 md:mb-10">
            FileNest delivers enterprise-grade security with consumer-friendly simplicity.
            Your files are encrypted, backed up, and accessible everywhere — all in one beautiful interface.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/login" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-black dark:bg-gray-900 hover:bg-gray-900 dark:hover:bg-gray-800 text-white rounded-full px-6 md:px-8 py-3 text-sm md:text-base font-medium transition-all duration-300 hover:scale-[1.02]">
                Get started - it&apos;s free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#pricing" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-black dark:text-white rounded-full px-6 md:px-8 py-3 text-sm md:text-base font-medium">
                View pricing
              </Button>
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> End-to-end privacy</div>
            <div className="flex items-center gap-2"><Zap className="h-4 w-4" /> Blazing fast</div>
            <div className="flex items-center gap-2"><Globe className="h-4 w-4" /> Works everywhere</div>
          </div>
        </div>
      </section>


      {/* Features */}
      <section id="features" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">Designed to be invisible</h2>
            <p className="text-gray-600 dark:text-gray-300 font-normal max-w-2xl mx-auto">A calm workspace that gets out of the way — so you can focus on work that matters.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
            {[
              { icon: <Zap className="h-5 w-5" />, title: 'Instant performance', desc: 'Open folders and preview files in a blink with a finely tuned, modern stack.' },
              { icon: <Shield className="h-5 w-5" />, title: 'Enterprise-grade security', desc: 'Your data is encrypted in-transit and at-rest. You control who sees what.' },
              { icon: <Folder className="h-5 w-5" />, title: 'Natural organization', desc: 'Intuitive folders, fast search, and favorites keep everything within reach.' },
              { icon: <Lock className="h-5 w-5" />, title: 'Private by default', desc: 'We never sell your data. Granular sharing for people you trust.' },
              { icon: <Globe className="h-5 w-5" />, title: 'Universal access', desc: 'Seamless experience across laptop, tablet, and phone — nothing to install.' },
              { icon: <Star className="h-5 w-5" />, title: 'Polished experience', desc: 'Minimal UI, smooth interactions, and delightful details at every step.' },
            ].map((f, i) => (
              <div key={i} className="group rounded-2xl border-2 border-gray-100 dark:border-gray-800 p-6 md:p-8 hover:shadow-sm transition-shadow">
                <div className="inline-flex items-center justify-center rounded-full border-2 border-gray-200 dark:border-gray-700 h-10 w-10 mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-normal leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-24 border-t-2 border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { step: '1', title: 'Create your space', desc: 'Sign up in seconds. Your private drive is ready immediately.' },
              { step: '2', title: 'Upload anything', desc: 'Drag & drop or use the uploader — we optimize everything automatically.' },
              { step: '3', title: 'Share when needed', desc: 'Invite teammates or share links with precise control.' },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border-2 border-gray-100 dark:border-gray-800 p-6 md:p-8">
                <div className="text-gray-500 text-sm font-medium mb-2">Step {s.step}</div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-normal leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security highlight */}
      <section id="security" className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <Card className="rounded-2xl border-gray-100 dark:border-gray-800">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 font-medium">
                <Shield className="h-4 w-4" /> Security & Privacy
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {[
                  { title: 'Encryption everywhere', desc: 'TLS 1.3 in transit, AES-256 at rest. Keys managed securely.' },
                  { title: 'Granular permissions', desc: 'Role-based access and expiring links keep your data controlled.' },
                  { title: 'Reliable by design', desc: 'Backed by a modern, resilient infrastructure with daily backups.' },
                ].map((i, idx) => (
                  <div key={idx} className="rounded-xl border-2 border-gray-100 dark:border-gray-800 p-5">
                    <h4 className="text-base font-semibold mb-1">{i.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-normal">{i.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-28 border-t-2 border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-3">Clear, simple pricing</h2>
            <p className="text-gray-600 dark:text-gray-300 font-normal">Start free. Upgrade when you need more space and control.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <Card className="rounded-2xl border-gray-100 dark:border-gray-800">
              <CardHeader>
                <h3 className="text-xl font-semibold">Personal</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-normal">For individuals and creators</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-semibold">Free</span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm font-normal">forever</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 font-normal mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> 150 MB storage</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Unlimited folders</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Fast uploads</li>
                </ul>
                <Link href="/login">
                  <Button className="w-full bg-black dark:bg-gray-900 hover:bg-gray-900 dark:hover:bg-gray-800 text-white rounded-full font-medium">Get started</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-gray-100 dark:border-gray-800">
              <CardHeader>
                <h3 className="text-xl font-semibold">Pro</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-normal">For teams and power users</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-semibold">$8</span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm font-normal">/month</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 font-normal mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> 50 GB storage</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Advanced sharing</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Priority support</li>
                </ul>
                <Link href="/login">
                  <Button variant="outline" className="w-full border-gray-200 dark:border-gray-700 rounded-full font-medium">Start 14‑day trial</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: 'Maya', role: 'Designer', quote: 'The first storage app that actually disappears. It just feels… quiet.' },
              { name: 'Jon', role: 'Engineer', quote: 'Blazing fast and predictable. Sharing links finally feels trustworthy.' },
              { name: 'Elena', role: 'Producer', quote: 'Our team moved in a day. The interface is so clean my clients compliment it.' },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border-2 border-gray-100 dark:border-gray-800 p-6 md:p-8">
                <div className="mb-3 text-gray-600 dark:text-gray-300">“{t.quote}”</div>
                <div className="text-sm text-gray-700 font-medium">— {t.name}, {t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 border-t-2 border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">Frequently asked questions</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 text-sm text-gray-700 font-normal">
            {[
              { q: 'Is my data private?', a: 'Yes. Your files are encrypted in transit and at rest. You decide who can access them.' },
              { q: 'Do you have a free plan?', a: 'Absolutely. Start with 150 MB. Upgrade anytime — no credit card required to try.' },
              { q: 'Can I cancel anytime?', a: 'Yes. There’s no lock-in. Export your data and cancel in a click.' },
              { q: 'Do you have desktop apps?', a: 'The web app is optimized for all devices. Native apps are on our roadmap.' },
            ].map((f, idx) => (
              <div key={idx}>
                <div className="text-black dark:text-white mb-1">{f.q}</div>
                <div className="text-gray-500">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 border-t-2 border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Clear your digital desk.</h2>
          <p className="text-gray-600 dark:text-gray-300 font-normal max-w-xl mx-auto mb-8">Join creators and teams who prefer calm software. Get started in less than a minute.</p>
          <Link href="/login">
            <Button className="bg-black dark:bg-gray-900 hover:bg-gray-900 dark:hover:bg-gray-800 text-white rounded-full px-8 py-3 font-medium">Create your account</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-gray-100 dark:border-gray-800 py-10">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-2xl font-bold cursive-font text-primary">FileNest</span>
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300 font-bold cursive-font">
              <Link href="/privacy" className="hover:text-black dark:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-black dark:text-white transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-black dark:text-white transition-colors">Contact</Link>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
