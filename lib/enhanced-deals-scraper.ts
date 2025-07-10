// Enhanced deals scraper using Nepal-specific web scraping
import { nepalWebScraper, type NepalDeal } from "./nepal-web-scraper"

export interface Deal extends NepalDeal {}

// Updated categories based on Nepal's financial ecosystem
export const categories = [
  "All Categories",
  "Commercial Banking",
  "International Banking",
  "Agricultural Finance",
  "Microfinance",
  "Government Programs",
  "Youth Employment",
  "International NGO",
  "Women Empowerment",
  "Rural Development",
  "Cooperative Banking",
  "Business Development",
  "Professional Development",
]

// Organization types for filtering
export const organizationTypes = [
  "All Types",
  "Commercial Banks",
  "Development Banks",
  "Microfinance Institutions",
  "Government Agencies",
  "International NGOs",
  "Local NGOs",
  "Cooperative Organizations",
  "Professional Associations",
]

// Get deals from Nepal web scraping
export const getDealsData = async (): Promise<Deal[]> => {
  try {
    console.log("🔄 Fetching live deals from Nepal sources...")
    const deals = await nepalWebScraper.scrapeAllNepalSources()
    console.log(`✅ Loaded ${deals.length} live deals`)
    return deals
  } catch (error) {
    console.error("❌ Error fetching Nepal deals:", error)
    return getFallbackDeals()
  }
}

// Refresh deals with new scraping
export const refreshDealsData = async (): Promise<Deal[]> => {
  try {
    console.log("🔄 Refreshing deals from Nepal sources...")
    // Clear cache and fetch fresh data
    const deals = await nepalWebScraper.scrapeAllNepalSources()
    console.log(`✅ Refreshed ${deals.length} deals`)
    return deals
  } catch (error) {
    console.error("❌ Error refreshing Nepal deals:", error)
    return getFallbackDeals()
  }
}

// Get deals by category
export const getDealsByCategory = async (category: string): Promise<Deal[]> => {
  return nepalWebScraper.getDealsByCategory(category)
}

// Search deals
export const searchDeals = async (query: string): Promise<Deal[]> => {
  return nepalWebScraper.searchDeals(query)
}

// Get deals by organization type
export const getDealsByType = async (
  type: "bank" | "microfinance" | "government" | "ngo" | "ingo" | "cooperative",
): Promise<Deal[]> => {
  return nepalWebScraper.getDealsByType(type)
}

// Get scraping statistics
export const getScrapingStats = () => {
  return nepalWebScraper.getScrapingStatus()
}

// Fallback static deals
function getFallbackDeals(): Deal[] {
  return [
    {
      id: "fallback_1",
      title: "Emergency Business Support",
      organization: "NEPAL FINANCIAL NETWORK",
      amountRange: "NPR 25,000 - 1,000,000",
      description:
        "Emergency financial support for businesses affected by economic challenges with flexible terms and quick processing.",
      location: "Nepal",
      targetAudience: "Small and Medium Businesses",
      category: "Business Development",
      isSelected: false,
      lastUpdated: new Date(),
      interestRate: "12% per annum",
      processingFee: "1% of loan amount",
      collateralRequired: false,
      processingTime: "3-5 working days",
    },
  ]
}
