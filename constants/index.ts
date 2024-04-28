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
    icon: "/assets/icons/filter.svg",
  }, 
  {
    label: "Remover Fundo",
    route: "/transformations/add/remove-background",
    icon: "/assets/icons/camera-slash.svg",
  },
  {
    label: "Recortar Imagem",
    route: "/transformations/add/crop",
    icon: "/assets/icons/crop.svg",
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
    subTitle: "Refine imagens removendo ruídos e imperfeições.",
    config: { restore: true },
    icon: "image-broken.svg",
  },
  removeBackground: {
    type: "remove-background",
    title: "Remover Fundo",
    subTitle: "Destaque o que realmente importa em suas fotos usando IA.",
    config: { removeBackground: true },
    icon: "camera-slash.svg",
  },
  fill: {
    type: "fill",
    title: "Preenchimento Generativo",
    subTitle: "Melhore as dimensões de uma imagem usando pintura externa de IA.",
    config: { fillBackground: true },
    icon: "stars.svg",
  },
  remove: {
    type: "remove",
    title: "Remover Objetos",
    subTitle: "Elimine de forma precisa objetos indesejados de suas fotos.",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
    icon: "scan.svg",
  },
  recolor: {
    type: "recolor",
    title: "Recolorir Objetos",
    subTitle: "Altere cores de objetos de maneira natural e realista.",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: "filter.svg",
  },
  crop: {
    type: "crop",
    title: "Recortar Imagem",
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
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
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