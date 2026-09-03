export interface InstallmentOption {
  times: string;
  value: string;
}

export interface PackageItem {
  id: string;
  name: string;
  duration?: string;
  features: string[];
  price: string;
  paymentMethod: string;
  isFeatured?: boolean;
  badge?: string;
  whatsAppText: string;
  installments: InstallmentOption[];
}

export const brandConfig = {
  name: "Modkovski Fotografia",
  subName: "Fotografia · Vídeo · Histórias reais",
  color: "#4E0000",
  instagram: {
    handle: "@modkovskifotografia",
    url: "https://www.instagram.com/modkovskifotografia/",
  },
  whatsApp: {
    number: "5569999718820",
    url: "https://wa.me/5569999718820",
  },
  client: {
    name: "Wílran Breno",
    event: "Cobertura na Catedral",
    date: "10 de Outubro de 2026",
    time: "16h",
    dateFormatted: "10 de Outubro de 2026 · 16h",
  },
  hero: {
    tagline: "Portfólio",
    title: "O seu momento. Para sempre.",
    quote: "Alguns momentos passam em poucos segundos. O registro certo faz com que eles permaneçam eternos.",
    ctaText: "Ver Proposta Comercial",
    image: "/images/capa.jpg",
    // Premium wedding editorial photography fallback
    imageFallback: "https://picsum.photos/seed/modkovski-hero/1920/1280",
  },
  about: {
    title: "Modkovski Fotografia",
    eyebrow: "Quem vai registrar esse momento?",
    paragraphs: [
      "Sou Alessandra Modkovski, fotógrafa, videomaker e produtora de conteúdo, atuando há mais de dois anos.",
      "Meu trabalho une um olhar atento aos detalhes, sensibilidade e direção cuidadosa para transformar momentos reais em registros que tenham significado.",
      "Mais do que simplesmente fotografar ou filmar, busco registrar a essência de cada história com naturalidade, profissionalismo e olhar artístico.",
      "Para que, ao rever essas imagens, você não apenas lembre do que aconteceu, mas sinta novamente como aquele momento foi vivido."
    ],
    image: "/images/fotografa.jpg",
    imageFallback: "https://picsum.photos/seed/modkovski-about/1200/1500",
  },
  portfolio: {
    eyebrow: "Um pouco do meu trabalho",
    title: "Histórias reais.",
    items: [
      { 
        id: "p1", 
        type: "image", 
        src: "/images/portfolio-01.jpg", 
        fallbackSrc: "https://picsum.photos/seed/modkovski-p1/1200/1500", 
        caption: "Fotografia", 
        description: "Registros naturais e atentos aos detalhes." 
      },
      { 
        id: "v1", 
        type: "video", 
        src: "/videos/video-01.mp4", 
        fallbackVideo: "https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-holding-hands-42289-large.mp4", 
        fallbackPoster: "https://picsum.photos/seed/modkovski-v1-poster/1920/1080", 
        caption: "Em movimento", 
        description: "Vídeos para reviver cada instante." 
      },
      { 
        id: "p2", 
        type: "image", 
        src: "/images/portfolio-02.jpg", 
        fallbackSrc: "https://picsum.photos/seed/modkovski-p2/1200/1500", 
        caption: "Detalhes", 
        description: "Porque são eles que tornam cada história única." 
      },
      { 
        id: "p3", 
        type: "image", 
        src: "/images/portfolio-03.jpg", 
        fallbackSrc: "https://picsum.photos/seed/modkovski-p3/1200/1500", 
        caption: "Cumplicidade", 
        description: "A conexão capturada de forma pura." 
      },
      { 
        id: "p4", 
        type: "image", 
        src: "/images/portfolio-04.jpg", 
        fallbackSrc: "https://picsum.photos/seed/modkovski-p4/1200/1500", 
        caption: "Emoção", 
        description: "Sorrisos e lágrimas que contam a história." 
      },
      { 
        id: "v2", 
        type: "video", 
        src: "/videos/video-02.mp4", 
        fallbackVideo: "https://assets.mixkit.co/videos/preview/mixkit-putting-on-the-wedding-ring-40019-large.mp4", 
        fallbackPoster: "https://picsum.photos/seed/modkovski-v2-poster/1920/1080", 
        caption: "Essência", 
        description: "O ritmo e a atmosfera em formato de filme." 
      },
      { 
        id: "p5", 
        type: "image", 
        src: "/images/portfolio-05.jpg", 
        fallbackSrc: "https://picsum.photos/seed/modkovski-p5/1200/1500", 
        caption: "A Cerimônia", 
        description: "O ápice do compromisso e da promessa." 
      },
      { 
        id: "p6", 
        type: "image", 
        src: "/images/portfolio-06.jpg", 
        fallbackSrc: "https://picsum.photos/seed/modkovski-p6/1200/1500", 
        caption: "Para Sempre", 
        description: "O início de um novo capítulo registrado para sempre." 
      },
    ]
  },
  process: {
    eyebrow: "Depois da escolha",
    title: "Como funciona o processo?",
    steps: [
      { number: "01", title: "Escolha e Reserva", description: "Você escolhe a experiência e reserva a data mediante sinal de 30% do valor contratado, e o restante no dia do ensaio ou gravação, ou integral parcelado no cartão de crédito." },
      { number: "02", title: "Contrato", description: "A contratação é formalizada através de contrato e emissão de nota fiscal." },
      { number: "03", title: "Alinhamento", description: "Vamos marcar uma reunião para alinhar as expectativas, referências e passar algumas orientações." },
      { number: "04", title: "Captação", description: "Um dia antes da captação vamos reforçar algumas orientações, e vamos estar presentes no local e hora combinada." },
      { number: "05", title: "Seleção", description: "Após o pagamento do restante do valor e um pré-tratamento das fotos, vamos encaminhar um link para seleção na nossa plataforma. É possível adquirir fotos extras." },
      { number: "06", title: "Entrega", description: "Após o processo de seleção, tratamento e edição, todos os materiais são entregues de acordo com o prazo de cada pacote." },
    ]
  },
  testimonial: {
    eyebrow: "Experiências reais",
    title: "Quem já viveu essa experiência.",
    items: [
      {
        id: 1,
        occasion: "1 ANO DE CASADOS",
        quote: "“Eu queria muito eternizar esse momento e compartilhar a nossa alegria, sou muito grata. A gente começou com vergonha e depois fomos nos soltando, foi muito divertido. A equipe nos conduziu de forma leve e divertida.”",
        client: "ANDRESSA E DEIVISON",
      },
      {
        id: 2,
        occasion: "ENSAIO FOTOGRÁFICO E VÍDEOS",
        quote: "“Meninas, passando para agradecer por toda a experiência de hoje! Vocês foram maravilhosas do início ao fim. Amei a sessão de fotos, me deixaram super à vontade, foram muito acolhedoras, tiveram toda a paciência e ainda foram dando ideias e direcionamentos durante o ensaio, o que fez toda a diferença. Me senti muito tranquila e confiante. Dá para perceber o carinho e o profissionalismo de vocês em cada detalhe. Foi uma experiência leve e especial, e eu só tenho elogios. Com certeza vou indicar o trabalho de vocês para todo mundo que eu puder! Muito obrigada por tornarem esse momento tão incrível.”",
        client: "ANA LETÍCIA | ADVOGADA",
      },
      {
        id: 3,
        occasion: "ANIVERSÁRIO 1 ANO DA HELOÍSA",
        quote: "“A gente recebeu o serviço de fotografia e de filmagem, gostamos muito, elas foram bem atenciosas com todos os nossos convidados. A gente teve algumas intercorrências aqui na festa, elas aguardaram e fizeram um serviço maravilhoso. A gente ficou encantado, agradecemos muito.”",
        client: "POLIANE E JULIAN",
      },
      {
        id: 4,
        occasion: "FOTOGRAFIA E PRODUÇÃO DE VÍDEO MENSAL",
        quote: "“Nós tivemos muita dificuldade com equipes de mídia por questão de criatividade, compromisso e prazo, essa é uma dor de várias empresas. Elas fornecem o serviço pra gente um pouco mais de 1 ano, sempre entregam no prazo, com criatividade, ideias, roteiro pronto, tudo organizado com planejamento. Temos reuniões mensais e eu não me preocupo com nada. A gente vê que elas fazem o serviço com amor e com excelência.”",
        client: "LAURA DA MAMTUR VIAGENS",
      },
      {
        id: 5,
        occasion: "FOTOGRAFIA E PRODUÇÃO DE VÍDEO",
        quote: "“Contratar o trabalho delas foi fundamental no contexto profissional, as pessoas começaram a alcançar temas importantes a respeito da saúde mental, não só clientes, mas pessoas que assistem e passam a colocar em prática o que é falado. Esse serviço foi fundamental na minha profissão.”",
        client: "SÉRGIO | PSICÓLOGO",
      }
    ],
    // Mantido para compatibilidade
    occasion: "1 ano de casados",
    quote: "“Eu queria muito eternizar esse momento e compartilhar a nossa alegria, sou muito grata. A gente começou com vergonha e depois fomos nos soltando, foi muito divertido. A equipe nos conduziu de forma leve e divertida.”",
    client: "Andressa e Deivison",
  },
  finalCta: {
    title: "Vamos registrar esse momento?",
    description: "O seu momento vai acontecer uma única vez. Mas as lembranças podem permanecer por toda a vida.",
    buttonText: "QUERO RESERVAR MINHA DATA",
    whatsAppText: "Olá! Vi minha proposta da Modkovski Fotografia e quero conversar sobre a cobertura da cerimônia."
  },
  packageSections: [
    {
      id: "sec-1",
      eyebrow: "A proposta",
      title: "Cobertura de Eventos",
      description: "Preparamos três possibilidades de cobertura para que você escolha o formato que mais combina com aquilo que deseja guardar desse dia. Desde uma cobertura mais objetiva até uma experiência completa, com todos os registros.",
      packages: [
        {
          id: "pkg-01",
          name: "Cobertura Essencial",
          duration: "Duração de até 01:30h",
          features: [
            "01 vídeo até 1:30seg",
            "01 capa pra vídeo",
            "Registro dos principais momentos",
            "Edição dinâmica, cortes essenciais e trilha sonora",
            "Prazo de entrega de até 72 horas"
          ],
          price: "R$ 200",
          paymentMethod: "Pix",
          whatsAppText: "Olá! Vi minha proposta da Modkovski Fotografia e gostei da Cobertura Essencial. Gostaria de conversar sobre a cobertura.",
          installments: [
            { times: "1x", value: "R$ 208,77" },
            { times: "2x", value: "R$ 106,49 (R$ 212,98)" },
            { times: "3x", value: "R$ 71,69 (R$ 215,08)" },
            { times: "4x", value: "R$ 54,30 (R$ 217,18)" },
            { times: "5x", value: "R$ 43,86 (R$ 219,30)" },
            { times: "6x", value: "R$ 36,90 (R$ 221,42)" },
            { times: "7x", value: "R$ 32,69 (R$ 228,81)" },
            { times: "8x", value: "R$ 28,88 (R$ 231,00)" },
            { times: "9x", value: "R$ 25,92 (R$ 233,24)" },
            { times: "10x", value: "R$ 23,55 (R$ 235,46)" },
            { times: "11x", value: "R$ 21,61 (R$ 237,73)" },
            { times: "12x", value: "R$ 20,00 (R$ 240,00)" },
          ]
        },
        {
          id: "pkg-02",
          name: "Cobertura Clássica",
          duration: "Duração de até 02h",
          features: [
            "02 vídeos até 1:30seg",
            "02 capas para vídeos",
            "Cobertura ampliada do evento",
            "Edição dinâmica, cortes essenciais e trilha sonora",
            "Prazo de entrega de até 5 dias"
          ],
          price: "R$ 380",
          paymentMethod: "Pix",
          whatsAppText: "Olá! Vi minha proposta da Modkovski Fotografia e gostei da Cobertura Clássica. Gostaria de conversar sobre a cobertura.",
          installments: [
            { times: "1x", value: "R$ 396,66" },
            { times: "2x", value: "R$ 202,33 (R$ 404,65)" },
            { times: "3x", value: "R$ 136,22 (R$ 408,65)" },
            { times: "4x", value: "R$ 103,16 (R$ 412,65)" },
            { times: "5x", value: "R$ 83,34 (R$ 416,68)" },
            { times: "6x", value: "R$ 70,12 (R$ 420,69)" },
            { times: "7x", value: "R$ 62,11 (R$ 434,74)" },
            { times: "8x", value: "R$ 54,86 (R$ 438,90)" },
            { times: "9x", value: "R$ 49,24 (R$ 443,16)" },
            { times: "10x", value: "R$ 44,74 (R$ 447,38)" },
            { times: "11x", value: "R$ 41,06 (R$ 451,68)" },
            { times: "12x", value: "R$ 38,00 (R$ 456,00)" },
          ]
        },
        {
          id: "pkg-03",
          name: "Cobertura Especial",
          duration: "Duração de até 03h",
          isFeatured: true,
          badge: "EXPERIÊNCIA COMPLETA",
          features: [
            "03 vídeos até 1:30seg",
            "03 capas para vídeos",
            "Maior tempo de cobertura",
            "Edição dinâmica, cortes essenciais e trilha sonora",
            "Prazo de entrega de até 7 dias"
          ],
          price: "R$ 555",
          paymentMethod: "Pix",
          whatsAppText: "Olá! Vi minha proposta da Modkovski Fotografia e gostei da Cobertura Especial. Gostaria de conversar sobre a cobertura.",
          installments: [
            { times: "1x", value: "R$ 579,34" },
            { times: "2x", value: "R$ 295,51 (R$ 591,02)" },
            { times: "3x", value: "R$ 198,95 (R$ 596,85)" },
            { times: "4x", value: "R$ 150,67 (R$ 602,67)" },
            { times: "5x", value: "R$ 121,71 (R$ 608,56)" },
            { times: "6x", value: "R$ 102,41 (R$ 614,44)" },
            { times: "7x", value: "R$ 90,71 (R$ 634,95)" },
            { times: "8x", value: "R$ 80,13 (R$ 641,03)" },
            { times: "9x", value: "R$ 71,92 (R$ 647,24)" },
            { times: "10x", value: "R$ 65,34 (R$ 653,40)" },
            { times: "11x", value: "R$ 59,97 (R$ 659,70)" },
            { times: "12x", value: "R$ 55,50 (R$ 666,00)" },
          ]
        }
      ]
    }
  ]
};
