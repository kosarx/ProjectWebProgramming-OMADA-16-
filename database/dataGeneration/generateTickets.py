import csv
import random
import datetime

def generate_ticket_id(show_id, ticket_number):
    return f"{ticket_number}"

# Random ticket number is 7-digit integer
def generate_ticket_number():
    return random.randint(1000000, 9999999)

def generate_random_status():
    return random.choice(["BOOKED", "CANCELED"])

def generate_random_category_id():
    return random.choice([i for i in range(1, 11)])

def generate_random_user_id():
    return f"{random.choice([i for i in range(1, 11)])}"

def generate_random_discount_id():
    discount_options = [i for i in range(1, 5)]
    return random.choice(discount_options)

# Function to generate random booking date
def generate_random_date_booked():
    today = datetime.datetime.now()
    offset_seconds = random.randint(-40*24*60*60, 0) # Random timestamp within the last 40 days
    return (today + datetime.timedelta(seconds=offset_seconds)).strftime("%Y-%m-%d %H:%M:%S")

# CSV file containing showID values
input_csv_file = 'eventShows60.csv'

# Output CSV file for ticket data
output_csv_file = 'ticketR.csv'

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
        for j in range(1, random.randint(1,10)):
            ticket_number += 1
            ticket_id = generate_ticket_id(show_id, ticket_number)
            status = generate_random_status()
            category_id = generate_random_category_id()
            user_id = generate_random_user_id()
            date_booked = generate_random_date_booked()
            discount_id = generate_random_discount_id()  # If no discount, then discountID = 1 -- Regular
            
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

    csv_writer.writeheader()

    # Write data rows
    csv_writer.writerows(output_rows)

print("Tickets generated successfully and written to 'tickets.csv'.")
