import csv
import random

# CSV file names
input_csv_file = 'eventShow_venue_seatingCategory.csv'
output_csv_file = 'setsPrice.csv'

# Define baseline prices for each seat category
category_base_prices = {
    '1': 30.00,   # Standard Seating
    '2': 100.00,  # VIP Seating
    '3': 75.00,   # Love Seats
    '4': 25.00,   # General Admission (GA)
    '5': 35.00,   # Seated Admission
    '6': 120.00,  # Box Seats
    '7': 50.00,   # Pit Seating
    '8': 90.00,   # Orchestra
    '9': 60.00,   # Mezzanine
    '10': 40.00   # Balcony
}

# Function to calculate seat price based on baseline and some variation
def generate_seat_price(baseline_price):
    variability = random.randint(-5.0, 10.0)  # Random adjustment between -$5 and +$10
    return round(int(baseline_price) + variability, 2)

# Headers for the output CSV
output_headers = ['showID', 'categoryID', 'seat_price']

output_rows = []

# Read the extended concatenated venue data
with open(input_csv_file, 'r', newline='') as infile:
    csv_reader = csv.DictReader(infile)
    
    for row in csv_reader:
        show_id = row['showID']
        category_id = row['categoryID']
        
        if category_id in category_base_prices:
            base_price = category_base_prices[category_id]
            seat_price = generate_seat_price(base_price)
            
            new_row = {
                'showID': show_id,
                'categoryID': category_id,
                'seat_price': seat_price
            }
            
            output_rows.append(new_row)

# Write the data with seat prices to a new CSV file
with open(output_csv_file, 'w', newline='') as outfile:
    csv_writer = csv.DictWriter(outfile, fieldnames=output_headers)
    
    # Write headers
    csv_writer.writeheader()
    
    # Write data rows
    csv_writer.writerows(output_rows)

print("Priced seating data written to 'priced_seating_data.csv'.")
