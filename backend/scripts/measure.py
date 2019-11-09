from typing import List
from note import *

class Measure:
  def __init__(self, notes: List[Note], beat_value: int, beat_count: int):
    sum = 0

    largest_denominator = 0
    for note in notes:
      if note.get_value() > largest_denominator:
        largest_denominator = note.get_value()
    
    print(largest_denominator)
    
    for note in notes:
      note_value = note.get_value()
      print(note_value)

      if note_value < largest_denominator:
        note_value = twice_to_this_number(note_value, largest_denominator)
      
      sum += note_value
    
    if sum != ((beat_count * largest_denominator) / beat_value):
      comparison = ((beat_count * largest_denominator) / beat_value)
      raise NameError("give me a complete measure you fucking donkey", sum, largest_denominator, comparison)

    self.notes = notes
    self.beat_value = beat_value
    self.beat_count = beat_count

def twice_to_this_number(num: int, test_num: int, times_called = 1) -> int:
  if num == test_num:
    return times_called
  else:
    num *= 2

    times_called += 1
    return twice_to_this_number(num, test_num, times_called)

def div_by_two_til_one(num: int, times_divided: int = 0) -> int:
  if num == 1:
    return times_divided
  else:
    num /= 2

    times_divided += 1
    return div_by_two_til_one(num, times_divided)

def generate_song(difficulty: int) -> List[Measure]:
  beat_count = 3
  beat_value = 4

  first_note = Note("C4", 2, False)
  second_note = Note("C4", 4, False)
  return Measure([first_note, second_note], beat_count, beat_value)


if __name__ == "__main__":
  generate_song(0)