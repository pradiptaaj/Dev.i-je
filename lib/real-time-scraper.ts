// Real-time scraping with scheduled updates
import { webScraper } from "./web-scraper"
import type { Deal } from "./deals-scraper"

class RealTimeScraper {
  private static instance: RealTimeScraper
  private updateInterval: NodeJS.Timeout | null = null
  private subscribers: ((deals: Deal[]) => void)[] = []
  private isRunning = false

  static getInstance(): RealTimeScraper {
    if (!RealTimeScraper.instance) {
      RealTimeScraper.instance = new RealTimeScraper()
    }
    return RealTimeScraper.instance
  }

  // Start real-time updates
  startRealTimeUpdates(intervalMinutes = 30) {
    if (this.isRunning) {
      console.log("Real-time scraper already running")
      return
    }

    this.isRunning = true
    console.log(`Starting real-time scraper with ${intervalMinutes} minute intervals`)

    // Initial scrape
    this.performUpdate()

    // Set up periodic updates
    this.updateInterval = setInterval(
      () => {
        this.performUpdate()
      },
      intervalMinutes * 60 * 1000,
    )
  }

  // Stop real-time updates
  stopRealTimeUpdates() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
    }
    this.isRunning = false
    console.log("Real-time scraper stopped")
  }

  // Subscribe to updates
  subscribe(callback: (deals: Deal[]) => void) {
    this.subscribers.push(callback)
    return () => {
      const index = this.subscribers.indexOf(callback)
      if (index > -1) {
        this.subscribers.splice(index, 1)
      }
    }
  }

  // Perform update and notify subscribers
  private async performUpdate() {
    try {
      console.log("Performing scheduled scrape update...")
      const deals = await webScraper.refreshPrograms()

      // Notify all subscribers
      this.subscribers.forEach((callback) => {
        try {
          callback(deals)
        } catch (error) {
          console.error("Error notifying subscriber:", error)
        }
      })

      console.log(`Updated ${deals.length} deals at ${new Date().toISOString()}`)
    } catch (error) {
      console.error("Error during scheduled update:", error)
    }
  }

  // Manual trigger update
  async triggerUpdate(): Promise<Deal[]> {
    const deals = await webScraper.refreshPrograms()
    this.subscribers.forEach((callback) => callback(deals))
    return deals
  }

  // Get current status
  getStatus() {
    return {
      isRunning: this.isRunning,
      subscriberCount: this.subscribers.length,
      lastUpdate: new Date().toISOString(),
    }
  }
}

export const realTimeScraper = RealTimeScraper.getInstance()
