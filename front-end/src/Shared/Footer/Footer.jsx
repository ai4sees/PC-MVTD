const Footer = () => {
  return (
    <div className="bg-blue-500 ">
      <footer className="max-w-[1280px] mx-auto footer text-base-content p-10">
        <aside>
          <h2 className="text-2xl font-bold text-white">PC-MVTD</h2>
          <p className="text-xl text-white">AI4SEE Pvt Limited.</p>
        </aside>
        <nav className="text-white">
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav className="text-white">
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav className="text-white">
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
