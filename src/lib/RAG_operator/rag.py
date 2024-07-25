pip install transformers faiss-cpu torch
from transformers import DPRQuestionEncoder, DPRQuestionEncoderTokenizer
# Initialize the question encoder model and tokenizer
question_encoder = DPRQuestionEncoder.from_pretrained('facebook/dpr-question_encoder-single-nq-base')
question_tokenizer = DPRQuestionEncoderTokenizer.from_pretrained('facebook/dpr-question_encoder-single-nq-base')
# Example documents to search from
documents = [
    "The capital of France is Paris.",
    "The Eiffel Tower is located in Paris.",
    "France is known for its cuisine and wine."
]

# Encode the documents into dense vectors
document_embeddings = []
for doc in documents:
    inputs = question_tokenizer(doc, return_tensors='pt')
    embeddings = question_encoder(**inputs).pooler_output.detach().numpy()
    document_embeddings.append(embeddings[0])


import faiss
import numpy as np

# Create a FAISS index and add the document embeddings
dimension = 768  # dimension should match the encoder output
index = faiss.IndexFlatL2(dimension)
index.add(np.array(document_embeddings))

# Define a retrieval function
def retrieve(query, top_k=1):
    query_inputs = question_tokenizer(query, return_tensors='pt')
    query_embedding = question_encoder(**query_inputs).pooler_output.detach().numpy()
    distances, indices = index.search(query_embedding, top_k)
    return [documents[idx] for idx in indices[0]]


from transformers import BartForConditionalGeneration, BartTokenizer

# Initialize the generator model and tokenizer
generator = BartForConditionalGeneration.from_pretrained('facebook/bart-large')
generator_tokenizer = BartTokenizer.from_pretrained('facebook/bart-large')
def generate(context, query):
    input_text = f"{context} [SEP] {query}"
    inputs = generator_tokenizer(input_text, return_tensors='pt')
    outputs = generator.generate(**inputs)
    return generator_tokenizer.decode(outputs[0], skip_special_tokens=True)


def rag_model(query):
    # Step 1: Retrieve relevant documents
    retrieved_docs = retrieve(query, top_k=1)

    # Step 2: Generate the response using the retrieved documents
    context = " ".join(retrieved_docs)
    response = generate(context, query)
    return response


# Example usage
query = "Where is the Eiffel Tower located?"
response = rag_model(query)
print(response)