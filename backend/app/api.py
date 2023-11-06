from fastapi import FastAPI, Body, UploadFile, HTTPException, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import PyPDF2

import os
from dotenv import load_dotenv

from .llm_response import get_paper_summary, get_paper_update, make_kg, make_cypher_update, graph_response

from .graph_database import DynamicGraph

load_dotenv() 

neo4j_URI = os.environ.get('neo4j_URI')
neo4j_username = os.environ.get('neo4j_username')
neo4j_password = os.environ.get('neo4j_password')

CURRENT_GRAPH_CODE = None
UPDATE_GRAPH_CODE = None

# Define the input data models
class CreateGraphInput(BaseModel):
    concept: str

class UpdateGraphInput(BaseModel):
    concept: str

class QueryGraphInput(BaseModel):
    query: str

# Helper functions

def get_llm_paper_response(query):
    return get_paper_summary(query)

def get_llm_paper_update_response(query, CURRENT_GRAPH_CODE):
    return get_paper_update(query, CURRENT_GRAPH_CODE)

def create_graph_instance(custom_graph_code):

    greeter = DynamicGraph(neo4j_URI, neo4j_username, neo4j_password)
    greeter.make_graph(custom_graph_code)
    greeter.close()

def update_graph_instance(update):

    greeter = DynamicGraph(neo4j_URI, neo4j_username, neo4j_password)
    greeter.update_graph(update)
    greeter.close()

def get_graph_response(update):

    response = graph_response(update)
    return response

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
    
@app.post("/create_graph_from_link", tags=["create_graph_from_link"])
async def create_graph_from_link(input_data: CreateGraphInput):

    # Now that you have the text, you can process it the same way as you do for the 'concept' in create_graph_endpoint
    # For example, if you wish to treat the entire PDF text as a 'concept':
    global CURRENT_GRAPH_CODE
    CURRENT_GRAPH_CODE = get_llm_paper_response(input_data.concept)

    create_graph_instance(CURRENT_GRAPH_CODE)

    return {
        "data": "Graph created from link."
    }

@app.post("/update_graph_from_link", tags=["update_graph_from_link"])
async def update_graph_from_link(input_data: UpdateGraphInput):

    # Now that you have the text, you can process it the same way as you do for the 'concept' in create_graph_endpoint
    # For example, if you wish to treat the entire PDF text as a 'concept':
    global CURRENT_GRAPH_CODE
    global UPDATE_GRAPH_CODE
    UPDATE_GRAPH_CODE = get_llm_paper_update_response(input_data.concept, CURRENT_GRAPH_CODE)

    create_graph_instance(CURRENT_GRAPH_CODE)

    return {
        "data": "Graph updated from link."
    }
    
@app.post("/query_graph", tags=["query_graph"])
async def query_graph_endpoint(input_data: QueryGraphInput):

    response = get_graph_response(input_data.query)

    return {
        "data": response.response
    }

