// Factor this out!!!

import { Client } from "@petfinder/petfinder-js";

const petFinderClient = new Client({
  apiKey: "YeI5i5zLHnqvUoBxfJcjseCpBDQcZSS6ecZKJouXs07aejuKfK",
  secret: "WhuKLwumWocRsjzuQYPVSC6ZybxuMdhVCRXYIIW6",
});

export function fetchData(searchOptions) {
  if (searchOptions.searchType === "pets") {
    return petFinderClient.animal.search({
      type: searchOptions.type ? searchOptions.type : "",
      limit: searchOptions.limit,
    });
  }

  if (searchOptions.searchType === "organizations") {
    return petFinderClient.organization.search({
      limit: searchOptions.limit,
    });
  }
}
