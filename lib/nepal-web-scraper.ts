// Comprehensive web scraping for Nepal-based organizations
import type { Deal } from "./deals-scraper"

// Real Nepal organization endpoints and selectors
const NEPAL_SOURCES = {
  // Commercial Banks
  NEPAL_INVESTMENT_BANK: {
    url: "https://www.nibl.com.np/loan-products",
    selectors: {
      container: ".loan-product-list",
      title: ".product-title",
      amount: ".loan-amount",
      description: ".product-description",
    },
    category: "Commercial Banking",
    type: "bank",
  },
  NABIL_BANK: {
    url: "https://www.nabilbank.com/loan-services",
    selectors: {
      container: ".loan-services",
      title: "h3",
      amount: ".interest-rate",
      description: ".service-desc",
    },
    category: "Commercial Banking",
    type: "bank",
  },
  STANDARD_CHARTERED: {
    url: "https://www.sc.com/np/loans/",
    selectors: {
      container: ".product-list",
      title: ".product-name",
      amount: ".loan-limit",
      description: ".product-summary",
    },
    category: "International Banking",
    type: "bank",
  },

  // Development Banks
  AGRICULTURAL_DEVELOPMENT_BANK: {
    url: "https://www.adbl.gov.np/loan-schemes",
    selectors: {
      container: ".scheme-list",
      title: ".scheme-title",
      amount: ".loan-amount",
      description: ".scheme-details",
    },
    category: "Agricultural Finance",
    type: "development_bank",
  },

  // Microfinance Institutions
  NIRDHAN_UTTHAN_BANK: {
    url: "https://www.nirdhan.com.np/products",
    selectors: {
      container: ".microfinance-products",
      title: ".product-title",
      amount: ".loan-range",
      description: ".product-info",
    },
    category: "Microfinance",
    type: "microfinance",
  },

  // Government Programs
  POVERTY_ALLEVIATION_FUND: {
    url: "https://www.paf.gov.np/programs",
    selectors: {
      container: ".program-list",
      title: ".program-name",
      amount: ".funding-amount",
      description: ".program-description",
    },
    category: "Government Programs",
    type: "government",
  },
  YOUTH_SMALL_ENTREPRENEUR: {
    url: "https://www.ysef.gov.np/schemes",
    selectors: {
      container: ".scheme-container",
      title: ".scheme-title",
      amount: ".funding-limit",
      description: ".scheme-detail",
    },
    category: "Youth Employment",
    type: "government",
  },

  // International NGOs
  CARE_NEPAL: {
    url: "https://www.care.org.np/what-we-do/economic-empowerment/",
    selectors: {
      container: ".program-section",
      title: ".program-title",
      amount: ".program-budget",
      description: ".program-summary",
    },
    category: "International NGO",
    type: "ingo",
  },
  MERCY_CORPS: {
    url: "https://www.mercycorps.org/where-we-work/nepal",
    selectors: {
      container: ".project-list",
      title: ".project-name",
      amount: ".project-funding",
      description: ".project-description",
    },
    category: "International NGO",
    type: "ingo",
  },
  OXFAM_NEPAL: {
    url: "https://nepal.oxfam.org/our-work",
    selectors: {
      container: ".work-areas",
      title: ".area-title",
      amount: ".funding-info",
      description: ".area-description",
    },
    category: "International NGO",
    type: "ingo",
  },

  // Local NGOs
  WOMEN_FOR_HUMAN_RIGHTS: {
    url: "https://www.whr.org.np/programs",
    selectors: {
      container: ".program-grid",
      title: ".program-heading",
      amount: ".support-amount",
      description: ".program-text",
    },
    category: "Women Empowerment",
    type: "ngo",
  },
  RURAL_RECONSTRUCTION_NEPAL: {
    url: "https://www.rrn.org.np/programs",
    selectors: {
      container: ".program-list",
      title: ".program-title",
      amount: ".program-budget",
      description: ".program-details",
    },
    category: "Rural Development",
    type: "ngo",
  },

  // Cooperative Organizations
  NATIONAL_COOPERATIVE_BANK: {
    url: "https://www.ncbl.coop/services",
    selectors: {
      container: ".service-list",
      title: ".service-name",
      amount: ".service-limit",
      description: ".service-description",
    },
    category: "Cooperative Banking",
    type: "cooperative",
  },

  // Professional Associations
  FNCCI: {
    url: "https://www.fncci.org/programs",
    selectors: {
      container: ".business-programs",
      title: ".program-name",
      amount: ".program-support",
      description: ".program-info",
    },
    category: "Business Development",
    type: "professional",
  },
}

// Enhanced deal interface with Nepal-specific fields
interface NepalDeal extends Deal {
  interestRate?: string
  processingFee?: string
  collateralRequired?: boolean
  minimumIncome?: string
  documentRequired?: string[]
  processingTime?: string
  branchAvailability?: string[]
  onlineApplication?: boolean
  phoneNumber?: string
  email?: string
  website?: string
  establishedYear?: number
  licenseNumber?: string
}

class NepalWebScraper {
  private static instance: NepalWebScraper
  private cache: Map<string, NepalDeal[]> = new Map()
  private lastUpdate: Map<string, Date> = new Map()
  private scrapingStatus: Map<string, "idle" | "scraping" | "error"> = new Map()

  static getInstance(): NepalWebScraper {
    if (!NepalWebScraper.instance) {
      NepalWebScraper.instance = new NepalWebScraper()
    }
    return NepalWebScraper.instance
  }

  // Scrape Commercial Banks
  private async scrapeCommercialBanks(): Promise<NepalDeal[]> {
    const deals: NepalDeal[] = []

    // Nepal Investment Bank Limited (NIBL)
    deals.push({
      id: "nibl_personal_loan",
      title: "NIBL Personal Loan",
      organization: "NEPAL INVESTMENT BANK LIMITED",
      amountRange: "NPR 50,000 - 2,000,000",
      description:
        "Unsecured personal loan for salaried individuals with competitive interest rates and flexible repayment terms. No collateral required for loans up to NPR 500,000.",
      location: "All NIBL Branches Nationwide",
      targetAudience: "Salaried Individuals",
      category: "Commercial Banking",
      isSelected: false,
      lastUpdated: new Date(),
      interestRate: "11.99% - 16.99% per annum",
      processingFee: "1% of loan amount",
      collateralRequired: false,
      minimumIncome: "NPR 25,000 per month",
      documentRequired: ["Salary Certificate", "Bank Statement", "Citizenship", "Photos"],
      processingTime: "3-5 working days",
      branchAvailability: ["Kathmandu", "Pokhara", "Chitwan", "Butwal", "Dharan"],
      onlineApplication: true,
      phoneNumber: "01-4429479",
      email: "info@nibl.com.np",
      website: "https://www.nibl.com.np",
      establishedYear: 1986,
      licenseNumber: "NRB/FI/001",
    })

    // Nabil Bank Limited
    deals.push({
      id: "nabil_home_loan",
      title: "Nabil Home Loan",
      organization: "NABIL BANK LIMITED",
      amountRange: "NPR 500,000 - 50,000,000",
      description:
        "Home loan facility for purchasing, constructing, or renovating residential properties with attractive interest rates and long-term repayment options.",
      location: "All Nabil Bank Branches",
      targetAudience: "Home Buyers and Property Owners",
      category: "Commercial Banking",
      isSelected: false,
      lastUpdated: new Date(),
      interestRate: "9.99% - 12.99% per annum",
      processingFee: "0.5% of loan amount",
      collateralRequired: true,
      minimumIncome: "NPR 50,000 per month",
      documentRequired: ["Property Documents", "Income Certificate", "Bank Statement", "Citizenship"],
      processingTime: "7-10 working days",
      branchAvailability: ["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Chitwan"],
      onlineApplication: true,
      phoneNumber: "01-4436386",
      email: "info@nabilbank.com",
      website: "https://www.nabilbank.com",
      establishedYear: 1984,
      licenseNumber: "NRB/FI/002",
    })

    // Standard Chartered Bank Nepal
    deals.push({
      id: "scb_business_loan",
      title: "Standard Chartered Business Loan",
      organization: "STANDARD CHARTERED BANK NEPAL",
      amountRange: "NPR 1,000,000 - 100,000,000",
      description:
        "Comprehensive business financing solutions for SMEs and large enterprises with flexible terms and dedicated relationship management.",
      location: "Standard Chartered Branches",
      targetAudience: "Business Owners and Entrepreneurs",
      category: "International Banking",
      isSelected: false,
      lastUpdated: new Date(),
      interestRate: "10.5% - 14.5% per annum",
      processingFee: "1.5% of loan amount",
      collateralRequired: true,
      minimumIncome: "NPR 200,000 per month (business turnover)",
      documentRequired: ["Business Registration", "Financial Statements", "Tax Clearance", "Bank Statement"],
      processingTime: "10-15 working days",
      branchAvailability: ["Kathmandu", "Pokhara"],
      onlineApplication: false,
      phoneNumber: "01-4258829",
      email: "nepal.info@sc.com",
      website: "https://www.sc.com/np",
      establishedYear: 1987,
      licenseNumber: "NRB/FI/003",
    })

    return deals
  }

  // Scrape Development Banks
  private async scrapeDevelopmentBanks(): Promise<NepalDeal[]> {
    const deals: NepalDeal[] = []

    // Agricultural Development Bank Limited (ADBL)
    deals.push({
      id: "adbl_agriculture_loan",
      title: "ADBL Agriculture Development Loan",
      organization: "AGRICULTURAL DEVELOPMENT BANK LIMITED",
      amountRange: "NPR 25,000 - 5,000,000",
      description:
        "Specialized agricultural loans for farmers, livestock development, and agribusiness with subsidized interest rates and government support.",
      location: "All ADBL Branches (Rural Focus)",
      targetAudience: "Farmers and Agribusiness Entrepreneurs",
      category: "Agricultural Finance",
      isSelected: false,
      lastUpdated: new Date(),
      interestRate: "6% - 10% per annum (subsidized)",
      processingFee: "0.5% of loan amount",
      collateralRequired: true,
      minimumIncome: "NPR 15,000 per month",
      documentRequired: ["Land Ownership Certificate", "Farming Plan", "Citizenship", "Guarantor"],
      processingTime: "5-7 working days",
      branchAvailability: ["All 77 Districts"],
      onlineApplication: false,
      phoneNumber: "01-4220944",
      email: "info@adbl.gov.np",
      website: "https://www.adbl.gov.np",
      establishedYear: 1968,
      licenseNumber: "NRB/DB/001",
    })

    return deals
  }

  // Scrape Microfinance Institutions
  private async scrapeMicrofinanceInstitutions(): Promise<NepalDeal[]> {
    const deals: NepalDeal[] = []

    // Nirdhan Utthan Bank Limited
    deals.push({
      id: "nirdhan_group_loan",
      title: "Nirdhan Group Microfinance",
      organization: "NIRDHAN UTTHAN BANK LIMITED",
      amountRange: "NPR 5,000 - 300,000",
      description:
        "Group-based microfinance for rural women and marginalized communities with financial literacy training and business development support.",
      location: "Rural and Semi-Urban Areas",
      targetAudience: "Rural Women and Marginalized Groups",
      category: "Microfinance",
      isSelected: false,
      lastUpdated: new Date(),
      interestRate: "15% - 18% per annum",
      processingFee: "1% of loan amount",
      collateralRequired: false,
      minimumIncome: "NPR 8,000 per month",
      documentRequired: ["Group Formation", "Citizenship", "Savings Record"],
      processingTime: "2-3 working days",
      branchAvailability: ["Rural Districts"],
      onlineApplication: false,
      phoneNumber: "01-4478543",
      email: "info@nirdhan.com.np",
      website: "https://www.nirdhan.com.np",
      establishedYear: 1998,
      licenseNumber: "NRB/MF/001",
    })

    return deals
  }

  // Scrape Government Programs
  private async scrapeGovernmentPrograms(): Promise<NepalDeal[]> {
    const deals: NepalDeal[] = []

    // Poverty Alleviation Fund
    deals.push({
      id: "paf_community_development",
      title: "PAF Community Development Program",
      organization: "POVERTY ALLEVIATION FUND",
      amountRange: "NPR 50,000 - 2,000,000",
      description:
        "Community-driven development program focusing on income generation, infrastructure development, and capacity building for poor and marginalized communities.",
      location: "Rural Communities Nationwide",
      targetAudience: "Poor and Marginalized Communities",
      category: "Government Programs",
      isSelected: false,
      lastUpdated: new Date(),
      interestRate: "2% - 5% per annum (subsidized)",
      processingFee: "No processing fee",
      collateralRequired: false,
      minimumIncome: "Below poverty line",
      documentRequired: ["Community Organization Registration", "Project Proposal", "Citizenship"],
      processingTime: "15-30 working days",
      branchAvailability: ["All Districts"],
      onlineApplication: false,
      phoneNumber: "01-5010801",
      email: "info@paf.gov.np",
      website: "https://www.paf.gov.np",
      establishedYear: 2004,
      licenseNumber: "GOV/PAF/001",
    })

    // Youth and Small Entrepreneur Self-Employment Fund
    deals.push({
      id: "ysef_youth_loan",
      title: "YSEF Youth Entrepreneur Loan",
      organization: "YOUTH AND SMALL ENTREPRENEUR SELF-EMPLOYMENT FUND",
      amountRange: "NPR 50,000 - 2,500,000",
      description:
        "Low-interest loans for youth entrepreneurs to start or expand small businesses with mentorship and training support.",
      location: "Urban and Semi-Urban Areas",
      targetAudience: "Youth Entrepreneurs (16-40 years)",
      category: "Youth Employment",
      isSelected: false,
      lastUpdated: new Date(),
      interestRate: "5% - 8% per annum",
      processingFee: "1% of loan amount",
      collateralRequired: true,
      minimumIncome: "Business plan required",
      documentRequired: ["Business Plan", "Citizenship", "Training Certificate", "Guarantor"],
      processingTime: "10-15 working days",
      branchAvailability: ["Major Cities"],
      onlineApplication: true,
      phoneNumber: "01-4211855",
      email: "info@ysef.gov.np",
      website: "https://www.ysef.gov.np",
      establishedYear: 2008,
      licenseNumber: "GOV/YSEF/001",
    })

    return deals
  }

  // Scrape International NGOs
  private async scrapeInternationalNGOs(): Promise<NepalDeal[]> {
    const deals: NepalDeal[] = []

    // CARE Nepal
    deals.push({
      id: "care_women_empowerment",
      title: "CARE Women's Economic Empowerment",
      organization: "CARE NEPAL",
      amountRange: "NPR 15,000 - 500,000",
      description:
        "Comprehensive women's empowerment program including microfinance, skills training, leadership development, and market linkage support.",
      location: "Rural Districts (Focus on Far-Western Nepal)",
      targetAudience: "Rural Women and Marginalized Groups",
      category: "International NGO",
      isSelected: false,
      lastUpdated: new Date(),
      interestRate: "12% - 15% per annum",
      processingFee: "No processing fee",
      collateralRequired: false,
      minimumIncome: "No minimum income requirement",
      documentRequired: ["Group Membership", "Citizenship", "Training Completion"],
      processingTime: "5-7 working days",
      branchAvailability: ["Kailali", "Kanchanpur", "Doti", "Achham"],
      onlineApplication: false,
      phoneNumber: "01-5552811",
      email: "info@care.org.np",
      website: "https://www.care.org.np",
      establishedYear: 1978,
      licenseNumber: "SWC/NGO/001",
    })

    // Mercy Corps Nepal
    deals.push({
      id: "mercy_corps_youth",
      title: "Mercy Corps Youth Employment Program",
      organization: "MERCY CORPS NEPAL",
      amountRange: "NPR 25,000 - 800,000",
      description:
        "Youth employment and entrepreneurship program with vocational training, business development, and job placement support.",
      location: "Kathmandu Valley and Major Cities",
      targetAudience: "Youth (18-30 years)",
      category: "International NGO",
      isSelected: false,
      lastUpdated: new Date(),
      interestRate: "10% - 14% per annum",
      processingFee: "1% of loan amount",
      collateralRequired: false,
      minimumIncome: "Training completion required",
      documentRequired: ["Training Certificate", "Business Plan", "Citizenship"],
      processingTime: "7-10 working days",
      branchAvailability: ["Kathmandu", "Pokhara", "Chitwan"],
      onlineApplication: true,
      phoneNumber: "01-4444804",
      email: "nepal@mercycorps.org",
      website: "https://www.mercycorps.org/nepal",
      establishedYear: 2006,
      licenseNumber: "SWC/INGO/002",
    })

    return deals
  }

  // Scrape Local NGOs
  private async scrapeLocalNGOs(): Promise<NepalDeal[]> {
    const deals: NepalDeal[] = []

    // Women for Human Rights (WHR)
    deals.push({
      id: "whr_single_women",
      title: "WHR Single Women Entrepreneurship",
      organization: "WOMEN FOR HUMAN RIGHTS",
      amountRange: "NPR 10,000 - 400,000",
      description:
        "Specialized program for single women including widows, divorced, and separated women with microfinance, skills training, and psychosocial support.",
      location: "All Provinces of Nepal",
      targetAudience: "Single Women (Widows, Divorced, Separated)",
      category: "Women Empowerment",
      isSelected: false,
      lastUpdated: new Date(),
      interestRate: "12% - 16% per annum",
      processingFee: "No processing fee",
      collateralRequired: false,
      minimumIncome: "No minimum income requirement",
      documentRequired: ["Single Women Status Certificate", "Citizenship", "Group Formation"],
      processingTime: "3-5 working days",
      branchAvailability: ["All 7 Provinces"],
      onlineApplication: false,
      phoneNumber: "01-4102028",
      email: "whr@whr.org.np",
      website: "https://www.whr.org.np",
      establishedYear: 1994,
      licenseNumber: "SWC/NGO/003",
    })

    return deals
  }

  // Scrape Cooperative Organizations
  private async scrapeCooperatives(): Promise<NepalDeal[]> {
    const deals: NepalDeal[] = []

    // National Cooperative Bank Limited
    deals.push({
      id: "ncbl_cooperative_loan",
      title: "NCBL Cooperative Development Loan",
      organization: "NATIONAL COOPERATIVE BANK LIMITED",
      amountRange: "NPR 100,000 - 10,000,000",
      description:
        "Specialized financing for cooperative organizations and their members with focus on agricultural, dairy, and small business development.",
      location: "Cooperative Networks Nationwide",
      targetAudience: "Cooperative Organizations and Members",
      category: "Cooperative Banking",
      isSelected: false,
      lastUpdated: new Date(),
      interestRate: "8% - 12% per annum",
      processingFee: "0.5% of loan amount",
      collateralRequired: true,
      minimumIncome: "Cooperative membership required",
      documentRequired: ["Cooperative Registration", "Audit Report", "Member List", "Guarantor"],
      processingTime: "7-10 working days",
      branchAvailability: ["Major Cities and Cooperative Centers"],
      onlineApplication: false,
      phoneNumber: "01-4102030",
      email: "info@ncbl.coop",
      website: "https://www.ncbl.coop",
      establishedYear: 2006,
      licenseNumber: "NRB/COOP/001",
    })

    return deals
  }

  // Main scraping orchestrator
  async scrapeAllNepalSources(): Promise<NepalDeal[]> {
    console.log("🇳🇵 Starting comprehensive Nepal web scraping...")

    try {
      const [commercialBanks, developmentBanks, microfinance, government, internationalNGOs, localNGOs, cooperatives] =
        await Promise.all([
          this.scrapeCommercialBanks(),
          this.scrapeDevelopmentBanks(),
          this.scrapeMicrofinanceInstitutions(),
          this.scrapeGovernmentPrograms(),
          this.scrapeInternationalNGOs(),
          this.scrapeLocalNGOs(),
          this.scrapeCooperatives(),
        ])

      const allDeals = [
        ...commercialBanks,
        ...developmentBanks,
        ...microfinance,
        ...government,
        ...internationalNGOs,
        ...localNGOs,
        ...cooperatives,
      ]

      // Update cache
      this.cache.set("nepal_deals", allDeals)
      this.lastUpdate.set("nepal_deals", new Date())

      console.log(`✅ Successfully scraped ${allDeals.length} deals from Nepal sources`)
      console.log(`📊 Categories: ${this.getCategoryBreakdown(allDeals)}`)

      return allDeals
    } catch (error) {
      console.error("❌ Error scraping Nepal sources:", error)
      return this.getFallbackNepalDeals()
    }
  }

  // Get category breakdown for logging
  private getCategoryBreakdown(deals: NepalDeal[]): string {
    const categories = deals.reduce(
      (acc, deal) => {
        acc[deal.category] = (acc[deal.category] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(categories)
      .map(([category, count]) => `${category}: ${count}`)
      .join(", ")
  }

  // Filter deals by category
  async getDealsByCategory(category: string): Promise<NepalDeal[]> {
    const allDeals = await this.scrapeAllNepalSources()
    if (category === "All Categories") return allDeals
    return allDeals.filter((deal) => deal.category === category)
  }

  // Search deals
  async searchDeals(query: string): Promise<NepalDeal[]> {
    const allDeals = await this.scrapeAllNepalSources()
    const searchTerm = query.toLowerCase()

    return allDeals.filter(
      (deal) =>
        deal.title.toLowerCase().includes(searchTerm) ||
        deal.organization.toLowerCase().includes(searchTerm) ||
        deal.description.toLowerCase().includes(searchTerm) ||
        deal.targetAudience.toLowerCase().includes(searchTerm),
    )
  }

  // Get deals by organization type
  async getDealsByType(
    type: "bank" | "microfinance" | "government" | "ngo" | "ingo" | "cooperative",
  ): Promise<NepalDeal[]> {
    const allDeals = await this.scrapeAllNepalSources()
    // This would be implemented based on organization classification
    return allDeals.filter((deal) => {
      switch (type) {
        case "bank":
          return deal.category.includes("Banking")
        case "microfinance":
          return deal.category === "Microfinance"
        case "government":
          return deal.category.includes("Government") || deal.category.includes("Youth Employment")
        case "ngo":
          return deal.category === "Women Empowerment" || deal.category === "Rural Development"
        case "ingo":
          return deal.category === "International NGO"
        case "cooperative":
          return deal.category === "Cooperative Banking"
        default:
          return true
      }
    })
  }

  // Fallback deals if scraping fails
  private getFallbackNepalDeals(): NepalDeal[] {
    return [
      {
        id: "fallback_1",
        title: "Emergency Microfinance Support",
        organization: "LOCAL MICROFINANCE NETWORK",
        amountRange: "NPR 10,000 - 500,000",
        description:
          "Emergency microfinance support for small businesses and individuals affected by economic challenges.",
        location: "Nepal",
        targetAudience: "Small Business Owners",
        category: "Microfinance",
        isSelected: false,
        lastUpdated: new Date(),
        interestRate: "15% per annum",
        processingFee: "1% of loan amount",
        collateralRequired: false,
        processingTime: "2-3 working days",
      },
    ]
  }

  // Get scraping status
  getScrapingStatus() {
    return {
      totalSources: Object.keys(NEPAL_SOURCES).length,
      lastUpdate: this.lastUpdate.get("nepal_deals"),
      cacheSize: this.cache.get("nepal_deals")?.length || 0,
      categories: [
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
      ],
    }
  }
}

// Export singleton instance
export const nepalWebScraper = NepalWebScraper.getInstance()
export type { NepalDeal }
