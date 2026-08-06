"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "E-mail", value: "contato@nexusglobalgroup.com.br", href: "mailto:contato@nexusglobalgroup.com.br" },
  { icon: Phone, label: "Telefone / WhatsApp", value: "+55 (11) 9 0000-0000", href: "tel:+5511900000000" },
  { icon: MapPin, label: "Localização", value: "São Paulo, SP — Brasil", href: "https://nexusglobalgroup.com.br" }
];

export default function ContatoPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: integrate with backend API / email service
    setSubmitted(true);
  }

  return (
    <main className="inner-page" id="main-content">
      <div className="inner-hero">
        <div className="lp-container">
          <span className="section-eyebrow">Fale Conosco</span>
          <h1 className="inner-title">Contato</h1>
          <p className="inner-subtitle">Nossa equipe está pronta para ajudar. Preencha o formulário ou use um dos canais abaixo.</p>
        </div>
      </div>

      <div className="lp-container inner-body">
        <div className="contact-layout">
          {/* CONTACT INFO */}
          <aside className="contact-info" aria-label="Informações de contato">
            <h2>Canais de Atendimento</h2>
            <ul role="list">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true"><Icon size={20} /></div>
                  <div>
                    <span className="contact-info-label">{label}</span>
                    <a href={href} className="contact-info-value" target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      {value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <div className="contact-website">
              <span>Website oficial</span>
              <a href="https://nexusglobalgroup.com.br" target="_blank" rel="noreferrer">nexusglobalgroup.com.br</a>
            </div>
          </aside>

          {/* CONTACT FORM */}
          <section className="contact-form-section" aria-labelledby="form-heading">
            <h2 id="form-heading">Envie uma Mensagem</h2>
            {submitted ? (
              <div className="form-success" role="alert">
                <strong>✦ Mensagem enviada!</strong>
                <p>Obrigado pelo contato. Nossa equipe retornará em breve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name">Nome *</label>
                    <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Seu nome completo" autoComplete="name" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">E-mail *</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="seu@email.com" autoComplete="email" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="company">Empresa</label>
                    <input id="company" name="company" type="text" value={form.company} onChange={handleChange} placeholder="Nome da empresa" autoComplete="organization" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="subject">Assunto *</label>
                    <select id="subject" name="subject" required value={form.subject} onChange={handleChange}>
                      <option value="">Selecione...</option>
                      <option>Aviation — Operações</option>
                      <option>Aviation — MRO</option>
                      <option>Aviation — Consultoria ANAC</option>
                      <option>Education — Formação</option>
                      <option>Education — Treinamento Corporativo</option>
                      <option>Dashboard / Inteligência Executiva</option>
                      <option>Outros</option>
                    </select>
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="message">Mensagem *</label>
                  <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Descreva sua necessidade ou dúvida..." />
                </div>
                <button type="submit" className="btn btn-primary btn-lg form-submit">
                  Enviar mensagem
                  <Send size={16} aria-hidden="true" />
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
