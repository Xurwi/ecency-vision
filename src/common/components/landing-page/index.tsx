import React, { FormEvent, useState } from "react";
import htmlParse from 'html-react-parser';
import { subscribeEmail } from "../../api/private-api";
import { _t } from "../../i18n";
import { scrollDown } from "../../img/svg";
import { error, success } from "../feedback";
import LinearProgress from "../linear-progress";
import Link from "../alink";

import { apiBase } from "../../api/helper";
import { handleInvalid, handleOnInput } from "../../util/input-util";
import isElectron from "../../util/is-electron";

const LandingPage = (props: any) => {

  const {global} = props;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const EarnMoney = apiBase(`/assets/illustration-earn-money.${global.canUseWebp?"webp":"png"}`);
  const WhaleCatchsFish = apiBase(`/assets/illustration-true-ownership.${global.canUseWebp?"webp":"png"}`);
  const Decentralization = apiBase(`/assets/illustration-decentralization.${global.canUseWebp?"webp":"png"}`);
  const MechanicFish = apiBase(`/assets/illustration-open-source.${global.canUseWebp?"webp":"png"}`);
  const FishOne = apiBase(`/assets/fish-1.${global.canUseWebp?"webp":"png"}`);
  const FishTwo = apiBase(`/assets/fish-2.${global.canUseWebp?"webp":"png"}`);
  const FishThree = apiBase(`/assets/fish-3.${global.canUseWebp?"webp":"png"}`);
  const FishFour = apiBase(`/assets/fish-4.${global.canUseWebp?"webp":"png"}`);
  const FishFive = apiBase(`/assets/fish-5.${global.canUseWebp?"webp":"png"}`);
  const JuniorFish = apiBase(`/assets/fish-junior.${global.canUseWebp?"webp":"png"}`);
  const SeniorFish = apiBase(`/assets/fish-senior.${global.canUseWebp?"webp":"png"}`);
  const DownloadAndroid = apiBase(`/assets/icon-android.${global.canUseWebp?"webp":"png"}`);
  const OurHistory = apiBase(`/assets/our-history.${global.canUseWebp?"webp":"png"}`);
  const OurTeam = apiBase(`/assets/our-team.${global.canUseWebp?"webp":"png"}`);
  const OurVision = apiBase(`/assets/our-vision.${global.canUseWebp?"webp":"png"}`);
  const FooterMainFish = apiBase(`/assets/footer-main-fish.${global.canUseWebp?"webp":"png"}`);
  const LeftFishes = apiBase(`/assets/left-fishes.${global.canUseWebp?"webp":"png"}`);
  const DownloadAndroidWhite = apiBase(`/assets/icon-android-white.svg`);
  const DownloadIPhone = apiBase(`/assets/icon-apple.svg`);
  const DownloadIPhoneWhite = apiBase(`/assets/icon-apple-white.svg`);
  const DownloadWindows = apiBase(`/assets/icon-windows.svg`);
  const DownloadWindowsWhite = apiBase(`/assets/icon-windows-white.svg`);
  const FooterYoutube = apiBase(`/assets/footer-youtube.svg`);
  const FooterTwitter = apiBase(`/assets/footer-twitter.svg`);
  const FooterTelegram = apiBase(`/assets/footer-telegram.svg`);
  const FooterDiscord = apiBase(`/assets/footer-discord.svg`);
  const PhoneDarkPc = apiBase(`/assets/phone-download-tiny.${global.canUseWebp?"webp":"png"}`);

  const BubbleLeftTop = apiBase(`/assets/bubble-left-top.${global.canUseWebp?"webp":"png"}`);
  const BubbleLeftBottom = apiBase(`/assets/bubble-left-bottom.${global.canUseWebp?"webp":"png"}`);
  const BubbleRightTop = apiBase(`/assets/bubble-right-top.${global.canUseWebp?"webp":"png"}`);
  const BubbleLRightBottom = apiBase(`/assets/bubble-right-bottom.${global.canUseWebp?"webp":"png"}`);
  const BubbleLCenter = apiBase(`/assets/bubble-center.${global.canUseWebp?"webp":"png"}`);
  const DownloadDarkFishes = apiBase(`/assets/download-dark-fishes.${global.canUseWebp?"webp":"png"}`);  

  const FounderImg = apiBase(`/assets/good-karma.${global.canUseWebp?"webp":"jpeg"}`);
  const DevopsImg = apiBase(`/assets/talhasch.${global.canUseWebp?"webp":"jpeg"}`);
  const DesignGuru = apiBase(`/assets/dunsky.${global.canUseWebp?"webp":"jpeg"}`);;

  const LogoCircle = global.isElectron ? "./img/logo-circle.svg" : require("../../img/logo-circle.svg");

  const handleSubsccribe = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await subscribeEmail(email);
      if(200 == response?.status) {
        success(_t("landing-page.success-message-subscribe"))
      } 
    } catch (err) {
      error(_t('landing-page.error-occured'));
    }

    setEmail("");
    setLoading(false)
  };
  
  return (
    <div className={global.isElectron ? "landing-wrapper pt-5" : "landing-wrapper"} id="landing-wrapper">
      <div className="top-bg" />
      <div className="tob-bg-algae" />
      <div className="tob-bg-fishes" />
      <div className="sections first-section">
        <div className="text-container text-center">
          <h1>{_t("landing-page.welcome-text")}</h1>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            <p className="mb-3 w-88">{_t("landing-page.what-is-ecency")}</p>
          </div>
          <button
            className="get-started mx-auto"
            onClick={() => props.setStep(2)}
          >
            {_t("landing-page.get-started")}
          </button>
          <Link className="scroll-down" to="#earn-money">
            {scrollDown}
          </Link>
        </div>
      </div>
      <div className="sections second-section" id="earn-money">
        <div className="part-top">
          <div className="inner">
            <img src={EarnMoney} alt="earn-money" loading="lazy" className="mx-auto m-sm-0" />
            <div className="text-group visible">
              <h2>{_t("landing-page.earn-money")}</h2>
              <p className="mt-2 w-88 mb-5 mb-sm-0">
                {_t("landing-page.earn-money-block-chain-based")}
                <span>
                  <Link to="/signup?referral=ecency">
                    {_t("landing-page.join-us")}
                  </Link>
                </span>
                {_t("landing-page.various-digital-tokens")}
              </p>
              <Link className="link-read-more" to="/faq">
                {_t("landing-page.read-more")}
              </Link>
            </div>
          </div>
        </div>

        <div className="part-bottom">
          <div className="inner">
            <div className="text-group">
              <h2>{_t("landing-page.true-ownership")}</h2>
              <p className="mt-2 w-88">{_t("landing-page.true-ownership-desc")}</p>
            </div>
            <div className="image-wrapper">
              <img
                className="landing-floating-image"
                src={WhaleCatchsFish}
                alt="whale"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sections third-section">
        <div className="part-top pt-sm-5 pt-lg-0">
          <div className="inner">
            <div className="img-wrapper">
              <img
                className="decentralization-img"
                src={Decentralization}
                alt="decentralization"
                loading="lazy"
              />
            </div>
            <div className="text-group visible mw-100">
              <h2>{_t("landing-page.decentralization")}</h2>
              <p>
                <span>
                  <Link to={"https://hive.io"} target="_blank" onClick={()=> isElectron() && window.open('https://hive.io', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')}>
                    {_t("landing-page.hive-blockchain")}
                  </Link>
                </span>{" "}
                {_t("landing-page.decentralization-desc")}
              </p>
            </div>
          </div>
        </div>
        <div className="part-bottom">
          <div className="inner">
            <div className="text-group">
              <h2>{_t("landing-page.open-source")}</h2>
              <p>
                {_t("landing-page.open-source-desc")}
              </p>
              <Link to="/signup?referral=ecency" className="no-break">
                {_t("landing-page.feel-free-join")}
              </Link>
            </div>
            <div className="img-wrapper">
              <img
                className="mechanic"
                src={MechanicFish}
                alt="mechanic"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sections fourth-section">
        <div className="part-top">
          <div className="inner">
            <div className="fish-container">
              <img className="fish three" src={FishThree} alt="earn-money" loading="lazy" />
              <img className="fish five" src={FishFive} alt="earn-money" loading="lazy" />
              <img className="fish four" src={FishFour} alt="earn-money" loading="lazy" />
            </div>
            <div className="fish-container">
              <img className="fish one" src={FishOne} alt="earn-money" loading="lazy" />
              <img className="fish two" src={FishTwo} alt="earn-money" loading="lazy" />
            </div>
            <ul>
              <li>
                <h3>98M</h3>
                <p>{_t("landing-page.posts")}</p>
              </li>
              <li>
                <h3>600K</h3>
                <p>{_t("landing-page.unique-visitors")}</p>
              </li>
            </ul>
            <ul>
              <li>
                <h3>47M</h3>
                <p>{_t("landing-page.points-distrubuted")}</p>
              </li>
              <li>
                <h3>75K</h3>
                <p>{_t("landing-page.new-users")}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="part-bottom" id="download">
          <div className="inner">
            <span />
            <span />
            <img src={PhoneDarkPc} alt="dark phone image" className="phone-bg phone-dark-pc" loading="lazy" />
            <img src={PhoneDarkPc} alt="dark phone image" className="phone-bg phone-dark-tablet" loading="lazy" />
            <img src={PhoneDarkPc} alt="light phone image" className="phone-bg phone-light-pc" loading="lazy" />
            <img src={PhoneDarkPc} alt="light phone image" className="phone-bg phone-light-tablet"  loading="lazy"/>

            <img src={BubbleLeftTop} alt="bubble" className="bubble-bg bubble-left-top" loading="lazy" />
            <img src={BubbleLeftBottom} alt="bubble" className="bubble-bg bubble-left-bottom" loading="lazy" />
            <img src={BubbleLCenter} alt="bubble" className="bubble-bg bubble-center" loading="lazy" />
            <img src={BubbleRightTop} alt="bubble" className="bubble-bg bubble-right-top"  loading="lazy"/>
            <img src={BubbleLRightBottom} alt="bubble" className="bubble-bg bubble-right-bottom"  loading="lazy"/>

            <img src={LeftFishes} alt="fishes" className="download-fishes left-fishes"  loading="lazy"/>           
            <img src={DownloadDarkFishes} alt="fish" className="download-fishes right-dark-fishes"  loading="lazy"/>
            <img src={FishOne} alt="fish" className="download-fishes right-small"  loading="lazy"/>
            <img src={FishTwo} alt="fish" className="download-fishes right-big"  loading="lazy"/>

            <div className="text-group">
              <h2>{_t("landing-page.download-our-application")}</h2>
              <p className="mt-4">{_t("landing-page.download-our-application-desc-1")}</p>
              <p>{_t("landing-page.download-our-application-desc-2")}</p>
              <Link to={"https://desktop.ecency.com/"}
                className="windows"
                target="blank"
                onClick={()=> isElectron() && window.open('https://desktop.ecency.com/', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')}
              >
                <img
                  src={
                    props?.global?.theme === "day"
                      ? DownloadWindows
                      : DownloadWindowsWhite
                  }
                  alt="Download for Windows"
                />
                {_t("landing-page.download-for-windows")}
              </Link>
              <Link to={"https://ios.ecency.com/"} target="blank" onClick={()=> isElectron() && window.open('https://ios.ecency.com/', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')}>
                <img
                  src={
                    props?.global?.theme === "day"
                      ? DownloadIPhone
                      : DownloadIPhoneWhite
                  }
                  alt="Download for IOS"
                />
                {_t("landing-page.download-for-ios")}
              </Link>
              <Link to={"https://android.ecency.com/"} target="blank" onClick={()=> isElectron() && window.open('https://android.ecency.com/', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')}>
                <img
                  src={
                    props?.global?.theme === "day"
                      ? DownloadAndroid
                      : DownloadAndroidWhite
                  }
                  alt="Download for Android"
                />
                {_t("landing-page.download-for-android")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="sections fifth-section" id="about">
        <div className="part-top pt-5 pt-sm-0">
          <div className="inner">
            <div className="text-group mt-sm-5 mt-lg-0">
              <h2>{_t("landing-page.our-history")}</h2>
              <p>{htmlParse(_t('landing-page.our-history-p-one'))}</p>
              <p>{_t("landing-page.our-history-p-two")}</p>
            </div>
            <img className="our-history" src={OurHistory} alt="Our History" loading="lazy"/>
          </div>
        </div>
        <div className="part-bottom">
          <div className="inner">
            <img className="our-vision" src={OurVision} alt="Our Vision" loading="lazy" />

            <div className="text-group pb-0 pb-sm-5 pb-md-0">
              <h2>{_t("landing-page.our-vision")}</h2>
              <p>{htmlParse(_t('landing-page.our-vision-p-one'))}</p>
              <p>{htmlParse(_t('landing-page.our-vision-p-two'))}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sections sixth-section">
        <div className="part-top">
          <div className="inner">
            <div className="text-group">
              <h2>{_t("landing-page.our-team")}</h2>
              <ul>
                <li>
                  <img src={FounderImg} alt="Founder" loading="lazy" />
                  <div className="text-wrapper">
                    <Link to="/@good-karma">@good-karma</Link>
                    <p>{_t("landing-page.founder")}</p>
                  </div>
                </li>
                <li>
                  <img src={DevopsImg} alt="Devops" loading="lazy"/>
                  <div className="text-wrapper">
                    <Link to="/@talhasch">@talhasch</Link>
                    <p>{_t("landing-page.devops-guru")}</p>
                  </div>
                </li>
                <li>
                  <img src={DesignGuru} alt="Designer" loading="lazy"/>
                  <div className="text-wrapper">
                    <Link to="/@dunsky">@dunsky</Link>
                    <p>{_t("landing-page.design-guru")}</p>
                  </div>
                </li>
                <li className="last-element">
                  <Link to="/contributors">{_t("landing-page.community-contributors")}</Link>
                  <Link to="/witnesses">{_t("landing-page.blockchain-witnesses")}</Link>
                </li>
              </ul>
            </div>

            <div className="image-container">
              <img className="our-team together" src={OurTeam} alt="Our Team" loading="lazy" />
              <img
                className="our-team senior"
                src={SeniorFish}
                alt="Senior Fish"
              />
              <img
                className="our-team junior"
                src={JuniorFish}
                alt="Junior Fish"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div className="part-bottom pt-sm-5 pt-lg-auto">
          <span className="left-fishes" />
          <img src={FooterMainFish} alt="Big fish" loading="lazy" className="main-fish" />
          <div className="inner">
            <div className="links-and-form">
              <div className="links">
                <ul className="first-column">
                  <li>
                    <Link to="#about">{_t("landing-page.about")}</Link>
                  </li>
                  <li>
                    <Link to="/faq">{_t("landing-page.faq")}</Link>
                  </li>
                  <li>
                    <Link to="/terms-of-service">{_t("landing-page.terms-of-service")}</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">{_t("landing-page.privacy-policy")}</Link>
                  </li>
                </ul>
                <ul className="second-column">
                  <li>
                    <Link to="/discover">{_t("landing-page.discover")}</Link>
                  </li>
                  <li>
                    <p onClick={() => props.toggleUIProp("login")}>{_t("landing-page.sign-in")}</p>
                  </li>
                  <li>
                    <Link to="/communities">{_t("landing-page.communities")}</Link>
                  </li>
                  <li>
                    <Link to="/faq">{_t("landing-page.help")}</Link>
                  </li>
                </ul>
              </div>
              
              <div className="subscribe-form" onSubmit={handleSubsccribe}>
                <h2>{_t("landing-page.subscribe-us")}</h2>
                <form>
                  <input
                    type="email"
                    placeholder={_t("landing-page.enter-your-email-adress")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                    onInvalid={(e: any) => handleInvalid(e, "landing-page.", 'validation-email')} 
                    onInput={handleOnInput}
                  />
                  <button disabled={loading}>{loading ? <span><LinearProgress /></span>  : _t("landing-page.send")}</button>
                </form>

                <p>{_t("landing-page.subscribe-paragraph")}</p>


            <div className="socials w-100 d-none d-lg-block">
                  <ul className="p-0 m-0 d-flex justify-content-between w-50">
                    <li>
                      <Link to={"https://youtube.com/ecency"} target="_blank">
                        <img src={FooterYoutube} alt="youtube" />
                      </Link>
                    </li>
                    <li>
                      <Link to={"https://twitter.com/ecency_official"} target="_blank" onClick={()=> isElectron() && window.open('https://twitter.com/ecency_official', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')}>
                        <img src={FooterTwitter} alt="twitter" />
                      </Link>
                    </li>
                    <li>
                      <Link to={"https://t.me/ecency"} target="_blank" onClick={()=> isElectron() && window.open('https://t.me/ecency', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')}>
                        <img src={FooterTelegram} alt="telegram" />
                      </Link>
                    </li>
                    <li>
                      <Link to={"https://discord.me/ecency"} target="_blank" onClick={()=> isElectron() && window.open('https://discord.me/ecency', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')}>
                        <img src={FooterDiscord} alt="discord" />
                      </Link>
                    </li>
                  </ul>
                </div>
            
                </div>
            </div><div className="site-icon">
              <Link to="#">
                <img src={LogoCircle} alt="ecency logo" />
              </Link>
              <p className="copy-right">{_t("landing-page.copy-rights")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

