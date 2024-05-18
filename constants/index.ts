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
    label: "Meu perfil",
    route: "/profile",
    icon: "/assets/icons/profile.svg",
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
    subTitle: "Refine imagens removendo ruídos e imperfeições.",
    config: { restore: true },
    icon: "image-broken.svg",
  },
  removeBackground: {
    type: "removeBackground",
    title: "Remover Fundo",
    transformedLabel: "Remoção do fundo",
    subTitle: "Destaque o que realmente importa em suas fotos usando IA.",
    config: { removeBackground: true },
    icon: "camera-slash.svg",
  },
  fill: {
    type: "fill",
    title: "Preenchimento Generativo",
    transformedLabel: "Preenchimento Generativo",
    subTitle: "Complete espaços vazios com o poder da Inteligência Artificial.",
    config: { fillBackground: true },
    icon: "stars.svg",
  },
  remove: {
    type: "remove",
    title: "Remover Objetos",
    transformedLabel: "Remoção de Objeto",
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
    subTitle: "Altere cores de objetos de maneira natural e realista.",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: "paint-bucket.svg",
  },
  crop: {
    type: "crop",
    title: "Recortar Imagem",
    transformedLabel: "Recorte de Imagem",
    subTitle: "Redimensione suas fotos para se encaixar em qualquer lugar.",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: "crop.svg",
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
  publicId: "",
};

export const creditFee = -1;