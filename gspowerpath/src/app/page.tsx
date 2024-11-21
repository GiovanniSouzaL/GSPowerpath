"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ParceiroCard from "@/components/ParceiroCard/ParceiroCard";

const HomePage = () => {
  const parceiros = [
    { name: "SAP", description: "Criadora de softwares de gestão de empresas.", logo: "/image/sap.png" },
    { name: "FIA Fórmula E", description: "Promotora de inovação no automobilismo sustentável.", logo: "/image/FIA.png" },
    { name: "Mahindra Racing", description: "Líder no automobilismo indiano e sustentável.", logo: "/image/Mahindra.jpg" },
    { name: "Ultragaz", description: "Soluções de energia há mais de 80 anos.", logo: "/image/Ultragaz.png" },
    { name: "Ultracargo", description: "Referência em armazenagem de granéis líquidos.", logo: "/image/Ultracargo.png" },
  ];

  return (
    <main>
      <section className="banner">
        <h2>Transforme sua jornada em um impacto positivo</h2>
        <p>PowerPath: Simplificando o uso de veículos elétricos para um futuro sustentável.</p>
        <div>
          <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
            Saiba Mais
          </button>
          <Link href="/funcionalidades">
            <button>Funcionalidades</button>
          </Link>
        </div>
      </section>
      <section id="partners">
        <h3>Empresas que acreditam no PowerPath</h3>
        <div className="partners-grid">
          {parceiros.map((parceiro, index) => (
            <ParceiroCard
              key={index}
              logo={parceiro.logo}
              name={parceiro.name}
              description={parceiro.description}
            />
          ))}
        </div>
      </section>
      <section id="about">
        <h3>O que é PowerPath?</h3>
        <div className="about-block">
          <Image
            src="/image/car-electric.jpg"
            alt="Veículo elétrico carregando"
            width={600}
            height={400}
            className="about-image"
          />
          <div className="about-text">
            <p>
              O <strong>PowerPath</strong> é a solução definitiva para quem quer adotar um estilo de vida sustentável e
              eficiente com veículos elétricos. Com nosso aplicativo, você pode localizar rapidamente estações de
              recarga, planejar rotas inteligentes e monitorar o impacto ambiental positivo das suas viagens.
            </p>
            <p>
              Cada funcionalidade foi pensada para simplificar sua experiência, tornando o uso de veículos elétricos
              mais acessível e prático. Desde a escolha da estação de recarga até a otimização de consumo energético,
              o PowerPath cuida de tudo.
            </p>
          </div>
        </div>
        <div className="about-block reverse">
          <div className="about-text">
            <p>
              Nosso <strong>mapa interativo</strong> é projetado para oferecer informações em tempo real, incluindo
              status de disponibilidade de carregadores, tipos de carregadores (rápido, normal) e custos associados.
              Use filtros avançados para encontrar a estação ideal para suas necessidades.
            </p>
            <p>
              Além disso, você pode receber notificações quando uma estação nas proximidades estiver disponível,
              economizando tempo e aumentando a eficiência das suas viagens.
            </p>
          </div>
          <Image
            src="/image/charging-station.jpg"
            alt="Estação de recarga para veículos elétricos"
            width={600}
            height={400}
            className="about-image"
          />
        </div>
        <div className="about-block">
          <Image
            src="/image/eco-friendly.jpg"
            alt="Impacto ambiental positivo"
            width={600}
            height={400}
            className="about-image"
          />
          <div className="about-text">
            <p>
              O impacto ambiental é uma prioridade para nós. O PowerPath oferece relatórios detalhados que mostram sua
              economia de CO₂ em comparação com veículos a combustão. Cada quilômetro percorrido é um passo em direção
              a um futuro mais limpo e sustentável.
            </p>
            <p>
              Quer compartilhar sua contribuição para o planeta? Nossa plataforma permite que você compartilhe seus
              resultados com amigos e familiares, incentivando mais pessoas a aderirem à mobilidade elétrica.
            </p>
          </div>
        </div>
        <div className="about-block reverse">
          <div className="about-text">
            <p>
              Para tornar tudo ainda mais interessante, o <strong>PowerPath</strong> conta com um sistema de{" "}
              <strong>gamificação</strong>. Complete desafios como “Viaje 100 km sem emissões” ou “Use um ponto de
              recarga solar” para ganhar recompensas exclusivas. Quanto mais você utiliza o aplicativo, mais você ganha.
            </p>
            <p>
              Torne-se um exemplo de sustentabilidade e inspire outros usuários. Acompanhe sua evolução no ranking da
              comunidade e compartilhe suas conquistas.
            </p>
          </div>
          <Image
            src="/image/gamification.jpg"
            alt="Sistema de gamificação"
            width={600}
            height={400}
            className="about-image"
          />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
