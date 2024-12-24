import datetime
import time
import random
import pandas as pd
import psutil
import wmi

# Settings
duration_minutes = 2  # Adjust duration as needed for 500-1000 rows
sampling_rate_hz = 10  # Sampling frequency
batch_size = 500  # Write to CSV after collecting this many rows

# Start time
start_time = datetime.datetime.now()

# Initialize WMI client
w = wmi.WMI(namespace="root\\OpenHardwareMonitor")

# Initialize lists to store data
data_buffer = []

# Collect data for the specified duration
while (datetime.datetime.now() - start_time).total_seconds() < duration_minutes * 60:
    try:
        # Get current time
        current_time = datetime.datetime.now()

        # Get CPU temperature and power
        sensor_info = w.Sensor()
        cpu_temp = None
        cpu_power = None

        for sensor in sensor_info:
            if sensor.SensorType == 'Temperature' and 'CPU' in sensor.Name:
                cpu_temp = sensor.Value
            if sensor.SensorType == 'Power' and 'CPU Package' in sensor.Name:
                cpu_power = sensor.Value

        # Get CPU usage
        cpu_usage = psutil.cpu_percent(interval=0)  # Non-blocking call

        # Get CPU load (1-minute average)
        cpu_load = psutil.getloadavg()[0]

        # Get memory usage
        memory_usage = psutil.virtual_memory().percent

        # Get battery level
        battery = psutil.sensors_battery()
        battery_level = battery.percent if battery else None

        # Introduce anomalies randomly (e.g., 1% chance)
        if random.random() < 0.01:  # Reduced anomaly chance to 1%
            cpu_usage = random.uniform(90, 100)  # High CPU usage
        if random.random() < 0.01:  # Reduced anomaly chance to 1%
            cpu_temp = random.uniform(90, 100)  # High temperature
        if random.random() < 0.01:  # Reduced anomaly chance to 1%
            memory_usage = random.uniform(90, 95)  # High memory usage
        if random.random() < 0.01:  # Reduced anomaly chance to 1%
            battery_level = random.uniform(0, 20)  # Low battery level
        if random.random() < 0.01:  # Reduced anomaly chance to 1%
            cpu_power = random.uniform(50, 75)  # Unusually high CPU power

        # Append data to buffer
        data_buffer.append({
            'timestamp': current_time,
            'cpu_temperature': cpu_temp,
            'cpu_usage': cpu_usage,
            'cpu_load': cpu_load,
            'memory_usage': memory_usage,
            'battery_level': battery_level,
            'cpu_power': cpu_power
        })

        # Write data to CSV in batches
        if len(data_buffer) >= batch_size:
            df_batch = pd.DataFrame(data_buffer)
            df_batch.to_csv(r"C:/Users/RedmiBook/Desktop/NewProject/test-python/test.csv", mode='a', index=False, header=not pd.io.common.file_exists(r"C:/Users/RedmiBook/Desktop/NewProject/test-python/test.csv"))
            data_buffer = []  # Clear buffer after writing

    except Exception as e:
        print(f"Error collecting data: {e}")

    # Wait for the next sample
    time.sleep(1 / sampling_rate_hz)

# Write any remaining data in the buffer
if data_buffer:
    df_batch = pd.DataFrame(data_buffer)
    df_batch.to_csv(r"C:/Users/RedmiBook/Desktop/NewProject/test-python/test.csv", mode='a', index=False, header=not pd.io.common.file_exists(r"C:/Users/RedmiBook/Desktop/NewProject/test-python/test.csv"))

# Confirmation message
print("Data collection completed and saved to CSV.")
