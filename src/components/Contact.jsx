import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ReCAPTCHA from 'react-google-recaptcha'
import { Mail, Phone, MessageCircle, Send, CheckCircle, AlertCircle, User, BookOpen } from 'lucide-react'

export default function Contact() {
  const recaptchaRef = useRef(null)
  const [status, setStatus] = useState({ message: '', isError: false })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    interest: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const token = await recaptchaRef.current.executeAsync()
      
      const payload = {
        ...formData,
        recipientEmail: "",
        token: token
      }

      const response = await fetch('https://qotdwocbcoirjlqjkjhq.supabase.co/functions/v1/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        setStatus({
          message: 'Mensagem enviada com sucesso! Retornaremos o contato em breve.',
          isError: false
        })
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          interest: ''
        })
      } else {
        throw new Error('Erro ao enviar mensagem')
      }
    } catch (error) {
      setStatus({
        message: 'Erro ao enviar mensagem. Tente novamente mais tarde.',
        isError: true
      })
    } finally {
      setIsSubmitting(false)
      recaptchaRef.current.reset()
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      description: "Entre em contato por email",
      value: "contato@fernandofaria.com",
      link: "mailto:contato@fernandofaria.com"
    },
    {
      icon: Phone,
      title: "Telefone",
      description: "Fale conosco diretamente",
      value: "+55 (11) 99999-9999",
      link: "tel:+5511999999999"
    },
    {
      icon: BookOpen,
      title: "Livro na Amazon",
      description: "Adquira o livro agora",
      value: "Comprar na Amazon",
      link: "https://www.amazon.com.br/Mercado-Geot%C3%AAxtil-outros-Geossint%C3%A9ticos-Brasil-ebook/dp/B0FTD1KQZF"
    }
  ]

  const interestOptions = [
    "Aquisição do livro",
    "Consultoria em geossintéticos",
    "Palestra ou apresentação",
    "Parceria comercial",
    "Pesquisa acadêmica",
    "Mídia e imprensa",
    "Outro"
  ]

  return (
    <section id="contato" className="py-20 lg:py-32 bg-gradient-to-br from-primary-900 via-secondary-800 to-accent-900">
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
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium mb-6"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Entre em Contato
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Vamos
            <span className="text-gradient bg-gradient-to-r from-accent-400 to-primary-300 bg-clip-text text-transparent"> Conversar</span>
          </h2>
          
          <p className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
            Tem dúvidas sobre geossintéticos? Interesse em parcerias ou consultorias? 
            Entre em contato e vamos explorar as oportunidades juntos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Informações de Contato
              </h3>
              <p className="text-primary-100 leading-relaxed mb-8">
                Estou sempre disponível para discutir projetos, oportunidades 
                e compartilhar conhecimento sobre o fascinante mundo dos geossintéticos.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-accent-500 to-primary-400 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {info.title}
                      </h4>
                      <p className="text-primary-200 text-sm mb-2">
                        {info.description}
                      </p>
                      {info.link ? (
                        <a
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-accent-300 hover:text-accent-200 transition-colors duration-300"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-accent-300">{info.value}</span>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Quick Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-gradient-to-r from-accent-500/20 to-primary-500/20 border border-accent-400/30"
            >
              <h4 className="text-lg font-semibold text-white mb-3">
                Ação Rápida
              </h4>
              <p className="text-primary-100 mb-4 text-sm">
                Interessado no livro? Adquira já na Amazon e comece sua jornada no mundo dos geossintéticos.
              </p>
              <motion.a
                href="https://www.amazon.com.br/Mercado-Geot%C3%AAxtil-outros-Geossint%C3%A9ticos-Brasil-ebook/dp/B0FTD1KQZF"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-2 bg-accent-500 text-white font-medium rounded-lg hover:bg-accent-600 transition-all duration-300"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Comprar Agora
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                Envie uma Mensagem
              </h3>

              {/* Status Message */}
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center space-x-2 p-4 rounded-lg mb-6 ${
                    status.isError 
                      ? 'bg-red-500/20 border border-red-500/30 text-red-200' 
                      : 'bg-green-500/20 border border-green-500/30 text-green-200'
                  }`}
                >
                  {status.isError ? (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span>{status.message}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-300"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-300"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-300"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Interesse Principal
                    </label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-300"
                    >
                      <option value="" className="text-gray-900">Selecione uma opção</option>
                      {interestOptions.map((option, index) => (
                        <option key={index} value={option} className="text-gray-900">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Assunto *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-300"
                    placeholder="Assunto da sua mensagem"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Descreva sua dúvida, interesse ou proposta..."
                  />
                </div>

                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6Lc7xpsrAAAAAKh0I1boee2JN1oO8iF_yd0ihl79"
                  size="invisible"
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full py-4 px-8 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center ${
                    isSubmitting
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 shadow-lg hover:shadow-xl'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}