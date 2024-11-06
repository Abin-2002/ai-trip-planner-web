import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate Travel plan for Location: Kochi, for 3 days for couple with a cheap budget, give me a hotels options list with Hotel Name, Hotel address, price, Hotel image url,  geo coordinates, rating, descriptions, and suggest itinerary with place name, place details, time to visit, place image url, geo coordinates, ticket pricing, rating, time travel each of the location for 3 days with each day plan with best time to visit in JSON format in this edited code \n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"hotel_options\": [\n    {\n      \"hotel_name\": \"The Gateway Hotel, Ernakulam\",\n      \"hotel_address\": \"Marine Drive, Ernakulam, Kochi, Kerala 682031\",\n      \"price\": \"₹3000 - ₹5000\",\n      \"hotel_image_url\": \"https://www.thegatewayhotels.com/images/hotels/kochi/exterior-day-view.jpg\",\n      \"geo_coordinates\": \"9.9603° N, 76.2815° E\",\n      \"rating\": 4.5,\n      \"description\": \"A modern hotel with a rooftop pool and bar, offering stylish rooms and a convenient location near the city center.\"\n    },\n    {\n      \"hotel_name\": \"The Leela Palace, Kochi\",\n      \"hotel_address\": \"Gokulam Rd, Kadavanthra, Kochi, Kerala 682033\",\n      \"price\": \"₹4500 - ₹7000\",\n      \"hotel_image_url\": \"https://www.theleela.com/images/hotels/kochi/gallery/exterior-view.jpg\",\n      \"geo_coordinates\": \"9.9787° N, 76.2914° E\",\n      \"rating\": 4.7,\n      \"description\": \"A luxurious hotel with sprawling grounds, offering a serene ambience, fine dining, and a spa.\"\n    },\n    {\n      \"hotel_name\": \"The Grand Hyatt Kochi Bolgatty\",\n      \"hotel_address\": \"Bolgatty Island, Kochi, Kerala 682003\",\n      \"price\": \"₹2500 - ₹4000\",\n      \"hotel_image_url\": \"https://www.hyatt.com/en-US/hotel/india/kochi/grand-hyatt-kochi-bolgatty/koczgh\",\n      \"geo_coordinates\": \"9.9876° N, 76.3029° E\",\n      \"rating\": 4.3,\n      \"description\": \"A beautiful resort on Bolgatty Island, offering stunning views of the backwaters and a relaxing atmosphere.\"\n    },\n    {\n      \"hotel_name\": \"The Brunton Boatyard\",\n      \"hotel_address\": \"Willingdon Island, Kochi, Kerala 682003\",\n      \"price\": \"₹2000 - ₹3500\",\n      \"hotel_image_url\": \"https://www.tajhotels.com/content/dam/images/hotels/india/kochi/the-brunton-boatyard/the-brunton-boatyard-hotel-exterior-view.jpg\",\n      \"geo_coordinates\": \"9.9567° N, 76.2857° E\",\n      \"rating\": 4.2,\n      \"description\": \"A heritage hotel in a restored colonial building, offering a blend of history and modern comfort.\"\n    }\n  ],\n  \"itinerary\": [\n{\n    \"day\": \"Day 1\",\n     \"plan\": [\n         {\n      \"time\": \"9:00 AM -12:00 PM\"\n        \"place_name\": \"Mattancherry Palace\",\n        \"place_details\": \"A 16th-century palace built by the Portuguese, known for its intricate murals and historical significance.\",\n        \"place_image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Mattancherry_Palace_%282019%29.jpg/1200px-Mattancherry_Palace_%282019%29.jpg\",\n        \"geo_coordinates\": \"9.9580° N, 76.2744° E\",\n        \"ticket_pricing\": \"₹10 per person\",\n        \"rating\": 4.5,\n        \"time_travel\": \"2 hours\"\n      },\n      {\n      \"time\": \"12:00 PM - 2:00 PM\"\n        \"place_name\": \"Jew Town\",\n        \"place_details\": \"A historic Jewish quarter with antique shops, synagogues, and a vibrant atmosphere.\",\n        \"place_image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Jew_Town_Kochi.jpg/1200px-Jew_Town_Kochi.jpg\",\n        \"geo_coordinates\": \"9.9580° N, 76.2744° E\",\n        \"ticket_pricing\": \"Free\",\n        \"rating\": 4.0,\n        \"time_travel\": \"2 hours\"\n      },\n      {\n      \"time\": \"2:00 PM - 4:00 PM\"\n        \"place_name\": \"Marine Drive\",\n        \"place_details\": \"A beautiful promenade along the waterfront, perfect for a relaxing evening stroll.\",\n        \"place_image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Marine_Drive%2C_Kochi.jpg/1200px-Marine_Drive%2C_Kochi.jpg\",\n        \"geo_coordinates\": \"9.9627° N, 76.2795° E\",\n        \"ticket_pricing\": \"Free\",\n        \"rating\": 4.2,\n        \"time_travel\": \"1 hour\"\n      }\n   ]\n    },\n    {\n      \"day\": \"Day 2\",\n \"plan\": [\n         {\n      \"time\": \"9:00 AM - 12:00 PM\"\n        \"place_name\": \"Fort Kochi\",\n        \"place_details\": \"A historic area with colonial buildings, churches, and a vibrant arts scene.\",\n        \"place_image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Fort_Kochi.jpg/1200px-Fort_Kochi.jpg\",\n        \"geo_coordinates\": \"9.9545° N, 76.2688° E\",\n        \"ticket_pricing\": \"Free\",\n        \"rating\": 4.7,\n        \"time_travel\": \"3 hours\"\n      },\n      {\n      \"time\": \"12:00 PM - 2:00 PM\"\n        \"place_name\": \"Chinese Fishing Nets\",\n        \"place_details\": \"Unique fishing nets that have been used for centuries, offering a glimpse into local life.\",\n        \"place_image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Chinese_Fishing_Nets_at_Kochi.jpg/1280px-Chinese_Fishing_Nets_at_Kochi.jpg\",\n        \"geo_coordinates\": \"9.9537° N, 76.2684° E\",\n        \"ticket_pricing\": \"Free\",\n        \"rating\": 4.3,\n        \"time_travel\": \"1 hour\"\n      },\n      {\n      \"time\": \"2:00 pm - 4:00 PM\"\n        \"place_name\": \"Kathakali Performance\",\n        \"place_details\": \"A traditional Indian dance form known for its elaborate costumes and expressive movements.\",\n        \"place_image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Kathakali_%283495736154%29.jpg/1200px-Kathakali_%283495736154%29.jpg\",\n        \"geo_coordinates\": \"9.9603° N, 76.2815° E\",\n        \"ticket_pricing\": \"₹200 - ₹500\",\n        \"rating\": 4.8,\n        \"time_travel\": \"2 hours\"\n      }\n    ]\n    },\n    {\n       \"day\": \"Day 3\",\n     \"plan\": [\n         {\n           \"time\": \"9:00 AM - 11:00 PM\"\n        \"place_name\": \"Kumarakom Bird Sanctuary\",\n        \"place_details\": \"A beautiful bird sanctuary located on Vembanad Lake, offering a chance to see a variety of bird species.\",\n        \"place_image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Kumarakom_Bird_Sanctuary.jpg/1200px-Kumarakom_Bird_Sanctuary.jpg\",\n        \"geo_coordinates\": \"9.5827° N, 76.4029° E\",\n        \"ticket_pricing\": \"₹25 per person\",\n        \"rating\": 4.6,\n        \"time_travel\": \"3 hours\"\n      },\n      {\n         \"time\": \"11:00 AM - 1:00 PM\"\n        \"place_name\": \"Backwater Cruise\",\n        \"place_details\": \"A relaxing boat ride through the serene backwaters, enjoying the scenic beauty and local life.\",\n        \"place_image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Backwaters_of_Kerala.jpg/1280px-Backwaters_of_Kerala.jpg\",\n        \"geo_coordinates\": \"9.9576° N, 76.2808° E\",\n        \"ticket_pricing\": \"₹500 - ₹1000\",\n        \"rating\": 4.8,\n        \"time_travel\": \"3 hours\"\n      },\n      { \n         \"time\": \"1:00 PM -6:00 PM\"\n        \"place_name\": \"Sunset at Fort Kochi\",\n        \"place_details\": \"Enjoy a breathtaking sunset over the Arabian Sea from the shores of Fort Kochi.\",\n        \"place_image_url\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Sunset_at_Fort_Kochi%2C_Kochi.jpg/1280px-Sunset_at_Fort_Kochi%2C_Kochi.jpg\",\n        \"geo_coordinates\": \"9.9545° N, 76.2688° E\",\n        \"ticket_pricing\": \"Free\",\n        \"rating\": 4.9,\n        \"time_travel\": \"1 hour\"\n      }\n    ]\n  }\n]\n}\n```\n\n**Please Note:**\n\n* Prices are approximate and may vary depending on the season and availability.\n* You can adjust the itinerary based on your interests and time availability.\n* The \"time_travel\" field in the itinerary refers to the approximate time spent at each location, excluding travel time between locations.\n* It is recommended to book hotels and activities in advance, especially during peak season.\n* Remember to factor in transportation costs, meals, and other miscellaneous expenses.\n* Use Google Maps or other navigation apps to find the best routes and travel times between locations.\n* Enjoy your trip to Kochi!\n"},
        ],
      },
    ],
  });

  
