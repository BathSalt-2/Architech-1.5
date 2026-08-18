import torch
from torch.utils.data import DataLoader
from sklearn.metrics import accuracy_score, precision_recall_fscore_support, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns
import json
from typing import List, Tuple

# Custom Dataset class for validation
class TextDataset(torch.utils.data.Dataset):
    def __init__(self, texts: List[str], labels: List[int]):
        self.texts = texts
        self.labels = labels

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        return self.texts[idx], self.labels[idx]

# Load validation data function
def load_validation_data(file_path: str) -> Tuple[List[str], List[int]]:
    # Placeholder for loading validation data logic
    # This should be replaced with actual data loading and preprocessing
    texts = ["validation text 1", "validation text 2"]
    labels = [0, 1]
    return texts, labels

# Evaluate the model
def evaluate_model(model, data_loader):
    model.eval()
    all_preds = []
    all_labels = []

    with torch.no_grad():
        for texts, labels in data_loader:
            outputs = model(texts)
            _, preds = torch.max(outputs, 1)
            all_preds.extend(preds.numpy())
            all_labels.extend(labels.numpy())

    accuracy = accuracy_score(all_labels, all_preds)
    precision, recall, f1, _ = precision_recall_fscore_support(all_labels, all_preds, average='weighted')
    conf_matrix = confusion_matrix(all_labels, all_preds)

    print(f'Accuracy: {accuracy:.4f}')
    print(f'Precision: {precision:.4f}')
    print(f'Recall: {recall:.4f}')
    print(f'F1 Score: {f1:.4f}')

    return conf_matrix

# Visualize results
def plot_confusion_matrix(conf_matrix):
    plt.figure(figsize=(8, 6))
    sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Blues')
    plt.xlabel('Predicted')
    plt.ylabel('True')
    plt.title('Confusion Matrix')
    plt.show()

if __name__ == "__main__":
    # Load model configuration
    with open('src/architecture_definition.json', 'r') as f:
        config = json.load(f)

    # Load validation data
    texts, labels = load_validation_data('path/to/validation/data')
    val_dataset = TextDataset(texts, labels)
    val_loader = DataLoader(val_dataset, batch_size=config['batch_size'], shuffle=False)

    # Initialize model (ensure the model architecture matches the training script)
    model = SimpleModel(input_dim=config['input_dimension'], output_dim=config['output_dimension'])
    model.load_state_dict(torch.load('path/to/trained/model'))

    # Evaluate the model
    conf_matrix = evaluate_model(model, val_loader)

    # Plot confusion matrix
    plot_confusion_matrix(conf_matrix)
