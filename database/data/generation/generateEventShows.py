import csv
import random
import datetime

input_csv_file = 'event15.csv'

output_csv_file = 'eventShows60.csv'

# List of headers for the output CSV
output_headers = ['showID', 'eventID', 'show_date', 'show_time', 'status', 'venueID']

def generate_show_id(event_id, suffix):
    return f"{suffix}"

def generate_random_time():
    hour = random.randint(10, 22)  # Hours from 10 AM to 10 PM
    minute = random.choice([0, 15, 30, 45])  # On-the-quarter
    return f"{hour:02}:{minute:02}"

# Generate sequential dates
def generate_date_sequence(start_date, offset):
    return start_date + datetime.timedelta(days=offset)

# status_options = ["SCHEDULED", "CANCELED", "COMPLETED"] # possible statuses
venue_options = [i for i in range(1, 13)]  # 12 venues, should be length of venues table (or venues12.csv)

# Start date for generating sequential dates
base_date = datetime.date(2024, 5, 1)

# Read the event IDs from the input CSV
with open(input_csv_file, 'r', newline='') as infile:
    csv_reader = csv.reader(infile)
    
    # Skip the header row
    next(csv_reader)
    
    # List to store the output rows
    output_rows = []
    
    # For each event ID, create 4 new show rows with dynamic values
    for row in csv_reader:
        event_id = row[0]
        
        # Create four new show rows for each event ID
        for i in range(1, 5):
            show_id = generate_show_id(event_id, i)
            show_date = generate_date_sequence(base_date, i - 1)  # Incremental dates
            show_time = generate_random_time()  # Random times within a day
            if show_date < datetime.date.today():
                status_options = ["CANCELED", "COMPLETED"]
            elif show_date == datetime.date.today():
                status_options = ["SCHEDULED", "CANCELED", "COMPLETED"]
            else:
                status_options = ["SCHEDULED", "CANCELED"]
            status = random.choice(status_options)  # Random status
            venueID = random.choice(venue_options)  # Random venue ID
            
            # Add the new row with the specified headers and dynamic data
            new_row = {
                'showID': show_id,
                'eventID': event_id,
                'show_date': str(show_date),
                'show_time': show_time,
                'status': status,
                'venueID': venueID
            }
            output_rows.append(new_row)
        base_date = generate_date_sequence(base_date, random.randint(-25, 25))

# Write the output rows to the output CSV with the specified headers
with open(output_csv_file, 'w', newline='') as outfile:
    csv_writer = csv.DictWriter(outfile, fieldnames=output_headers)
    
    # Write the headers
    csv_writer.writeheader()
    
    # Write the data rows
    csv_writer.writerows(output_rows)

print("Data processing complete. Output written to 'output.csv'.")
