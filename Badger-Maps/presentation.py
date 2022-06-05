import logic
import data

def output_bagder_maps(): 
    """
    Print the output requested for Bagder Maps test
    Arguments:
        None
    Returns:
        None
    """
    try: 
        csv_input_file = data.file_opened()

        logic.raise_exceptions(csv_input_file)
        show_all_customers_full_name(csv_input_file)
        show_customer_oldest_checkin(csv_input_file)
        show_customer_newest_checkin(csv_input_file)
        show_exceptions()

        csv_input_file.close()

    except logic.FileWithoutRequiredFields: 
        print("The file does not have required fields")
    
    except StopIteration: 
        print ("The file provided is empty")

    except FileNotFoundError:
        print ("Input file doesn't exist ")

def show_all_customers_full_name(csv_input_file):
    """
    Print a list of customers full name from csv_input_file
    Arguments:
        csv_input_file: an TextIOWrapper object
    Returns:
        None
    """
    print("The customer list is:"+str(logic.get_all_full_name(csv_input_file)))

def show_customer_oldest_checkin(csv_input_file):
    """
    Print the oldest checkin from the csv_input_file
    Arguments:
        csv_input_file: an TextIOWrapper object
    Returns:
        TextIOWrapper object
    """
    print("\nThe oldest check-in is: "+str(logic.get_customer_oldest_check_in(csv_input_file)))

def show_customer_newest_checkin(csv_input_file):
    """
    Print the newest checkin from csv_input_file
    Arguments:
        csv_input_file: an TextIOWrapper object
    Returns:
        None
    """
    print("\nThe oldest check-in is: "+str(logic.get_customer_newest_check_in(csv_input_file)))

def show_exceptions(): 
    """
    Print the content from a log file 
    Arguments:
        None
    Returns:
        None
    """
    log_file = data.log_file_opened_to_read()
    
    line_repeated = "-"*46
    print("\nThe exceptions occured during the execution was:\n"+line_repeated)
    print(log_file.read())

    log_file.close()
