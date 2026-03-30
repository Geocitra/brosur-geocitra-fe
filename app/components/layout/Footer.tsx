export default function Footer() {
    return (
        <footer className="w-full bg-slate-50 pt-16 pb-8 border-t border-slate-200 mt-20">
            <div className="enterprise-container flex flex-col md:flex-row justify-between items-center gap-8">

                {/* Kolom Info */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="font-extrabold text-2xl tracking-tighter text-slate-900 mb-3">
                        GEOCITRA
                    </span>
                    <p className="text-slate-500 text-sm font-medium max-w-sm leading-relaxed">
                        Menghadirkan solusi digital inovatif dan terintegrasi untuk meningkatkan efisiensi serta akuntabilitas sistem instansi Anda.
                    </p>
                </div>

                {/* Kolom Tautan (Mockup) */}
                <div className="flex gap-8 text-sm font-semibold text-slate-400">
                    <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-primary transition-colors">Contact</a>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="enterprise-container mt-12 pt-8 border-t border-slate-200/60 text-center flex flex-col items-center">
                <p className="text-slate-400 text-sm font-medium">
                    © {new Date().getFullYear()} CV Geocitra. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}