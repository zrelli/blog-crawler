# Blog Web Crawler with Nest.js Microservice

## Overview

This project implements a web crawler microservice using Nest.js, a progressive Node.js framework. The microservice provides endpoints to initiate crawling of a website and to retrieve saved data with pagination.

## Project Structure

The project consists of the following microservices:

1. Crawler (./crawler): Responsible for crawling websites and extracting data.
2. Transformer (./transformer): Transforms the raw data extracted by the crawler into a usable format.
3. Event Bus (./event-bus): Manages communication between microservices using an event-driven architecture.
4. Query (./query): Provides an API to query and retrieve the transformed data.
5. MySQL Database (mysql): Stores the scrapped data.

## Docker Compose Configuration

The docker-compose.yml file defines the services and their configurations for running the microservices:

+ Crawler: Builds the crawler service and exposes it on port 3001.
+ Transformer: Builds the transformer service and exposes it on port 3005.
+ Event Bus: Builds the event bus service and exposes it on port 3002.
+ MySQL Database: Uses the official MySQL image, sets up the necessary environment variables, and exposes it on port 3306. It also creates a volume for persisting the database data.
+ Query: Builds the query service, depends on the MySQL service, and exposes it on port 3004.

## Running the Microservices

1. Clone the repository:
`git clone https://github.com/zrelli/blog-crawler.git`
2. Navigate to the project directory:
`cd blog-crawler`
3. Make sure you have Docker and Docker Compose installed. Then, run the following command to start the microservices:
`docker-compose up`

## Crawling Endpoint

### Endpoint

+ **URL**: `POST http://localhost:3001/crawler`

### Request Payload

The request payload should be a JSON object with the following fields:

+ `url`: The URL of the website to crawl.
+ `maxLinks` (default 1): The maximum number of links to follow per page.
+ `crawlDepth` (default 1): The maximum depth of nested pages to crawl.
+ `categorySelector` (optional): The selector to get category element for each string page.

Example:

```json
{
  "url": "https://example.com",
  "maxLinks": 10,
  "crawlDepth": 2,
  "categorySelector":'a[rel="category"]'
}
```

+ **Response**:
Status Code: 200 OK
Content Type: application/json
Example response body:

```json
["https://example.com/page1", "https://example.com/page2"]
```

## Page data list Retrieval Endpoint

### Endpoint

+ **URL**: `GET http://localhost:3004/pages`

## Query Parameters

+ `title` (optional): The title of the page to retrieve.
+ `category` (optional): The category of the page to retrieve.
+ `domain` (optional): The domain of the page to retrieve.
+ `take` (default 10): The number of results to take (pagination).
+ `skip` (default 0): The number of results to skip (pagination).

Example:

```json
GET http://localhost:3004/pages?title=Title&take=5&skip=0&category=Category&domain=Domain
```

This example URL retrieves pages with the title "Title", category "Category", and domain "Domain", taking 5 results starting from the first (skip 0).

+ **Response**:
Status Code: 200 OK
Content Type: application/json
Example response body:

```json
{
  "data": [
    {
      "id": 1,
      "createdAt": "2024-03-29T12:43:46.179Z",
      "updatedAt": "2024-03-29T12:43:46.179Z",
      "path": "/",
      "description": "Description for Page 1",
      "content": "Content for Page 1",
      "activated": true,
      "domainId": 1,
      "categoryId": 1,
      "titleId": 1,
      "domain": "Domain 1",
      "category": "Category 1",
      "title": "Title 1"
    },
    {
      "id": 2,
      "createdAt": "2024-03-29T12:43:46.179Z",
      "updatedAt": "2024-03-29T12:43:46.179Z",
      "path": "/",
      "description": "Description for Page 2",
      "content": "Content for Page 2",
      "activated": true,
      "domainId": 2,
      "categoryId": 2,
      "titleId": 2,
      "domain": "Domain 2",
      "category": "Category 2",
      "title": "Title 2"
    },
    {
      "id": 3,
      "createdAt": "2024-03-29T12:43:46.179Z",
      "updatedAt": "2024-03-29T12:43:46.179Z",
      "path": "/",
      "description": "Description for Page 3",
      "content": "Content for Page 3",
      "activated": false,
      "domainId": 3,
      "categoryId": 3,
      "titleId": 3,
      "domain": "Domain 3",
      "category": "Category 3",
      "title": "Title 3"
    }
  ],
  "meta": {
    "totalCount": 3,
    "totalPages": 1,
    "currentPage": 1
  }
}

```

## Page data details Retrieval Endpoint

### Endpoint

+ **URL**: `GET http://localhost:3004/pages/:id`
+ **Description**:  Retrieves the details of a specific page based on its ID.
+ **Response**:
Status Code: 200 OK
Content Type: application/json
Example response body:

```json
{
  "id": 1,
    "createdAt": "2024-03-30T07:51:16.763Z",
    "updatedAt": "2024-03-30T07:51:16.763Z",
    "description": "Description for Page 1",
    "content": "Content for Page 1",
    "activated": true,
    "domain": "Domain 1",
    "category": "Category 1",
    "title": "Title 1",
    "path": "/"
}

```

Replace :id in the URL with the actual ID of the page you want to retrieve.
