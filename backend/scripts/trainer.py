from typing import List
import os
import math
import neat
import mingus
import mingus.core.notes as notes
from mingus.containers import Note
from mingus.containers import Bar
import mingus.core.value as value
from random import choice

def generate_song(difficulty: float) -> List[Bar]:
  song = []

  for _ in range(16):
    song.append(generate_bar(difficulty))
  
  return song

def generate_bar(difficulty: float):
  some_bar = Bar('C', (4, 4))

  values = [value.whole, value.half, value.quarter, value.dots(value.half), value.eighth, value.dots(value.quarter), value.sixteenth, value.dots(value.eighth), value.thirty_second, value.dots(value.sixteenth)]

  actual_values = []

  pitches = [Note("A", 3), Note("B", 3), Note("C", 4), Note("D", 4), Note("E", 4), Note("F", 4), Note("G", 4), Note("A", 4), Note("B", 4), Note("C", 5), Note("D", 5), Note("E", 5),
             Note("F", 5), Note("G", 5), Note("A", 5), Note("B", 5), Note("C", 6)]

  if difficulty >= 10:
    actual_values = values
  else:
    index = math.ceil(difficulty)
    actual_values = values[0:index]
  
  while some_bar.place_notes(choice(pitches), choice(actual_values)):
    pass

  if not some_bar.is_full():
    some_bar.place_notes(choice(pitches), some_bar.value_left())
  
  return some_bar

ACCURACY = 100

def eval_fitness(genomes, config):
  nets = []
  ge = []
  ge_bar = []
  ge_note_index = []
  sum_ratios = []
  extra_notes = []
  read_too_many = []
  pitch_scores = []

  song = generate_song(5)

  for _, g in genomes:
    net = neat.nn.FeedForwardNetwork.create(g, config)
    nets.append(net)
    ge.append(g)
    sum_ratios.append(0)
    extra_notes.append(0)
    read_too_many.append(0)
    ge_bar.append(None)
    ge_note_index.append(None)
    pitch_scores.append(0)

  note_count = 0
  for bar_class in song:
    bar = bar_class.bar
    note_count_bar = len(bar)
    note_count += note_count_bar

    note_index = 0

    start_time = 0
    end_time = start_time + ((4 * ACCURACY) / bar[0][1])

    for x, _ in enumerate(ge):
      ge_bar[x] = bar
      ge_note_index[x] = 0

    start_count = 0
    end_count = 0

    read_forward = False

    time = 0
    beat = 0
    beat_time = 0
    for _ in range(4 * ACCURACY):
      for x, _ in enumerate(ge):
        if ge_note_index[x] >= note_count_bar:
          read_too_many[x] += 1
        else:
          note_class = Note(bar[ge_note_index[x]][2][0])
          note_level = notes.note_to_int(note_class.name) + 11 * note_class.octave

          output = nets[x].activate((bar[ge_note_index[x]][1], note_level, beat_time, 4, 4, read_forward))
          if read_forward:
            ge_note_index[x] += 1
            read_forward = False

          if output[0] > 0.5:
            pitch_output = []
            for neuron in output[1:]:
              pitch_output.append(neuron)
            
            score = pitch_score(note_level, pitch_output) - 1

            pitch_scores[x] += score

            start_note = start_count == end_count
            end_note = start_count > end_count

            if start_note:
              start_count += 1
            elif end_note:
              end_count += 1
            else:
              raise Exception("You fucking donkey")

            distance = 0
            from_begin = abs(time - start_time)
            from_end = abs(time - end_time)
            note_length = end_time - start_time

            if from_begin < from_end:
              distance = from_begin
            else:
              distance = from_end

            multiple_notes = start_count >= 2 and end_count >= 2

            if not multiple_notes:
              ratio = float(distance) / float(note_length)

              sum_ratios[x] += ratio
            else:
              extra_notes[x] += 1
          
          if output[18] > 0.5:
            read_forward = True

        if time % ACCURACY == 0:
          beat += 1

          beat_time = 0
        
        if time == end_time:
          note_index += 1

          if note_index >= note_count_bar:
            raise Exception("You fucking donkey")

          start_time = time
          end_time = start_time + (4 * ACCURACY) / bar[note_index][1]

          start_count = 0
          end_count = 0

        time += 1
        beat += 1
  
  for x, g in enumerate(ge):
    average_ratio = sum_ratios[x] / note_count
    accuracy = math.pow(2, -15 * average_ratio)

    weighted_accuracy = note_count * accuracy

    fitness = (weighted_accuracy - extra_notes[x]) / note_count

    ge[x].fitness = fitness
  

def run(config_file: str):
  config = neat.config.Config(neat.DefaultGenome, neat.DefaultReproduction, 
                              neat.DefaultSpeciesSet, neat.DefaultStagnation,
                              config_path)
  
  population = neat.Population(config)
  
  population.add_reporter(neat.StdOutReporter(True))
  stats = neat.StatisticsReporter()
  population.add_reporter(stats)

  winner = population.run(eval_fitness, 100)

  print(winner)
  net = neat.nn.FeedForwardNetwork.create(winner, config)
  print(net)

def pitch_score(level: int, pitch_output):
  expected = expected_pitch_output(level)

  difference_vector = []
  for actual, expected in zip(pitch_output, expected):
    difference = (actual - expected) * (actual - expected)

    difference_vector.append(difference)
  
  sum = 0
  for i in difference_vector:
    sum += i
  
  return sum

def expected_pitch_output(level: int):
  index = level - 41

  vector = [0] * 17

  print(vector)
  print(index)

  vector[index] = 1

  return vector

if __name__ == "__main__":
  local_dir = os.path.dirname(__file__)
  config_path = os.path.join(local_dir, "config-feedforward.txt")

  run(config_path)
