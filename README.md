
# GRADEX: Student Performance Prediction & Recommendation System Using ML

**GRADEX** is an intelligent analytics system designed to enhance student success through Machine Learning. By analyzing multidimensional educational data—including academic records, behavioral patterns, and demographic profiles—GRADEX forecasts academic outcomes and provides early intervention through data-driven insights.

## 📌 Project Overview

The rapid growth of digital education necessitates intelligent systems to monitor and improve student performance. This project aims to:
- **Forecast Outcomes:** Predict GPA ranges, pass/fail probabilities, and dropout risks.
- **Enable Early Intervention:** Detect at-risk students before it's too late.
- **Personalize Learning:** Generate targeted recommendations for academic improvement.
- **Visualize Progress:** Provide a real-time visualization dashboard for educators and administrators to monitor student progress.

## ✨ Key Features

- **Multi-Dimensional Analysis:** Processes academic records, behavioral patterns, and psychological engagement metrics to ensure a holistic view of student performance.
- **Predictive Modeling:** The system calculates critical outputs including:
  - GPA Range
  - Pass/Fail Probability
  - Performance Category (High Performer, Average, or At-Risk)
  - Dropout Risk Percentage
- **Interactive Dashboard:** A user-friendly interface for educators to visualize data and implement proactive academic strategies.
- **Recommendation Engine:** Generates personalized learning recommendations to support targeted academic improvement.

## 🧠 Machine Learning Algorithms

To ensure data quality and model robustness, the system implements and evaluates the following algorithms:
- Linear Regression & Logistic Regression
- Decision Trees & Random Forest
- Support Vector Machines (SVM)

*Model performance is assessed using standard evaluation metrics including accuracy, precision, recall, F1-score, RMSE, and confusion matrix analysis.*

## 🚀 Tech Stack

### Frontend & Interface

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS

### Data Science & Backend

- **Language:** Python
- **Libraries:** NumPy, Pandas, Scikit-learn, TensorFlow/Keras
- **Data Processing:** Feature engineering and optimal train-test splitting techniques.

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. **Clone the repository**

   git clone https://github.com/Romy0210/GradeX
   cd gradex

2. **Install Frontend Dependencies**

    npm install

3. **Set up Environment Variables Create a .env file in the root directory. You can use the included .env.example as a reference:**

    NEXT_PUBLIC_API_URL=

4. **Run the Development Server**

    npm run dev
    Open  http://localhost:9002 

**📂 Project Structure**

/src/app: Application routes and pages (Next.js App Router).

/src/components: Reusable UI components.

/ml_engine: Python scripts for data preprocessing and model training.

/public: Static assets (images, fonts).

**🎯 Target Audience**

This system is highly applicable to schools, universities, online learning platforms, and government education departments, contributing toward smarter, more personalized, and outcome-driven education systems.

**🤝 Contributing**

Developed by Romy Thomas