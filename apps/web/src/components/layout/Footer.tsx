export default function Footer() {
  return (
    <footer className="bg-primary text-white py-24 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tighter">
              EVOLANKA
            </h3>
            <p className="text-white/80 mb-10 leading-relaxed">
              Connecting you to the heart of Sri Lanka through soulful travel
              and reliable services. Your gateway to EVOLANKA.
            </p>
            <div className="flex gap-6">
              <span className="material-symbols-outlined cursor-pointer hover:text-white transition-colors text-white/70 p-2 rounded-full border border-white/20 hover:border-white">
                public
              </span>
              <span className="material-symbols-outlined cursor-pointer hover:text-white transition-colors text-white/70 p-2 rounded-full border border-white/20 hover:border-white">
                share
              </span>
              <span className="material-symbols-outlined cursor-pointer hover:text-white transition-colors text-white/70 p-2 rounded-full border border-white/20 hover:border-white">
                contact_support
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-8 text-white">Explore</h4>
            <ul className="space-y-4 text-white/70 text-sm font-medium">
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Explore Sri Lanka
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Service Marketplace
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Social Feed
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Island News
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-8 text-white">For Providers</h4>
            <ul className="space-y-4 text-white/70 text-sm font-medium">
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Partner Programs
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Merchant Dashboard
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Marketing Tools
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Safety Standards
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-8 text-white">Legal</h4>
            <ul className="space-y-4 text-white/70 text-sm font-medium">
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Terms of Service
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-white/60 uppercase tracking-widest">
            © 2024 EVOLANKA Platforms. All rights reserved.
          </p>
          <div className="flex gap-10 text-xs font-bold text-white/60 uppercase tracking-widest">
            <span className="cursor-pointer hover:text-white transition-colors">
              English (US)
            </span>
            <span className="cursor-pointer hover:text-white transition-colors">
              LKR (₨)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
