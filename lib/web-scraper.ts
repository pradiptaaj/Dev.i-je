// Web scraping utilities for fetching real deals and programs
import type { Deal } from "./deals-scraper"

// Types for different program sources
interface ScrapedProgram {
  title: string
  organization: string
  amount?: string
  description: string
  location: string
  category: string
  targetAudience: string
  applicationDeadline?: string
  eligibility?: string[]
  contactInfo?: string
  sourceUrl: string
}

// Government and NGO program sources
const PROGRAM_SOURCES = {
  // Nepal Government Programs
  NEPAL_GOVT: {
    url: "https://www.mof.gov.np/en/archive-documents/economic-survey-21",
    selector: ".program-list",
    type: "government",
  },
  // Microfinance Programs
  MICROFINANCE: {
    url: "https://www.nrb.org.np/contents/uploads/2019/12/List-of-Licensed-Microfinance-Development-Banks.pdf",
    type: "microfinance",
  },
  // International Development Programs
  USAID: {
    url: "https://www.usaid.gov/nepal/our-work",
    type: "international",
  },
  WORLD_BANK: {
    url: "https://www.worldbank.org/en/country/nepal/projects",
    type: "international",
  },
  // NGO Programs
  CARE_NEPAL: {
    url: "https://www.care.org.np/programs/",
    type: "ngo",
  },
}

// Simulated scraping functions (in production, these would use actual web scraping)
export class WebScraper {
  private static instance: WebScraper
  private cache: Map<string, ScrapedProgram[]> = new Map()
  private lastUpdate: Date = new Date()

  static getInstance(): WebScraper {
    if (!WebScraper.instance) {
      WebScraper.instance = new WebScraper()
    }
    return WebScraper.instance
  }

  // Simulate scraping government programs
  private async scrapeGovernmentPrograms(): Promise<ScrapedProgram[]> {
    // In production, this would use libraries like Puppeteer or Cheerio
    return [
      {
        title: "Prime Minister Employment Program",
        organization: "GOVERNMENT OF NEPAL",
        amount: "NPR 15,000 - 200,000",
        description:
          "Employment generation program for rural youth with focus on skill development and entrepreneurship. Provides training, seed funding, and mentorship support.",
        location: "All 77 Districts of Nepal",
        category: "Government Employment",
        targetAudience: "Rural Youth (18-35 years)",
        applicationDeadline: "Rolling basis",
        eligibility: ["Nepali citizen", "Age 18-35", "Rural background", "Unemployed"],
        contactInfo: "pmep@gov.np",
        sourceUrl: "https://pmep.gov.np",
      },
      {
        title: "Women Entrepreneurship Development Program",
        organization: "MINISTRY OF WOMEN, CHILDREN AND SENIOR CITIZENS",
        amount: "NPR 25,000 - 500,000",
        description:
          "Comprehensive program for women entrepreneurs including business training, financial literacy, market linkage, and seed capital support.",
        location: "All Provinces of Nepal",
        category: "Women Empowerment",
        targetAudience: "Women Entrepreneurs",
        applicationDeadline: "March 31, 2024",
        eligibility: ["Women aged 18-60", "Business plan required", "Nepali citizen"],
        contactInfo: "wedp@mowcsc.gov.np",
        sourceUrl: "https://mowcsc.gov.np",
      },
      {
        title: "Youth and Small Entrepreneur Self-Employment Fund",
        organization: "MINISTRY OF FINANCE",
        amount: "NPR 50,000 - 2,000,000",
        description:
          "Low-interest loans for youth and small entrepreneurs to start or expand businesses. Special focus on technology, agriculture, and manufacturing sectors.",
        location: "Urban and Semi-Urban Areas",
        category: "Self Employment",
        targetAudience: "Youth Entrepreneurs (16-40 years)",
        applicationDeadline: "Ongoing",
        eligibility: ["Age 16-40", "Business registration", "Collateral required for loans above 500K"],
        contactInfo: "ysesef@mof.gov.np",
        sourceUrl: "https://mof.gov.np",
      },
    ]
  }

  // Simulate scraping microfinance programs
  private async scrapeMicrofinancePrograms(): Promise<ScrapedProgram[]> {
    return [
      {
        title: "Rural Microfinance Program",
        organization: "NEPAL RASTRA BANK",
        amount: "NPR 5,000 - 300,000",
        description:
          "Microfinance services for rural communities with focus on agriculture, livestock, and small business development. Group lending model with financial literacy training.",
        location: "Rural Nepal",
        category: "Microfinance",
        targetAudience: "Rural Farmers and Small Business Owners",
        applicationDeadline: "Continuous",
        eligibility: ["Rural residence", "Group formation", "Basic business plan"],
        contactInfo: "microfinance@nrb.org.np",
        sourceUrl: "https://nrb.org.np",
      },
      {
        title: "Women's Cooperative Development Fund",
        organization: "COOPERATIVE DEVELOPMENT BOARD",
        amount: "NPR 10,000 - 1,000,000",
        description:
          "Cooperative-based lending program for women's groups focusing on income generation activities, skill development, and community development projects.",
        location: "Community Level",
        category: "Cooperative Finance",
        targetAudience: "Women's Cooperatives",
        applicationDeadline: "Quarterly",
        eligibility: ["Registered women's cooperative", "Minimum 15 members", "Savings history"],
        contactInfo: "wcdf@cdb.gov.np",
        sourceUrl: "https://cdb.gov.np",
      },
    ]
  }

  // Simulate scraping international programs
  private async scrapeInternationalPrograms(): Promise<ScrapedProgram[]> {
    return [
      {
        title: "USAID Nepal Economic Integration Activity",
        organization: "USAID NEPAL",
        amount: "USD 1,000 - 50,000",
        description:
          "Economic integration program supporting marginalized communities through skills training, market access, and financial inclusion initiatives.",
        location: "Provinces 1, 2, and Sudurpashchim",
        category: "International Development",
        targetAudience: "Marginalized Communities",
        applicationDeadline: "April 15, 2024",
        eligibility: ["Marginalized community member", "Age 18+", "Training completion required"],
        contactInfo: "nepal@usaid.gov",
        sourceUrl: "https://usaid.gov/nepal",
      },
      {
        title: "World Bank Nepal Skills for Employment Project",
        organization: "WORLD BANK",
        amount: "NPR 20,000 - 800,000",
        description:
          "Skills development program with industry partnerships providing technical training, certification, and job placement support in high-demand sectors.",
        location: "Major Cities and Industrial Areas",
        category: "Skills Development",
        targetAudience: "Job Seekers and Students",
        applicationDeadline: "Rolling admissions",
        eligibility: ["Age 16-35", "Basic education", "Commitment to complete training"],
        contactInfo: "nepal@worldbank.org",
        sourceUrl: "https://worldbank.org/nepal",
      },
    ]
  }

  // Simulate scraping NGO programs
  private async scrapeNGOPrograms(): Promise<ScrapedProgram[]> {
    return [
      {
        title: "CARE Nepal Women's Economic Empowerment",
        organization: "CARE NEPAL",
        amount: "NPR 15,000 - 400,000",
        description:
          "Comprehensive women's empowerment program including financial services, business development, leadership training, and market linkage support.",
        location: "Rural Districts",
        category: "Women Empowerment",
        targetAudience: "Rural Women",
        applicationDeadline: "June 30, 2024",
        eligibility: ["Women aged 18-55", "Rural background", "Group participation"],
        contactInfo: "info@care.org.np",
        sourceUrl: "https://care.org.np",
      },
      {
        title: "Mercy Corps Nepal Youth Employment Program",
        organization: "MERCY CORPS",
        amount: "NPR 25,000 - 600,000",
        description:
          "Youth employment program focusing on entrepreneurship development, vocational training, and job placement in emerging sectors.",
        location: "Urban and Peri-Urban Areas",
        category: "Youth Employment",
        targetAudience: "Youth (18-30 years)",
        applicationDeadline: "Monthly intake",
        eligibility: ["Age 18-30", "Unemployed or underemployed", "Training commitment"],
        contactInfo: "nepal@mercycorps.org",
        sourceUrl: "https://mercycorps.org/nepal",
      },
    ]
  }

  // Main scraping function
  async scrapeAllPrograms(): Promise<Deal[]> {
    try {
      console.log("Starting web scraping for programs...")

      // Check cache first (cache for 1 hour)
      const cacheKey = "all_programs"
      const cachedData = this.cache.get(cacheKey)
      const now = new Date()

      if (cachedData && now.getTime() - this.lastUpdate.getTime() < 3600000) {
        console.log("Returning cached data")
        return this.convertToDeals(cachedData)
      }

      // Scrape from all sources
      const [govPrograms, microfinancePrograms, intlPrograms, ngoPrograms] = await Promise.all([
        this.scrapeGovernmentPrograms(),
        this.scrapeMicrofinancePrograms(),
        this.scrapeInternationalPrograms(),
        this.scrapeNGOPrograms(),
      ])

      // Combine all programs
      const allPrograms = [...govPrograms, ...microfinancePrograms, ...intlPrograms, ...ngoPrograms]

      // Update cache
      this.cache.set(cacheKey, allPrograms)
      this.lastUpdate = now

      console.log(`Scraped ${allPrograms.length} programs successfully`)
      return this.convertToDeals(allPrograms)
    } catch (error) {
      console.error("Error scraping programs:", error)
      // Return fallback data if scraping fails
      return this.getFallbackDeals()
    }
  }

  // Convert scraped programs to Deal format
  private convertToDeals(programs: ScrapedProgram[]): Deal[] {
    return programs.map((program, index) => ({
      id: `scraped_${index + 1}`,
      title: program.title,
      organization: program.organization,
      amountRange: program.amount || "Amount not specified",
      description: program.description,
      location: program.location,
      targetAudience: program.targetAudience,
      category: program.category,
      isSelected: false,
      lastUpdated: new Date(),
      // Additional scraped data
      applicationDeadline: program.applicationDeadline,
      eligibility: program.eligibility,
      contactInfo: program.contactInfo,
      sourceUrl: program.sourceUrl,
    }))
  }

  // Fallback deals if scraping fails
  private getFallbackDeals(): Deal[] {
    return [
      {
        id: "fallback_1",
        title: "Emergency Microfinance Program",
        organization: "LOCAL MICROFINANCE INSTITUTION",
        amountRange: "NPR 10,000 - 500,000",
        description:
          "Emergency microfinance support for small businesses affected by economic challenges. Quick approval process with flexible repayment terms.",
        location: "Nepal",
        targetAudience: "Small Business Owners",
        category: "Emergency Finance",
        isSelected: false,
        lastUpdated: new Date(),
      },
    ]
  }

  // Get programs by category
  async getProgramsByCategory(category: string): Promise<Deal[]> {
    const allPrograms = await this.scrapeAllPrograms()
    if (category === "All Categories") {
      return allPrograms
    }
    return allPrograms.filter((program) => program.category.toLowerCase().includes(category.toLowerCase()))
  }

  // Search programs
  async searchPrograms(query: string): Promise<Deal[]> {
    const allPrograms = await this.scrapeAllPrograms()
    const searchTerm = query.toLowerCase()

    return allPrograms.filter(
      (program) =>
        program.title.toLowerCase().includes(searchTerm) ||
        program.organization.toLowerCase().includes(searchTerm) ||
        program.description.toLowerCase().includes(searchTerm) ||
        program.targetAudience.toLowerCase().includes(searchTerm),
    )
  }

  // Get fresh data (bypass cache)
  async refreshPrograms(): Promise<Deal[]> {
    this.cache.clear()
    return this.scrapeAllPrograms()
  }
}

// Export singleton instance
export const webScraper = WebScraper.getInstance()

// Utility function for external use
export async function getScrapedDeals(): Promise<Deal[]> {
  return webScraper.scrapeAllPrograms()
}

export async function refreshScrapedDeals(): Promise<Deal[]> {
  return webScraper.refreshPrograms()
}
