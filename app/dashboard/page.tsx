"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VoiceAssistant } from "@/components/voice-assistant"
import {
  Heart,
  Scale,
  Search,
  MapPin,
  RefreshCw,
  ChevronDown,
  Clock,
  Building2,
  Percent,
  Phone,
  Mail,
  Shield,
} from "lucide-react"
import { useState, useEffect } from "react"
import {
  getDealsData,
  refreshDealsData,
  categories,
  organizationTypes,
  getScrapingStats,
  type Deal,
} from "@/lib/enhanced-deals-scraper"
import { ApplicationForm } from "@/components/application-form"

export default function DashboardPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedOrgType, setSelectedOrgType] = useState("All Types")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [lastScrapedTime, setLastScrapedTime] = useState<Date>(new Date())
  const [scrapingStats, setScrapingStats] = useState<any>(null)

  const [showWishlist, setShowWishlist] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [comparisonMode, setComparisonMode] = useState(false)
  const selectedDeals = deals.filter((deal) => deal.isSelected)

  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [selectedDealForApplication, setSelectedDealForApplication] = useState<Deal | null>(null)

  useEffect(() => {
    // Load initial deals data from Nepal web scraping
    const loadDeals = async () => {
      setIsRefreshing(true)
      try {
        const scrapedDeals = await getDealsData()
        setDeals(scrapedDeals)
        setFilteredDeals(scrapedDeals)
        setLastScrapedTime(new Date())
        setScrapingStats(getScrapingStats())
      } catch (error) {
        console.error("Error loading deals:", error)
      }
      setIsRefreshing(false)
    }

    loadDeals()
  }, [])

  useEffect(() => {
    // Filter deals based on category, organization type, and search
    let filtered = deals

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((deal) => deal.category === selectedCategory)
    }

    if (selectedOrgType !== "All Types") {
      // Filter by organization type logic
      filtered = filtered.filter((deal) => {
        switch (selectedOrgType) {
          case "Commercial Banks":
            return deal.category.includes("Banking")
          case "Microfinance Institutions":
            return deal.category === "Microfinance"
          case "Government Agencies":
            return deal.category.includes("Government") || deal.category.includes("Youth Employment")
          case "International NGOs":
            return deal.category === "International NGO"
          case "Local NGOs":
            return deal.category === "Women Empowerment" || deal.category === "Rural Development"
          case "Cooperative Organizations":
            return deal.category === "Cooperative Banking"
          default:
            return true
        }
      })
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (deal) =>
          deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          deal.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
          deal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          deal.targetAudience.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredDeals(filtered)
  }, [deals, selectedCategory, selectedOrgType, searchQuery])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      const updatedDeals = await refreshDealsData()
      setDeals(updatedDeals)
      setLastScrapedTime(new Date())
      setScrapingStats(getScrapingStats())
    } catch (error) {
      console.error("Failed to refresh deals:", error)
    }
    setIsRefreshing(false)
  }

  const toggleDealSelection = (dealId: string) => {
    setDeals((prevDeals) =>
      prevDeals.map((deal) => (deal.id === dealId ? { ...deal, isSelected: !deal.isSelected } : deal)),
    )
  }

  const handleVoiceSearch = (query: string) => {
    console.log("Voice search query:", query)
    setSearchQuery(query)
  }

  const handleVoiceNavigate = (action: string) => {
    console.log("Voice navigation action:", action)
    switch (action) {
      case "wishlist":
        setShowWishlist(true)
        break
      case "compare":
        if (selectedDeals.length > 0) {
          setShowComparison(true)
        } else {
          // Voice feedback will be handled by the voice bot
          console.log("No deals selected for comparison")
        }
        break
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Commercial Banking":
      case "International Banking":
        return "🏦"
      case "Agricultural Finance":
        return "🚜"
      case "Microfinance":
        return "💰"
      case "Government Programs":
        return "🏛️"
      case "Youth Employment":
        return "👨‍💼"
      case "International NGO":
        return "🌍"
      case "Women Empowerment":
        return "👩‍💼"
      case "Rural Development":
        return "🌾"
      case "Cooperative Banking":
        return "🤝"
      case "Business Development":
        return "📈"
      default:
        return "📋"
    }
  }

  const handleApplyNow = (deal: Deal) => {
    console.log("Opening application form for:", deal.title)
    setSelectedDealForApplication(deal)
    setShowApplicationForm(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fbf6] to-[#f0f5f2] font-['Inter',sans-serif]">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-[#799584]/10 px-5 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#799584] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <h1 className="text-xl font-bold text-[#2d4a37] tracking-tight">THAILI</h1>
            <div className="flex items-center gap-2 ml-4 px-3 py-1 bg-green-100 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-green-700">Online</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search banks, NGOs, programs... (or use voice)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#799584]/20 focus:border-[#799584] transition-all"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <VoiceAssistant onSearch={handleVoiceSearch} onNavigate={handleVoiceNavigate} />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowWishlist(!showWishlist)}
              className={`text-gray-600 hover:text-[#799584] p-2.5 rounded-xl hover:bg-gray-100 transition-all relative ${
                selectedDeals.length > 0 ? "text-[#799584]" : ""
              }`}
            >
              <Heart className={`w-5 h-5 ${selectedDeals.length > 0 ? "fill-current" : ""}`} />
              {selectedDeals.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#799584] text-white rounded-full text-xs flex items-center justify-center font-semibold">
                  {selectedDeals.length}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setComparisonMode(!comparisonMode)
                if (!comparisonMode && selectedDeals.length === 0) {
                  alert("Please select deals first to compare")
                } else if (comparisonMode && selectedDeals.length > 0) {
                  setShowComparison(true)
                }
              }}
              className={`text-gray-600 hover:text-[#799584] p-2.5 rounded-xl hover:bg-gray-100 transition-all ${
                comparisonMode ? "bg-[#799584] text-white" : ""
              }`}
            >
              <Scale className="w-5 h-5" />
            </Button>

            <Avatar className="w-9 h-9 cursor-pointer ring-2 ring-transparent hover:ring-[#799584]/30 transition-all">
              <AvatarImage src="/placeholder.svg?height=36&width=36" />
              <AvatarFallback className="bg-[#799584] text-white font-semibold text-sm">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-5 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[#799584] rounded-lg flex items-center justify-center">
              <ChevronDown className="w-5 h-5 text-white rotate-180" />
            </div>
            <h2 className="text-3xl font-bold text-[#2d4a37]">Live Nepal Financial Programs</h2>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
              size="sm"
              className="ml-auto border-[#799584] text-[#799584] hover:bg-[#799584] hover:text-white bg-transparent"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh Data
            </Button>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <p className="text-[#6b7c6f] text-lg">
              Real-time programs from Nepal's banks, NGOs, INGOs, and government agencies
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Updated: {lastScrapedTime.toLocaleTimeString()}</span>
              </div>
              {scrapingStats && (
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>{scrapingStats.totalSources} Sources</span>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-white border-gray-300 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{getCategoryIcon(selectedCategory)}</span>
                  <SelectValue placeholder="Select Category" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{getCategoryIcon(category)}</span>
                      <span>{category}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Organization Type Filter */}
            <Select value={selectedOrgType} onValueChange={setSelectedOrgType}>
              <SelectTrigger className="bg-white border-gray-300 rounded-xl">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <SelectValue placeholder="Organization Type" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                {organizationTypes.map((type) => (
                  <SelectItem key={type} value={type} className="hover:bg-gray-100">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Results Count */}
            <div className="flex items-center justify-center bg-white border border-gray-300 rounded-xl px-4 py-2">
              <span className="text-sm text-gray-600">
                Showing {filteredDeals.length} of {deals.length} programs
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-2xl border border-gray-200 hover:border-[#799584]/30 p-6 hover:shadow-xl transition-all duration-300 group relative"
            >
              {/* Category and Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gray-100 px-3 py-1 rounded-full">
                  <span className="text-xs font-medium text-gray-600">{deal.category}</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-sm">
                      ★
                    </span>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">4.8 (2567)</span>
                </div>
              </div>

              {/* Organization Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#799584] rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {deal.organization
                      .split(" ")
                      .map((word) => word.charAt(0))
                      .join("")
                      .substring(0, 2)}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-bold text-[#799584] uppercase tracking-wide block">
                    {deal.organization}
                  </span>
                  {deal.establishedYear && <span className="text-xs text-gray-500">Est. {deal.establishedYear}</span>}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#799584] transition-colors leading-tight">
                {deal.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{deal.description}</p>

              {/* Amount */}
              <div className="text-lg font-bold text-gray-800 mb-4">{deal.amountRange}</div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building2 className="w-4 h-4" />
                  <span>{deal.organization}</span>
                </div>
                {deal.processingTime && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{deal.processingTime}</span>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              {deal.collateralRequired !== undefined && (
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Shield className="w-4 h-4" />
                  <span>Collateral: {deal.collateralRequired ? "Required" : "Not Required"}</span>
                </div>
              )}

              {(deal.phoneNumber || deal.email) && (
                <div className="flex gap-4 mb-4 text-sm text-gray-600">
                  {deal.phoneNumber && (
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      <span>{deal.phoneNumber}</span>
                    </div>
                  )}
                  {deal.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      <span>{deal.email}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons - Updated to match reference */}
              <div className="flex gap-2 mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-100 rounded-full bg-transparent text-xs"
                  onClick={() => {
                    if (deal.website) {
                      window.open(deal.website, "_blank")
                    }
                  }}
                >
                  Visit Website
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-100 rounded-full bg-transparent text-xs"
                >
                  Details
                </Button>
                <Button
                  onClick={() => toggleDealSelection(deal.id)}
                  size="sm"
                  className={`flex-1 rounded-full font-semibold transition-all text-xs ${
                    deal.isSelected
                      ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {deal.isSelected ? "Saved" : "Save"}
                </Button>
                <Button
                  onClick={() => handleApplyNow(deal)}
                  size="sm"
                  className="flex-1 bg-[#799584] hover:bg-[#6b8473] text-white rounded-full font-semibold transition-all text-xs shadow-md hover:shadow-lg"
                >
                  Apply Now
                </Button>
              </div>

              {/* Last Updated */}
              <div className="text-xs text-gray-400 text-center">Scraped: {deal.lastUpdated.toLocaleTimeString()}</div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDeals.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No programs found</h3>
            <p className="text-gray-500">Try adjusting your filters, search terms, or use voice search</p>
            <Button onClick={handleRefresh} className="mt-4 bg-[#799584] hover:bg-[#6b8473] text-white">
              Refresh Data
            </Button>
          </div>
        )}

        {/* Wishlist Panel - Updated to match reference */}
        {showWishlist && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
              {/* Header - Green background like reference */}
              <div className="bg-[#799584] text-white px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6 fill-current" />
                    <h2 className="text-2xl font-bold">My Wishlist</h2>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setShowWishlist(false)}
                    className="text-white hover:bg-white/20 p-2 rounded-full w-10 h-10"
                  >
                    <span className="text-xl">×</span>
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-12 overflow-y-auto max-h-[55vh]">
                {selectedDeals.length === 0 ? (
                  <div className="text-center py-16">
                    {/* Broken heart icon like reference */}
                    <div className="w-20 h-20 mx-auto mb-6 text-[#799584]">
                      <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                        <path d="M50 85L25 60C15 50 15 35 25 25C35 15 50 20 50 20S65 15 75 25C85 35 85 50 75 60L50 85Z" />
                        <path d="M30 30L70 70M70 30L30 70" stroke="white" strokeWidth="3" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Your wishlist is empty</h3>
                    <p className="text-gray-600 text-lg">
                      Start adding banking deals to your wishlist by clicking the heart icon!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-800">Saved Programs ({selectedDeals.length})</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {selectedDeals.map((deal) => (
                        <div
                          key={deal.id}
                          className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#799584]/30 transition-all relative shadow-sm"
                        >
                          {/* Deal card content similar to main dashboard */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-[#799584] rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm font-bold">
                                {deal.organization
                                  .split(" ")
                                  .map((word) => word.charAt(0))
                                  .join("")
                                  .substring(0, 2)}
                              </span>
                            </div>
                            <div className="flex-1">
                              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide block">
                                {deal.organization}
                              </span>
                              <span className="text-xs text-gray-500">{deal.category}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleDealSelection(deal.id)}
                              className="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg"
                              title="Remove from wishlist"
                            >
                              <span className="text-lg">×</span>
                            </Button>
                          </div>

                          <h3 className="text-lg font-bold text-gray-800 mb-3 leading-tight">{deal.title}</h3>

                          <div className="flex flex-wrap gap-2 mb-3">
                            <div className="inline-flex items-center gap-2 bg-[#799584] text-white px-3 py-1 rounded-full text-sm font-semibold">
                              <span>💰</span>
                              {deal.amountRange}
                            </div>
                            {deal.interestRate && (
                              <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                <Percent className="w-3 h-3" />
                                {deal.interestRate}
                              </div>
                            )}
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{deal.location}</span>
                            </div>
                            {deal.processingTime && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>{deal.processingTime}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-[#799584] text-[#799584] hover:bg-[#799584] hover:text-white text-xs bg-transparent"
                              onClick={() => {
                                if (deal.website) {
                                  window.open(deal.website, "_blank")
                                }
                              }}
                            >
                              Visit Website
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1 bg-[#799584] hover:bg-[#6b8473] text-white text-xs"
                              onClick={() => handleApplyNow(deal)}
                            >
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions - Match reference design */}
              {selectedDeals.length > 0 && (
                <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50">
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={() => {
                        setShowComparison(true)
                        setShowWishlist(false)
                      }}
                      className="bg-[#799584] hover:bg-[#6b8473] text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2"
                    >
                      <Scale className="w-4 h-4" />
                      Compare Selected
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setDeals((prevDeals) => prevDeals.map((deal) => ({ ...deal, isSelected: false })))
                      }}
                      className="border-2 border-gray-300 text-gray-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold bg-white"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Comparison Modal */}
        {showComparison && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="px-8 py-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <Scale className="w-7 h-7 text-[#799584]" />
                      <h2 className="text-2xl font-bold text-gray-800">Compare Programs</h2>
                    </div>
                    <div className="bg-[#799584] text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                      {selectedDeals.length} programs selected
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setShowComparison(false)}
                    className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <span className="text-xl">×</span>
                  </Button>
                </div>
              </div>

              {/* Comparison Content */}
              <div className="px-8 py-6 overflow-y-auto max-h-[70vh]">
                {selectedDeals.length < 2 ? (
                  <div className="text-center py-16">
                    <Scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-600 mb-2">Select at least 2 programs to compare</h4>
                    <p className="text-gray-500">Add more programs to your wishlist to compare them</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Best Fit Recommendation */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-green-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">🏆</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">Best Fit Recommendation</h3>
                          <p className="text-gray-600">Based on your selected programs</p>
                        </div>
                      </div>

                      {(() => {
                        // Calculate best fit based on multiple criteria
                        const scoredDeals = selectedDeals.map((deal) => {
                          let score = 0
                          const reasons = []

                          // Lower interest rate is better
                          if (deal.interestRate) {
                            const rate = Number.parseFloat(deal.interestRate.split("%")[0])
                            if (rate <= 10) {
                              score += 30
                              reasons.push("Low interest rate")
                            } else if (rate <= 15) {
                              score += 20
                            } else {
                              score += 10
                            }
                          }

                          // No collateral is better
                          if (deal.collateralRequired === false) {
                            score += 25
                            reasons.push("No collateral required")
                          }

                          // Faster processing is better
                          if (deal.processingTime) {
                            if (deal.processingTime.includes("2-3") || deal.processingTime.includes("3-5")) {
                              score += 20
                              reasons.push("Quick processing")
                            } else if (deal.processingTime.includes("5-7")) {
                              score += 15
                            } else {
                              score += 10
                            }
                          }

                          // Online application is better
                          if (deal.onlineApplication) {
                            score += 15
                            reasons.push("Online application available")
                          }

                          // No processing fee is better
                          if (deal.processingFee && deal.processingFee.includes("No")) {
                            score += 10
                            reasons.push("No processing fee")
                          }

                          return { ...deal, score, reasons }
                        })

                        const bestDeal = scoredDeals.reduce((best, current) =>
                          current.score > best.score ? current : best,
                        )

                        return (
                          <div className="bg-white rounded-xl p-4 border border-green-300">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="font-bold text-lg text-gray-800">{bestDeal.title}</h4>
                                <p className="text-sm text-gray-600">{bestDeal.organization}</p>
                              </div>
                              <div className="text-right">
                                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                  Score: {bestDeal.score}/100
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-3">
                              <div>
                                <span className="text-sm text-gray-500">Amount Range:</span>
                                <p className="font-semibold text-[#799584]">{bestDeal.amountRange}</p>
                              </div>
                              <div>
                                <span className="text-sm text-gray-500">Interest Rate:</span>
                                <p className="font-semibold text-blue-600">
                                  {bestDeal.interestRate || "Not specified"}
                                </p>
                              </div>
                            </div>

                            <div className="mb-3">
                              <span className="text-sm text-gray-500">Why this is the best fit:</span>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {bestDeal.reasons.map((reason, index) => (
                                  <span
                                    key={index}
                                    className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium"
                                  >
                                    ✓ {reason}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <Button
                              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold"
                              onClick={() => handleApplyNow(bestDeal)}
                            >
                              Apply to Best Fit Program
                            </Button>
                          </div>
                        )
                      })()}
                    </div>

                    {/* Detailed Comparison Table */}
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Detailed Comparison</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="text-left py-4 px-4 font-semibold text-gray-800 w-48 border-r border-gray-200">
                                Feature
                              </th>
                              {selectedDeals.map((deal) => (
                                <th
                                  key={deal.id}
                                  className="text-center py-4 px-4 font-semibold text-gray-800 min-w-64 border-r border-gray-200 last:border-r-0"
                                >
                                  <div className="space-y-2">
                                    <div className="text-sm font-bold">{deal.title}</div>
                                    <div className="text-xs text-gray-600 uppercase">{deal.organization}</div>
                                    <div className="text-xs bg-[#799584] text-white px-2 py-1 rounded-full">
                                      {deal.category}
                                    </div>
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-100">
                              <td className="py-4 px-4 font-medium text-gray-700 bg-gray-50 border-r border-gray-200">
                                Amount Range
                              </td>
                              {selectedDeals.map((deal) => (
                                <td
                                  key={deal.id}
                                  className="py-4 px-4 text-center border-r border-gray-200 last:border-r-0"
                                >
                                  <div className="bg-[#799584] text-white px-3 py-1 rounded-full text-sm font-semibold inline-block">
                                    {deal.amountRange}
                                  </div>
                                </td>
                              ))}
                            </tr>

                            <tr className="border-b border-gray-100">
                              <td className="py-4 px-4 font-medium text-gray-700 bg-gray-50 border-r border-gray-200">
                                Interest Rate
                              </td>
                              {selectedDeals.map((deal) => (
                                <td
                                  key={deal.id}
                                  className="py-4 px-4 text-center border-r border-gray-200 last:border-r-0"
                                >
                                  <div
                                    className={`px-3 py-1 rounded-full text-sm font-semibold inline-block ${
                                      deal.interestRate
                                        ? Number.parseFloat(deal.interestRate.split("%")[0]) <= 10
                                          ? "bg-green-100 text-green-700"
                                          : Number.parseFloat(deal.interestRate.split("%")[0]) <= 15
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {deal.interestRate || "Not specified"}
                                  </div>
                                </td>
                              ))}
                            </tr>

                            <tr className="border-b border-gray-100">
                              <td className="py-4 px-4 font-medium text-gray-700 bg-gray-50 border-r border-gray-200">
                                Processing Time
                              </td>
                              {selectedDeals.map((deal) => (
                                <td
                                  key={deal.id}
                                  className="py-4 px-4 text-center text-gray-600 border-r border-gray-200 last:border-r-0"
                                >
                                  <div
                                    className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${
                                      deal.processingTime &&
                                      (deal.processingTime.includes("2-3") || deal.processingTime.includes("3-5"))
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {deal.processingTime || "Not specified"}
                                  </div>
                                </td>
                              ))}
                            </tr>

                            <tr className="border-b border-gray-100">
                              <td className="py-4 px-4 font-medium text-gray-700 bg-gray-50 border-r border-gray-200">
                                Collateral Required
                              </td>
                              {selectedDeals.map((deal) => (
                                <td
                                  key={deal.id}
                                  className="py-4 px-4 text-center border-r border-gray-200 last:border-r-0"
                                >
                                  <div
                                    className={`px-3 py-1 rounded-full text-sm font-semibold inline-block ${
                                      deal.collateralRequired === false
                                        ? "bg-green-100 text-green-700"
                                        : deal.collateralRequired === true
                                          ? "bg-red-100 text-red-700"
                                          : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {deal.collateralRequired === false
                                      ? "No"
                                      : deal.collateralRequired === true
                                        ? "Yes"
                                        : "Not specified"}
                                  </div>
                                </td>
                              ))}
                            </tr>

                            <tr className="border-b border-gray-100">
                              <td className="py-4 px-4 font-medium text-gray-700 bg-gray-50 border-r border-gray-200">
                                Processing Fee
                              </td>
                              {selectedDeals.map((deal) => (
                                <td
                                  key={deal.id}
                                  className="py-4 px-4 text-center text-gray-600 border-r border-gray-200 last:border-r-0"
                                >
                                  <div
                                    className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${
                                      deal.processingFee && deal.processingFee.includes("No")
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {deal.processingFee || "Not specified"}
                                  </div>
                                </td>
                              ))}
                            </tr>

                            <tr className="border-b border-gray-100">
                              <td className="py-4 px-4 font-medium text-gray-700 bg-gray-50 border-r border-gray-200">
                                Online Application
                              </td>
                              {selectedDeals.map((deal) => (
                                <td
                                  key={deal.id}
                                  className="py-4 px-4 text-center border-r border-gray-200 last:border-r-0"
                                >
                                  <div
                                    className={`px-3 py-1 rounded-full text-sm font-semibold inline-block ${
                                      deal.onlineApplication === true
                                        ? "bg-green-100 text-green-700"
                                        : deal.onlineApplication === false
                                          ? "bg-red-100 text-red-700"
                                          : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {deal.onlineApplication === true
                                      ? "Available"
                                      : deal.onlineApplication === false
                                        ? "Not Available"
                                        : "Not specified"}
                                  </div>
                                </td>
                              ))}
                            </tr>

                            <tr className="border-b border-gray-100">
                              <td className="py-4 px-4 font-medium text-gray-700 bg-gray-50 border-r border-gray-200">
                                Location
                              </td>
                              {selectedDeals.map((deal) => (
                                <td
                                  key={deal.id}
                                  className="py-4 px-4 text-center text-gray-600 border-r border-gray-200 last:border-r-0"
                                >
                                  {deal.location}
                                </td>
                              ))}
                            </tr>

                            <tr className="border-b border-gray-100">
                              <td className="py-4 px-4 font-medium text-gray-700 bg-gray-50 border-r border-gray-200">
                                Target Audience
                              </td>
                              {selectedDeals.map((deal) => (
                                <td
                                  key={deal.id}
                                  className="py-4 px-4 text-center text-gray-600 border-r border-gray-200 last:border-r-0"
                                >
                                  {deal.targetAudience}
                                </td>
                              ))}
                            </tr>

                            <tr>
                              <td className="py-4 px-4 font-medium text-gray-700 bg-gray-50 border-r border-gray-200">
                                Actions
                              </td>
                              {selectedDeals.map((deal) => (
                                <td
                                  key={deal.id}
                                  className="py-4 px-4 text-center border-r border-gray-200 last:border-r-0"
                                >
                                  <div className="space-y-2">
                                    <Button
                                      size="sm"
                                      className="w-full bg-[#799584] hover:bg-[#6b8473] text-white"
                                      onClick={() => handleApplyNow(deal)}
                                    >
                                      Apply Now
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="w-full border-gray-300 text-gray-600 hover:bg-gray-100 bg-transparent"
                                      onClick={() => {
                                        if (deal.phoneNumber) {
                                          window.open(`tel:${deal.phoneNumber}`, "_self")
                                        }
                                      }}
                                    >
                                      Call Now
                                    </Button>
                                  </div>
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50">
                <div className="flex gap-4 justify-between">
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowComparison(false)}
                      className="px-8 py-2 border-gray-300 text-gray-600 hover:bg-gray-100 rounded-xl"
                    >
                      Close Comparison
                    </Button>
                    <Button
                      variant="outline"
                      className="px-8 py-2 border-[#799584] text-[#799584] hover:bg-[#799584] hover:text-white rounded-xl bg-transparent"
                    >
                      Export Comparison
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600">
                    Comparing {selectedDeals.length} programs • Updated {lastScrapedTime.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Application Form Modal */}
        {showApplicationForm && selectedDealForApplication && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-4xl mx-auto my-8">
              <ApplicationForm
                deal={selectedDealForApplication}
                onClose={() => {
                  setShowApplicationForm(false)
                  setSelectedDealForApplication(null)
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
