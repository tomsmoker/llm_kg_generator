import React, { useEffect, useState } from 'react';
import NeoVis from 'neovis.js';
import neo4j from 'neo4j-driver';

const loadRobotoFont = () => {
    const robotoFontLink = document.createElement('link');
    robotoFontLink.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap";
    robotoFontLink.rel = "stylesheet";
    document.head.appendChild(robotoFontLink);
};

const GraphVisualisation = () => {
    const [labels, setLabels] = useState([]);
    const [relationshipTypes, setRelationshipTypes] = useState([]);

    useEffect(() => {
        loadRobotoFont();
    }, []);

    const fetchLabelsAndRelationshipTypes = async () => {
        const driver = neo4j.driver(
            process.env.REACT_APP_SERVER_URL,
            neo4j.auth.basic(process.env.REACT_APP_SERVER_USER, process.env.REACT_APP_SERVER_PASSWORD)
        );

        const session = driver.session();

        try {
            const labelResults = await session.run(`CALL db.labels()`);
            console.log('Fetched labels:', labelResults.records);
            setLabels(labelResults.records.map(record => record.get(0)));
            const relationshipTypeResults = await session.run(`CALL db.relationshipTypes()`);
            console.log('Fetched relationship types:', relationshipTypeResults.records);
            setRelationshipTypes(relationshipTypeResults.records.map(record => record.get(0)));
        } catch (error) {
            console.error("Failed to fetch metadata:", error);
        } finally {
            session.close();
            driver.close();
        }
    };

    const renderGraph = () => {
        console.log(labels);
        if (labels.length > 0 && relationshipTypes.length > 0) {
            console.log("Rendering graph with labels:", labels, "and relationship types:", relationshipTypes);

            const config = {
                containerId: 'graph',
                neo4j: {
                    serverUrl: process.env.REACT_APP_SERVER_URL,
                    serverUser: process.env.REACT_APP_SERVER_USER,
                    serverPassword: process.env.REACT_APP_SERVER_PASSWORD
                },
                initialCypher: 'MATCH (n)-[r]->(m) RETURN n,r,m LIMIT 100',
                labels: labels.reduce((acc, label) => {
                    acc[label] = {
                        label: "name",
                        [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                            function: {
                                title: (node) => {
                                  return node.labels;
                                }
                            },
                            static: { // everything here will be copied directly to the vis.js's node object
                                font: {
                                    size: 15,
                                    color: "black",
                                    family: "Roboto",
                                    borderRadius: 8,
                                    border: 0,
                                    strokeWidth: 0,
                                },
                                color: "#ADD8E6"
                            }
                        }
                    };
                    return acc;
                }, {}),
                relationships: relationshipTypes.reduce((acc, type) => {
                    acc[type] = {
                        label: "type",  // assuming you want to keep this as a default
                        [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                            function: {
                                label: (relationship) => {
                                    return relationship.type;
                                }
                            },
                            static: { // here you can add any static styling for edges, similar to nodes if needed
                                font: {
                                    size: 10,
                                    color: "black",
                                    family: "Roboto",
                                },
                                arrows: 'to'  // example: adding an arrow to the relationship
                            }
                        }
                    };
                    return acc;
                }, {})
            };

            const viz = new NeoVis(config);
            console.log("Generated Config:", config);
            viz.render();
        } else {
            console.log("Skipping graph rendering. Labels or relationship types are empty.");
        }
    };

    useEffect(() => {
        fetchLabelsAndRelationshipTypes();
    }, []);
    
    useEffect(() => {
        if (labels.length > 0 && relationshipTypes.length > 0) {
            renderGraph();
        }
    }, [labels, relationshipTypes]);

    return (
        <div id="graph" style={{
          width: '1000px',
          height: '1000px',
          font: '10pt arial',
          border: 0,
          borderRadius: 0
        }}></div>
      );
};

export default GraphVisualisation;
