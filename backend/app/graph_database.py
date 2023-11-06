from neo4j import GraphDatabase

class DynamicGraph:

    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def make_graph(self, custom_graph_code):
        with self.driver.session() as session:
            session.write_transaction(self._clear_graph)
            session.write_transaction(self._create_custom_graph, custom_graph_code)

    def update_graph(self, update):
        with self.driver.session() as session:
            session.write_transaction(self._make_update_to_graph, update)

    @staticmethod
    def _clear_graph(tx):
        tx.run(
            "MATCH (n)"
            "DETACH DELETE n"
        )
    
    @staticmethod
    def _create_custom_graph(tx, custom_graph_code):
        tx.run(custom_graph_code)

    @staticmethod
    def _make_update_to_graph(tx, update):
        tx.run(update)