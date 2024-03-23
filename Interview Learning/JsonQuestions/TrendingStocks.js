// Trending Stocks
// Trending Stocks (Javascript) - [Medium - FAANG]
// You are tasked with creating a function that retrieves information about trending stocks based on their market capitalization 
// and prices. The goal is to find the top 'n' trending stocks, where 'n' is a given number. The function should return an array 
// of objects, each containing the symbol, name, market capitalization, and price information for these trending stocks.

// Input:
// n: An integer representing the number of trending stocks to retrieve.
// Output:
// An array of objects, each containing the following information for the top 'n' trending stocks:
// symbol: Stock symbol.
// name: Stock name.
// market-cap: Market capitalization of the stock.
// price: Current price of the stock.

// Examples:
// Input: n = 2
// Output:
// [ 
//     { "symbol": "MMM", "name": "3M Company", "market-cap": 138721055226, "price": 1001.52 }, 
// { "symbol": "ABT", "name": "Abbott Laboratories", "market-cap": 102121042306, "price": 1001.52 }
// ]


// Input: n = 3
// Output:
// [ { "symbol": "MMM", "name": "3M Company", "market-cap": 138721055226, "price": 1001.52 }, 
// { "symbol": "ABT", "name": "Abbott Laboratories", "market-cap": 102121042306, "price": 1001.52 }, 
// { "symbol": "GOOG", "name": "Alphabet Inc.", "market-cap": 98765432100, "price": 2900.10 } 
// ]

// Define API endpoints for different types of stock information
const SYMBOLS_API_BASE_URL = 'api_1';
const MARKET_CAPS_API_BASE_URL = 'api_2';
const PRICES_API_BASE_URL = 'api_3';
// Define the main function to retrieve trending stocks
async function trendingStocks(n) {
    // Fetch symbols and market caps data concurrently
    const [symbolsResponse, marketCapsResponse] = await Promise.all([
        fetch(SYMBOLS_API_BASE_URL),
        fetch(MARKET_CAPS_API_BASE_URL)
    ]);

    // Parse JSON data for symbols and market caps
    const [symbols, marketCaps] = await Promise.all([
        symbolsResponse.json(),
        marketCapsResponse.json()
    ]);
    // Sort stocks by market cap in descending order, then select top 'n' stocks
    const rankedSymbolsByMarketCap = marketCaps
        .sort((stockA, stockB) => stockB['market-cap'] - stockA['market-cap'])
        .slice(0, n)
        .map(marketObjCap => marketObjCap.symbol);
    // Build the URL for fetching prices
    let priceUrls = PRICES_API_BASE_URL;
    priceUrls += `?symbol=${JSON.stringify(rankedSymbolsByMarketCap)}`;
    // Fetch price data for the selected stocks
    const priceResponse = await fetch(priceUrls);
    const pricesJson = await priceResponse.json();
    // Match stock symbols with their names and market caps
    pricesJson.forEach(obj => {
        let name = symbols.find(item => item['symbol'] === obj['symbol'].name);
        let marketCap = marketCaps.find(item => item['symbol'] === obj['symbol'])['market-cap'];
        obj.name = name;
        obj['market-cap'] = marketCap;
    });
    // Return the final array of trending stocks with all required information
    return pricesJson;
}

// Do not edit the line below.
// exports.trendingStocks = trendingStocks;

// This code aims to solve the problem of finding trending stocks based on their market capitalization and prices. It does so by 
// retrieving data from three different APIs: one for stock symbols and names (api_1), one for market capitalizations (api_2), and 
// one for stock prices (api_3). Here's a detailed explanation of how the code works:

// API Endpoints:
// SYMBOLS_API_BASE_URL, MARKET_CAPS_API_BASE_URL, and PRICES_API_BASE_URL are defined to store the URLs of the respective API endpoints.
// Main Function (trendingStocks):
// This asynchronous function takes an integer n as input, which represents the number of trending stocks to retrieve.
// Fetching Data:
// fetch is used to simultaneously fetch data from the symbols and market caps APIs using Promise.all.
// The JSON data from both responses are parsed and stored in the symbols and marketcaps arrays.
// Sorting by Market Cap:
// The marketcaps array is sorted in descending order based on the market capitalization of the stocks.
// The top n stocks are selected using slice, and their symbols are extracted into the rankedSymbolsByMarketCap array.
// Building Prices URL:
// The URL for fetching price data is constructed by appending the symbols of the top trending stocks to the PRICES_API_BASE_URL.
// Fetching Price Data:
// The prices of the selected stocks are fetched using the constructed URL.
// The JSON data containing stock prices is stored in the pricesJSON array.
// Matching Data:
// For each stock object in the pricesJSON array, the corresponding name and market capitalization are retrieved from the symbols and 
// marketcaps arrays using find.
// The name and market-cap properties are added to each stock object.
// Final Output:
// The function returns an array of objects, each containing the symbol, name, market capitalization, and price information for the 
// top trending stocks.
// In conclusion, this code effectively fetches data from multiple APIs, sorts stocks based on market capitalization, fetches price 
// data for the selected stocks, matches relevant information, and returns a list of trending stocks with all the required details. 
// This solution is ideal for anyone looking to gather and present trending stock data with market cap and price information on their 
// website.