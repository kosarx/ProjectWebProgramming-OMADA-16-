import csv
import random
import datetime

def generate_review_id(review_number):
    return f"{review_number}"

def generate_random_score():
    return random.randint(1, 5)

def generate_random_comment():
    comments = [
        "Great experience!",
        "Could be better.",
        "Not what I expected.",
        "Amazing performance!",
        "Wouldn't recommend.",
        "Best show I've seen!",
        "Average experience.",
        "Absolutely terrible.",
        "The show was fantastic, with stunning visuals and amazing performances by all the actors. The storyline kept me on the edge of my seat throughout, and I can't wait to see it again!",
        "The performance was average, and the plot was somewhat confusing. Some of the actors delivered great performances, but others seemed uninterested. The set design, however, was quite impressive.",
        "A truly outstanding experience! Everything from the lighting to the costumes to the acting was top-notch. I would highly recommend it to anyone looking for a memorable night out.",
        "The show was too loud and felt a bit chaotic at times. While there were a few standout moments, overall, it didn't meet my expectations. It could be improved with better pacing and clearer narrative structure."
    ]
    return random.choice(comments)

def generate_random_user_id():
    return random.randint(1, 11)

def generate_random_event_id():
    return random.randint(1, 16)


def generate_random_date_written():
    today = datetime.date.today()
    offset_days = random.randint(-30, 0)  # Random date within the last 30 days
    return today + datetime.timedelta(days=offset_days)

# Output CSV file for reviews data
output_csv_file = 'reviewR.csv'

# Headers for the output CSV
output_headers = ['reviewID', 'score', 'comment', 'userID', 'date_written', 'eventID']

# List to store output rows
output_rows = []

# Generate 50 reviews
for review_number in range(1, 51):
    review_id = generate_review_id(review_number)
    score = generate_random_score()
    comment = generate_random_comment()
    user_id = generate_random_user_id()
    date_written = generate_random_date_written()
    event_id = generate_random_event_id()

    # New review row
    new_row = {
        'reviewID': review_id,
        'score': score,
        'comment': comment,
        'userID': user_id,
        'date_written': date_written,
        'eventID': event_id
    }
    
    output_rows.append(new_row)

# Write the output rows to the new CSV file
with open(output_csv_file, 'w', newline='') as outfile:
    csv_writer = csv.DictWriter(outfile, fieldnames=output_headers)

    csv_writer.writeheader()

    csv_writer.writerows(output_rows)

print("Reviews generated successfully and written to 'reviews.csv'.")
