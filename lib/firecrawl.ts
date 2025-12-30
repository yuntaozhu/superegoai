
/**
 * Firecrawl Service
 * Handles scraping and crawling via Firecrawl API
 */

const FIRECRAWL_API_URL = "https://api.firecrawl.dev/v0";

const getHeaders = () => {
  const apiKey = process.env.FIRECRAWL_KEY;
  if (!apiKey) {
    throw new Error("Missing Firecrawl API Key");
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };
};

export const crawlUrl = async (url: string) => {
  try {
    const response = await fetch(`${FIRECRAWL_API_URL}/scrape`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        url: url,
        pageOptions: {
          onlyMainContent: true
        }
      })
    });

    if (!response.ok) {
      let errorMessage = `Firecrawl API Error (${response.status})`;
      try {
        const errorData = await response.json();
        errorMessage += `: ${errorData.error || errorData.message || JSON.stringify(errorData)}`;
      } catch (e) {
        const errorText = await response.text();
        if (errorText) errorMessage += `: ${errorText}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (!data.success) {
        throw new Error(`Firecrawl Operation Failed: ${data.error || "Unknown error"}`);
    }

    if (!data.data) {
        throw new Error("Firecrawl returned success but no data payload");
    }

    return {
      title: data.data.metadata?.title || "Untitled Web Source",
      content: data.data.markdown || data.data.content || "No content extracted.",
      source: url,
      description: data.data.metadata?.description
    };

  } catch (error: any) {
    console.error("Firecrawl Fetch Error:", error);
    throw new Error(error.message || "Failed to crawl URL");
  }
};
