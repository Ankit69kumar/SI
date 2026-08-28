import { Sparkles, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">Co-Serve</span>
            </div>
            <p className="text-sm leading-relaxed text-ink-400 max-w-xs">
              Connecting households with trusted local service providers. Empowering gig workers across India.
            </p>
            <div className="flex gap-3 mt-4">
              {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-ink-800 flex items-center justify-center hover:bg-primary-600 transition">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-white transition">Browse Services</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition">How it Works</Link></li>
              <li><Link to="/providers" className="hover:text-white transition">Find Providers</Link></li>
              <li><Link to="/register" className="hover:text-white transition">Become a Provider</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Mail size={14} /> hello@coserve.in</li>
              <li className="flex items-center gap-2"><Phone size={14} /> +91 1800 123 4567</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> Mumbai, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ink-800 mt-10 pt-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-ink-400">
          <p>© 2026 Co-Serve. Built for Smart India Hackathon — SIH26089.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
