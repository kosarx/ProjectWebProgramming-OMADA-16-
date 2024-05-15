import csv

# Input CSV files
event_shows_file = 'eventShows60.csv'
venues_file = 'venue12.csv'

# Output CSV file
output_csv_file = 'event_venues_combined2.csv'

# Read venues data into a dictionary
venues_data = {}
with open(venues_file, 'r', newline='') as venues_csv:
    csv_reader = csv.DictReader(venues_csv)
    for row in csv_reader:
        venue_id = row['venueID']
        venues_data[venue_id] = row

# Read event shows data and concatenate with venues data
output_rows = []
with open(event_shows_file, 'r', newline='') as event_shows_csv:
    csv_reader = csv.DictReader(event_shows_csv)
    
    # Create a new header combining event show headers and venue headers
    event_shows_headers = csv_reader.fieldnames
    venue_headers = list(venues_data.values())[0].keys() if venues_data else []
    combined_headers = event_shows_headers + [header for header in venue_headers if header != 'venueID']

    for row in csv_reader:
        venue_id = row['venueID']
        if venue_id in venues_data:
            combined_row = {**row, **venues_data[venue_id]}
            output_rows.append(combined_row)

# Write the combined data to the output CSV
with open(output_csv_file, 'w', newline='') as outfile:
    csv_writer = csv.DictWriter(outfile, fieldnames=combined_headers)
    
    # Write headers
    csv_writer.writeheader()
    
    # Write data rows
    csv_writer.writerows(output_rows)

print(f"Data successfully combined and written to '{output_csv_file}'.")
