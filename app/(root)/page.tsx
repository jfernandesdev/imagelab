import Image from "next/image"

const Home = () => {
  return (
    <div className="home">
      <h1 className="home-heading">
        Simplifique suas edições <br /> com
        <span> ImageLab
          <Image
            src="/assets/icons/shine.svg"
            alt="ImageLab"
            height="24"
            width="24"
          />
        </span>
      </h1>

      <Image
        src="/assets/images/girl-image-banner.svg"
        alt="ImageLab"
        height="400"
        width="400"
      />
    </div>
  )
}

export default Home