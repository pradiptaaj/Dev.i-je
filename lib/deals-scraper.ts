// Updated deals scraper to use web scraping
import { getScrapedDeals, refreshScrapedDeals } from "./web-scraper"

export interface Deal {
  id: string
  title: string
  organization: string
  amountRange: string
  description: string
  location: string
  targetAudience: string
  category: string
  isSelected: boolean
  lastUpdated: Date
  // Additional fields from scraping
  applicationDeadline?: string
  eligibility?: string[]
  contactInfo?: string
  sourceUrl?: string
}

export const categories = [
  "All Categories",
  "Government Employment",
  "Women Empowerment",
  "Self Employment",
  "Microfinance",
  "Cooperative Finance",
  "International Development",
  "Skills Development",
  "Youth Employment",
  "Emergency Finance",
  "Agricultural Finance",
  "Banking & Microfinance",
  "Business Development",
  "Commercial Banking",
  "Development Organization",
  "International Microfinance",
  "International NGO",
  "Microfinance & Training",
  "Professional Association",
  "Professional Development",
  "Rehabilitation & Empowerment",
  "Rural Development",
  "Rural Development & Training",
]

// Get deals from web scraping
export const getDealsData = async (): Promise<Deal[]> => {
  try {
    return await getScrapedDeals()
  } catch (error) {
    console.error("Error fetching scraped deals:", error)
    // Return fallback static data if scraping fails
    return getFallbackDeals()
  }
}

// Refresh deals with new scraping
export const refreshDealsData = async (): Promise<Deal[]> => {
  try {
    return await refreshScrapedDeals()
  } catch (error) {
    console.error("Error refreshing scraped deals:", error)
    return getFallbackDeals()
  }
}

// Fallback static deals
function getFallbackDeals(): Deal[] {
  return [
    {
      id: "1",
      title: "Single Women Entrepreneurship Program",
      organization: "WOMEN FOR HUMAN RIGHTS (WHR)",
      amountRange: "NPR 10,000 - 500,000",
      description:
        "WHR Nepal provides microfinance, skill development, and business training specifically for single women including widows. Offers loans from NPR 10,000...",
      location: "Nepal",
      targetAudience: "Single Nepali Women",
      category: "Microfinance & Training",
      isSelected: false,
      lastUpdated: new Date(),
    },
    {
      id: "2",
      title: "Women Entrepreneurs Development Program",
      organization: "SAATHI (WOREC NEPAL)",
      amountRange: "NPR 5,000 - 100,000",
      description:
        "WOREC Nepal through Saathi program provides financial literacy, business skills training, and seed funding for rural Nepali women. Focus on agricultur...",
      location: "Rural Nepal",
      targetAudience: "Rural Nepali Women",
      category: "Rural Development",
      isSelected: true,
      lastUpdated: new Date(),
    },
    {
      id: "3",
      title: "Business Development Grant",
      organization: "NEPAL DEVELOPMENT FOUNDATION",
      amountRange: "NPR 25,000 - 1,000,000",
      description:
        "Comprehensive business development program for Nepali women entrepreneurs with focus on sustainable business practices and market expansion...",
      location: "Multiple districts in Nepal",
      targetAudience: "Nepali Women Entrepreneurs",
      category: "Business Development",
      isSelected: true,
      lastUpdated: new Date(),
    },
  ]
}
