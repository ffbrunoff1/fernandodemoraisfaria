import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Mail, Phone, MapPin, ExternalLink, Heart, ArrowUp } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Navegação",
      links: [
        { label: "Sobre o Autor", href: "#sobre" },
        { label: "O Livro", href: "#livro" },
        { label: "Contato", href: "#contato" }
      ]
    },
    {
      title: "Recursos",
      links: [
        { label: "Comprar na Amazon", href: "https://www.amazon.com.br/Mercado-Geot%C3%AAxtil-outros-Geossint%C3%A9ticos-Brasil-ebook/dp/B0FTD1KQZF", external: true },
        { label: "Ler o Livro Online", href: "/livro/", external: false },
        { label: "Sumário dos Capítulos", href: "/livro/#sumario", external: false }
      ]
    },
    {
      title: "Contato",
      links: [
        { label: "contato@fernandofaria.com", href: "mailto:contato@fernandofaria.com", icon: Mail },
        { label: "+55 (11) 99999-9999", href: "tel:+5511999999999", icon: Phone }
      ]
    }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gradient-to-br from-secondary-900 via-primary-900 to-accent-900 text-white overflow-hidden pb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12 translate-y-1/4"></div>
      </div>

      <div className="section-container relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 mb-6"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-accent-500 to-primary-400">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-white">
                    Fernando Faria
                  </span>
                  <span className="text-sm font-medium text-primary-300">
                    Especialista Geossintéticos
                  </span>
                </div>
              </motion.div>

              <p className="text-primary-100 leading-relaxed mb-6">
                Especialista em geossintéticos com foco em inovação e sustentabilidade 
                na infraestrutura brasileira. Autor do guia mais completo sobre o mercado 
                nacional de geotêxteis.
              </p>

              <motion.a
                href="https://www.amazon.com.br/Mercado-Geot%C3%AAxtil-outros-Geossint%C3%A9ticos-Brasil-ebook/dp/B0FTD1KQZF"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-medium rounded-lg hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-lg"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Comprar Livro
                <ExternalLink className="w-4 h-4 ml-2" />
              </motion.a>
            </motion.div>

            {/* Links Columns */}
            {footerLinks.map((column, columnIndex) => (
              <motion.div
                key={columnIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: columnIndex * 0.1 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => {
                    const IconComponent = link.icon
                    return (
                      <motion.li
                        key={linkIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: (columnIndex * 0.1) + (linkIndex * 0.05) }}
                        viewport={{ once: true }}
                      >
                        <motion.a
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          whileHover={{ x: 5 }}
                          className="flex items-center text-primary-200 hover:text-white transition-all duration-300 group"
                        >
                          {IconComponent && <IconComponent className="w-4 h-4 mr-2 group-hover:text-accent-400" />}
                          <span>{link.label}</span>
                          {link.external && <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
                        </motion.a>
                      </motion.li>
                    )
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-white/20"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-primary-200">
                © {currentYear} Fernando de Morais Faria. Todos os direitos reservados.
              </p>
              <p className="text-sm text-primary-300 mt-1">
                Criado com <em className="text-accent-400"><a href="https://papum.ai" target="_blank" rel="noopener noreferrer" className="hover:text-accent-300 transition-colors duration-300">Papum</a></em>
              </p>
            </div>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-primary-200 hover:text-white hover:bg-white/20 transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar ao Topo</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Floating CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-full max-w-md"
        >
          <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-6 shadow-2xl text-center border border-accent-400">
            <h3 className="text-xl font-bold text-white mb-2">
              Transforme sua Carreira
            </h3>
            <p className="text-accent-100 mb-4 text-sm">
              Seja pioneiro no mercado dos geossintéticos. O futuro começa agora.
            </p>
            <motion.a
              href="https://www.amazon.com.br/Mercado-Geot%C3%AAxtil-outros-Geossint%C3%A9ticos-Brasil-ebook/dp/B0FTD1KQZF"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-white text-accent-600 font-semibold rounded-lg hover:bg-accent-50 transition-all duration-300 shadow-lg"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Adquirir Agora
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}