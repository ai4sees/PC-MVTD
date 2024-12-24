# PC-MVTD

# File : create_dataset_from_laptop.ipynb

This Jupyter Notebook demonstrates how to collect laptop performance metrics and create a structured dataset. It includes:

- **Data Collection**: Gathers metrics such as CPU usage, memory consumption, CPU load, CPU temperature, and power.
- **Dataset Creation**: Exports the collected data to a `.csv` or `.json` file for further analysis.
- **Customizable Sampling**: Allows users to configure the frequency of data collection to suit their needs.
- **Multi-Metric Monitoring**: Collect multiple key performance indicators, including:
  - CPU temperature
  - CPU usage
  - CPU load
  - Memory usage
  - CPU power

# Anomaly Detection in Laptop Performance Metrics
This project demonstrates anomaly detection in laptop performance data. The Jupyter Notebook plot.ipynb applies various techniques for anomaly detection, including Percentile Method, Z-score, IQR, Moving Average, and Isolation Forest.

## Files
- plot.ipynb: A Jupyter Notebook that demonstrates anomaly detection and visualizes results.

## Techniques Used:
1. **Percentile Method**: Anomalies detected by comparing data points to a specified percentile threshold.
2. **Z-score Anomaly Detection**: Identifies anomalies based on the standard deviation of the data.
3. **Interquartile Range (IQR) Anomalies**: Anomalies detected based on the range between Q1 and Q3.
4. **Moving Average Anomaly Detection**: Anomalies detected using a rolling mean and standard deviation.
5. **Isolation Forest**: Identifies anomalies by isolating data points in an ensemble method.
