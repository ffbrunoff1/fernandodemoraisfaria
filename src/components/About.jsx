import React from 'react'
import { motion } from 'framer-motion'
import { User, GraduationCap, Award, Building, Target, Lightbulb, BookOpen, Users } from 'lucide-react'

export default function About() {
  const achievements = [
    {
      icon: GraduationCap,
      title: "Formação Técnica",
      description: "Especialização em Engenharia e Geossintéticos com foco em infraestrutura nacional"
    },
    {
      icon: Building,
      title: "Experiência Prática",
      description: "Anos de vivência no mercado de materiais para construção civil e obras de grande porte"
    },
    {
      icon: Award,
      title: "Expertise Reconhecida",
      description: "Autor do guia mais completo sobre geossintéticos no mercado brasileiro"
    },
    {
      icon: Target,
      title: "Visão Estratégica",
      description: "Análise profunda das oportunidades e tendências do setor de infraestrutura"
    }
  ]

  const bookHighlights = [
    {
      icon: Lightbulb,
      title: "Inovação Tecnológica",
      description: "Como polímeros simples se transformam em soluções revolucionárias que substituem toneladas de materiais tradicionais"
    },
    {
      icon: Target,
      title: "Mercado em Expansão",
      description: "Projeção de crescimento de 500% na próxima década e mapeamento das principais oportunidades de negócio"
    },
    {
      icon: BookOpen,
      title: "Sustentabilidade Real",
      description: "Redução de 90% no uso de recursos naturais e corte de emissões de CO2 pela metade em projetos de engenharia"
    },
    {
      icon: Users,
      title: "Casos Práticos",
      description: "Mais de 50 estudos de caso brasileiros, incluindo Usina de Belo Monte e Rodoanel de São Paulo"
    }
  ]

  return (
    <section id="sobre" className="py-20 lg:py-32 bg-white">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-600 rounded-full font-medium mb-6"
          >
            <User className="w-4 h-4 mr-2" />
            Sobre o Autor
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Conheça o
            <span className="text-gradient bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"> Especialista</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Fernando de Morais Faria é um dos principais especialistas brasileiros em geossintéticos, 
            dedicando sua carreira ao estudo e desenvolvimento de soluções inovadoras para a infraestrutura nacional.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Author Photo and Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative inline-block mb-8"
            >
              <div className="w-80 h-80 mx-auto lg:mx-0 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 p-1">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                  <User className="w-32 h-32 text-white" />
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full opacity-20 blur-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Fernando de Morais Faria
              </h3>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Com vasta experiência no setor de engenharia e infraestrutura, Fernando dedica-se ao estudo 
                dos geossintéticos e suas aplicações revolucionárias na construção civil brasileira. 
                Sua expertise abrange desde a análise técnica de materiais até as projeções de mercado 
                e oportunidades de investimento no setor.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Através de anos de pesquisa e vivência prática, ele identificou a necessidade de um 
                guia completo que pudesse democratizar o conhecimento sobre esta tecnologia que está 
                silenciosamente transformando a infraestrutura nacional.
              </p>
            </motion.div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-4 p-6 rounded-xl bg-gray-50 hover:bg-primary-50 transition-all duration-300 card-shadow"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {achievement.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Book Highlights Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Por que este livro é fundamental?
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Uma obra que combina rigor técnico com visão estratégica, oferecendo insights únicos 
              sobre o futuro da infraestrutura brasileira.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {bookHighlights.map((highlight, index) => {
              const IconComponent = highlight.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl card-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mr-3">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {highlight.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {highlight.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <motion.a
              href="https://www.amazon.com.br/Mercado-Geot%C3%AAxtil-outros-Geossint%C3%A9ticos-Brasil-ebook/dp/B0FTD1KQZF"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Adquirir o Livro Agora
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}