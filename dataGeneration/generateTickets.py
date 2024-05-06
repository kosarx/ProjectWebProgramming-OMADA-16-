import csv
import random
import datetime

# Function to generate random ticket ID
def generate_ticket_id(show_id, ticket_number):
    return f"{ticket_number}"

# Function to generate random ticket number
def generate_ticket_number():
    return random.randint(1000000, 9999999)

# Function to generate random status
def generate_random_status():
    return random.choice(["BOOKED", "CANCELED"])

# Function to generate random category ID
def generate_random_category_id():
    return random.choice([i for i in range(1, 11)])

# Function to generate random user ID
def generate_random_user_id():
    return f"{random.choice([i for i in range(1, 11)])}"

# Function to generate random discount ID
def generate_random_discount_id():
    discount_options = [i for i in range(1, 5)]
    discount_options.append(None)
    return random.choice(discount_options)

# Function to generate random booking date
def generate_random_date_booked():
    today = datetime.date.today()
    offset_days = random.randint(-40, 0)  # Random date +/- 30 days from today
    return today + datetime.timedelta(days=offset_days)

# CSV file containing showID values
input_csv_file = 'eventShows60.csv'

# Output CSV file for ticket data
output_csv_file = 'ticket30.csv'

# Headers for the output CSV
output_headers = ['ticketID', 'ticket_number', 'status', 'categoryID', 'userID', 'date_booked', 'discountID', 'showID']

# Read the showID values from the input CSV
with open(input_csv_file, 'r', newline='') as infile:
    csv_reader = csv.reader(infile)

    # Skip the header row
    next(csv_reader)

    # List to store output rows
    output_rows = []

    ticket_number = 0

    # For each showID, create several tickets
    for row in csv_reader:
        show_id = row[0]

        # Create a certain number of tickets for each showID
        for j in range(1, random.randint(1,10)):  # Generating 5 tickets for each showID
            ticket_number += 1
            ticket_id = generate_ticket_id(show_id, ticket_number)
            status = generate_random_status()
            category_id = generate_random_category_id()
            user_id = generate_random_user_id()
            date_booked = generate_random_date_booked()
            discount_id = generate_random_discount_id()  # Some may not have a discount
            
            # New ticket row
            new_row = {
                'ticketID': ticket_id,
                'ticket_number': generate_ticket_number(),
                'status': status,
                'categoryID': category_id,
                'userID': user_id,
                'date_booked': date_booked,
                'discountID': discount_id,
                'showID': show_id
            }
            
            output_rows.append(new_row)

# Write the output rows to the new CSV file
with open(output_csv_file, 'w', newline='') as outfile:
    csv_writer = csv.DictWriter(outfile, fieldnames=output_headers)

    # Write headers
    csv_writer.writeheader()

    # Write data rows
    csv_writer.writerows(output_rows)

print("Tickets generated successfully and written to 'tickets.csv'.")
