# AI Academic Knowledge Graph Generator

The AI Academic Knowledge Graph Generator is a state-of-the-art tool designed to transform raw academic text into structured knowledge graphs. This tool uses agents to embed text into a vector database, which then serves as the basis for generating a knowledge graph. Users can query the graph in natural language, making this a powerful resource for educational and research purposes.

**Please note:** This repository and its contents are intended for educational and demonstrative purposes only. It showcases the capabilities of AI in processing and visualizing academic data but is not intended for commercial use.

## How It Works

1. **Text Extraction**: The tool automatically pulls text from academic papers, specifically targeting arXiv PDFs, ensuring a direct and accurate extraction of content.
   
2. **Vector Embedding**: The extracted text is then embedded into a high-dimensional vector space using a vector database. This process allows the tool to understand and process the content at a conceptual level.
   
3. **Knowledge Graph Generation**: Using the embedded vectors, the tool constructs a knowledge graph that visually represents the relationships between different academic concepts and entities.
   
4. **Natural Language Queries**: Users can interact with the knowledge graph through natural language queries. The AI interprets these queries and retrieves relevant information from the graph, simplifying complex data exploration.

This process is fully automated and relies on cutting-edge AI and machine learning algorithms to provide a seamless experience from text extraction to knowledge discovery.

## Educational and Demonstrative Use Case

This tool is perfect for:
- **Educational Purposes**: Students and educators can use this tool to better understand the interconnections within academic literature.
- **Research Demonstrations**: Researchers can demonstrate the potential of AI in synthesizing and visualizing complex data.
- **AI Enthusiasts**: Those interested in AI can explore the capabilities of vector databases and knowledge graphs in real-world applications.

The following sections provide instructions on setting up and running the project.


## Prerequisites

1. [Node.js and npm](https://nodejs.org/) (for the frontend)
2. [Python 3.x](https://www.python.org/downloads/) (for the backend)
3. [Neo4j](https://neo4j.com/download/): Ensure you have Neo4j running locally. The connection details for Neo4j will be required when setting up the `.env` files for both the frontend and backend.

## Setup & Installation

### Environment Variables

Before setting up the frontend and backend, ensure you have the required connection details for your local Neo4j instance. These details will be needed to populate the `.env` files.

#### Backend:

1. Navigate to the `backend` directory:
    ```
    cd backend
    ```

2. Create a `.env` file in the `backend` directory. Add the following structure:
    ```env
    neo4j_URI="YOUR_NEO4J_URI"                     # e.g., "bolt://localhost:7687"
    neo4j_username="YOUR_NEO4J_USERNAME"           # e.g., "neo4j"
    neo4j_password="YOUR_NEO4J_PASSWORD"           # e.g., "password"
    OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
    ```

#### Frontend:

1. Navigate to the `frontend` directory:
    ```
    cd frontend
    ```

2. Create a `.env` file in the `frontend` directory. Add the following structure:
    ```env
    REACT_APP_SERVER_URL="YOUR_NEO4J_URI"
    REACT_APP_SERVER_USER="YOUR_NEO4J_USERNAME"
    REACT_APP_SERVER_PASSWORD="YOUR_NEO4J_PASSWORD"
    ```

### Frontend:

1. Navigate to the `frontend` directory (if you're not already there):
    ```
    cd frontend
    ```

2. Install the required npm packages:
    ```
    npm install
    ```

### Backend:

1. Navigate to the `backend` directory (if you're not already there):
    ```
    cd backend
    ```

2. Set up a virtual environment (to keep the project's dependencies isolated):
    ```
    python -m venv venv
    ```

3. Activate the virtual environment:
    - On macOS and Linux:
        ```
        source venv/bin/activate
        ```
    - On Windows:
        ```
        .\venv\Scripts\activate
        ```

4. Install the required Python packages:
    ```
    pip install -r requirements.txt
    ```

## Running the Project

### Frontend:

1. Navigate to the `frontend` directory (if you're not already there):
    ```
    cd frontend
    ```

2. Start the frontend:
    ```
    npm start
    ```

The frontend should now be running, and you can access it in your web browser at `http://localhost:3000/` (or the port specified in your output).

### Backend:

1. Navigate to the `backend` directory (if you're not already there):
    ```
    cd backend
    ```

2. Start the backend:
    ```
    python main.py
    ```

The backend should now be running, and you can access its API endpoints as defined in your application.
