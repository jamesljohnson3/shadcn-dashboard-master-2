import styles from "./Overlay.module.css";
function Overlay({ setAds, endAds }) {
  return (
    <div className={styles.overlay}>
      <video controls={false} autoPlay muted onEnded={endAds} width={"100%"}>
        <source src="https://res.cloudinary.com/unlimitpotential/video/upload/v1696734283/ads2_jgnaqa.mov" />
      </video>

      <div className={styles.btn}>
        <div>
          <p>www.hovhealth.com</p>
          <a href="https://unlimitpotential.com/" target={"_blank"} rel="noreferrer">
            Get Started
          </a>
        </div>
        <div>
          <button onClick={() => setAds(false)}>X</button>
        </div>
      </div>
    </div>
  );
}
export default Overlay;
