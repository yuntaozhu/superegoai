
/**
 * Firecrawl Service
 * Handles scraping and crawling via Firecrawl API
 */

const FIRECRAWL_API_URL = "https://api.firecrawl.dev/v0/scrape";

export const crawlUrl = async (url: string) => {
  const apiKey = process.env.FIRECRAWL_KEY;
  
  if (!apiKey) {
    throw new Error("Missing Firecrawl API Key");
  }

  try {
    const response = await fetch(FIRECRAWL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        url: url,
        pageOptions: {
          onlyMainContent: true
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Firecrawl Error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    
    if (!data.success || !data.data) {
        throw new Error("Firecrawl failed to return data");
    }

    return {
      title: data.data.metadata?.title || "Untitled Web Source",
      content: data.data.markdown || data.data.content || "No content extracted.",
      source: url,
      description: data.data.metadata?.description
    };

  } catch (error: any) {
    console.error("Firecrawl Fetch Error:", error);
    throw error;
  }
};
