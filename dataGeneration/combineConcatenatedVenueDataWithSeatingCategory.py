import csv

# CSV files
concatenated_venue_data_file = 'concatenated_venue_data.csv'
seating_category_file = 'seatingCategory10.csv'
output_csv_file = 'eventShow_venue_seatingCategory.csv'

# Read data from seatingCategory10.csv and map it by categoryID
seating_category_data = {}

with open(seating_category_file, 'r', newline='') as seat_cat_file:
    csv_reader = csv.DictReader(seat_cat_file)
    
    for row in csv_reader:
        category_id = row['categoryID']
        seating_category_data[category_id] = row

# Read concatenated_venue_data.csv and append related data from seatingCategory10.csv
output_rows = []

with open(concatenated_venue_data_file, 'r', newline='') as venue_data_file:
    csv_reader = csv.DictReader(venue_data_file)
    
    # Get headers from both files to create output headers
    venue_headers = csv_reader.fieldnames
    seat_cat_headers = None
    
    # Retrieve the first entry to determine seating category headers
    if seating_category_data:
        seat_cat_headers = next(iter(seating_category_data.values())).keys()
    
    # Combine headers for the output file
    output_headers = venue_headers + list(seat_cat_headers)
    
    # Process each row in concatenated_venue_data.csv
    for venue_row in csv_reader:
        category_id = venue_row['categoryID']
        
        if category_id in seating_category_data:
            seating_row = seating_category_data[category_id]
            concatenated_row = {**venue_row, **seating_row}
        else:
            # If no matching categoryID, just output the venue row with None for seating category data
            concatenated_row = {**venue_row, **{key: None for key in seat_cat_headers}}
        
        output_rows.append(concatenated_row)

# Write the concatenated data to a new CSV file
with open(output_csv_file, 'w', newline='') as outfile:
    csv_writer = csv.DictWriter(outfile, fieldnames=output_headers)
    
    # Write headers
    csv_writer.writeheader()
    
    # Write data rows
    csv_writer.writerows(output_rows)

print("Extended concatenated data written to 'extended_concatenated_venue_data.csv'.")
