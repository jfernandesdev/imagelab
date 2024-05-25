import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <main className="root relative flex flex-col md:flex-row items-center justify-center">
      <div className="text-center md:text-left p-6 md:p-12 flex-1 flex flex-col justify-center items-center md:justify-start md:items-start">
        <Image
          src="/assets/logo-text.svg"
          alt="ImageLab"
          width={175}
          height={72}
          className="relative md:absolute md:top-10 mb-5"
        />

        <h1 className="title-hero">
          Simplifique a edição de imagens com <span className="gradient-text">ImageLab</span>
        </h1>

        <p className="text-gray-600 mt-4 md:mt-6">
          Com recursos avançados de IA como restauração, preenchimento, recoloração e remoção de fundo. Deixe os recursos de Generative AI, LLM e Content-Aware trabalhar a seu favor.
        </p>
        <Link href="/sign-in">
          <button className="mt-6 md:mt-8 px-6 py-3 bg-purple-500 hover:bg-purple-gradient text-white text-lg rounded-full flex gap-1 items-center">
            Experimentar grátis
            <Image
              src="/assets/icons/arrow-right.svg"
              alt="CTA"
              width={18}
              height={18}
            />
          </button>
        </Link>
      </div>
      <div className="flex-1">
        <video
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          className="pointer-events-none"
        >
          <source src="/assets/hero-imagelab.mp4" type="video/mp4" />
        </video>
      </div>
    </main>
  );
};

export default Hero;
