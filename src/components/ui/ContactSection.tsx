export default function ContactSection({ data }) {
  const { contact } = data;
  return (
    <section className="contact-section-3 fix section-padding">
      <div className="auto-container">
        <div className="contact-wrapper-3">
          <div className="row g-4 justify-content-between align-items-center">
            <div className="col-xl-5 col-lg-6">
              <div className="contact-content-style-3">
                <div className="sec-title mb-0">
                  <h6 className="sub-title wow fadeInUp">
                    <span className="triangle triangle1"></span>
                    <span className="triangle triangle2"></span>
                    {contact.subtitle}
                  </h6>
                  <h2 className="wow fadeInUp" data-wow-delay=".3s">
                    let's work together
                  </h2>
                </div>
                <p className="contact-text wow fadeInUp" data-wow-delay=".5s">
                   We denounce with righteous indignation and like men
                   beguiled and demoralized by the charms
                </p>
                <ul className="contact-list wow fadeInUp" data-wow-delay=".7s">
                  <li>
                    <div className="icon">
                      <i className="lnr-icon-phone-handset"></i>
                    </div>
                    <div className="content">
                      <span>Call For Inquiry</span>
                      <h3><a href={`tel:${contact.info.phone}`}>{contact.info.phone}</a></h3>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <i className="lnr-icon-envelope"></i>
                    </div>
                    <div className="content">
                      <span>Send Us Email</span>
                      <h3><a href={`mailto:${contact.info.email}`}>{contact.info.email}</a></h3>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="contact-box-style-3">
                <h3 className="wow fadeInUp" data-wow-delay=".2s">Need Help For Project!</h3>
                <p className="wow fadeInUp" data-wow-delay=".4s">We are ready to help your next projects, let’s work together</p>
                <form action="#0">
                  <div className="row g-4">
                    <div className="col-sm-6 wow fadeInUp">
                      <div className="input">
                        <div className="icon">
                           <i className="lnr-icon-phone-handset"></i>
                        </div>
                        <input type="text" placeholder="Name" />
                      </div>
                    </div>
                    <div className="col-sm-6 wow fadeInUp" data-wow-delay=".2s">
                      <div className="input">
                        <div className="icon"><i className="lnr-icon-envelope"></i></div>
                        <input type="email" placeholder="Email" />
                      </div>
                    </div>
                  </div>
                  <select className="mt-4 wow fadeInUp" data-wow-delay=".4s" name="#" id="subject">
                    <option value="0">Borrower Portal</option>
                    <option value="2">Partner Portal</option>
                  </select>
                  <textarea className="mt-4 wow fadeInUp" data-wow-delay=".6s" name="masage" id="masage" placeholder="Write a Message"></textarea>
                  <button type="submit" className="mt-20 theme-btn btn-style-one wow fadeInUp" data-wow-delay=".8s">
                    Send Message
                    <span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-image">
        <img className="wow bounceInRight" data-wow-delay="200ms" data-wow-duration="1500ms" src={contact.image} alt="Image" />
      </div>
    </section>
  );
}
