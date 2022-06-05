import csv 
import locale
from datetime import date, datetime
import data

class FileWithoutRequiredFields(Exception): 
    pass

def raise_exceptions(csv_file):
    """
    Call the functions in charge of identify exceptions on the csv_file input file
    Arguments:
        csv_file: an TextIOWrapper object
    Returns:
        None
    """
    required_fields_missing(csv_file)
    log_empty_fields(csv_file)

def log_empty_fields(csv_file): 
    """
    Write in the log file empty fields and row from csv_vile
    Arguments:
        csv_file: an TextIOWrapper object
    Returns:
        None 
    """
    csv_content = get_content_file_from_beginning(csv_file)

    required_fields = ['Street', 'Zip', 'City', 'Last Check-In Date', 'Company']
    headers = next(csv_content)
    exact_row_counter = 1 
    exact_element_in_a_row_counter = 0 
    exact_missing_elements_in_a_row = 1

    log_file = data.log_file_opened_to_write()

    for row in csv_content: 
        exact_row_counter += 1
        for element_in_a_row in row:          
            if element_in_a_row == '':
                if headers[exact_element_in_a_row_counter] in required_fields:
                    log_file.write("There is no "+headers[exact_element_in_a_row_counter]+" in row "+str(exact_row_counter)+" and "+headers[exact_element_in_a_row_counter]+" is a required field\n")
                else: 
                    log_file.write("There is no "+headers[exact_element_in_a_row_counter]+" in row "+str(exact_row_counter)+"\n")
                exact_missing_elements_in_a_row += 1
            if exact_missing_elements_in_a_row == 11:
                log_file.write("Row "+str(exact_row_counter)+" is totally empty\n")
            exact_element_in_a_row_counter += 1
        exact_element_in_a_row_counter = 0 
        exact_missing_elements_in_a_row = 1
    log_file.close()

def get_content_file_from_beginning(csv_file):
    """
    Return the content of a csv_file from beginning
    Arguments:
        csv_file: an TextIOWrapper object
    Returns:
        csv_content from a csv_file 
    """
    csv_file.seek(0)
    return csv.reader( csv_file , delimiter = ',' )

def required_fields_missing(csv_file):
    """
    Raise a FileWithoutRequiredFields exception if in the headers of csv_file are missing required_fields
    Arguments:
        csv_file: an TextIOWrapper object
    Returns:
        None
    """
    csv_content = get_content_file_from_beginning(csv_file)

    required_fields = ['Street','Zip','City','Last Check-In Date','Company']
    headers = next(csv_content)

    if ( set(required_fields).issubset(set(headers)) == False ):
        raise FileWithoutRequiredFields

def fill_name_list (csv_content): 
    """
    Return a list of the type Customers Full Name alphabetically sorted 
    Arguments:
        csv_file: an TextIOWrapper object
    Returns:
        A list of Customers Full Name alphabetically sorted
    """    
    full_name_list = []

    for row in csv_content: 
        if ( row[0] == '' and row[1] == '' ):
            next(csv_content)

        else: 
            full_name_list.append( row[0]+" "+row[1] )

    return full_name_list

def get_all_full_name(csv_file): 
    """
    Return a list of the type Customers Full Name alphabetically sorted 
    Arguments:
        csv_file: an TextIOWrapper object
    Returns:
        A list of Customers Full Name alphabetically sorted
    """
    csv_content = get_content_file_from_beginning(csv_file)

    locale.setlocale(locale.LC_ALL, "")
        
    next(csv_file)

    full_name_list = fill_name_list(csv_content)
    full_name_list.sort( key = locale.strxfrm )

    return full_name_list

def create_date_object(date_row): 
    """
    Return a date object from a date_row  
    Arguments:
        date_row: a splitted date row
    Returns:
        A date object
    """    
    year = int(date_row[0])
    month = int(date_row[1])
    day = int(date_row[2])

    return date( year, month, day )

def create_date_list(csv_content):
    """
    Return a date_list from the date row of a csv_content 
    Arguments:
        csv_content: Content from a TextIOWrapper object
    Returns:
        A list with all the dates (different from '') from csv_content
    """    
    date_list = []
    customer_info = ["Customer Full Name" , "Check in Date"]

    for row in csv_content: 
        if row[6] != '': 
            date_object = datetime.strptime(row[6], "%d/%m/%Y").date()
            date_list.append(date_object)
    
    date_list.sort()

    return date_list

def parsing_data_format(date_to_parsing): 
    """
    Parse a date gived as argument to %d/%m/%y format  
    Arguments:
        date_to_parsing: date object
    Returns:
        date_toparsing in %d/%m/%y format  
    """
    splitted_data = str(date_to_parsing).split('-')

    date_object = create_date_object(splitted_data)

    return date_object.strftime("%d/%m/%Y")

def get_customer_oldest_check_in(csv_file):
    """
    Get customer oldest check in from a csv_file 
    Arguments:
        csv_file: an TextIOWrapper object
    Returns:
        The oldest check in from all check in dates
    """
    csv_content = get_content_file_from_beginning(csv_file)
    next(csv_content)

    date_list = create_date_list(csv_content)

    return parsing_data_format(date_list[0])

def get_customer_newest_check_in(csv_file):
    """
    Get customer newest check in from a csv_file 
    Arguments:
        csv_file: an TextIOWrapper object
    Returns:
        The newest check in from all check in dates
    """

    csv_content = get_content_file_from_beginning(csv_file)
    next(csv_content)

    date_list = create_date_list(csv_content)

    return parsing_data_format(date_list[len(date_list)-1])
