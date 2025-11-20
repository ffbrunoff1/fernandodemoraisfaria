import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Target, TrendingUp, Users, Award, CheckCircle, ArrowRight, Download, Star } from 'lucide-react'

export default function Services() {
  const bookFeatures = [
    "Análise completa do mercado brasileiro de geossintéticos",
    "Mais de 50 estudos de caso de grandes obras nacionais",
    "Projeções exclusivas de crescimento do setor",
    "Guia prático para especificação e fiscalização",
    "Glossário técnico completo com normas ABNT",
    "Análise detalhada dos principais players do mercado"
  ]

  const targetAudience = [
    {
      icon: Users,
      title: "Engenheiros",
      description: "Civis, geotécnicos e ambientais que buscam conhecimento especializado"
    },
    {
      icon: Target,
      title: "Gestores",
      description: "De obras públicas e privadas que precisam otimizar projetos"
    },
    {
      icon: TrendingUp,
      title: "Investidores",
      description: "Interessados em oportunidades no setor de infraestrutura"
    },
    {
      icon: Award,
      title: "Estudantes",
      description: "De engenharia que desejam se especializar na área"
    }
  ]

  const benefits = [
    {
      title: "Conhecimento Técnico Avançado",
      description: "Compreenda como polímeros simples se transformam em soluções de engenharia revolucionárias"
    },
    {
      title: "Visão de Mercado",
      description: "Identifique oportunidades em um setor com projeção de crescimento de 500%"
    },
    {
      title: "Sustentabilidade Prática",
      description: "Aprenda sobre soluções que reduzem 90% do uso de recursos naturais"
    },
    {
      title: "Casos Reais",
      description: "Estude projetos como Usina de Belo Monte e Rodoanel de São Paulo"
    }
  ]

  return (
    <section id="livro" className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-primary-50">
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
            className="inline-flex items-center px-4 py-2 bg-white text-primary-600 rounded-full font-medium mb-6 shadow-lg"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            O Livro
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            O Guia Definitivo dos
            <span className="text-gradient bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"> Geossintéticos</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubra a tecnologia que está transformando silenciosamente a infraestrutura brasileira 
            através do guia mais completo sobre geotêxteis e geossintéticos do mercado.
          </p>
        </motion.div>

        {/* Main Book Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Book Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotateY: 10 }}
              className="relative max-w-md w-full"
            >
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full opacity-20 blur-xl"
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full opacity-20 blur-xl"
              />

              <div className="relative bg-white p-6 rounded-2xl shadow-2xl">
                <img
                  src="https://qotdwocbcoirjlqjkjhq.supabase.co/storage/v1/object/public/user-files/ad5c31a2-f045-4f97-a0ab-2d4f0e6a69e7/1763608097030_y7oi66st78_8142CJ0j5PL._SL1500.jpg"
                  alt="O Mercado de Geotêxtil e outros Geossintéticos no Brasil"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                
                {/* Rating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center"
                >
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Bestseller
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Book Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                O Mercado de Geotêxtil e outros Geossintéticos no Brasil
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                <strong>Tecnologia, Sustentabilidade e Oportunidades na Infraestrutura Nacional</strong>
              </p>
              <p className="text-gray-600 leading-relaxed">
                Este livro é o guia definitivo para compreender o mercado brasileiro de geotêxteis 
                e outros geossintéticos - uma indústria de bilhões que poucos conhecem, mas que todos dependem.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {bookFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
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
                Comprar na Amazon
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 border-2 border-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-all duration-300"
              >
                <Download className="w-5 h-5 mr-2" />
                Prévia Gratuita
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Target Audience */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Para quem é este livro?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Uma obra essencial para profissionais que querem estar à frente da revolução 
              na infraestrutura brasileira.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {targetAudience.map((audience, index) => {
              const IconComponent = audience.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl text-center card-shadow"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    {audience.title}
                  </h4>
                  <p className="text-gray-600">
                    {audience.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              O que você vai descobrir
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conhecimento prático e estratégico que vai transformar sua visão sobre 
              o futuro da infraestrutura no Brasil.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-lg text-gray-600 mb-6">
              O Brasil está no meio de um boom de infraestrutura. Quem entender os geossintéticos 
              primeiro terá vantagem competitiva decisiva.
            </p>
            <motion.a
              href="https://www.amazon.com.br/Mercado-Geot%C3%AAxtil-outros-Geossint%C3%A9ticos-Brasil-ebook/dp/B0FTD1KQZF"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-lg hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              <BookOpen className="w-6 h-6 mr-3" />
              Adquirir Agora na Amazon
              <ArrowRight className="w-6 h-6 ml-3" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}