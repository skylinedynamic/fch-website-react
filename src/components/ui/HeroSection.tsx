import Link from 'next/link';
import Image from 'next/image';
import { HomeData } from '@/types/cms';


export default function HeroSection({ data }: { data: HomeData }) {

  const { hero } = data;
  return (
    <section className="hero-section hero-3" style={{ backgroundImage: `url('${hero.images.bg}')` }}>
      <div className="row g-4 align-items-center">
        <div className="col-xl-7 col-lg-6">
          <div className="hero-content">
            <h1 className="wow fadeInUp" data-wow-delay=".2s">
              {hero.title}
            </h1>
            <div className="text-item wow fadeInUp" data-wow-delay=".4s">
              <p>{hero.text}</p>
              <img 
                src={hero.images.small} 
                alt="Checkmark icon indicating verified funding success" 
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="hero-button wow fadeInUp animated" data-wow-delay=".6s">
              <Link href={hero.cta.link} className="theme-btn btn-style-one">
                {hero.cta.text}
                <span className="icon">
                  <i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-xl-5 col-lg-6 wow fadeInUp" data-wow-delay=".3s">
          <div className="hero-image ed_top_img">
            <img 
              src={hero.images.main} 
              alt="Entrepreneur analyzing business growth charts and funding trajectories" 
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
            <div className="ellipse-shape">
              <img 
                src={hero.images.ellipse} 
                alt="Decorative ellipse background for hero image" 
                loading="lazy" 
                decoding="async"
              />
            </div>
            <div className="text-circle">
              <svg className="circle-svg-text animation__rotate" viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path id="circlePath"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                </defs>
                <text>
                  <textPath href="#circlePath" startOffset="0%">
                    No Hard Credit Pull &bull; No Hard Credit Pull &bull;
                  </textPath>
                </text>
              </svg>
              <img src={hero.images.star} alt="Success star icon - Symbolizing approval and quality" className="star" />
            </div>
          </div>
        </div>
      </div>
      <div className="paper-shape">
        <img src={hero.images.paperShape} alt="Decorative paper texture background element" />
      </div>
    </section>
  );
}
