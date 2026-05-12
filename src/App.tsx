/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Menu, 
  X, 
  CheckCircle2, 
  Mail, 
  MapPin, 
  Lock, 
  Database, 
  FileText,
  CreditCard,
  Users,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Shared Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (location.state && (location.state as any).scrollTo && location.pathname === '/') {
      const id = (location.state as any).scrollTo;
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
      // Clear state after scrolling
      navigate('/', { replace: true, state: {} });
    }
  }, [location, navigate]);

  const menuItems = [
    { name: 'Início', id: 'home' },
    { name: 'Funcionalidades', id: 'features' },
    { name: 'Como funciona', id: 'how-it-works' },
    { name: 'Integrações', id: 'integrations' },
    { name: 'Segurança', id: 'security' },
    { name: 'Contato', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <MessageSquare className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-primary tracking-tight">Tribo Mensageria</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            ))}
            <button 
              className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm"
              onClick={() => handleNavClick('contact')}
            >
              Fale conosco
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="container-custom py-4 space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="block w-full text-left text-base font-medium text-slate-600 hover:text-primary"
                >
                  {item.name}
                </button>
              ))}
              <button 
                className="w-full bg-primary text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-slate-800"
                onClick={() => handleNavClick('contact')}
              >
                Fale conosco
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-white border-t border-slate-200 py-12 md:py-20">
    <div className="container-custom">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <MessageSquare className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-primary">Tribo Mensageria</span>
        </div>
        <div className="flex flex-wrap gap-6 md:gap-10">
          <Link to="/politica-de-privacidade" className="text-sm text-slate-500 hover:text-primary underline underline-offset-4">Política de Privacidade</Link>
          <Link to="/termos-de-uso" className="text-sm text-slate-500 hover:text-primary underline underline-offset-4">Termos de Uso</Link>
          <Link to="/#contact" className="text-sm text-slate-500 hover:text-primary">Contato</Link>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1 text-center md:text-left">
          <p className="text-slate-400 text-sm">© Tribo Sistemas. Todos os direitos reservados.</p>
          <p className="text-slate-500 text-sm font-medium">Site oficial: <a href="https://mensageria.tribosistemas.com.br" className="hover:text-primary">https://mensageria.tribosistemas.com.br</a></p>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-sm italic">
          Plataforma SaaS Integrada à Meta Business
        </div>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const LandingPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 bg-gradient-to-b from-white to-slate-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1 px-3 mb-6 text-xs font-semibold tracking-wider text-secondary uppercase bg-secondary/10 rounded-full">
                Plataforma SaaS Empresarial
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6 leading-tight">
                Mensageria empresarial integrada ao WhatsApp Business Platform
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                Conecte sua empresa ao WhatsApp Business para enviar notificações, confirmações, documentos, cobranças, lembretes e mensagens operacionais com controle, segurança e integração aos seus sistemas.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Fale conosco
                </button>
                <button 
                  className="w-full sm:w-auto bg-white text-primary border border-slate-200 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-50 transition-all"
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Conheça a solução
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                O que é o Tribo Mensageria
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                A Tribo Mensageria é uma plataforma SaaS da Tribo Sistemas criada para empresas que precisam centralizar e automatizar comunicações com seus clientes finais por canais oficiais, como o WhatsApp Business Platform.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                A solução permite configurar canais, integrar sistemas internos, enviar mensagens autorizadas e acompanhar o status das comunicações em tempo real, garantindo uma operação profissional e escalável.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video bg-slate-100 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center p-8 border border-slate-200">
                <div className="grid grid-cols-2 gap-4 w-full h-full">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100" />
                      <div className="w-full h-2 bg-slate-100 rounded" />
                      <div className="w-1/2 h-2 bg-slate-100 rounded" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Para que sua empresa pode usar</h2>
            <p className="text-slate-600 max-w-2xl mx-auto italic">
              "As mensagens devem ser enviadas somente para clientes que autorizaram o contato e sempre respeitando as políticas da Meta e do WhatsApp Business Platform."
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Confirmações de pedidos', icon: <CheckCircle2 className="w-6 h-6" /> },
              { title: 'Avisos de cobrança', icon: <CreditCard className="w-6 h-6" /> },
              { title: 'Envio de documentos', icon: <FileText className="w-6 h-6" /> },
              { title: 'Lembretes de atendimento', icon: <Zap className="w-6 h-6" /> },
              { title: 'Atualizações de ordem de serviço', icon: <Settings className="w-6 h-6" /> },
              { title: 'Notificações financeiras', icon: <Database className="w-6 h-6" /> },
              { title: 'Mensagens de suporte', icon: <MessageSquare className="w-6 h-6" /> },
              { title: 'Comunicação operacional', icon: <Users className="w-6 h-6" /> },
            ].map((item, id) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: id * 0.05 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
              >
                <div className="bg-secondary/10 p-3 rounded-xl text-secondary">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-primary leading-tight">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Funcionalidades</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Uma plataforma completa para gerenciar sua comunicação empresarial com eficiência.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'WhatsApp Business Platform', text: 'Conexão direta e oficial com a API da Meta.' },
              { title: 'Canais Inteligentes', text: 'Cadastro e gerenciamento centralizado de múltiplos canais.' },
              { title: 'Integração via API', text: 'API REST robusta para integração com qualquer sistema.' },
              { title: 'Webhooks em Tempo Real', text: 'Receba notificações instantâneas de eventos e status.' },
              { title: 'Status das Mensagens', text: 'Acompanhe envio, entrega, leitura e falhas detalhadamente.' },
              { title: 'Histórico Completo', text: 'Consulta rápida ao histórico de mensagens enviadas.' },
              { title: 'Controle de Consumo', text: 'Acompanhamento transparente do consumo mensal.' },
              { title: 'Suporte a Templates', text: 'Gerencie modelos de mensagens aprovados pela Meta.' },
              { title: 'Painel Administrativo', text: 'Gestão completa organizada por empresa e cliente.' },
            ].map((f, id) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Como funciona</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Processo simples e estruturado para garantir a melhor comunicação.
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />
            <div className="space-y-12 md:space-y-24">
              {[
                { title: 'Painel de Controle', text: 'A empresa acessa o painel exclusivo da Tribo Mensageria.' },
                { title: 'Conexão Oficial', text: 'Conecta sua conta/número do WhatsApp Business autorizado.' },
                { title: 'Configuração', text: 'Define as regras e configura o canal de comunicação.' },
                { title: 'Integração', text: 'Integra seu ERP ou sistema interno via API ou Webhook.' },
                { title: 'Envio Autorizado', text: 'Envia mensagens legítimas e autorizadas aos clientes finais.' },
                { title: 'Monitoramento', text: 'Acompanha status de envio, entrega e leitura em tempo real.' },
              ].map((step, id) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: id % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${id % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`md:w-1/2 flex ${id % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-sm w-full">
                      <span className="inline-block py-1 px-3 mb-4 text-xs font-bold text-secondary bg-secondary/10 rounded-full">
                        Passo {id + 1}
                      </span>
                      <h3 className="text-xl font-bold text-primary mb-2">{step.title}</h3>
                      <p className="text-slate-600">{step.text}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold border-4 border-white shadow-md">
                    {id + 1}
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meta/WhatsApp Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container-custom">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Globe size={200} />
            </div>
            <div className="max-w-3xl relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-accent p-3 rounded-2xl">
                  <MessageSquare className="text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Uso com WhatsApp Business Platform</h2>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                A Tribo Mensageria utiliza a WhatsApp Business Platform para permitir que empresas clientes conectem seus ativos autorizados, como Conta do WhatsApp Business, números de telefone, status da integração e modelos de mensagem/templates. A plataforma usa essas informações somente para viabilizar a configuração e operação do canal WhatsApp dentro do SaaS.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <p className="text-slate-300">
                  O envio de mensagens é realizado para comunicações legítimas entre a empresa e seus clientes finais, incluindo mensagens transacionais, operacionais e de atendimento. <span className="text-white font-semibold underline decoration-accent decoration-2 underline-offset-4">A plataforma não é destinada a spam, venda de bases de contatos ou envio de mensagens sem consentimento.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Integrações de Alta Performance</h2>
              <p className="text-lg text-slate-600 mb-8">
                A API da Tribo Mensageria permite que sistemas externos solicitem envios, consultem status e recebam retornos por webhook, facilitando a integração com os processos internos da sua empresa.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['ERP', 'Sistemas Financeiros', 'Ordens de Serviço', 'Cobranças', 'Webhooks', 'API REST', 'Automações Internas'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="bg-secondary p-1 rounded-full">
                      <CheckCircle2 size={14} className="text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="bg-primary rounded-3xl p-8 border border-slate-800 shadow-2xl overflow-hidden relative"
            >
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <pre className="font-mono text-sm text-slate-300 overflow-x-auto">
                <code>{`POST /api/v1/messages
{
  "to": "5511999999999",
  "template": "notificacao_financeira",
  "language": "pt_BR",
  "components": [
    {
      "type": "body",
      "parameters": [
        { "type": "text", "text": "Cliente X" }
      ]
    }
  ]
}`}</code>
              </pre>
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 py-1 px-3 mb-6 text-xs font-bold text-secondary bg-secondary/10 rounded-full tracking-wide">
              <Lock size={14} /> SEGURANÇA E CONFORMIDADE
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Sua empresa em boas mãos</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              A Tribo Sistemas trata os dados recebidos da Meta somente na medida necessária para operar a integração com o WhatsApp Business Platform. Os dados não são vendidos, compartilhados para publicidade ou usados para finalidades não relacionadas à prestação do serviço contratado.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Autorização Expressa', text: 'Uso somente mediante autorização da empresa cliente.' },
              { title: 'Acesso Restrito', text: 'Acesso seguro e segmentado por empresa.' },
              { title: 'Logs Operacionais', text: 'Rastreabilidade completa de todas as operações.' },
              { title: 'Respeito ao Opt-in', text: 'Total conformidade com o consentimento do destinatário.' },
              { title: 'Templates Aprovados', text: 'Uso obrigatório de modelos validados pela Meta.' },
              { title: 'Privacidade Total', text: 'Não vendemos dados nem os usamos para publicidade.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl border border-slate-200 bg-white hover:border-secondary/30 hover:shadow-lg transition-all"
              >
                <div className="bg-slate-100 p-3 rounded-2xl w-fit mb-6 text-primary">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company */}
      <section className="section-padding bg-slate-900 text-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Quem é a Tribo Sistemas</h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-6">
                A Tribo Sistemas é uma empresa brasileira de tecnologia especializada no desenvolvimento de soluções empresariais, integrações, sistemas de gestão, APIs e automações para empresas.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                A Tribo Mensageria foi criada para facilitar a comunicação operacional entre empresas e seus clientes por canais digitais integrados, unindo robustez técnica ao compliance necessário para o mercado atual.
              </p>
            </motion.div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square bg-white/5 rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent" />
                <span className="text-4xl font-black text-white/50 tracking-tighter">TRIBO SISTEMAS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Entre em contato</h2>
              <p className="text-lg text-slate-600 mb-10">
                Estamos prontos para ajudar sua empresa a profissionalizar sua mensageria.
              </p>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 p-3 rounded-xl text-primary mt-1">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">E-mail</h4>
                    <p className="text-slate-600">contato@tribosistemas.com.br</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 p-3 rounded-xl text-primary mt-1">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Site</h4>
                    <p className="text-slate-600">https://mensageria.tribosistemas.com.br</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 p-3 rounded-xl text-primary mt-1">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Localização</h4>
                    <p className="text-slate-600">Brasil</p>
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-12 border-t border-slate-100 italic text-slate-500 text-sm space-y-1">
                <p>Empresa: Tribo Sistemas</p>
                <p>Produto: Tribo Mensageria</p>
                <p>Site: <a href="https://mensageria.tribosistemas.com.br" className="text-primary hover:underline">https://mensageria.tribosistemas.com.br</a></p>
                <p>País: Brasil</p>
              </div>
            </div>
            <div className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-200">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="bg-accent/10 text-accent p-4 rounded-full w-fit mx-auto mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Mensagem enviada!</h3>
                  <p className="text-slate-600">Agradecemos o contato. Em breve nossa equipe retornará.</p>
                  <button className="mt-8 text-primary font-bold underline" onClick={() => setSubmitted(false)}>Enviar outra mensagem</button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary">Nome completo</label>
                      <input required type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary">Empresa</label>
                      <input required type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary">E-mail corporativo</label>
                      <input required type="email" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary">Telefone / WhatsApp</label>
                      <input required type="tel" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary">Mensagem</label>
                    <textarea required rows={4} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md">Enviar Mensagem</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const PrivacyPage = () => (
  <div className="pt-32 pb-20 container-custom">
    <Link to="/" className="flex items-center gap-2 text-primary font-bold mb-8 hover:opacity-70 group">
      <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-slate-200 transition-colors">
        <Menu className="rotate-180" size={20} /> 
      </div>
      Voltar para o Início
    </Link>
    <div className="prose prose-slate max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-primary mb-8">Política de Privacidade</h1>
      <p className="text-lg text-slate-600 mb-6 font-semibold">
        A Tribo Sistemas coleta e trata dados necessários para operação da plataforma Tribo Mensageria no domínio https://mensageria.tribosistemas.com.br.
      </p>
      <div className="space-y-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-bold text-primary mb-3">1. Coleta de Dados</h2>
          <p>Tratamos informações incluindo dados cadastrais de empresas clientes, informações técnicas de integração, identificadores de canais, números conectados, status de mensagens, logs operacionais e dados necessários para suporte e segurança.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-primary mb-3">2. Finalidade</h2>
          <p>Os dados são processados exclusivamente para a prestação dos serviços de mensageria, manutenção da segurança da plataforma e suporte técnico ao cliente contratante.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-primary mb-3">3. Uso dos dados da Meta/WhatsApp</h2>
          <p>Dados recebidos da Meta são usados somente para operar a integração com o WhatsApp Business Platform, mediante autorização do cliente. Estes dados não são vendidos, compartilhados para fins publicitários ou utilizados para finalidades estranhas ao serviço.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-primary mb-3">4. Segurança</h2>
          <p>Empregamos medidas técnicas e organizacionais adequadas para proteger os dados contra acessos não autorizados e situações acidentais ou ilícitas de destruição, perda, alteração ou difusão.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-primary mb-3">5. Direitos dos Titulares (LGPD)</h2>
          <p>Garantimos aos titulares dos dados o exercício de seus direitos fundamentais, incluindo acesso, correção, eliminação e portabilidade, conforme previsto pela Lei Geral de Proteção de Dados Pessoais do Brasil.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-primary mb-3">6. Contato</h2>
          <p>Para dúvidas sobre privacidade, entre em contato via e-mail: contato@tribosistemas.com.br</p>
        </section>
      </div>
    </div>
  </div>
);

const TermsPage = () => (
  <div className="pt-32 pb-20 container-custom">
    <Link to="/" className="flex items-center gap-2 text-primary font-bold mb-8 hover:opacity-70 group">
      <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-slate-200 transition-colors">
        <Menu className="rotate-180" size={20} /> 
      </div>
      Voltar para o Início
    </Link>
    <div className="prose prose-slate max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-primary mb-8">Termos de Uso</h1>
      <div className="space-y-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-bold text-primary mb-3">1. Uso Responsável</h2>
          <p>O cliente deve usar a plataforma no endereço https://mensageria.tribosistemas.com.br exclusivamente de forma legal e ética. É expressamente proibido o uso da Tribo Mensageria para envio de spam, comunicações abusivas, fraudulentas ou não autorizadas.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-primary mb-3">2. Consentimento do Destinatário</h2>
          <p>O cliente é integralmente responsável por obter e gerenciar o consentimento (opt-in) dos destinatários das mensagens, garantindo que o canal de comunicação seja desejado pelo usuário final.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-primary mb-3">3. Políticas da Meta/WhatsApp</h2>
          <p>O cliente obriga-se a respeitar todas as políticas comerciais e de soluções para o WhatsApp Business estabelecidas pela Meta. O descumprimento destas políticas pode acarretar a suspensão imediata do serviço.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-primary mb-3">4. Suspensão de Uso</h2>
          <p>A Tribo Sistemas reserva-se o direito de suspender ou encerrar o acesso de clientes que violem estes termos ou utilizem a plataforma de maneira que coloque em risco a reputação do serviço ou a integridade técnica da integração.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-primary mb-3">5. Limites e Planos</h2>
          <p>O serviço está sujeito aos limites de volume, planos de consumo e taxas vigentes conforme o contrato de serviço estabelecido entre as partes.</p>
        </section>
      </div>
    </div>
  </div>
);

// --- Main App Component ---

export default function App() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/politica-de-privacidade" element={<PrivacyPage />} />
          <Route path="/termos-de-uso" element={<TermsPage />} />
          {/* Fallback to home */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
