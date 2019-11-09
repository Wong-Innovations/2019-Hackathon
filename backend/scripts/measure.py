from typing import List
from note import *

class Measure:
  def __init__(self, notes: List[Note], beat_value: int, beat_count: int):
    sum = 0

    largest_denominator = 0
    for note in notes:
      if note.get_value() > largest_denominator:
        largest_denominator = note.get_value
    
    for note in notes:
      if note.get_value() < largest_denominator:
        sum += twice_to_this_number(note.get_value(), largest_denominator)
    
    if sum != largest_denominator:
      raise NameError("give me a complete measure you fucking donkey")

    self.notes = notes
    self.beat_value = beat_value
    self.beat_count = beat_count

def twice_to_this_number(num: int, test_num: int, times_called = 1) -> int:
  if num == test_num:
    return times_called
  else:
    times_called += 1
    return twice_to_this_number(num, test_num, times_called)

def div_by_two_til_one(num: int, times_divided: int = 0) -> int:
  if num == 1:
    return times_divided
  else:
    num /= 2

    times_divided += 1
    return div_by_two_til_one(num, times_divided)