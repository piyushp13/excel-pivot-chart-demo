import xlsxwriter
import json
from pandas.io.json import json_normalize

def insert_table(worksheet, table_data, insert_start_cell = 'A1'):
    # Convert json to dataframe
    transformed_data = json_normalize(table_data)

    # Extract column names
    headers = list(transformed_data.columns)

    # Write column names in first row
    worksheet.write_row(insert_start_cell, headers, bold)

    # Write the table data into the worksheet tsarting from 2nd row
    for index, heading in enumerate(headers):
        starting_cell = '{cell}2'.format(cell = getColumnHeaderFromIndex(index))
        column_data = list(transformed_data[heading])
        # print(starting_cell, column_data)
        worksheet.write_column(starting_cell, column_data)
    return headers

def insert_chart(workbook, worksheet, chart_data, insert_start_cell = 'D2', x_offset = 25, y_offset = 10, **kwargs):
    chart_type = chart_data["data"]["type"] or None

    # Create a new chart object. In this case an embedded chart.
    if chart_type != None:
        x_axis = chart_data["data"]["keys"]["x"]
        x_axis_index = headings.index(x_axis)
        n_rows = len(base_data)
        chart = workbook.add_chart({'type': chart_type})
        for y_axis in chart_data["data"]["keys"]["value"]:
            y_axis_index = headings.index(y_axis)
            print(x_axis, y_axis, x_axis_index, y_axis_index)
            # Configure second series. Note use of alternative syntax to define ranges.
            chart.add_series({
                'name':       ['Sheet1', 0, y_axis_index],
                'categories': ['Sheet1', 1, x_axis_index, n_rows, x_axis_index],
                'values':     ['Sheet1', 1, y_axis_index, n_rows, y_axis_index],
            })

        # Add a chart title and some axis labels.
        chart.set_title ({'name': 'Chart'})
        chart.set_x_axis({'name': x_axis})
        chart.set_y_axis({'name': y_axis})

        # Set an Excel chart style. Colors with white outline and shadow.
        chart.set_style(10)

        # Insert the chart into the worksheet (with an offset).
        worksheet.insert_chart(insert_start_cell, chart, {'x_offset': 25, 'y_offset': 10})
    else:
        print("Could not parse chart data")


report_data_file = "src/assets/report1.json"

pages = []
base_data = []
report_data = {}
transformed_data = []
headings = []
try:
    with open(report_data_file, "r") as rep_data:
        rep_data_text = rep_data.read()
        report_data = json.loads(rep_data_text)
except IOError:
    print("Failed to read file, please check the file path.")
    exit(1)

workbook = xlsxwriter.Workbook('chart_line.xlsx')
pages = report_data["pages"]

for index, page in enumerate(pages):
    worksheet = workbook.add_worksheet()
    if index == 0:
        bold = workbook.add_format({'bold': 1})
        base_data = page["data"]
        transformed_data = json_normalize(base_data)
        headings = insert_table(worksheet, base_data, 'A1')
    else:
        if page["type"] == "table":
            insert_table(worksheet, page["data"], 'A1')
        elif page["type"] == "chart":
            insert_chart(workbook, worksheet, page["data"], insert_start_cell = 'D2')


def getColumnHeaderFromIndex(index):
    rem = index % 26
    columnHeader = chr(rem + 65)
    index = index / 26
    while index > 0:
        rem = index % 26
        index = index / 26
        columnHeader = chr(rem + 64) + columnHeader
    return columnHeader

workbook.close()