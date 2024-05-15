import csv

# CSV files
event_shows_file = 'eventShows60.csv'
venue_seat_cat_file = 'venueHasSeatCat44-No-Price.csv'
output_csv_file = 'concatenated_venue_data.csv'

# Read data from venueHasSeatCat44.csv and map it by venueID
venue_data = {}

with open(venue_seat_cat_file, 'r', newline='') as venue_file:
    csv_reader = csv.DictReader(venue_file)
    
    for row in csv_reader:
        venue_id = row['venueID']
        if venue_id not in venue_data:
            venue_data[venue_id] = []
        venue_data[venue_id].append(row)

# Read eventShows60.csv and concatenate related data from venueHasSeatCat44.csv
output_rows = []

with open(event_shows_file, 'r', newline='') as event_file:
    csv_reader = csv.DictReader(event_file)
    
    # Get headers from both files to create output headers
    event_headers = csv_reader.fieldnames
    venue_headers = None
    
    # Retrieve the first entry to determine venue headers
    for key in venue_data:
        if venue_data[key]:
            venue_headers = venue_data[key][0].keys()
            break
    
    # Combine headers for the output file
    output_headers = event_headers + list(venue_headers)
    
    # Process each row in eventShows60.csv
    for event_row in csv_reader:
        venue_id = event_row['venueID']
        
        if venue_id in venue_data:
            for venue_row in venue_data[venue_id]:
                concatenated_row = {**event_row, **venue_row}
                output_rows.append(concatenated_row)
        else:
            # If no matching venueID, just output the event row with None for venue data
            concatenated_row = {**event_row, **{key: None for key in venue_headers}}
            output_rows.append(concatenated_row)

# Write the concatenated data to a new CSV file
with open(output_csv_file, 'w', newline='') as outfile:
    csv_writer = csv.DictWriter(outfile, fieldnames=output_headers)
    
    # Write headers
    csv_writer.writeheader()
    
    # Write data rows
    csv_writer.writerows(output_rows)

print("Concatenated data written to 'concatenated_venue_data.csv'.")
