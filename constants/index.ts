export const navLinks = [
  {
    label: "Home",
    route: "/",
    icon: "/assets/icons/home.svg",
  },
  {
    label: "Restaurar Imagem",
    route: "/transformations/add/restore",
    icon: "/assets/icons/image-broken.svg",
  },
  {
    label: "Preenchimento Generativo",
    route: "/transformations/add/fill",
    icon: "/assets/icons/stars.svg",
  },
  {
    label: "Remover Objetos",
    route: "/transformations/add/remove",
    icon: "/assets/icons/scan.svg",
  },
  {
    label: "Recolorir Objetos",
    route: "/transformations/add/recolor",
    icon: "/assets/icons/paint-bucket.svg",
  }, 
  {
    label: "Remover Fundo",
    route: "/transformations/add/removeBackground",
    icon: "/assets/icons/camera-slash.svg",
  },
  {
    label: "Recortar Imagem",
    route: "/transformations/add/crop",
    icon: "/assets/icons/crop.svg",
  },
  {
    label: "Compressor de Imagem",
    route: "/transformations/add/compress",
    icon: "/assets/icons/compress.svg",
  },
  {
    label: "Meus créditos",
    route: "/credit",
    icon: "/assets/icons/coins.svg",
  },
  {
    label: "Sair",
    route: "/sign-in",
    icon: "/assets/icons/sign-out.svg",
  }
];

export const transformationTypes = {
  restore: {
    type: "restore",
    title: "Restaurar Imagem",
    transformedLabel: "Restauração de Imagem",
    labelButton: "Restaurar Imagem",
    subTitle: "Refine imagens removendo ruídos e imperfeições.",
    config: { restore: true },
    icon: "image-broken.svg",
  },
  removeBackground: {
    type: "removeBackground",
    title: "Remover Fundo",
    transformedLabel: "Remoção do fundo",
    labelButton: "Remover Fundo",
    subTitle: "Destaque o que realmente importa em suas fotos usando IA.",
    config: { removeBackground: true },
    icon: "camera-slash.svg",
  },
  fill: {
    type: "fill",
    title: "Preenchimento Generativo",
    transformedLabel: "Preenchimento Generativo",
    labelButton: "Preencher com IA",
    subTitle: "Complete espaços vazios com o poder da Inteligência Artificial.",
    config: { fillBackground: true },
    icon: "stars.svg",
  },
  remove: {
    type: "remove",
    title: "Remover Objetos",
    transformedLabel: "Remoção de Objeto",
    labelButton: "Remover Objeto",
    subTitle: "Elimine de forma precisa objetos indesejados de suas fotos.",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
    icon: "scan.svg",
  },
  recolor: {
    type: "recolor",
    title: "Recolorir Objetos",
    transformedLabel: "Recoloração de Objeto",
    labelButton: "Recolorir Objeto",
    subTitle: "Usa IA generativa para recolorir partes da sua imagem.",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: "paint-bucket.svg",
  },
  crop: {
    type: "crop",
    title: "Recortar Imagem",
    transformedLabel: "Recorte de Imagem",
    labelButton: "Recortar Imagem",
    subTitle: "Redimensione suas fotos para se encaixar em qualquer lugar.",
    config: {
      crop: { },
    },
    icon: "crop.svg",
  },
  compress: {
    type: "compress",
    title: "Comprimir Imagem",
    transformedLabel: "Comprimir Imagem",
    labelButton: "Comprimir Imagem",
    subTitle: "Comprima imagens reduzindo seu tamanho sem perder a qualidade.",
    config: {
      crop: {},
    },
    icon: "compress.svg",
  },
};

export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Quadrado (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Retrato Padrão (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Retrato de Celular (9:16)",
    width: 1000,
    height: 1778,
  },
};

export const defaultValues = {
  title: "",
  aspectRatio: "",
  color: "",
  prompt: "",
  publicId: ""
};

export const creditFee = -1;