'use client'

import { useState } from 'react'
import { type Language } from '@/lib/i18n'
import { Shield, Eye, Lock, Mail, Phone, MapPin, ChevronDown, ChevronUp } from 'lucide-react'

const translations = {
  pt: {
    title: 'Política de Privacidade',
    subtitle: 'Sua privacidade é importante para nós',
    lastUpdate: 'Última atualização',
    introduction: 'A Pousada Melodie está comprometida em proteger a privacidade dos nossos visitantes e hóspedes. Esta política de privacidade explica como coletamos, usamos e protegemos suas informações pessoais.',
    sections: {
      collection: {
        title: 'Informações que Coletamos',
        content: 'Coletamos informações pessoais que você nos fornece voluntariamente, incluindo: nome completo, endereço de e-mail, número de telefone, dados de reserva (check-in/check-out), e informações de pagamento quando aplicável. Também coletamos automaticamente informações técnicas sobre seu dispositivo e navegação.',
      },
      use: {
        title: 'Como Usamos suas Informações',
        content: 'Utilizamos suas informações para processar reservas, comunicarnos com você sobre sua estadia, melhorar nossos serviços, cumprir obrigações legais, e enviar comunicações marketing (com seu consentimento).',
      },
      protection: {
        title: 'Proteção de Dados',
        content: 'Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Utilizamos criptografia SSL para todas as transações online.',
      },
      sharing: {
        title: 'Compartilhamento de Dados',
        content: 'Não vendemos suas informações pessoais. Compartilhamos dados apenas com prestadores de serviços necessários para operacionalizar sua reserva (como sistemas de pagamento), quando exigido por lei, ou com seu consentimento explícito.',
      },
      cookies: {
        title: 'Cookies',
        content: 'Utilizamos cookies para melhorar sua experiência de navegação, analisar tráfego do site e personalizar conteúdo. Você pode controlar cookies através das configurações do seu navegador.',
      },
      retention: {
        title: 'Retenção de Dados',
        content: 'Mantemos suas informações pessoais pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção maior seja exigido ou permitido por lei.',
      },
      rights: {
        title: 'Seus Direitos',
        content: 'Você tem direito a: acessar suas informações pessoais, corrigir dados incorretos, solicitar exclusão, objetar ao processamento, solicitar restrição de processamento, e portabilidade de dados. Para exercer esses direitos, entre em contato conosco.',
      },
      contact: {
        title: 'Fale Conosco',
        content: 'Se você tiver dúvidas sobre esta política de privacidade ou sobre como trattamos seus dados, entre em contato conosco.',
      },
    },
    contactInfo: {
      email: 'contato@melodiepousada.com.br',
      phone: '+55 48 98821-2772',
      address: 'Servidão Fermino Manoel Zeferino, 79 - Ingleses Norte, Florianópolis - SC',
    },
    agree: 'Ao usar nosso site, você concorda com esta política de privacidade.',
  },
  es: {
    title: 'Política de Privacidad',
    subtitle: 'Tu privacidad es importante para nosotros',
    lastUpdate: 'Última actualización',
    introduction: 'Pousada Melodie está comprometida con proteger la privacidad de nuestros visitantes y huéspedes. Esta política de privacidad explica cómo recopilamos, usamos y protegemos su información personal.',
    sections: {
      collection: {
        title: 'Información que Recopilamos',
        content: 'Recopilamos información personal que nos proporciona voluntariamente, incluyendo: nombre completo, dirección de correo electrónico, número de teléfono, datos de reserva (check-in/check-out), e información de pago cuando corresponda. También recopilamos automáticamente información técnica sobre su dispositivo y navegación.',
      },
      use: {
        title: 'Cómo Usamos su Información',
        content: 'Utilizamos su información para procesar reservas, comunicarnos sobre su estancia, mejorar nuestros servicios, cumplir obligaciones legales, y enviar comunicaciones de marketing (con su consentimiento).',
      },
      protection: {
        title: 'Protección de Datos',
        content: 'Implementamos medidas de seguridad técnicas y organizacionales para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Utilizamos encriptación SSL para todas las transacciones en línea.',
      },
      sharing: {
        title: 'Compartición de Datos',
        content: 'No vendemos su información personal. Compartimos datos solo con proveedores de servicios necesarios para operar su reserva (como sistemas de pago), cuando lo exija la ley, o con su consentimiento explícito.',
      },
      cookies: {
        title: 'Cookies',
        content: 'Utilizamos cookies para mejorar su experiencia de navegación, analizar tráfico del sitio y personalizar contenido. Puede controlar cookies a través de la configuración de su navegador.',
      },
      retention: {
        title: 'Retención de Datos',
        content: 'Mantenemos su información personal el tiempo necesario para cumplir los propósitos descritos en esta política, a menos que un período de retención mayor sea exigido o permitido por ley.',
      },
      rights: {
        title: 'Sus Derechos',
        content: 'Tiene derecho a: acceder a su información personal, corregir datos incorrectos, solicitar eliminación, objetar al procesamiento, solicitar restricción de procesamiento, y portabilidad de datos. Para ejercer estos derechos, contáctenos.',
      },
      contact: {
        title: 'Contáctenos',
        content: 'Si tiene preguntas sobre esta política de privacidad o sobre cómo tratamos sus datos, contáctenos.',
      },
    },
    contactInfo: {
      email: 'contato@melodiepousada.com.br',
      phone: '+55 48 98821-2772',
      address: 'Servidão Fermino Manoel Zeferino, 79 - Ingleses Norte, Florianópolis - SC',
    },
    agree: 'Al usar nuestro sitio web, usted acepta esta política de privacidad.',
  },
  en: {
    title: 'Privacy Policy',
    subtitle: 'Your privacy is important to us',
    lastUpdate: 'Last updated',
    introduction: 'Pousada Melodie is committed to protecting the privacy of our visitors and guests. This privacy policy explains how we collect, use, and protect your personal information.',
    sections: {
      collection: {
        title: 'Information We Collect',
        content: 'We collect personal information that you voluntarily provide, including: full name, email address, phone number, reservation details (check-in/check-out), and payment information when applicable. We also automatically collect technical information about your device and browsing.',
      },
      use: {
        title: 'How We Use Your Information',
        content: 'We use your information to process reservations, communicate about your stay, improve our services, comply with legal obligations, and send marketing communications (with your consent).',
      },
      protection: {
        title: 'Data Protection',
        content: 'We implement technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We use SSL encryption for all online transactions.',
      },
      sharing: {
        title: 'Data Sharing',
        content: 'We do not sell your personal information. We share data only with service providers necessary to operate your reservation (such as payment systems), when required by law, or with your explicit consent.',
      },
      cookies: {
        title: 'Cookies',
        content: 'We use cookies to improve your browsing experience, analyze site traffic, and customize content. You can control cookies through your browser settings.',
      },
      retention: {
        title: 'Data Retention',
        content: 'We retain your personal information for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required or permitted by law.',
      },
      rights: {
        title: 'Your Rights',
        content: 'You have the right to: access your personal information, correct inaccurate data, request deletion, object to processing, request restriction of processing, and data portability. To exercise these rights, contact us.',
      },
      contact: {
        title: 'Contact Us',
        content: 'If you have questions about this privacy policy or how we handle your data, contact us.',
      },
    },
    contactInfo: {
      email: 'contato@melodiepousada.com.br',
      phone: '+55 48 98821-2772',
      address: 'Servidão Fermino Manoel Zeferino, 79 - Ingleses Norte, Florianópolis - SC',
    },
    agree: 'By using our website, you agree to this privacy policy.',
  },
}

interface SectionProps {
  title: string
  content: string
  icon: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}

function Section({ title, content, icon, isOpen, onToggle }: SectionProps) {
  return (
    <div className="border border-ocean-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-ocean-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-primary">{icon}</div>
          <span className="font-heading text-lg text-primary">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-ocean-50">
          <p className="text-text-secondary leading-relaxed">{content}</p>
        </div>
      )}
    </div>
  )
}

export default function PrivacyPolicy({ lang }: { lang: Language }) {
  const t = translations[lang] || translations.pt
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['collection']))

  const toggleSection = (section: string) => {
    setOpenSections(prev => {
      const next = new Set(prev)
      if (next.has(section)) {
        next.delete(section)
      } else {
        next.add(section)
      }
      return next
    })
  }

  return (
    <div className="min-h-screen bg-ocean-50 pt-24 pb-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl text-primary mb-4">{t.title}</h1>
            <p className="text-text-secondary text-lg mb-2">{t.subtitle}</p>
            <p className="text-text-secondary text-sm">{t.lastUpdate}: {new Date().toLocaleDateString(lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US')}</p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 mb-8">
            <p className="text-text-secondary leading-relaxed">{t.introduction}</p>
          </div>

          {/* Sections */}
          <div className="space-y-4 mb-8">
            <Section
              title={t.sections.collection.title}
              content={t.sections.collection.content}
              icon={<Eye className="w-6 h-6" />}
              isOpen={openSections.has('collection')}
              onToggle={() => toggleSection('collection')}
            />
            <Section
              title={t.sections.use.title}
              content={t.sections.use.content}
              icon={<Mail className="w-6 h-6" />}
              isOpen={openSections.has('use')}
              onToggle={() => toggleSection('use')}
            />
            <Section
              title={t.sections.protection.title}
              content={t.sections.protection.content}
              icon={<Lock className="w-6 h-6" />}
              isOpen={openSections.has('protection')}
              onToggle={() => toggleSection('protection')}
            />
            <Section
              title={t.sections.sharing.title}
              content={t.sections.sharing.content}
              icon={<Shield className="w-6 h-6" />}
              isOpen={openSections.has('sharing')}
              onToggle={() => toggleSection('sharing')}
            />
            <Section
              title={t.sections.cookies.title}
              content={t.sections.cookies.content}
              icon={<Shield className="w-6 h-6" />}
              isOpen={openSections.has('cookies')}
              onToggle={() => toggleSection('cookies')}
            />
            <Section
              title={t.sections.retention.title}
              content={t.sections.retention.content}
              icon={<Shield className="w-6 h-6" />}
              isOpen={openSections.has('retention')}
              onToggle={() => toggleSection('retention')}
            />
            <Section
              title={t.sections.rights.title}
              content={t.sections.rights.content}
              icon={<Shield className="w-6 h-6" />}
              isOpen={openSections.has('rights')}
              onToggle={() => toggleSection('rights')}
            />
            <Section
              title={t.sections.contact.title}
              content={t.sections.contact.content}
              icon={<Phone className="w-6 h-6" />}
              isOpen={openSections.has('contact')}
              onToggle={() => toggleSection('contact')}
            />
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 mb-8">
            <h2 className="font-heading text-xl text-primary mb-6">{t.sections.contact.title}</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href={`mailto:${t.contactInfo.email}`} className="text-text-secondary hover:text-primary transition-colors">
                  {t.contactInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href={`tel:${t.contactInfo.phone}`} className="text-text-secondary hover:text-primary transition-colors">
                  {t.contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-text-secondary">{t.contactInfo.address}</span>
              </div>
          </div>

          {/* Agreement */}
          <p className="text-center text-text-secondary text-sm">{t.agree}</p>
        </div>
    </div>
  )
}
