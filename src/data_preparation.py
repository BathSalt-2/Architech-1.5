import re
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from typing import List

# Ensure necessary NLTK resources are downloaded
import nltk
nltk.download('punkt')
nltk.download('stopwords')

def clean_text(text: str) -> str:
    """
    Cleans the input text by removing special characters, converting to lowercase,
    and removing stopwords.
    
    Args:
    - text (str): The input text to be cleaned.
    
    Returns:
    - str: The cleaned text.
    """
    # Remove special characters and numbers
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    # Convert to lowercase
    text = text.lower()
    # Tokenize text
    tokens = word_tokenize(text)
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]
    # Rejoin tokens into a single string
    cleaned_text = ' '.join(tokens)
    return cleaned_text

def tokenize_text(text: str) -> List[str]:
    """
    Tokenizes the input text into a list of words.
    
    Args:
    - text (str): The input text to be tokenized.
    
    Returns:
    - List[str]: A list of tokens (words).
    """
    # Tokenize text
    tokens = word_tokenize(text)
    return tokens

def transform_data(tokens: List[str]) -> List[int]:
    """
    Transforms the list of tokens into a list of numerical representations.
    This example uses a simple stemming approach.
    
    Args:
    - tokens (List[str]): The list of tokens to be transformed.
    
    Returns:
    - List[int]: A list of transformed tokens as integers.
    """
    # Initialize stemmer
    stemmer = PorterStemmer()
    # Stem tokens
    stemmed_tokens = [stemmer.stem(token) for token in tokens]
    # Convert tokens to numerical representation (example: length of each token)
    numerical_data = [len(token) for token in stemmed_tokens]
    return numerical_data

if __name__ == "__main__":
    # Example usage
    sample_text = "This is an example sentence to demonstrate text cleaning and tokenization."
    cleaned = clean_text(sample_text)
    print(f"Cleaned Text: {cleaned}")
    
    tokens = tokenize_text(cleaned)
    print(f"Tokens: {tokens}")
    
    transformed = transform_data(tokens)
    print(f"Transformed Data: {transformed}")
