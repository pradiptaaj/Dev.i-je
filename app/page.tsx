"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8fbf6] text-[#2d4a37]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#f8fbf6]/95 backdrop-blur-md border-b border-[#799584]/10 z-50 py-4">
        <div className="max-w-6xl mx-auto flex justify-end items-center px-5">
          {/* Right Side Actions */}
          <div className="flex items-center">
            <Link href="/auth">
              <Button className="bg-[#799584] hover:bg-[#6b8473] text-white px-6 py-2.5 rounded-xl font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#799584]/20">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center relative pt-32 pb-20 px-5">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Don't Just Find A Deal
              <br />
              Find <span className="italic text-[#799584]">Your Deal</span>
            </h1>
            <p className="text-xl text-[#6b7c6f] font-medium">
              From easy money management, to travel perks and investments.
            </p>
            <p className="text-lg text-[#2d4a37] font-semibold">Open your account in a flash</p>
            <div className="flex gap-5 pt-4">
              <Link href="/auth">
                <Button className="bg-[#799584] hover:bg-[#6b8473] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#799584]/30">
                  Try Now
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-2 border-[#799584] text-[#799584] hover:bg-[#799584] hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:-translate-y-1 bg-transparent"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="relative group cursor-pointer">
              {/* iPhone Frame with 3D Transform */}
              <div
                className="relative w-80 h-[640px] bg-black rounded-[3rem] p-2 shadow-2xl transform-gpu transition-all duration-500 ease-out group-hover:rotate-y-12 group-hover:rotate-x-6 group-hover:scale-110 group-hover:-translate-y-4"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
                  animation: "phoneFloat 4s ease-in-out infinite",
                }}
              >
                {/* Screen with Independent Parallax Movement */}
                <div
                  className="w-full h-full bg-[#1a1a1a] rounded-[2.5rem] overflow-hidden relative transform-gpu transition-all duration-700 group-hover:translate-x-3 group-hover:-translate-y-3 group-hover:rotateX-2"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "translateZ(10px)",
                    animation: "screenFloat 4s ease-in-out infinite 0.3s",
                  }}
                >
                  {/* Notch with slight independent movement */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10 transition-all duration-500 group-hover:translate-y-0.5"></div>

                  {/* Status Bar with subtle parallax */}
                  <div
                    className="flex justify-between items-center px-6 pt-12 pb-4 text-white text-sm transform-gpu transition-all duration-500 group-hover:translate-x-0.5"
                    style={{ transform: "translateZ(5px)" }}
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 transition-transform duration-500 group-hover:rotate-12"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">THAILI</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 border border-white rounded-sm">
                        <div className="w-3 h-1 bg-green-500 rounded-sm"></div>
                      </div>
                    </div>
                  </div>

                  {/* App Content with layered parallax */}
                  <div
                    className="px-6 space-y-6 transform-gpu transition-all duration-700 group-hover:-translate-x-0.5 group-hover:translate-y-0.5"
                    style={{ transform: "translateZ(8px)" }}
                  >
                    {/* Action Buttons with individual movement */}
                    <div
                      className="flex gap-3 transform-gpu transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-1"
                      style={{ animation: "buttonHover 3s ease-in-out infinite" }}
                    >
                      <button className="flex-1 bg-[#799584] text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        Apply Loan
                      </button>
                      <button className="w-12 h-12 bg-[#2a2a2a] rounded-xl flex items-center justify-center transition-all duration-300 hover:rotate-180">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                          />
                        </svg>
                      </button>
                      <button className="flex-1 bg-[#799584] text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        Get PAN
                      </button>
                    </div>

                    {/* Description with subtle depth */}
                    <div
                      className="text-gray-300 text-sm leading-relaxed transform-gpu transition-all duration-600 group-hover:translate-x-0.5"
                      style={{ transform: "translateZ(3px)" }}
                    >
                      THAILI is your comprehensive financial platform offering instant loans, PAN card registration, and
                      exclusive deals tailored for your financial growth.
                    </div>

                    {/* Stats with independent floating animation */}
                    <div
                      className="space-y-4 transform-gpu transition-all duration-700 group-hover:-translate-x-0.5"
                      style={{ transform: "translateZ(6px)" }}
                    >
                      <div className="text-gray-400 text-sm font-medium">Dashboard Overview</div>

                      {/* Grid cards with staggered movement */}
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div
                          className="bg-[#2a2a2a] rounded-2xl p-4 transform-gpu transition-all duration-500 group-hover:translate-y-2 group-hover:rotate-2 hover:scale-110"
                          style={{ transform: "translateZ(4px)", animation: "cardFloat 5s ease-in-out infinite" }}
                        >
                          <div className="text-gray-400 text-xs mb-1">Quick Loans</div>
                          <div className="text-xl font-bold text-white">Available</div>
                        </div>
                        <div
                          className="bg-[#2a2a2a] rounded-2xl p-4 transform-gpu transition-all duration-500 group-hover:-translate-y-2 group-hover:-rotate-2 hover:scale-110"
                          style={{ transform: "translateZ(4px)", animation: "cardFloat 5s ease-in-out infinite 0.5s" }}
                        >
                          <div className="text-gray-400 text-xs mb-1">PAN Services</div>
                          <div className="text-xl font-bold text-[#799584]">Active</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div
                          className="bg-[#2a2a2a] rounded-2xl p-4 transform-gpu transition-all duration-600 group-hover:translate-x-2 group-hover:rotate-1 hover:scale-110"
                          style={{ transform: "translateZ(2px)", animation: "cardFloat 4.5s ease-in-out infinite 1s" }}
                        >
                          <div className="text-gray-400 text-xs mb-1">Processing</div>
                          <div className="text-xl font-bold text-white">Fast</div>
                        </div>
                        <div
                          className="bg-[#2a2a2a] rounded-2xl p-4 transform-gpu transition-all duration-600 group-hover:-translate-x-2 group-hover:-rotate-1 hover:scale-110"
                          style={{
                            transform: "translateZ(2px)",
                            animation: "cardFloat 4.5s ease-in-out infinite 1.5s",
                          }}
                        >
                          <div className="text-gray-400 text-xs mb-1">Support</div>
                          <div className="text-xl font-bold text-[#799584]">24/7</div>
                        </div>
                      </div>
                    </div>

                    {/* Performance card with enhanced depth */}
                    <div
                      className="bg-[#2a2a2a] rounded-2xl p-4 transform-gpu transition-all duration-700 group-hover:translate-y-2 hover:scale-105"
                      style={{ transform: "translateZ(7px)" }}
                    >
                      <div className="text-gray-400 text-xs mb-2">Service Status</div>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-green-500">Online</div>
                        <div className="text-sm text-gray-400">All systems operational</div>
                        <div
                          className="ml-auto w-2 h-2 bg-green-500 rounded-full"
                          style={{ animation: "statusPulse 2s ease-in-out infinite" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation with independent movement */}
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-[#2a2a2a] h-20 rounded-t-3xl flex items-center justify-center transform-gpu transition-all duration-500 group-hover:translate-y-1"
                    style={{ transform: "translateZ(5px)" }}
                  >
                    <div className="w-32 h-1 bg-gray-600 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Enhanced 3D Glow Effect */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#799584]/20 to-green-500/20 rounded-[3rem] blur-2xl -z-10 transition-all duration-700 group-hover:blur-3xl group-hover:scale-110"
                style={{ animation: "glowPulse 4s ease-in-out infinite" }}
              ></div>
            </div>
          </div>

          <style jsx>{`
  @keyframes phoneFloat {
    0%, 100% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(0px) translateX(0px); }
    25% { transform: perspective(1000px) rotateX(3deg) rotateY(-5deg) rotateZ(1deg) translateY(-15px) translateX(-8px); }
    50% { transform: perspective(1000px) rotateX(-2deg) rotateY(4deg) rotateZ(-1.5deg) translateY(-25px) translateX(10px); }
    75% { transform: perspective(1000px) rotateX(2deg) rotateY(6deg) rotateZ(0.8deg) translateY(-12px) translateX(-5px); }
  }

  @keyframes screenFloat {
    0%, 100% { transform: translateZ(10px) translateX(0px) translateY(0px) rotateX(0deg); }
    25% { transform: translateZ(10px) translateX(-3px) translateY(4px) rotateX(1deg); }
    50% { transform: translateZ(10px) translateX(4px) translateY(-3px) rotateX(-0.5deg); }
    75% { transform: translateZ(10px) translateX(-2px) translateY(2px) rotateX(0.5deg); }
  }

  @keyframes statusPulse {
    0%, 100% { opacity: 1; transform: scale(1) translateX(0px); }
    50% { opacity: 0.4; transform: scale(1.4) translateX(2px); }
  }

  @keyframes glowPulse {
    0%, 100% { opacity: 0.3; transform: scale(1) rotateZ(0deg); }
    50% { opacity: 0.8; transform: scale(1.15) rotateZ(2deg); }
  }

  @keyframes cardFloat {
    0%, 100% { transform: translateY(0px) rotateX(0deg); }
    50% { transform: translateY(-8px) rotateX(2deg); }
  }

  @keyframes buttonHover {
    0%, 100% { transform: scale(1) translateY(0px); }
    50% { transform: scale(1.05) translateY(-2px); }
  }
`}</style>
        </div>

        <button
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer transition-all hover:-translate-y-1 animate-bounce"
          onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
        >
          <div className="p-2 rounded-full bg-[#799584]/10 hover:bg-[#799584]/20 transition-colors">
            <ArrowDown className="w-6 h-6 text-[#799584]" />
          </div>
          <span className="text-sm text-[#6b7c6f] font-medium">Scroll to explore</span>
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-[#2d4a37] mb-4 tracking-tight">Our Features</h2>
            <p className="text-xl text-[#6b7c6f] font-medium max-w-2xl mx-auto">
              Comprehensive financial solutions designed to simplify your money management journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
            <div className="bg-[#f8fbf6] rounded-3xl p-8 border-2 border-[#799584] bg-gradient-to-br from-[#f0f5f2] to-[#e8f1ea] relative text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-[#799584]/20">
              <div className="absolute -top-3 right-5 bg-[#799584] text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                Featured
              </div>
              <div className="text-5xl mb-5">🆔</div>
              <h3 className="text-2xl font-bold text-[#2d4a37] mb-3">Pan Card Registration</h3>
              <p className="text-[#6b7c6f] mb-5 font-medium leading-relaxed">
                Quick and hassle-free PAN card registration with digital verification and instant processing
              </p>
              <div className="text-xl font-bold text-[#799584] mb-6">Fast & Secure</div>
              <Button className="w-full bg-[#799584] hover:bg-[#6b8473] text-white py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5">
                Register Now
              </Button>
            </div>

            <div className="bg-[#f8fbf6] rounded-3xl p-8 border-2 border-[#e1ebe4] text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-[#799584]/20">
              <div className="text-5xl mb-5">🎯</div>
              <h3 className="text-2xl font-bold text-[#2d4a37] mb-3">Top Deals for Your Finance Journey</h3>
              <p className="text-[#6b7c6f] mb-5 font-medium leading-relaxed">
                Discover exclusive financial deals, cashback offers, and investment opportunities tailored for you
              </p>
              <div className="text-xl font-bold text-[#799584] mb-6">Best Offers</div>
              <Button className="w-full bg-[#799584] hover:bg-[#6b8473] text-white py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5">
                Explore Deals
              </Button>
            </div>

            <div className="bg-[#f8fbf6] rounded-3xl p-8 border-2 border-[#e1ebe4] text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-[#799584]/20">
              <div className="text-5xl mb-5">💰</div>
              <h3 className="text-2xl font-bold text-[#2d4a37] mb-3">Loans Offer</h3>
              <p className="text-[#6b7c6f] mb-5 font-medium leading-relaxed">
                Get instant personal and business loans with competitive interest rates and flexible repayment options
              </p>
              <div className="text-xl font-bold text-[#799584] mb-6">Low Interest Rates</div>
              <Button className="w-full bg-[#799584] hover:bg-[#6b8473] text-white py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5">
                Apply for Loan
              </Button>
            </div>

            <div className="bg-[#f8fbf6] rounded-3xl p-8 border-2 border-[#e1ebe4] text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-[#799584]/20">
              <div className="text-5xl mb-5">📄</div>
              <h3 className="text-2xl font-bold text-[#2d4a37] mb-3">Minimal Paperwork for Your Business</h3>
              <p className="text-[#6b7c6f] mb-5 font-medium leading-relaxed">
                Streamlined business setup with digital documentation and automated compliance management
              </p>
              <div className="text-xl font-bold text-[#799584] mb-6">Digital First</div>
              <Button className="w-full bg-[#799584] hover:bg-[#6b8473] text-white py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5">
                Start Business
              </Button>
            </div>
          </div>

          <div className="text-center bg-gradient-to-br from-[#f0f5f2] to-[#e8f1ea] py-16 px-10 rounded-3xl border border-[#799584]/20">
            <h3 className="text-4xl font-bold text-[#2d4a37] mb-4">Ready to start your financial journey?</h3>
            <p className="text-xl text-[#6b7c6f] mb-8 font-medium">
              Join millions of users who trust THAILI with their financial future
            </p>
            <Link href="/auth">
              <Button className="bg-[#799584] hover:bg-[#6b8473] text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#799584]/30">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2d4a37] text-white py-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid lg:grid-cols-4 gap-16 mb-10">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-5">THAILI</h3>
              <p className="text-[#a8b8ac] font-medium leading-relaxed">
                Your trusted partner for modern financial management and smart savings.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-5 text-white">Product</h4>
              <div className="space-y-3">
                <Link href="#" className="block text-[#a8b8ac] hover:text-[#00D084] font-medium transition-colors">
                  Personal Banking
                </Link>
                <Link href="#" className="block text-[#a8b8ac] hover:text-[#00D084] font-medium transition-colors">
                  Business Solutions
                </Link>
                <Link href="#" className="block text-[#a8b8ac] hover:text-[#00D084] font-medium transition-colors">
                  Investment Platform
                </Link>
                <Link href="#" className="block text-[#a8b8ac] hover:text-[#00D084] font-medium transition-colors">
                  Mobile App
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-5 text-white">Company</h4>
              <div className="space-y-3">
                <Link href="#" className="block text-[#a8b8ac] hover:text-[#00D084] font-medium transition-colors">
                  About Us
                </Link>
                <Link href="#" className="block text-[#a8b8ac] hover:text-[#00D084] font-medium transition-colors">
                  Careers
                </Link>
                <Link href="#" className="block text-[#a8b8ac] hover:text-[#00D084] font-medium transition-colors">
                  Press
                </Link>
                <Link href="#" className="block text-[#a8b8ac] hover:text-[#00D084] font-medium transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-[#4a6254] pt-5 flex flex-col md:flex-row justify-between items-center gap-5">
            <p className="text-[#a8b8ac]">© 2025 THAILI. All rights reserved.</p>
            <div className="flex gap-5">
              <Link href="#" className="text-[#a8b8ac] hover:text-[#00D084] font-medium transition-colors">
                Twitter
              </Link>
              <Link href="#" className="text-[#a8b8ac] hover:text-[#00D084] font-medium transition-colors">
                LinkedIn
              </Link>
              <Link href="#" className="text-[#a8b8ac] hover:text-[#00D084] font-medium transition-colors">
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
