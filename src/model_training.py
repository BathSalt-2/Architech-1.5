import json
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
from sklearn.model_selection import train_test_split
from typing import Tuple, List

# Custom Dataset class
class TextDataset(Dataset):
    def __init__(self, texts: List[str], labels: List[int]):
        self.texts = texts
        self.labels = labels

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        return self.texts[idx], self.labels[idx]

# Load data function
def load_data(file_path: str) -> Tuple[List[str], List[int]]:
    # Placeholder for loading data logic
    # This should be replaced with actual data loading and preprocessing
    texts = ["sample text 1", "sample text 2"]
    labels = [0, 1]
    return texts, labels

# Define model architecture
class SimpleModel(nn.Module):
    def __init__(self, input_dim: int, output_dim: int):
        super(SimpleModel, self).__init__()
        self.fc = nn.Linear(input_dim, output_dim)

    def forward(self, x):
        return self.fc(x)

# Compile and train the model
def train_model(data_path: str, config_path: str):
    # Load data
    texts, labels = load_data(data_path)
    train_texts, val_texts, train_labels, val_labels = train_test_split(texts, labels, test_size=0.2)

    # Load model configuration
    with open(config_path, 'r') as f:
        config = json.load(f)

    # Create datasets and dataloaders
    train_dataset = TextDataset(train_texts, train_labels)
    val_dataset = TextDataset(val_texts, val_labels)
    train_loader = DataLoader(train_dataset, batch_size=config['batch_size'], shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=config['batch_size'], shuffle=False)

    # Initialize model
    model = SimpleModel(input_dim=config['input_dimension'], output_dim=config['output_dimension'])

    # Define loss and optimizer
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=config['learning_rate'])

    # Training loop
    for epoch in range(config['epochs']):
        model.train()
        for texts, labels in train_loader:
            # Forward pass
            outputs = model(texts)
            loss = criterion(outputs, labels)

            # Backward pass and optimization
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

        # Validation step
        model.eval()
        with torch.no_grad():
            val_loss = 0
            for texts, labels in val_loader:
                outputs = model(texts)
                loss = criterion(outputs, labels)
                val_loss += loss.item()

        print(f'Epoch [{epoch+1}/{config["epochs"]}], Loss: {loss.item():.4f}, Val Loss: {val_loss/len(val_loader):.4f}')

if __name__ == "__main__":
    # Example usage
    train_model(data_path='path/to/data', config_path='src/architecture_definition.json')
