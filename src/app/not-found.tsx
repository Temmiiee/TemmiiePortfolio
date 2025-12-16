'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Search, Sparkles } from 'lucide-react'

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const floatingAnimation = {
    y: [0, -20, 0],
  }

  const floatingTransition = {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const
  }

  const glowAnimation = {
    scale: [1, 1.2, 1],
    opacity: [0.5, 0.8, 0.5],
  }

  const glowTransition = {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" as const
  }

  // Generate random positions for particles (only on client)
  const particles = mounted ? [...Array(20)].map((_, i) => ({
    id: i,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    endX: Math.random() * 100,
    endY: Math.random() * 100,
    duration: Math.random() * 10 + 10,
  })) : []

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated background gradient following mouse */}
      <div
        className="pointer-events-none fixed inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(162, 89, 255, 0.1), transparent 40%)`,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${particle.startX}%`,
              top: `${particle.startY}%`,
            }}
            animate={{
              left: `${particle.endX}%`,
              top: `${particle.endY}%`,
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Number with glow effect */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute inset-0 blur-3xl opacity-50"
            animate={glowAnimation}
            transition={glowTransition}
          >
            <div className="text-[20rem] font-bold text-primary">404</div>
          </motion.div>
          <motion.h1
            className="relative text-[12rem] sm:text-[16rem] md:text-[20rem] font-bold bg-gradient-to-br from-primary via-purple-400 to-pink-500 bg-clip-text text-transparent leading-none"
            animate={floatingAnimation}
            transition={floatingTransition}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Title and description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-6 mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Page introuvable
            </h2>
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          </div>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Oups ! Il semblerait que cette page se soit perdue dans le cyberespace.
            <br />
            <span className="text-primary font-medium">Pas de panique</span>, je vais vous aider à retrouver votre chemin.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <motion.button
              className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg overflow-hidden shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Home className="w-5 h-5" />
                Retour à l&apos;accueil
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: '-100%' }}
                animate={{ x: isHovering ? '0%' : '-100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>

          <Link href="/#contact">
            <motion.button
              className="group px-8 py-4 bg-background border-2 border-primary text-primary rounded-xl font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Me contacter
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Fun fact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/20 backdrop-blur-sm"
        >
          <p className="text-sm text-muted-foreground italic">
            💡 <span className="font-semibold text-foreground">Le saviez-vous ?</span> L&apos;erreur 404 tire son nom du numéro de la salle au CERN 
            où se trouvait le premier serveur web. Quand une page n&apos;était pas trouvée, 
            il fallait littéralement aller dans la salle 404 !
          </p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-pink-500/10 rounded-full blur-2xl animate-pulse" />
    </div>
  )
}
