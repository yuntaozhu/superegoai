
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

export const searchWeb = async (query: string) => {
  try {
    const response = await fetch(`${FIRECRAWL_API_URL}/search`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        query: query,
        pageOptions: {
          fetchPageContent: false // We just want links and snippets first
        }
      })
    });

    if (!response.ok) {
        // Fallback or throw
        throw new Error(`Firecrawl Search Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success || !data.data) {
        return [];
    }

    // Return simplified search results
    return data.data.map((item: any) => ({
        title: item.title,
        url: item.url,
        snippet: item.description || item.markdown?.substring(0, 150) || ""
    })).slice(0, 5);

  } catch (error: any) {
    console.error("Firecrawl Search Error:", error);
    throw new Error(error.message || "Failed to search web");
  }
};
