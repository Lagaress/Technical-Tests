def file_opened():
    """
    Returns a file object from a data.csv
    Arguments:
        None
    Returns:
        TextIOWrapper object
    """
    file_opened = open('data.csv' , 'r' , encoding="utf8") 
    return file_opened 

def log_file_opened_to_write():
    """
    Returns a TextIOWrapper object from a log.csv in write mode
    Arguments:
        None
    Returns:
        TextIOWrapper object
    """
    log_file = open('log.txt' , 'w' , encoding="utf8")
    return log_file 

def log_file_opened_to_read():
    """
    Returns a TextIOWrapper object from a log.csv in read mode
    Arguments:
        None
    Returns:
        TextIOWrapper object
    """
    log_file = open('log.txt' , 'r' , encoding="utf8")
    return log_file 
