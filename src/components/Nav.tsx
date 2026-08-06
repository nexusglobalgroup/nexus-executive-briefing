"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Início" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/prioridades", label: "Prioridades" },
  { href: "/plano-15-dias", label: "Plano 15 Dias" },
  { href: "/servicos", label: "Serviços" },
  { href: "/briefing", label: "Briefing" },
  { href: "/contato", label: "Contato" }
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="site-nav" aria-label="Navegação principal">
      <div className="nav-inner">
        <Link href="/" className="nav-brand" aria-label="Nexus Global Group — Início">
          <span className="nav-star" aria-hidden="true">✦</span>
          <span className="nav-brand-text">
            <strong>NEXUS</strong>
            <small>GLOBAL GROUP</small>
          </span>
        </Link>

        <ul className={`nav-links ${open ? "nav-open" : ""}`} role="list">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`nav-link ${pathname === href ? "nav-link-active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="nav-cta-item">
            <Link href="/contato" className="nav-cta-btn" onClick={() => setOpen(false)}>
              Fale Conosco
            </Link>
          </li>
        </ul>

        <button
          className="nav-hamburger"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
}
