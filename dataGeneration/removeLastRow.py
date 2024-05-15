import csv

# Input and output CSV files
input_csv_file = 'venueHasSeatCat44.csv'
output_csv_file = 'venueHasSeatCat44-No-Price.csv'

# Read the input CSV file
with open(input_csv_file, 'r', newline='') as infile:
    csv_reader = csv.reader(infile)
    rows = list(csv_reader)

    # Remove the last column from each row
    modified_rows = [row[:-1] for row in rows]

# Write the modified rows to the output CSV file
with open(output_csv_file, 'w', newline='') as outfile:
    csv_writer = csv.writer(outfile)
    csv_writer.writerows(modified_rows)

print(f"Last column removed and new CSV saved as '{output_csv_file}'.")
