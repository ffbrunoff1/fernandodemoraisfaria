import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Award, TrendingUp, Users, ArrowRight, Play, Download } from 'lucide-react'

export default function Hero() {
  const stats = [
    { value: "500%", label: "Crescimento Projetado", icon: TrendingUp },
    { value: "R$ 700bi", label: "Novo Marco Saneamento", icon: Award },
    { value: "50+", label: "Estudos de Caso", icon: BookOpen },
    { value: "6", label: "Perfis Profissionais", icon: Users }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12 translate-y-1/2"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12 translate-y-3/4 opacity-50"></div>
      </div>

      <div className="section-container relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6"
            >
              <Award className="w-4 h-4 mr-2" />
              Especialista em Geossintéticos
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Fernando de
              <span className="block text-gradient bg-gradient-to-r from-accent-400 to-primary-300 bg-clip-text text-transparent">
                Morais Faria
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-primary-100 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Descubra a tecnologia que está <strong className="text-white">transformando silenciosamente</strong> a infraestrutura brasileira. Por trás de cada grande obra existe uma revolução invisível: os geossintéticos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <motion.a
                href="https://www.amazon.com.br/Mercado-Geot%C3%AAxtil-outros-Geossint%C3%A9ticos-Brasil-ebook/dp/B0FTD1KQZF"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-lg hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Comprar na Amazon
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
              
              <motion.a
                href="#sobre"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <Play className="w-5 h-5 mr-2" />
                Conhecer o Autor
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                  >
                    <IconComponent className="w-6 h-6 text-accent-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-primary-200 text-sm">{stat.label}</div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Content - Book Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative max-w-md w-full"
            >
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full opacity-20 blur-xl"
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full opacity-20 blur-xl"
              />

              {/* Book Image */}
              <div className="relative p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl">
                <img
                  src="https://qotdwocbcoirjlqjkjhq.supabase.co/storage/v1/object/public/user-files/ad5c31a2-f045-4f97-a0ab-2d4f0e6a69e7/1763608097030_y7oi66st78_8142CJ0j5PL._SL1500.jpg"
                  alt="O Mercado de Geotêxtil e outros Geossintéticos no Brasil"
                  className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -top-3 -right-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                >
                  Bestseller
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}